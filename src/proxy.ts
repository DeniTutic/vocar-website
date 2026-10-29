import { NextResponse, type NextRequest } from "next/server";
import { productInfo } from "@/data/productInfo";
import { productPath } from "@/lib/routes";

/**
 * Old WordPress/WooCommerce links still in Google's results and bookmarks:
 * "/?page_id=1625", "/?product=…", "/?product_cat=…". Without this they all
 * open the new homepage at the top. A next.config redirect can't send
 * "/?page_id=…" to a "/#section" anchor (the query is passed through, so the
 * redirect would match again), hence a proxy that drops the old query.
 */

// Old page ids → new place. Unknown ids (cart, checkout, account) go home.
const OLD_PAGES: Record<string, string> = {
  "69": "/", // Pocetna
  "2713": "/", // Home
  "2699": "/#o-nama", // O nama
  "2709": "/en#o-nama", // About us
  "2670": "/proizvodi", // Proizvodi (category list)
  "7": "/proizvodi", // Shop
  "4211": "/en/products", // Products
  "1625": "/#kontakt", // Kontakt
  "4233": "/en#kontakt", // Contact
};

// Old shop product slug → new product page, read off each product's `source`.
const OLD_PRODUCTS = new Map<string, string>();
for (const [slug, info] of Object.entries(productInfo)) {
  const old = info.source.match(/[?&]product=([^&]+)/)?.[1];
  if (old) OLD_PRODUCTS.set(old, productPath(slug, "bs"));
}

export function proxy(request: NextRequest) {
  const query = request.nextUrl.searchParams;
  const product = query.get("product");
  // "?page_id=2670/#category_…" arrives as "2670/", so keep the digits only.
  const pageId = query.get("page_id")?.match(/^\d+/)?.[0];

  const target = product
    ? (OLD_PRODUCTS.get(product) ?? "/proizvodi")
    : query.has("product_cat")
      ? "/proizvodi"
      : pageId
        ? (OLD_PAGES[pageId] ?? "/")
        : "/";
  return NextResponse.redirect(new URL(target, request.url), 308);
}

export const config = {
  matcher: [
    { source: "/", has: [{ type: "query", key: "page_id" }] },
    { source: "/", has: [{ type: "query", key: "product" }] },
    { source: "/", has: [{ type: "query", key: "product_cat" }] },
  ],
};
