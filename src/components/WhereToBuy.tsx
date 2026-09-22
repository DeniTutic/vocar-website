"use client";

import { Check } from "lucide-react";
import { home, buy, whereToBuyContent as copy } from "@/data/content";
import { exportCountries, retailers } from "@/data/whereToBuy";
import { DistributionMap } from "./DistributionMap";
import { useLocale, useT } from "@/lib/locale";
import { homeHash } from "@/lib/routes";
import { CtaLink } from "./CtaLink";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { track } from "@/lib/track";

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
  const { locale } = useLocale();
  const palletPoints = [copy.palletPoint1, copy.palletPoint2, copy.palletPoint3, copy.palletPoint4, copy.palletPoint5];

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

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <ScrollReveal
            className="flex h-full flex-col gap-8 rounded-3xl border p-8 sm:p-10"
            style={{ borderColor: "rgba(247,243,234,0.15)" }}
          >
            <div>
              <h3 className="text-3xl" style={{ color: "var(--cream)" }}>
                {t(copy.bagTitle)}
              </h3>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "rgba(247,243,234,0.75)" }}>
                {t(copy.bagBody)}{" "}
                <a href={homeHash("#kontakt", locale)} className="font-semibold hover:underline" style={{ color: "var(--cream)" }}>
                  {t(copy.bagLink)}
                </a>{" "}
                {t(copy.bagBodyAfter)}
              </p>
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

            <div className="mt-auto">
              <CtaLink href={homeHash("#kontakt", locale)} variant="outlineDark">
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
                <CtaLink href={homeHash("#distributer", locale)} variant="buy">
                  {t(buy.requestQuote)}
                </CtaLink>
                <CtaLink href="/files/vocar-katalog.pdf" download variant="outline" onClick={() => track({ name: "catalog_download", where: "gdje-kupiti" })}>
                  {t(home.catalogCta)}
                </CtaLink>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <DistributionMap />
      </div>
    </section>
  );
}
