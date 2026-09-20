import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { SITE_URL } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  };

  const catalog = {
    url: `${SITE_URL}/proizvodi`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  };

  const privacy = {
    url: `${SITE_URL}/privatnost`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  };

  const terms = {
    url: `${SITE_URL}/uslovi`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  };

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/proizvodi/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [home, catalog, privacy, terms, ...productRoutes];
}
