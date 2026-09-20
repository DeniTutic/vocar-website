"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { products, type Product } from "@/data/products";
import { home, type Localized } from "@/data/content";
import { useT } from "@/lib/locale";
import { SectionHeading } from "./SectionHeading";
import { CtaLink } from "./CtaLink";
import { TasteChips } from "./ProductBadge";

function findFlagship(categorySlug: string, nameIncludes: string): Product | undefined {
  return products.find(
    (p) => p.category.slug === categorySlug && p.name.bs.toLowerCase().includes(nameIncludes.toLowerCase())
  );
}

// One flagship, not a second grid: the family tiles above already show the
// range, so this block is the single big-photo appetite moment. Swap the
// candidate seasonally (peanut butter "kremasti 100", Q Flips "kečap").
const FLAGSHIP_CANDIDATES: { product: Product | undefined; badge: Localized; color: string }[] = [
  { product: findFlagship("prunes", "čoko"), badge: home.favoriteBadge, color: "var(--plum)" },
];

const FLAGSHIPS = FLAGSHIP_CANDIDATES.filter(
  (f): f is { product: Product; badge: Localized; color: string } => Boolean(f.product)
);

function FeaturedRow({
  product,
  badge,
  color,
  index,
}: {
  product: Product;
  badge: Localized;
  color: string;
  index: number;
}) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const reversed = index % 2 === 1;

  return (
    <div ref={ref} className={`grid items-center gap-8 py-10 lg:grid-cols-2 lg:gap-12 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <motion.div style={{ y }} className="relative aspect-[16/10] max-h-[360px] overflow-hidden rounded-3xl">
        <Image
          src={product.image}
          alt={t(product.imageAlt)}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>
      <div>
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
          style={{ background: color, color: "var(--cream)" }}
        >
          {t(badge)}
        </span>
        <h3 className="mt-4 text-3xl leading-tight sm:text-4xl" style={{ color: "var(--forest-deep)" }}>
          {t(product.name)}
        </h3>
        <p className="mt-3 max-w-md text-lg leading-snug" style={{ color: "var(--ink)" }}>
          {t(product.flavor)}
        </p>
        <TasteChips tastes={product.tastes} className="mt-4" />
        <div className="mt-6">
          <CtaLink href={`/proizvodi/${product.slug}`} variant="secondary" size="sm">
            {t(home.viewProduct)} <span aria-hidden>→</span>
          </CtaLink>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  const t = useT();

  return (
    <section id="favoriti" className="scroll-mt-20 py-16 sm:py-20" style={{ background: "var(--beige)" }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={t(home.featuredEyebrow)} title={t(home.featuredTitle)} align="center" />
        <div className="mt-4 divide-y" style={{ borderColor: "var(--line)" }}>
          {FLAGSHIPS.map(({ product, badge, color }, i) => (
            <FeaturedRow key={product.slug} product={product} badge={badge} color={color} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
