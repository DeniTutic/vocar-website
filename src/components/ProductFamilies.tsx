"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { home } from "@/data/content";
import { useLocale, useT } from "@/lib/locale";
import { path } from "@/lib/routes";
import { productsLabel } from "@/lib/plural";
import { SectionHeading } from "./SectionHeading";
import { CtaLink } from "./CtaLink";

const countBySlug = new Map<string, number>();
for (const p of products) countBySlug.set(p.category.slug, (countBySlug.get(p.category.slug) ?? 0) + 1);

/**
 * The homepage's product block: one tile per family, not the whole SKU grid.
 * The full grid with filters lives on /proizvodi; tiles deep-link into it.
 */
export function ProductFamilies() {
  const t = useT();
  const { locale } = useLocale();

  return (
    <section id="proizvodi" className="scroll-mt-20 py-20 sm:py-28" style={{ background: "var(--cream)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t(home.showcaseEyebrow)} title={t(home.showcaseTitle)} body={t(home.familiesBody)} />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const count = countBySlug.get(category.slug) ?? 0;
            return (
              <motion.div
                key={category.slug}
                whileHover="hover"
                initial="rest"
                animate="rest"
                variants={{ rest: { y: 0 }, hover: { y: -4 } }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-paper"
              >
                <Link
                  href={`${path("products", locale)}?kategorija=${category.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`${t(category.name)} — ${count} ${productsLabel(count, locale)}`}
                />

                <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "var(--beige)" }}>
                  <motion.div
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={category.image}
                      alt={t(category.imageAlt)}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base leading-tight sm:text-lg" style={{ color: "var(--forest-deep)" }}>
                      {t(category.name)}
                    </h3>
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: category.accent }} aria-hidden />
                  </div>
                  <p className="text-xs leading-snug sm:text-sm" style={{ color: "var(--ink-soft)" }}>
                    {t(category.tagline)}
                  </p>
                  <div className="mt-auto flex flex-col items-start gap-1.5 pt-2 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
                    <span className="text-[11px] tabular-nums sm:text-xs" style={{ color: "var(--ink-soft)" }}>
                      {count} {productsLabel(count, locale)}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 border-b-2 border-forest pb-0.5 text-[11px] font-semibold uppercase tracking-wide text-forest transition-colors group-hover:border-pop group-hover:text-pop sm:text-xs">
                      {t(home.familiesView)}
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <CtaLink href={path("products", locale)} variant="secondary">
            {t(home.familiesAll)} ({products.length})
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
