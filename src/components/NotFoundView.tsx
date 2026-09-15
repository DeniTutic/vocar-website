"use client";

import { products } from "@/data/products";
import { notFoundPage } from "@/data/content";
import { useT } from "@/lib/locale";
import { CtaLink } from "./CtaLink";
import { ProductCard } from "./ProductCard";

const hits = products.filter((p) => p.badges.includes("hit")).slice(0, 4);

export function NotFoundView() {
  const t = useT();

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-display text-7xl font-bold sm:text-8xl" style={{ color: "var(--amber)" }} aria-hidden>
          {t(notFoundPage.eyebrow)}
        </span>
        <h1 className="mt-2 text-4xl sm:text-5xl" style={{ color: "var(--forest-deep)" }}>
          {t(notFoundPage.title)}
        </h1>
        <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          {t(notFoundPage.body)}
        </p>
        <div className="mt-8">
          <CtaLink href="/#proizvodi" variant="buy">
            {t(notFoundPage.cta)}
          </CtaLink>
        </div>
      </div>

      {hits.length > 0 && (
        <div className="mt-16 border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <h2 className="text-2xl" style={{ color: "var(--forest-deep)" }}>
            {t(notFoundPage.hitsTitle)}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {hits.map((p) => (
              <ProductCard key={p.slug} product={p} className="h-full" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
