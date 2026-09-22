"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { products, BADGE_ORDER } from "@/data/products";
import { TASTES, type TasteKey } from "@/data/tastes";
import { home, nav, productPage } from "@/data/content";
import { ChevronRight } from "lucide-react";
import { useLocale, useT } from "@/lib/locale";
import { productsLabel } from "@/lib/plural";
import { SectionHeading } from "./SectionHeading";
import { ProductCard } from "./ProductCard";

const ALL = "all";

/** The broad taste axes a shopper actually filters by; the finer tastes stay on the cards. */
const TASTE_FILTERS: TasteKey[] = ["slano", "slatko", "coko", "pikant"];

// "Sve" leads with badged products so the first screenful is the strongest.
const badgeRank = (badges: string[]) => {
  const idx = BADGE_ORDER.findIndex((b) => badges.includes(b));
  return idx === -1 ? BADGE_ORDER.length : idx;
};
const highlightedFirst = [...products].sort((a, b) => badgeRank(a.badges) - badgeRank(b.badges));

const countBySlug = new Map<string, number>();
for (const p of products) countBySlug.set(p.category.slug, (countBySlug.get(p.category.slug) ?? 0) + 1);

const CHIP_SPRING = { type: "spring", stiffness: 500, damping: 12 } as const;

// On mobile the chip rows scroll sideways; bring the tapped chip fully into view.
function revealChip(e: MouseEvent<HTMLButtonElement>) {
  e.currentTarget.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
}

function Chip({
  active,
  onClick,
  children,
  small = false,
}: {
  active: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  children: string;
  small?: boolean;
}) {
  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      animate={{
        backgroundColor: active ? "#1f3d2e" : "rgba(31,61,46,0)",
        borderColor: active ? "#1f3d2e" : "#ddd2b8",
        color: active ? "#f7f3ea" : "#262420",
        scale: 1,
      }}
      whileTap={{ scale: 0.88 }}
      transition={{
        backgroundColor: { duration: 0.25, ease: "easeInOut" },
        borderColor: { duration: 0.25, ease: "easeInOut" },
        color: { duration: 0.25, ease: "easeInOut" },
        scale: CHIP_SPRING,
      }}
      className={`shrink-0 rounded-full border font-medium ${small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}
    >
      {children}
    </motion.button>
  );
}

/** Horizontal scroller with a right-edge fade on mobile so it reads as "more this way". */
function ChipRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:pb-0" role="tablist" aria-label={label}>
        {children}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 md:hidden"
        style={{ background: "linear-gradient(to right, rgba(247,243,234,0), var(--cream))" }}
        aria-hidden
      />
    </div>
  );
}

const isCategory = (v: string | null): v is string => !!v && categories.some((c) => c.slug === v);
const isTaste = (v: string | null): v is TasteKey => !!v && (TASTE_FILTERS as string[]).includes(v);

/**
 * The full catalog: category chips, taste filter, every product. Lives on
 * /proizvodi. Filters are mirrored into ?kategorija= / ?ukus= so homepage
 * tiles and shared links land pre-filtered.
 */
export function ProductShowcase() {
  const t = useT();
  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [active, setActive] = useState<string>(() => (isCategory(params.get("kategorija")) ? params.get("kategorija")! : ALL));
  const [taste, setTaste] = useState<TasteKey | null>(() => (isTaste(params.get("ukus")) ? (params.get("ukus") as TasteKey) : null));
  const gridRef = useRef<HTMLDivElement>(null);

  // Keep the URL in step with the chips (replace, not push — filters aren't history).
  useEffect(() => {
    const next = new URLSearchParams();
    if (active !== ALL) next.set("kategorija", active);
    if (taste) next.set("ukus", taste);
    const qs = next.toString();
    const current = params.toString();
    if (qs !== current) router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [active, taste, pathname, params, router]);

  const matching = useMemo(() => {
    const byCategory = active === ALL ? highlightedFirst : products.filter((p) => p.category.slug === active);
    return taste ? byCategory.filter((p) => p.tastes.includes(taste)) : byCategory;
  }, [active, taste]);
  const visible = matching;

  const chips = [
    { slug: ALL, label: `${t(home.showcaseAll)} (${products.length})` },
    ...categories.map((c) => ({ slug: c.slug, label: `${t(c.name)} (${countBySlug.get(c.slug) ?? 0})` })),
  ];

  function scrollGridIntoView() {
    const grid = gridRef.current;
    if (grid && grid.getBoundingClientRect().top < 0) {
      grid.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  function selectChip(slug: string, e: MouseEvent<HTMLButtonElement>) {
    setActive(slug);
    revealChip(e);
    scrollGridIntoView();
  }

  function selectTaste(key: TasteKey, e: MouseEvent<HTMLButtonElement>) {
    setTaste((current) => (current === key ? null : key));
    revealChip(e);
    scrollGridIntoView();
  }

  function clearFilters() {
    setActive(ALL);
    setTaste(null);
  }

  const countLine = `${matching.length} ${productsLabel(matching.length, locale)}`;

  return (
    <section id="proizvodi" className="scroll-mt-20 py-12 sm:py-16" style={{ background: "var(--cream)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <nav aria-label={t(productPage.breadcrumbLabel)} className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm font-medium">
            <li>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/" className="hover:underline" style={{ color: "var(--forest)" }}>
                {t(nav.home)}
              </a>
            </li>
            <li aria-hidden style={{ color: "var(--ink-soft)" }}>
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" style={{ color: "var(--ink-soft)" }}>
              {t(nav.products)}
            </li>
          </ol>
        </nav>

        <SectionHeading eyebrow={t(home.showcaseEyebrow)} title={t(home.catalogPageTitle)} body={t(home.showcaseBody)} />

        <div
          className="sticky top-[76px] z-30 -mx-5 mt-10 flex flex-col gap-3 px-5 py-3 md:static md:mx-0 md:bg-transparent md:px-0 md:py-0"
          style={{ background: "var(--cream)" }}
        >
          <ChipRow label={t(home.showcaseTitle)}>
            {chips.map((chip) => (
              <Chip key={chip.slug} active={active === chip.slug} onClick={(e) => selectChip(chip.slug, e)}>
                {chip.label}
              </Chip>
            ))}
          </ChipRow>

          <div className="flex items-center gap-3">
            <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>
              {t(home.tasteFilterLabel)}
            </span>
            <div className="min-w-0 flex-1">
              <ChipRow label={t(home.tasteFilterLabel)}>
                {TASTE_FILTERS.map((key) => (
                  <Chip key={key} small active={taste === key} onClick={(e) => selectTaste(key, e)}>
                    {t(TASTES[key])}
                  </Chip>
                ))}
              </ChipRow>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm tabular-nums" style={{ color: "var(--ink-soft)" }} aria-live="polite">
          {countLine}
        </p>

        <motion.div
          key={`${active}-${taste ?? ""}`}
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

        {matching.length === 0 && (
          <div
            className="mt-2 flex flex-col items-center gap-4 rounded-2xl border border-dashed px-6 py-12 text-center"
            style={{ borderColor: "var(--line)" }}
          >
            <p className="text-base" style={{ color: "var(--ink-soft)" }}>
              {t(home.showcaseEmpty)}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full border border-forest px-5 py-2 text-xs font-semibold uppercase tracking-wide text-forest transition-colors hover:bg-forest hover:text-cream"
            >
              {t(home.showcaseClear)}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
