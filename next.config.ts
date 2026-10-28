import type { NextConfig } from "next";

// Product URLs that moved when Flips Time, Timi and Q Flips merged into one
// "flips" category, or that left the range (groceries, biscuits, vacuum
// peanuts, Timi Pikant pizza). Same rules for both languages' product paths.
const productRedirects = ["/proizvodi", "/en/products"].flatMap((base) => [
  { source: `${base}/flips-time-:rest`, destination: `${base}/flips-flips-time-:rest`, permanent: true },
  { source: `${base}/timi-flips-:rest`, destination: `${base}/flips-:rest`, permanent: true },
  { source: `${base}/quinoa-flips-:rest`, destination: `${base}/flips-:rest`, permanent: true },
  { source: `${base}/groceries-:rest`, destination: base, permanent: true },
  { source: `${base}/biscuits-:rest`, destination: base, permanent: true },
  { source: `${base}/peanuts-timi-kikiriki-vakumirano`, destination: `${base}?kategorija=peanuts`, permanent: true },
  // October 2026 corrections: Timi Pikant pizza left the range, and the
  // plain Q Flips lost the "kikiriki" its name never had on the pack.
  { source: `${base}/flips-timi-pikant-pizza-ukus`, destination: `${base}?kategorija=flips`, permanent: true },
  { source: `${base}/flips-q-flips-kikiriki-bez-masti-i-soli`, destination: `${base}/flips-q-flips-bez-dodatih-masti-i-soli`, permanent: true },
  // Happy Cerios has no added vitamins, so the name no longer claims them.
  { source: `${base}/cereals-happy-cerios-kuglice-sa-vitaminima`, destination: `${base}/cereals-happy-cerios-cokoladne-kuglice`, permanent: true },
]);

const isDev = process.env.NODE_ENV === "development";

// Static pages can't carry per-request nonces, so scripts and styles keep
// 'unsafe-inline' (Next's RSC payload, the inlined Tailwind sheet, Framer
// Motion). Everything else is locked to this origin: the only third parties
// are the Google Maps embed and, in dev, the Vercel Analytics debug script.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // Each language has its own root layout, so there is no single layout to
    // compose a 404 from: Next's documented answer is global-not-found.
    globalNotFound: true,
    // Tailwind keeps the stylesheet ~10 KB, so shipping it inside the HTML
    // costs little and removes the render-blocking CSS request on mobile.
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return productRedirects;
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
