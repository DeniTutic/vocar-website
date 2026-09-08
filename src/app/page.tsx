"use client";

import Image from "next/image";
import Link from "next/link";
import { PopcornHero } from "@/components/PopcornHero";
import { ShelfGrid } from "@/components/ShelfGrid";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/data/dictionary";
import { categories, totalSkuCount } from "@/data/categories";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <section
        className="relative isolate flex min-h-[600px] flex-col justify-end overflow-hidden border-b sm:min-h-[680px]"
        style={{ borderColor: "var(--line)", background: "linear-gradient(180deg, #fdf7ea 0%, #f4e6c9 70%, #efdcb6 100%)" }}
      >
        <PopcornHero />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 pt-24 sm:px-8 sm:pb-20">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "var(--brand-red)", color: "var(--surface)" }}
          >
            {t(dictionary.home.heroEyebrow)}
          </span>
          <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[1.03] sm:text-7xl">
            {t(dictionary.home.heroTitle1)}
            <br />
            <span style={{ color: "var(--brand-red)" }}>{t(dictionary.home.heroTitle2)}</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            {t(dictionary.home.heroBody)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--brand-red)", color: "var(--surface)" }}
            >
              {t(dictionary.common.viewProducts)}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/60"
              style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
            >
              {t(dictionary.common.getInTouch)}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-10 flex flex-col gap-2 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-red)" }}>
            {t(dictionary.home.shelfEyebrow)}
          </span>
          <h2 className="text-3xl font-semibold sm:text-4xl">{t(dictionary.home.shelfTitle)}</h2>
        </div>
        <ShelfGrid />
      </section>

      <section className="border-y" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-2 md:items-center md:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-sm">
            <Image src="/images/cover.jpg" alt="Voćar snacks flatlay" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-red)" }}>
              {t(dictionary.home.introEyebrow)}
            </span>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{t(dictionary.home.introTitle)}</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {t(dictionary.home.introBody)}
            </p>
            <p className="mt-4 text-sm font-medium tabular-nums" style={{ color: "var(--ink-soft)" }}>
              {categories.length} {t(dictionary.common.categories)} · {totalSkuCount} {t(dictionary.common.skus)}
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--brand-red)" }}
            >
              {t(dictionary.home.introCta)}
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div
          className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-3xl p-10 sm:flex-row sm:items-center sm:justify-between sm:p-14"
          style={{ background: "var(--ink)", color: "var(--paper)" }}
        >
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">{t(dictionary.home.ctaTitle)}</h2>
            <p className="mt-3 max-w-md text-base opacity-80">{t(dictionary.home.ctaBody)}</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-full px-6 py-3 text-sm font-semibold"
            style={{ background: "var(--brand-red)", color: "var(--surface)" }}
          >
            {t(dictionary.home.ctaButton)}
          </Link>
        </div>
      </section>
    </>
  );
}
