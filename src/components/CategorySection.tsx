"use client";

import Image from "next/image";
import type { Category } from "@/data/categories";
import { useLanguage } from "@/context/LanguageContext";
import { ProductChip } from "./ProductChip";

export function CategorySection({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const { t, locale } = useLanguage();
  const reversed = index % 2 === 1;

  return (
    <section
      id={category.slug}
      className="scroll-mt-20 border-b py-14 sm:py-20"
      style={{
        borderColor: "var(--line)",
        background: `color-mix(in srgb, ${category.accent} 7%, var(--paper))`,
      }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div
          className={`grid items-center gap-10 md:grid-cols-2 md:gap-14 ${
            reversed ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-sm">
            <Image
              src={category.image}
              alt={t(category.imageAlt)}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: category.accent, color: "#fffdf8" }}
            >
              {category.skus.length} {locale === "bs" ? "proizvoda" : "products"}
            </span>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl" style={{ color: category.accentDeep }}>
              {t(category.name)}
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {t(category.description)}
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {category.skus.map((sku, i) => (
                <ProductChip key={i} sku={sku} locale={locale} accent={category.accentDeep} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
