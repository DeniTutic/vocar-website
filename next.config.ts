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

const nextConfig: NextConfig = {
  experimental: {
    // Each language has its own root layout, so there is no single layout to
    // compose a 404 from — Next's documented answer is global-not-found.
    globalNotFound: true,
  },
  async redirects() {
    return productRedirects;
  },
};

export default nextConfig;
