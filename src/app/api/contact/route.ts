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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, email: 200, phone: 60, company: 160, market: 120, volume: 120, message: 4000 };

// Small per-IP throttle; fine for a brochure site on a single region.
const WINDOW_MS = 30_000;
const lastHit = new Map<string, number>();

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
  /** Honeypot — humans never see it, bots fill it. */
  website?: string;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !from || !to) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  let raw: Partial<Payload>;
  try {
    raw = (await req.json()) as Partial<Payload>;
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
  }

  // Honeypot: pretend success so the bot moves on.
  if (clean(raw.website, 200)) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const last = lastHit.get(ip) ?? 0;
  if (now - last < WINDOW_MS) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }
  lastHit.set(ip, now);
  if (lastHit.size > 5000) lastHit.clear();

  const mode: Payload["mode"] = raw.mode === "trade" ? "trade" : "customer";
  const name = clean(raw.name, MAX.name);
  const email = clean(raw.email, MAX.email);
  const phone = clean(raw.phone, MAX.phone);
  const company = clean(raw.company, MAX.company);
  const market = clean(raw.market, MAX.market);
  const volume = clean(raw.volume, MAX.volume);
  const message = clean(raw.message, MAX.message);
  const product = clean(raw.product, 200);
  const size = clean(raw.size, 40);
  // Family slugs → Bosnian names; unknown slugs are dropped rather than echoed.
  const families = Array.isArray(raw.families)
    ? raw.families
        .map((f) => categories.find((c) => c.slug === clean(f, 40))?.name.bs)
        .filter((n): n is string => Boolean(n))
    : [];
  const sample = raw.sample === true;

  if (!name || !EMAIL_RE.test(email) || !message || (mode === "trade" && !company)) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const subject =
    mode === "trade"
      ? `Upit za ponudu — ${company}${product ? ` — ${product}${size ? ` (${size})` : ""}` : ""}`
      : `Poruka sa sajta — ${name}`;

  const rows: [string, string][] = [
    ["Ime", name],
    ["Email", email],
    ["Telefon", phone || "—"],
  ];
  if (mode === "trade") {
    rows.push(["Firma", company], ["Tržište", market || "—"], ["Količina", volume || "—"]);
    if (product) rows.push(["Proizvod", `${product}${size ? ` (${size})` : ""}`]);
    rows.push(["Porodice proizvoda", families.length ? families.join(", ") : "—"], ["Uzorak", sample ? "da" : "ne"]);
  }

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`;
  const html = `<table style="font:14px/1.5 -apple-system,Segoe UI,sans-serif;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:2px 12px 2px 0;color:#625a4d">${k}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><p style="font:14px/1.6 -apple-system,Segoe UI,sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject, text, html }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
