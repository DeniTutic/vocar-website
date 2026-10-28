import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { categories } from "@/data/categories";
import { salesEmail } from "@/data/content";

/**
 * Contact + quote endpoint. Sends over SMTP through Voćar's own mail server,
 * the same way the old WordPress form did. Needs these env vars on the host:
 *   SMTP_HOST  the mail server, e.g. "mail.vocar.ba"
 *   SMTP_USER  the mailbox it sends from, e.g. "info@vocar.ba"
 *   SMTP_PASS  that mailbox's password
 *   SMTP_PORT  optional, defaults to 465 (TLS from the start)
 * Bosnian-site messages go to salesEmail.bs, English-site ones to salesEmail.en.
 * Until the vars exist the route answers 503 and the form falls back to mailto:.
 */

export const runtime = "nodejs";

// Stricter than the form's check: no commas, quotes or brackets, so the value
// can't smuggle a second address or a display name into Reply-To.
const EMAIL_RE = /^[^\s@,;:<>()[\]"\\]+@[^\s@,;:<>()[\]"\\]+\.[^\s@,;:<>()[\]"\\]+$/;
const MAX = { name: 120, email: 200, phone: 60, company: 160, market: 120, volume: 120, message: 4000 };
/** The largest honest payload is ~5 KB; anything far past that isn't a person. */
const MAX_BODY_BYTES = 16_000;

// Small per-IP throttle; fine for a brochure site on a single region. Each
// serverless instance keeps its own memory, so this slows a script down, and
// the hourly cap bounds what one instance can send if IPs rotate. A Vercel
// Firewall rate-limit rule on /api/contact is the cross-instance backstop.
const WINDOW_MS = 30_000;
const lastHit = new Map<string, number>();
const HOUR_MS = 3_600_000;
const MAX_PER_HOUR = 30;
let hourStart = 0;
let sentThisHour = 0;

/** Same-origin browsers only: other sites can't make visitors post for them. */
function isSameOrigin(req: Request): boolean {
  const site = req.headers.get("sec-fetch-site");
  if (site) return site === "same-origin";
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

interface Payload {
  mode: "customer" | "trade";
  /** Site language the form was sent from; picks the inbox. */
  locale?: "bs" | "en";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  market?: string;
  volume?: string;
  message: string;
  product?: string;
  size?: string;
  families?: string[];
  sample?: boolean;
  /** Sent from the private label page (/robne-marke). */
  privateLabel?: boolean;
  /** Honeypot — humans never see it, bots fill it. */
  website?: string;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** For values that end up in the subject or a table row: one line, no control characters. */
function line(value: unknown, max: number): string {
  return typeof value === "string" ? clean(value.replace(/[\p{Cc}\u2028\u2029]+/gu, " "), max) : "";
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ ok: false, reason: "forbidden" }, { status: 403 });
  }
  // A JSON content type can't be sent cross-site without a CORS preflight.
  if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 415 });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  let raw: Partial<Payload>;
  try {
    const body = await req.text();
    if (body.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, reason: "too_large" }, { status: 413 });
    }
    raw = JSON.parse(body) as Partial<Payload>;
    if (!raw || typeof raw !== "object") throw new Error("not an object");
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
  }

  // Honeypot: pretend success so the bot moves on.
  if (clean(raw.website, 200)) return NextResponse.json({ ok: true });

  // Vercel overwrites x-forwarded-for with the real client address.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const last = lastHit.get(ip) ?? 0;
  if (now - last < WINDOW_MS) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }
  if (now - hourStart > HOUR_MS) {
    hourStart = now;
    sentThisHour = 0;
  }
  if (sentThisHour >= MAX_PER_HOUR) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }
  lastHit.set(ip, now);
  // Drop expired entries rather than everything, so a flood can't reset the throttle.
  if (lastHit.size > 5000) {
    for (const [key, at] of lastHit) if (now - at >= WINDOW_MS) lastHit.delete(key);
  }

  const mode: Payload["mode"] = raw.mode === "trade" ? "trade" : "customer";
  const name = line(raw.name, MAX.name);
  const email = line(raw.email, MAX.email);
  const phone = line(raw.phone, MAX.phone);
  const company = line(raw.company, MAX.company);
  const market = line(raw.market, MAX.market);
  const volume = line(raw.volume, MAX.volume);
  const message = clean(raw.message, MAX.message);
  const product = line(raw.product, 200);
  const size = line(raw.size, 40);
  // Family slugs → Bosnian names; unknown slugs are dropped rather than echoed.
  const families = Array.isArray(raw.families)
    ? raw.families
        .slice(0, categories.length)
        .map((f) => categories.find((c) => c.slug === clean(f, 40))?.name.bs)
        .filter((n): n is string => Boolean(n))
    : [];
  const sample = raw.sample === true;
  const privateLabel = mode === "trade" && raw.privateLabel === true;

  if (!name || !EMAIL_RE.test(email) || !message || (mode === "trade" && !company)) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const subject = privateLabel
    ? `Robna marka — ${company}`
    : mode === "trade"
      ? `Upit za ponudu — ${company}${product ? ` — ${product}${size ? ` (${size})` : ""}` : ""}`
      : `Poruka sa sajta — ${name}`;

  const rows: [string, string][] = [
    ["Ime", name],
    ["Email", email],
    ["Telefon", phone || "—"],
  ];
  if (privateLabel) rows.push(["Upit", "Robna marka"]);
  if (mode === "trade") {
    rows.push(["Firma", company], ["Tržište", market || "—"], ["Količina", volume || "—"]);
    if (product) rows.push(["Proizvod", `${product}${size ? ` (${size})` : ""}`]);
    rows.push(["Porodice proizvoda", families.length ? families.join(", ") : "—"], ["Uzorak", sample ? "da" : "ne"]);
  }

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`;
  const html = `<table style="font:14px/1.5 -apple-system,Segoe UI,sans-serif;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:2px 12px 2px 0;color:#625a4d">${k}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><p style="font:14px/1.6 -apple-system,Segoe UI,sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>`;

  const to = raw.locale === "en" ? salesEmail.en : salesEmail.bs;
  const port = Number(process.env.SMTP_PORT) || 465;
  // One message per request on a serverless function, so no pooling. Short
  // timeouts keep a stuck mail server from holding the visitor's request.
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  sentThisHour++;
  try {
    await transport.sendMail({ from: { name: "Voćar web", address: user }, to, replyTo: email, subject, text, html });
  } catch (err) {
    console.error("contact: SMTP send failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
