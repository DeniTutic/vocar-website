"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { dictionary } from "@/data/dictionary";
import { useLanguage } from "@/context/LanguageContext";

export function ShelfGrid() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/products#${category.slug}`}
          className="group flex flex-col justify-between gap-6 rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
          style={{ background: category.accent, color: "#fffdf8" }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
            {category.skus.length} {t(dictionary.common.skus)}
          </span>
          <span className="font-display text-lg font-semibold leading-tight">
            {t(category.name)}
          </span>
        </Link>
      ))}
    </div>
  );
}
