"use client";

import Image from "next/image";
import { Flame, CookingPot, Popcorn, Cylinder, Package, PaintBucket, Container, Boxes } from "lucide-react";
import { privateLabelPage as page } from "@/data/content";
import { useLocale, useT, type Locale } from "@/lib/locale";
import { homeHash } from "@/lib/routes";
import { CtaLink } from "./CtaLink";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

// Same order as page.capabilities.
const CAPABILITY_ICONS = [Flame, CookingPot, Popcorn, Cylinder, Package, PaintBucket, Container, Boxes];

/** Opens the homepage form in trade mode with a private label message filled in. */
function inquiryHref(locale: Locale) {
  return homeHash("?namjera=robna-marka#distributer", locale);
}

/** /robne-marke and /en/private-label: the owner's private label pitch. */
export function PrivateLabelView() {
  const t = useT();
  const { locale } = useLocale();
  const inquiry = inquiryHref(locale);

  return (
    <>
      <section className="py-14 sm:py-20" style={{ background: "var(--cream)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
              {t(page.eyebrow)}
            </span>
            <h1 className="mt-3 text-4xl leading-[1.05] sm:text-6xl" style={{ color: "var(--forest-deep)" }}>
              {t(page.title)}
            </h1>
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed sm:text-lg" style={{ color: "var(--ink-soft)" }}>
              {page.intro.map((p) => (
                <p key={p.bs}>{t(p)}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href={inquiry} variant="buy">
                {t(page.cta)}
              </CtaLink>
              <CtaLink href="#kapaciteti" variant="outline">
                {t(page.capabilitiesLink)}
              </CtaLink>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/about/vocar-pogon-video-poster.jpg"
              alt={t(page.imageAlt)}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[55%_50%]"
            />
          </ScrollReveal>
        </div>

        <ScrollReveal className="mx-auto mt-12 max-w-7xl px-5 sm:mt-16 sm:px-8">
          <dl
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border lg:grid-cols-4"
            style={{ borderColor: "var(--line)", background: "var(--line)" }}
          >
            {page.facts.map((fact) => (
              <div key={fact.label.bs} className="flex flex-col-reverse gap-1 p-5 sm:p-6" style={{ background: "var(--paper)" }}>
                <dt className="text-sm leading-snug" style={{ color: "var(--ink-soft)" }}>
                  {t(fact.label)}
                </dt>
                <dd className="font-display text-3xl font-semibold sm:text-4xl" style={{ color: "var(--forest-deep)" }}>
                  {t(fact.value)}
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </section>

      <section
        id="kapaciteti"
        className="scroll-mt-24 border-t py-20 sm:py-28"
        style={{ background: "var(--paper)", borderColor: "var(--line)" }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow={t(page.capabilitiesEyebrow)} title={t(page.capabilitiesTitle)} body={t(page.capabilitiesBody)} />
          <ScrollReveal className="mt-12">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.capabilities.map((item, i) => {
                const Icon = CAPABILITY_ICONS[i];
                return (
                  <li
                    key={item.title.bs}
                    className="flex flex-col gap-3 rounded-2xl border p-6"
                    style={{ background: "var(--cream)", borderColor: "var(--line)" }}
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full"
                      style={{ background: "var(--forest)", color: "var(--cream)" }}
                      aria-hidden
                    >
                      <Icon size={20} />
                    </span>
                    <h3 className="text-xl" style={{ color: "var(--forest-deep)" }}>
                      {t(item.title)}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                      {t(item.body)}
                    </p>
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 sm:py-28" style={{ background: "var(--forest-deep)" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow={t(page.developmentEyebrow)} title={t(page.developmentTitle)} body={t(page.developmentBody)} dark />
          <ScrollReveal className="mt-12">
            <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {page.developmentSteps.map((step, i) => (
                <li key={step.title.bs} className="flex gap-4 border-t pt-5" style={{ borderColor: "rgba(247,243,234,0.18)" }}>
                  <span className="font-display text-3xl font-semibold tabular-nums" style={{ color: "var(--amber)" }} aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl" style={{ color: "var(--cream)" }}>
                      {t(step.title)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed sm:text-base" style={{ color: "rgba(247,243,234,0.75)" }}>
                      {t(step.body)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 sm:py-28" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <SectionHeading eyebrow={t(page.partnerEyebrow)} title={t(page.partnerTitle)} align="center" />
          <ScrollReveal className="mt-6 flex flex-col gap-4 text-base leading-relaxed sm:text-lg" style={{ color: "var(--ink-soft)" }}>
            {page.partnerBody.map((p) => (
              <p key={p.bs}>{t(p)}</p>
            ))}
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-12 font-display text-3xl font-semibold leading-tight text-balance sm:text-5xl" style={{ color: "var(--pop)" }}>
              {t(page.tagline)}
            </p>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed" style={{ color: "var(--ink)" }}>
              {t(page.ctaBody)}
            </p>
            <div className="mt-8">
              <CtaLink href={inquiry} variant="buy">
                {t(page.cta)}
              </CtaLink>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
