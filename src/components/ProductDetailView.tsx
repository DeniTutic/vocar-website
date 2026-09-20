"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, Share2 } from "lucide-react";
import type { Product } from "@/data/products";
import { productPage, buy, nav } from "@/data/content";
import { bihRegions } from "@/data/whereToBuy";
import { useT } from "@/lib/locale";
import { ScrollReveal } from "./ScrollReveal";
import { ProductCard } from "./ProductCard";
import { ProductBadge, TasteChips } from "./ProductBadge";
import { CtaLink } from "./CtaLink";

/** Shows the sticky mobile bar once the buy block has scrolled off the top. */
function useBuyBlockPassed(ref: React.RefObject<HTMLDivElement | null>): boolean {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    let frame: number | null = null;
    const compute = () => {
      frame = null;
      const el = ref.current;
      setPassed(Boolean(el) && el!.getBoundingClientRect().bottom < 0);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return passed;
}

const CITIES = bihRegions.flatMap((r) => r.cities);

/** Native share sheet where it exists (phones), clipboard copy elsewhere. */
function ShareButton({ title }: { title: string }) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // User dismissed the sheet, or clipboard is unavailable — nothing to report.
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-live="polite"
      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide hover:underline"
      style={{ color: copied ? "var(--forest)" : "var(--ink-soft)" }}
    >
      {copied ? <Check size={14} /> : <Share2 size={14} />}
      {copied ? t(productPage.copied) : t(productPage.share)}
    </button>
  );
}

export function ProductDetailView({ product, related }: { product: Product; related: Product[] }) {
  const t = useT();
  const sizeOptions = product.sizeList.length ? product.sizeList : [t(productPage.sizeOnRequest)];
  const [size, setSize] = useState(sizeOptions[0]);
  const buyRef = useRef<HTMLDivElement>(null);
  const showStickyBar = useBuyBlockPassed(buyRef);
  const crumbClass = "hover:underline";
  const crumbStyle = { color: "var(--forest)" } as const;

  // Lands on the contact form in trade mode with the product pre-filled
  // (ContactForm reads ?proizvod/&pakovanje and the #distributer hash).
  const quoteHref = `/?proizvod=${encodeURIComponent(product.name.bs)}&pakovanje=${encodeURIComponent(size)}#distributer`;

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Plain <a>, not <Link>: the hash sections live on "/" and a real
            navigation is what reliably scrolls to them on load. */}
        <nav aria-label={t(productPage.breadcrumbLabel)}>
          <ol className="flex flex-wrap items-center gap-1 text-sm font-medium">
            <li>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/" className={crumbClass} style={crumbStyle}>
                {t(nav.home)}
              </a>
            </li>
            <li aria-hidden style={{ color: "var(--ink-soft)" }}>
              <ChevronRight size={14} />
            </li>
            <li>
              <Link href={`/proizvodi?kategorija=${product.category.slug}`} className={crumbClass} style={crumbStyle}>
                {t(product.category.name)}
              </Link>
            </li>
            <li aria-hidden style={{ color: "var(--ink-soft)" }}>
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" style={{ color: "var(--ink-soft)" }}>
              {t(product.name)}
            </li>
          </ol>
        </nav>

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
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                style={{ background: product.category.accent, color: "var(--paper)" }}
              >
                {t(productPage.categoryLabel)}: {t(product.category.name)}
              </span>
              {product.badges.map((badge) => (
                <ProductBadge key={badge} badge={badge} wiggle />
              ))}
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl" style={{ color: "var(--forest-deep)" }}>
              {t(product.name)}
            </h1>
            <p className="mt-3 text-lg font-medium leading-snug" style={{ color: "var(--forest)" }}>
              {t(product.flavor)}
            </p>
            <TasteChips tastes={product.tastes} className="mt-3" />
            <p className="mt-5 text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {t(product.description)}
            </p>

            <div ref={buyRef} className="mt-8 rounded-2xl border p-5" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--forest)" }}>
                  {t(productPage.sizesLabel)}
                </span>
                <ShareButton title={t(product.name)} />
              </div>
              <div role="radiogroup" aria-label={t(productPage.sizesLabel)} className="mt-3 flex flex-wrap gap-2">
                {sizeOptions.map((option) => {
                  const isActive = size === option;
                  return (
                    <motion.button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setSize(option)}
                      animate={{
                        backgroundColor: isActive ? "#1f3d2e" : "rgba(31,61,46,0)",
                        borderColor: isActive ? "#1f3d2e" : "#ddd2b8",
                        color: isActive ? "#f7f3ea" : "#262420",
                      }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="rounded-full border px-4 py-1.5 text-sm font-medium tabular-nums"
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaLink href="/#gdje-kupiti" variant="buy">
                  {t(buy.whereToBuy)}
                </CtaLink>
                <CtaLink href={quoteHref} variant="outline">
                  {t(buy.requestQuote)}
                </CtaLink>
              </div>
            </div>

            <dl className="mt-8 flex flex-col gap-5 border-t pt-6" style={{ borderColor: "var(--line)" }}>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--forest)" }}>
                  {t(productPage.compositionLabel)}
                </dt>
                <dd className="mt-1 text-base" style={{ color: "var(--ink)" }}>
                  {t(product.composition)}
                </dd>
              </div>
              {product.allergens && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--forest)" }}>
                    {t(productPage.allergensLabel)}
                  </dt>
                  <dd className="mt-1 text-base" style={{ color: "var(--ink)" }}>
                    {t(product.allergens)}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--forest)" }}>
                  {t(productPage.nutritionLabel)}
                </dt>
                <dd className="mt-1 text-sm italic" style={{ color: "var(--ink-soft)" }}>
                  {t(productPage.nutritionNote)}
                </dd>
              </div>
            </dl>

            <div className="mt-8 border-t pt-6" style={{ borderColor: "var(--line)" }}>
              <h2 className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--forest)" }}>
                {t(productPage.findBagTitle)}
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
                {t(productPage.findBagBody)}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {CITIES.map((city) => (
                  <li key={city} className="rounded-full border border-line px-2.5 py-1 text-xs text-ink">
                    {city}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm" style={{ color: "var(--ink-soft)" }}>
                {t(productPage.findBagAsk)}{" "}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href="/#kontakt" className="font-semibold hover:underline" style={{ color: "var(--forest)" }}>
                  {t(productPage.findBagAskLink)} →
                </a>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t px-5 py-16 sm:px-8 sm:py-20" style={{ borderColor: "var(--line)" }}>
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl" style={{ color: "var(--forest-deep)" }}>
              {t(productPage.siblingsTitle)} {t(product.category.name)}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} className="h-full" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spacer so the sticky bar never covers the last content on mobile. */}
      <div className="h-20 lg:hidden" aria-hidden />

      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden"
            style={{ borderColor: "var(--line)", background: "rgba(247,243,234,0.95)" }}
          >
            <CtaLink href="/#gdje-kupiti" variant="buy" className="flex-1">
              {t(buy.whereToBuy)}
            </CtaLink>
            <CtaLink href={quoteHref} variant="outline" className="flex-1">
              {t(buy.quoteShort)}
            </CtaLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
