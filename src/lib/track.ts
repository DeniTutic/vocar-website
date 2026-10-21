"use client";

import { track as vercelTrack } from "@vercel/analytics";

/**
 * The handful of events worth counting on a brochure site. Components import
 * this, never the vendor, so the provider can change without touching them.
 * Vercel Web Analytics is cookieless and aggregate-only; /privatnost says so.
 */
export type SiteEvent =
  | { name: "quote_submit"; mode: "customer" | "trade"; sample?: boolean; privateLabel?: boolean }
  | { name: "catalog_download"; where: string }
  | { name: "tel_click"; number: string }
  | { name: "product_view"; slug: string };

export function track(event: SiteEvent) {
  const { name, ...props } = event;
  try {
    vercelTrack(name, props as Record<string, string | number | boolean>);
  } catch {
    // Analytics must never break the page.
  }
}
