import type { Metadata } from "next";
import { SITE_URL, siteMeta } from "@/data/content";
import type { Locale } from "./locale";
import { alternatesFor, path, productPath, type RouteKey } from "./routes";

/** Shared <head> for a page that exists in both languages. */
export function pageMetadata(opts: {
  locale: Locale;
  key?: RouteKey;
  bsPath?: string;
  enPath?: string;
  title?: string;
  /** Home pages already end in the brand name — skip the "%s — Voćar" template. */
  absoluteTitle?: boolean;
  description?: string;
  images?: string[];
}): Metadata {
  const { locale, key, title, absoluteTitle, description, images } = opts;
  const bsPath = opts.bsPath ?? (key ? path(key, "bs") : "/");
  const enPath = opts.enPath ?? (key ? path(key, "en") : "/en");

  return {
    title: absoluteTitle && title ? { absolute: title } : title,
    description,
    alternates: alternatesFor(locale, bsPath, enPath),
    openGraph: {
      title,
      description,
      url: locale === "en" ? enPath : bsPath,
      locale: locale === "en" ? "en_US" : "bs_BA",
      ...(images ? { images: images.map((url) => ({ url })) } : {}),
    },
  };
}

export function productMetadata(locale: Locale, product: {
  slug: string;
  name: Record<Locale, string>;
  sizes: string;
  description: Record<Locale, string>;
  image: string;
}): Metadata {
  return pageMetadata({
    locale,
    bsPath: productPath(product.slug, "bs"),
    enPath: productPath(product.slug, "en"),
    title: product.name[locale],
    description: `${product.name[locale]} (${product.sizes}) — ${product.description[locale]}`,
    images: [product.image],
  });
}

/** Root-layout metadata; the parts that don't change per page. */
export function rootMetadata(locale: Locale): Metadata {
  const title = siteMeta.title[locale];
  const description = siteMeta.description[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s — Voćar" },
    description,
    keywords: [...siteMeta.keywords[locale]],
    authors: [{ name: "Voćar d.o.o. Brčko" }],
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "bs_BA",
      siteName: "Voćar",
      title,
      description,
      url: locale === "en" ? `${SITE_URL}/en` : SITE_URL,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: siteMeta.ogAlt[locale] }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og.jpg"],
    },
    robots: { index: true, follow: true },
  };
}
