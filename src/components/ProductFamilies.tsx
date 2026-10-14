"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { home } from "@/data/content";
import { useLocale, useT } from "@/lib/locale";
import { path } from "@/lib/routes";
import { productsLabel } from "@/lib/plural";
import { SectionHeading } from "./SectionHeading";
import { CtaLink } from "./CtaLink";

const countBySlug = new Map<string, number>();
for (const p of products) countBySlug.set(p.category.slug, (countBySlug.get(p.category.slug) ?? 0) + 1);

// The row is rendered three times over; the middle copy is the real one and
// the outer two are runway, so scrolling never meets an end.
const COPIES = 3;

const N = categories.length;

/** Scroll offset that puts tile `k` at the row's start (its snap point). */
function tilePos(track: HTMLDivElement, k: number): number {
  const tiles = track.children;
  return (tiles[k] as HTMLElement).offsetLeft - (tiles[0] as HTMLElement).offsetLeft;
}

function nearestTile(track: HTMLDivElement): number {
  let best = 0;
  for (let k = 1; k < track.children.length; k++) {
    if (Math.abs(tilePos(track, k) - track.scrollLeft) < Math.abs(tilePos(track, best) - track.scrollLeft)) best = k;
  }
  return best;
}

// A silent hop to the same tile in another copy. Snapping is paused for the
// hop — otherwise the browser's snap correction can swallow the next tap.
function jumpTo(track: HTMLDivElement, k: number) {
  track.style.scrollSnapType = "none";
  track.scrollLeft = tilePos(track, k);
  requestAnimationFrame(() => {
    track.style.scrollSnapType = "";
  });
}

/** Back into the middle copy if the row has drifted into the runway. */
function recenter(track: HTMLDivElement) {
  const k = nearestTile(track);
  if (k < N) jumpTo(track, k + N);
  else if (k >= 2 * N) jumpTo(track, k - N);
}

function ArrowButton({ dir, onClick, label }: { dir: -1 | 1; onClick: () => void; label: string }) {
  const Icon = dir === -1 ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-paper transition-colors hover:bg-forest hover:text-cream"
      style={{ borderColor: "var(--forest-deep)", color: "var(--forest-deep)" }}
    >
      <Icon size={18} strokeWidth={1.75} />
    </button>
  );
}

/**
 * The homepage's product block: one round tile per family showing what's
 * inside the bag (popcorn, not the popcorn bag), in a row that loops
 * forever in both directions. Each tile opens /proizvodi filtered to that
 * family, where the packs live.
 */
export function ProductFamilies() {
  const t = useT();
  const { locale } = useLocale();
  const trackRef = useRef<HTMLDivElement>(null);

  // Where the last arrow tap is heading; taps made mid-glide stack onto it
  // instead of being measured from a half-finished scroll position.
  const targetRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    jumpTo(track, N);

    let settle: number | undefined;
    const onScroll = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        targetRef.current = null;
        recenter(track);
      }, 140);
    };
    const onResize = () => jumpTo(track, N + (nearestTile(track) % N));
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(settle);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function step(dir: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    let k = targetRef.current ?? nearestTile(track);
    // Out of runway (only after a long burst of taps): hop a copy back first.
    if (k + dir < 0 || k + dir >= COPIES * N) {
      k += dir > 0 ? -N : N;
      jumpTo(track, k);
    }
    targetRef.current = k + dir;
    track.scrollTo({ left: tilePos(track, k + dir), behavior: "smooth" });
  }

  const arrows = (
    <>
      <ArrowButton dir={-1} onClick={() => step(-1)} label={t(home.familiesPrev)} />
      <ArrowButton dir={1} onClick={() => step(1)} label={t(home.familiesNext)} />
    </>
  );

  const tiles = Array.from({ length: COPIES }, (_, copy) => categories.map((category) => ({ category, copy }))).flat();

  return (
    <section id="proizvodi" className="scroll-mt-20 overflow-hidden py-20 sm:py-28" style={{ background: "var(--cream)" }}>
      {/* grid-cols-1 = minmax(0,1fr): without it the column grows to the
          carousel's full scroll width and the copy runs off-screen. */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] lg:items-center lg:gap-12">
        <div className="flex flex-col items-start gap-8">
          <SectionHeading eyebrow={t(home.showcaseEyebrow)} title={t(home.showcaseTitle)} body={t(home.familiesBody)} />
          <div className="hidden lg:block">
            <CtaLink href={path("products", locale)} variant="secondary">
              {t(home.familiesAll)} ({products.length})
            </CtaLink>
          </div>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pt-3 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:gap-8 lg:px-0"
          >
            {tiles.map(({ category, copy }) => {
              const count = countBySlug.get(category.slug) ?? 0;
              // Only the middle copy is reachable by keyboard and screen readers.
              const runway = copy !== 1;
              return (
                <Link
                  key={`${copy}-${category.slug}`}
                  href={`${path("products", locale)}?kategorija=${category.slug}`}
                  aria-label={`${t(category.name)} — ${count} ${productsLabel(count, locale)}`}
                  aria-hidden={runway || undefined}
                  tabIndex={runway ? -1 : undefined}
                  className="group flex shrink-0 basis-[64%] snap-start flex-col items-center text-center sm:basis-[40%] lg:basis-[calc((100%-4rem)/3)]"
                >
                  <div className="relative w-full px-[8%]">
                    <div className="relative aspect-square overflow-hidden rounded-full ring-1 ring-black/5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:rotate-3">
                      <Image
                        src={category.ingredientImage}
                        alt={t(category.ingredientAlt)}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 36vw, 56vw"
                        className="object-cover"
                      />
                    </div>
                    {/* Soft floor shadow; it tightens as the tile lifts. */}
                    <div
                      aria-hidden
                      className="mx-auto mt-4 h-4 w-3/4 rounded-[50%] transition-transform duration-500 motion-safe:group-hover:scale-x-75"
                      style={{ background: "radial-gradient(closest-side, rgba(38,36,32,0.22), rgba(38,36,32,0))" }}
                    />
                  </div>
                  <h3
                    className="mt-3 text-lg leading-tight transition-colors group-hover:text-pop sm:text-xl"
                    style={{ color: "var(--forest-deep)" }}
                  >
                    {t(category.name)}
                  </h3>
                  <span className="mt-1 text-xs tabular-nums sm:text-sm" style={{ color: "var(--ink-soft)" }}>
                    {count} {productsLabel(count, locale)}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Desktop: arrows ride the sides of the row, level with the tiles. */}
          <div className="pointer-events-none absolute inset-x-0 top-[38%] hidden -translate-y-1/2 justify-between lg:-mx-6 lg:flex [&>*]:pointer-events-auto">
            {arrows}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 lg:hidden">
          <CtaLink href={path("products", locale)} variant="secondary" size="sm">
            {t(home.familiesAll)} ({products.length})
          </CtaLink>
          <div className="flex gap-2">{arrows}</div>
        </div>
      </div>
    </section>
  );
}
