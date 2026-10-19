import type { Locale } from "./locale";

/**
 * Every page exists at two URLs: Bosnian at the root (unchanged, already
 * indexed) and English under /en with English path segments. Components ask
 * for a route by key instead of hardcoding a path, so a link is correct in
 * whichever locale the visitor is reading.
 */
export type RouteKey = "home" | "products" | "privateLabel" | "privacy" | "terms";

const PATHS: Record<RouteKey, Record<Locale, string>> = {
  home: { bs: "/", en: "/en" },
  products: { bs: "/proizvodi", en: "/en/products" },
  privateLabel: { bs: "/robne-marke", en: "/en/private-label" },
  privacy: { bs: "/privatnost", en: "/en/privacy" },
  terms: { bs: "/uslovi", en: "/en/terms" },
};

export const LOCALES: Locale[] = ["bs", "en"];

export function path(key: RouteKey, locale: Locale): string {
  return PATHS[key][locale];
}

export function productPath(slug: string, locale: Locale): string {
  return `${PATHS.products[locale]}/${slug}`;
}

/** "#kontakt" → "/#kontakt" (bs) or "/en#kontakt" (en). */
export function homeHash(hash: string, locale: Locale): string {
  return `${locale === "en" ? "/en" : "/"}${hash}`;
}

/** Same page in the other language — what the language switcher links to. */
export function swapLocale(pathname: string, target: Locale): string {
  const current: Locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "bs";
  if (current === target) return pathname;

  for (const key of Object.keys(PATHS) as RouteKey[]) {
    if (pathname === PATHS[key][current]) return PATHS[key][target];
  }
  const productsFrom = PATHS.products[current];
  if (pathname.startsWith(`${productsFrom}/`)) {
    return productPath(pathname.slice(productsFrom.length + 1), target);
  }
  return PATHS.home[target];
}

/** hreflang + canonical for a page's metadata. */
export function alternatesFor(locale: Locale, bsPath: string, enPath: string) {
  return {
    canonical: locale === "en" ? enPath : bsPath,
    languages: { bs: bsPath, en: enPath, "x-default": bsPath },
  };
}
