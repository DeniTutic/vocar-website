import { NextResponse } from "next/server";
import { categories } from "@/data/categories";

/**
 * Contact + quote endpoint. Sends through Resend's REST API (no SDK, one
 * fetch). Needs three env vars on the host:
 *   RESEND_API_KEY  — from resend.com
 *   CONTACT_FROM    — a sender on a verified Resend domain, e.g. "Voćar web <web@vocar.ba>"
 *   CONTACT_TO      — where messages land, e.g. "prodaja@vocar.ba"
 * Until they exist the route answers 503 and the form falls back to mailto:.
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

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !from || !to) {
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

  sentThisHour++;
  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text, html }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }

  if (!res.ok) {
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
