"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/data/dictionary";
import { categories } from "@/data/categories";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="border-b px-5 py-14 sm:px-8 sm:py-20" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-red)" }}>
            {t(dictionary.about.heroEyebrow)}
          </span>
          <h1 className="mt-3 text-4xl font-semibold sm:text-6xl">{t(dictionary.about.heroTitle)}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div className="flex flex-col gap-5 text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            <p>{t(dictionary.about.p1)}</p>
            <p>{t(dictionary.about.p2)}</p>
            <p>{t(dictionary.about.p3)}</p>

            <blockquote
              className="mt-4 border-l-4 pl-5 font-display text-2xl italic"
              style={{ borderColor: "var(--brand-red)", color: "var(--ink)" }}
            >
              &ldquo;{t(dictionary.common.tagline)}&rdquo;
            </blockquote>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-sm">
            <Image
              src="/images/categories/peanut-butter.jpg"
              alt="Toast with Voćar peanut butter and jam"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 border-t pt-10 sm:grid-cols-3" style={{ borderColor: "var(--line)" }}>
          <Stat value={String(categories.length)} label={t(dictionary.about.statLabel1)} />
          <Stat value="2" label={t(dictionary.about.statLabel2)} />
          <Stat value="Voćar" label={t(dictionary.about.statLabel3)} />
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl font-semibold tabular-nums" style={{ color: "var(--brand-red)" }}>
        {value}
      </div>
      <div className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
        {label}
      </div>
    </div>
  );
}
