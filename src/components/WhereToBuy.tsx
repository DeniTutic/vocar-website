"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { home, buy, whereToBuyContent as copy } from "@/data/content";
import { bihRegions, exportCountries, retailers } from "@/data/whereToBuy";
import { useT } from "@/lib/locale";
import { CtaLink } from "./CtaLink";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

const COUNT = String(exportCountries.length);

function Pill({ children }: { children: string }) {
  return (
    <li
      className="rounded-full border px-3 py-1 text-sm"
      style={{ borderColor: "rgba(247,243,234,0.2)", background: "rgba(247,243,234,0.1)", color: "var(--cream)" }}
    >
      {children}
    </li>
  );
}

function GroupLabel({ children }: { children: string }) {
  return (
    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--amber)" }}>
      {children}
    </span>
  );
}

export function WhereToBuy() {
  const t = useT();
  const palletPoints = [copy.palletPoint1, copy.palletPoint2, copy.palletPoint3];

  return (
    <section id="gdje-kupiti" className="scroll-mt-20 py-20 sm:py-28" style={{ background: "var(--forest-deep)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t(copy.eyebrow)}
          title={t(copy.title)}
          body={t(copy.body).replace("{count}", COUNT)}
          align="center"
          dark
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <ScrollReveal className="flex flex-col gap-8">
            <div>
              <h3 className="text-3xl" style={{ color: "var(--cream)" }}>
                {t(copy.bagTitle)}
              </h3>
              <p className="mt-2 text-base" style={{ color: "rgba(247,243,234,0.7)" }}>
                {t(copy.bagBody)}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {bihRegions.map((region) => (
                <div key={region.name.bs} className="flex flex-col gap-2">
                  <GroupLabel>{t(region.name)}</GroupLabel>
                  <ul className="flex flex-wrap gap-2">
                    {region.cities.map((city) => (
                      <Pill key={city}>{city}</Pill>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 border-t pt-6" style={{ borderColor: "rgba(247,243,234,0.15)" }}>
              <GroupLabel>{t(copy.exportTitle)}</GroupLabel>
              <ul className="flex flex-wrap gap-2">
                {exportCountries.map((market) => (
                  <Pill key={market.label.bs}>{t(market.label)}</Pill>
                ))}
              </ul>
              <Link
                href="/o-nama#trzista"
                className="mt-1 w-fit text-sm font-semibold uppercase tracking-wide hover:underline"
                style={{ color: "var(--amber)" }}
              >
                {t(copy.mapLink)} →
              </Link>
            </div>

            {retailers.length > 0 && (
              <div className="flex flex-col gap-2 border-t pt-6" style={{ borderColor: "rgba(247,243,234,0.15)" }}>
                <GroupLabel>{t(copy.retailersTitle)}</GroupLabel>
                <ul className="flex flex-wrap gap-2">
                  {retailers.map((r) => (
                    <Pill key={r.name}>{r.name}</Pill>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <CtaLink href="/#kontakt" variant="outlineDark">
                {t(buy.askUs)}
              </CtaLink>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div
              id="distributeri"
              className="flex h-full flex-col rounded-3xl p-8 sm:p-10"
              style={{ background: "var(--cream)", color: "var(--forest-deep)" }}
            >
              <h3 className="text-3xl">{t(copy.palletTitle)}</h3>
              <p className="mt-2 text-base" style={{ color: "var(--ink-soft)" }}>
                {t(copy.palletBody)}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {palletPoints.map((point) => (
                  <li key={point.bs} className="flex items-start gap-3 text-sm" style={{ color: "var(--ink)" }}>
                    <Check size={18} className="mt-0.5 shrink-0" style={{ color: "var(--forest)" }} />
                    {t(point).replace("{count}", COUNT)}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CtaLink href="/#distributer" variant="buy">
                  {t(buy.requestQuote)}
                </CtaLink>
                <CtaLink href="/files/vocar-katalog.pdf" download variant="outline" size="sm">
                  {t(home.catalogCta)}
                </CtaLink>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
