"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import type { Product } from "@/data/products";
import { home, productPage } from "@/data/content";
import { useLocale, useT } from "@/lib/locale";
import { productPath } from "@/lib/routes";
import { ProductBadge } from "./ProductBadge";

export function ProductCard({
  product,
  className = "",
  aboveFold = false,
}: {
  product: Product;
  className?: string;
  /** First row of a grid: skip lazy loading, since a phone's LCP image is here. */
  aboveFold?: boolean;
}) {
  const t = useT();
  const { locale } = useLocale();
  const sizes = product.sizeList.length ? product.sizeList.join(" · ") : t(productPage.sizeOnRequest);

  return (
    <m.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{ rest: { y: 0, rotate: 0 }, hover: { y: -6, rotate: -1 } }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper ${className}`}
    >
      <Link href={productPath(product.slug, locale)} className="absolute inset-0 z-10" aria-label={t(product.name)} />

      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "var(--beige)" }}>
        <m.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
            alt={t(product.imageAlt)}
            fill
            sizes="(min-width: 768px) 33vw, 50vw"
            loading={aboveFold ? "eager" : "lazy"}
            fetchPriority={aboveFold ? "high" : undefined}
            className="object-cover"
          />
        </m.div>
        {product.badges.length > 0 && (
          <div className="absolute right-2 top-2 flex flex-col items-end gap-1">
            {product.badges.slice(0, 2).map((badge) => (
              <ProductBadge key={badge} badge={badge} className="shadow-sm" />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-5">
        <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: product.category.accent }} aria-hidden />
          {t(product.category.name)}
        </span>
        <h3 className="text-base leading-tight sm:text-xl" style={{ color: "var(--forest-deep)" }}>
          {t(product.name)}
        </h3>
        <p className="line-clamp-2 text-xs leading-snug sm:text-sm" style={{ color: "var(--ink-soft)" }}>
          {t(product.flavor)}
        </p>
        <div className="mt-auto flex flex-col items-start gap-1.5 pt-2 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
          <span className="text-[11px] tabular-nums sm:text-xs" style={{ color: "var(--ink-soft)" }}>
            {sizes}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 border-b-2 border-forest pb-0.5 text-[11px] font-semibold uppercase tracking-wide text-forest transition-colors group-hover:border-pop group-hover:text-pop sm:text-xs">
            {t(home.viewProduct)}
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </m.div>
  );
}
