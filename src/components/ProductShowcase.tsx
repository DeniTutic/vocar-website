"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { m } from "framer-motion";
import { categories, legacyCategorySlugs } from "@/data/categories";
import { products } from "@/data/products";
import { TASTES, type TasteKey } from "@/data/tastes";
import { home, nav, productPage } from "@/data/content";
import { ChevronRight } from "lucide-react";
import { useLocale, useT } from "@/lib/locale";
import { path } from "@/lib/routes";
import { productsLabel } from "@/lib/plural";
import { SectionHeading } from "./SectionHeading";
import { ProductCard } from "./ProductCard";
import { ScrollToTopOnArrival } from "./ScrollToTopOnArrival";
import { CATALOG_PENDING_STYLE_ID } from "./CatalogPendingStyle";

const ALL = "all";

/** The broad taste axes a shopper actually filters by; the finer tastes stay on the cards. */
const TASTE_FILTERS: TasteKey[] = ["slano", "slatko", "coko", "pikant"];

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
    <m.button
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
    </m.button>
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
const resolveCategory = (v: string | null) => (v && legacyCategorySlugs[v]) || v;
const isTaste = (v: string | null): v is TasteKey => !!v && (TASTE_FILTERS as string[]).includes(v);

/**
 * The only part of the catalog that reads the query string. useSearchParams
 * opts its Suspense boundary out of static rendering, so it sits alone in a
 * boundary that renders nothing: the chips and the whole grid stay in the
 * prerendered HTML (the phone's LCP image is in the first card), and the
 * filters from ?kategorija= / ?ukus= are applied here before the first paint
 * after hydration.
 */
function FilterUrlSync({
  active,
  taste,
  onArrive,
}: {
  active: string;
  taste: TasteKey | null;
  onArrive: (active: string, taste: TasteKey | null) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  // The filters the URL asked for, until the parent's state has caught up;
  // syncing the URL from the stale "all" state would wipe the query.
  const expected = useRef<{ active: string; taste: TasteKey | null } | null>(null);

  useLayoutEffect(() => {
    const requested = resolveCategory(params.get("kategorija"));
    const ukus = params.get("ukus");
    const arrival = { active: isCategory(requested) ? requested : ALL, taste: isTaste(ukus) ? ukus : null };
    expected.current = arrival;
    onArrive(arrival.active, arrival.taste);
    // Arrival only: later query changes come from the chips themselves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the URL in step with the chips (replace, not push: filters aren't history).
  useEffect(() => {
    const arrival = expected.current;
    if (arrival) {
      if (arrival.active !== active || arrival.taste !== taste) return;
      expected.current = null;
    }
    const next = new URLSearchParams();
    if (active !== ALL) next.set("kategorija", active);
    if (taste) next.set("ukus", taste);
    const qs = next.toString();
    const current = params.toString();
    if (qs !== current) router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [active, taste, pathname, params, router]);

  return null;
}

/**
 * The full catalog: category chips, taste filter, every product. Lives on
 * /proizvodi. Filters are mirrored into ?kategorija= / ?ukus= so homepage
 * tiles and shared links land pre-filtered.
 */
export function ProductShowcase() {
  const t = useT();
  const { locale } = useLocale();
  const [active, setActive] = useState<string>(ALL);
  const [taste, setTaste] = useState<TasteKey | null>(null);
  // Bumped when a filtered URL is applied on arrival, so the chip rows mount
  // already showing it instead of animating over from "all".
  const [arrival, setArrival] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  function arrive(category: string, tasteKey: TasteKey | null) {
    if (category !== ALL || tasteKey) {
      setActive(category);
      setTaste(tasteKey);
      setArrival((n) => n + 1);
    }
    document.getElementById(CATALOG_PENDING_STYLE_ID)?.remove();
  }

  const matching = useMemo(() => {
    // "Sve" keeps the catalog order — every flips, then every popcorn, and so on.
    const byCategory = active === ALL ? products : products.filter((p) => p.category.slug === active);
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
      <ScrollToTopOnArrival />
      <Suspense fallback={null}>
        <FilterUrlSync active={active} taste={taste} onArrive={arrive} />
      </Suspense>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <nav aria-label={t(productPage.breadcrumbLabel)} className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm font-medium">
            <li>
              <a href={path("home", locale)} className="hover:underline" style={{ color: "var(--forest)" }}>
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
          key={arrival}
          data-catalog-results
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

        <p data-catalog-results className="mt-4 text-sm tabular-nums" style={{ color: "var(--ink-soft)" }} aria-live="polite">
          {countLine}
        </p>

        {/* Keyed so every filter change remounts it and replays the CSS fade
            (.catalog-grid-in), which also plays from the prerendered HTML. */}
        <div
          key={`${active}-${taste ?? ""}`}
          ref={gridRef}
          data-catalog-results
          className="catalog-grid-in mt-6 grid scroll-mt-[140px] grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3"
        >
          {visible.map((product, i) => (
            <ProductCard key={product.slug} product={product} aboveFold={i < 4} />
          ))}
        </div>

        {matching.length === 0 && (
          <div
            data-catalog-results
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
