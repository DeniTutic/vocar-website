"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { products, BADGE_ORDER } from "@/data/products";
import { home } from "@/data/content";
import { useLocale, useT } from "@/lib/locale";
import { productsLabel } from "@/lib/plural";
import { SectionHeading } from "./SectionHeading";
import { ProductCard } from "./ProductCard";

const ALL = "all";
const PREVIEW_COUNT = 9;

// "Sve" leads with badged products so the first screenful is the strongest.
const badgeRank = (badges: string[]) => {
  const idx = BADGE_ORDER.findIndex((b) => badges.includes(b));
  return idx === -1 ? BADGE_ORDER.length : idx;
};
const highlightedFirst = [...products].sort((a, b) => badgeRank(a.badges) - badgeRank(b.badges));

const CHIP_SPRING = { type: "spring", stiffness: 500, damping: 12 } as const;

export function ProductShowcase() {
  const t = useT();
  const { locale } = useLocale();
  const [active, setActive] = useState<string>(ALL);
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const matching = useMemo(
    () => (active === ALL ? highlightedFirst : products.filter((p) => p.category.slug === active)),
    [active]
  );
  const isCapped = active === ALL && !expanded && matching.length > PREVIEW_COUNT;
  const visible = isCapped ? matching.slice(0, PREVIEW_COUNT) : matching;

  const chips = [{ slug: ALL, label: t(home.showcaseAll) }, ...categories.map((c) => ({ slug: c.slug, label: t(c.name) }))];

  function selectChip(slug: string) {
    setActive(slug);
    setExpanded(false);
    const grid = gridRef.current;
    if (grid && grid.getBoundingClientRect().top < 0) {
      grid.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  const countLine = isCapped
    ? `${t(home.showcaseShowing)} ${visible.length} ${t(home.showcaseOf)} ${matching.length} ${productsLabel(matching.length, locale)}`
    : `${matching.length} ${productsLabel(matching.length, locale)}`;

  return (
    <section id="proizvodi" className="scroll-mt-20 py-20 sm:py-28" style={{ background: "var(--cream)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t(home.showcaseEyebrow)} title={t(home.showcaseTitle)} body={t(home.showcaseBody)} />

        <div className="sticky top-[76px] z-30 -mx-5 mt-10 px-5 py-3 md:static md:mx-0 md:bg-transparent md:px-0 md:py-0" style={{ background: "var(--cream)" }}>
          <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:pb-0" role="tablist" aria-label={t(home.showcaseTitle)}>
            {chips.map((chip) => {
              const isActive = active === chip.slug;
              return (
                <motion.button
                  key={chip.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectChip(chip.slug)}
                  animate={{
                    backgroundColor: isActive ? "#1f3d2e" : "rgba(31,61,46,0)",
                    borderColor: isActive ? "#1f3d2e" : "#ddd2b8",
                    color: isActive ? "#f7f3ea" : "#262420",
                    scale: isActive ? 1.04 : 1,
                  }}
                  whileTap={{ scale: 0.88 }}
                  transition={{
                    backgroundColor: { duration: 0.25, ease: "easeInOut" },
                    borderColor: { duration: 0.25, ease: "easeInOut" },
                    color: { duration: 0.25, ease: "easeInOut" },
                    scale: CHIP_SPRING,
                  }}
                  className="shrink-0 rounded-full border px-4 py-2 text-sm font-medium"
                >
                  {chip.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-sm tabular-nums" style={{ color: "var(--ink-soft)" }} aria-live="polite">
          {countLine}
        </p>

        <motion.div
          key={active}
          ref={gridRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 grid scroll-mt-[140px] grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3"
        >
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </motion.div>

        {isCapped && (
          <div className="mt-10 flex justify-center">
            <motion.button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center justify-center rounded-full bg-forest px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-forest-deep"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {t(home.showcaseShowAll)} ({matching.length})
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
