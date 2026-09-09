import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { SITE_URL } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/proizvodi", "/o-nama", "/kvalitet", "/katalog", "/kontakt"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/proizvodi/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
