"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { home } from "@/data/content";
import { useT } from "@/lib/locale";

export function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  const t = useT();

  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white ${className}`}
      style={{ borderColor: "var(--line)" }}
    >
      <Link
        href={`/proizvodi/${product.slug}`}
        className="absolute inset-0 z-10"
        aria-label={t(product.name)}
      />
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "var(--beige)" }}>
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
            alt={t(product.imageAlt)}
            fill
            sizes="(min-width: 1024px) 320px, 80vw"
            className="object-cover"
          />
        </motion.div>
        <span
          className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
          style={{ background: "var(--cream)", color: "var(--forest)" }}
        >
          {t(product.category.name)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-2xl leading-tight" style={{ color: "var(--forest-deep)" }}>
          {t(product.name)}
        </h3>
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
          {product.sizes}
        </p>
        <span
          className="mt-auto inline-flex w-fit items-center gap-2 border-b pb-0.5 text-sm font-semibold uppercase tracking-wide"
          style={{ borderColor: "var(--forest)", color: "var(--forest)" }}
        >
          {t(home.viewProduct)}
          <span aria-hidden>→</span>
        </span>
      </div>
    </motion.div>
  );
}
