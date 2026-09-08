"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/data/dictionary";
import { categories } from "@/data/categories";
import { CategorySection } from "@/components/CategorySection";

export default function ProductsPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="border-b px-5 py-14 sm:px-8 sm:py-20" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-6xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-red)" }}>
            {t(dictionary.products.heroEyebrow)}
          </span>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold sm:text-6xl">
            {t(dictionary.products.heroTitle)}
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            {t(dictionary.products.heroBody)}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ink-soft)" }}>
              {t(dictionary.products.jumpTo)}
            </span>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`#${category.slug}`}
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: `color-mix(in srgb, ${category.accent} 16%, var(--paper))`, color: category.accentDeep }}
              >
                {t(category.name)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {categories.map((category, index) => (
        <CategorySection key={category.slug} category={category} index={index} />
      ))}
    </>
  );
}
