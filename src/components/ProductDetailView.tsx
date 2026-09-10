"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/data/products";
import { productPage } from "@/data/content";
import { useT } from "@/lib/locale";
import { ScrollReveal } from "./ScrollReveal";
import { ProductCard } from "./ProductCard";

export function ProductDetailView({ product, related }: { product: Product; related: Product[] }) {
  const t = useT();

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Plain <a>, not <Link>: a same-hash section lives on "/" and a
            real navigation is what reliably scrolls to it on load. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/#proizvodi"
          className="inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: "var(--forest)" }}
        >
          <ArrowLeft size={16} />
          {t(productPage.backToCategory)}
        </a>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal className="relative aspect-square overflow-hidden rounded-3xl" style={{ background: "var(--beige)" }}>
            <Image
              src={product.image}
              alt={t(product.imageAlt)}
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
              {t(productPage.categoryLabel)}: {t(product.category.name)}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl" style={{ color: "var(--forest-deep)" }}>
              {t(product.name)}
            </h1>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {t(product.description)}
            </p>

            <dl className="mt-8 flex flex-col gap-5 border-t pt-6" style={{ borderColor: "var(--line)" }}>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--forest)" }}>
                  {t(productPage.sizesLabel)}
                </dt>
                <dd className="mt-1 text-base" style={{ color: "var(--ink)" }}>
                  {product.sizes}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--forest)" }}>
                  {t(productPage.compositionLabel)}
                </dt>
                <dd className="mt-1 text-base" style={{ color: "var(--ink)" }}>
                  {t(product.composition)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--forest)" }}>
                  {t(productPage.nutritionLabel)}
                </dt>
                <dd className="mt-1 text-sm italic" style={{ color: "var(--ink-soft)" }}>
                  {t(productPage.nutritionNote)}
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
              {t(productPage.relatedTitle)}
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
