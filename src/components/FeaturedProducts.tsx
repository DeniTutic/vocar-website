"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { products, type Product } from "@/data/products";
import { home, type Localized } from "@/data/content";
import { SectionHeading } from "./SectionHeading";

function findFlagship(categorySlug: string, nameIncludes: string): Product | undefined {
  return products.find(
    (p) => p.category.slug === categorySlug && p.name.toLowerCase().includes(nameIncludes.toLowerCase())
  );
}

const FLAGSHIP_CANDIDATES: { product: Product | undefined; badge: Localized }[] = [
  { product: findFlagship("peanut-butter", "kremasti 100"), badge: home.qualityBadge },
  { product: findFlagship("popcorn", "karamel"), badge: home.bestsellerBadge },
  { product: findFlagship("prunes", "čoko"), badge: home.favoriteBadge },
  { product: findFlagship("chips", "piletina"), badge: home.seasonalBadge },
];

const FLAGSHIPS = FLAGSHIP_CANDIDATES.filter(
  (f): f is { product: Product; badge: Localized } => Boolean(f.product)
);

function FeaturedRow({ product, badge, index }: { product: Product; badge: Localized; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const reversed = index % 2 === 1;

  return (
    <div ref={ref} className={`grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <motion.div style={{ y }} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>
      <div>
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
          style={{ background: "var(--forest)", color: "var(--cream)" }}
        >
          {badge.bs}
        </span>
        <h3 className="mt-4 text-4xl leading-tight sm:text-5xl" style={{ color: "var(--forest-deep)" }}>
          {product.name}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed sm:text-lg" style={{ color: "var(--ink-soft)" }}>
          {product.description}
        </p>
        <Link
          href={`/proizvodi/${product.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide"
          style={{ color: "var(--forest)" }}
        >
          {home.learnMore.bs}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading eyebrow={home.featuredEyebrow.bs} title={home.featuredTitle.bs} align="center" />
      <div className="mt-8 divide-y" style={{ borderColor: "var(--line)" }}>
        {FLAGSHIPS.map(({ product, badge }, i) => (
          <FeaturedRow key={product.slug} product={product} badge={badge} index={i} />
        ))}
      </div>
    </section>
  );
}
