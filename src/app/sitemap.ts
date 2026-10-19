import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { SITE_URL } from "@/data/content";
import { LOCALES, path, productPath, type RouteKey } from "@/lib/routes";

/** Both languages, each entry declaring the other as its alternate (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entry = (
    paths: Record<(typeof LOCALES)[number], string>,
    changeFrequency: "monthly" | "yearly",
    priority: number
  ) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${paths[locale]}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${paths[l]}`])),
      },
    }));

  const pathsFor = (key: RouteKey) =>
    Object.fromEntries(LOCALES.map((l) => [l, path(key, l)])) as Record<(typeof LOCALES)[number], string>;

  return [
    ...entry(pathsFor("home"), "monthly", 1),
    ...entry(pathsFor("products"), "monthly", 0.8),
    ...products.flatMap((p) =>
      entry(
        Object.fromEntries(LOCALES.map((l) => [l, productPath(p.slug, l)])) as Record<(typeof LOCALES)[number], string>,
        "yearly",
        0.6
      )
    ),
    ...entry(pathsFor("privateLabel"), "monthly", 0.7),
    ...entry(pathsFor("privacy"), "yearly", 0.3),
    ...entry(pathsFor("terms"), "yearly", 0.3),
  ];
}
