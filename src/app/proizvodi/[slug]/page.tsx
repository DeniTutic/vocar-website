import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import { productPage } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProductCard } from "@/components/ProductCard";

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
    title: product.name,
    description: `${product.name} (${product.sizes}) — ${product.description}`,
    alternates: { canonical: `/proizvodi/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
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

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Link
          href={`/proizvodi#${product.category.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: "var(--forest)" }}
        >
          <ArrowLeft size={16} />
          {productPage.backToCategory.bs}
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal className="relative aspect-square overflow-hidden rounded-3xl" style={{ background: "var(--beige)" }}>
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              priority
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
              style={{ background: product.category.accent, color: "#fffdf8" }}
            >
              {productPage.categoryLabel.bs}: {product.category.name.bs}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl" style={{ color: "var(--forest-deep)" }}>
              {product.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {product.description}
            </p>

            <dl className="mt-8 flex flex-col gap-5 border-t pt-6" style={{ borderColor: "var(--line)" }}>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--forest)" }}>
                  {productPage.sizesLabel.bs}
                </dt>
                <dd className="mt-1 text-base" style={{ color: "var(--ink)" }}>
                  {product.sizes}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--forest)" }}>
                  {productPage.compositionLabel.bs}
                </dt>
                <dd className="mt-1 text-base" style={{ color: "var(--ink)" }}>
                  {product.composition}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--forest)" }}>
                  {productPage.nutritionLabel.bs}
                </dt>
                <dd className="mt-1 text-sm italic" style={{ color: "var(--ink-soft)" }}>
                  {productPage.nutritionNote.bs}
                </dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t px-5 py-16 sm:px-8 sm:py-20" style={{ borderColor: "var(--line)" }}>
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl" style={{ color: "var(--forest-deep)" }}>
              {productPage.relatedTitle.bs}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} className="h-full" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
