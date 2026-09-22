import type { Metadata } from "next";
import { products } from "@/data/products";
import { ProductRoute, productRouteMetadata } from "@/components/ProductRoute";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return productRouteMetadata("en", await params);
}

export default async function ProductPageEn({ params }: { params: Promise<{ slug: string }> }) {
  return <ProductRoute locale="en" slug={(await params).slug} />;
}
