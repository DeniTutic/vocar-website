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

  const about = {
    url: `${SITE_URL}/o-nama`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  };

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/proizvodi/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [home, about, ...productRoutes];
}
