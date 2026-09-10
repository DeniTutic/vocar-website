import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import { ProductDetailView } from "@/components/ProductDetailView";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name.bs,
    description: `${product.name.bs} (${product.sizes}) — ${product.description.bs}`,
    alternates: { canonical: `/proizvodi/${product.slug}` },
    openGraph: {
      title: product.name.bs,
      description: product.description.bs,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return <ProductDetailView product={product} related={related} />;
}
