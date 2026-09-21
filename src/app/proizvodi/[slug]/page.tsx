import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import { SITE_URL } from "@/data/content";
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

  // No `offers`: there's no price and no shop here. Product + brand + image
  // is enough for a product rich result and stays honest.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name.bs,
    image: `${SITE_URL}${product.image}`,
    description: product.description.bs,
    sku: product.slug,
    category: product.category.name.bs,
    brand: { "@type": "Brand", name: "Voćar" },
    manufacturer: { "@type": "Organization", name: "Voćar d.o.o. Brčko", url: SITE_URL },
    url: `${SITE_URL}/proizvodi/${product.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailView product={product} related={related} />
    </>
  );
}
