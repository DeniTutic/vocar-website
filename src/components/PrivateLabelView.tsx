"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Flame, CookingPot, Cylinder, Popcorn, Nut, Package, PaintBucket, Container, Check } from "lucide-react";
import { privateLabelPage as page, type PrivateLabelService } from "@/data/content";
import { useLocale, useT, type Locale } from "@/lib/locale";
import { homeHash } from "@/lib/routes";
import { CtaLink } from "./CtaLink";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

// Same order as page.manufacturing and page.packaging.
const MANUFACTURING_ICONS: LucideIcon[] = [Flame, CookingPot, Nut, Cylinder, Popcorn];
const PACKAGING_ICONS: LucideIcon[] = [Package, PaintBucket, Container];

/** Opens the homepage form in trade mode with a private label message filled in. */
function inquiryHref(locale: Locale) {
  return homeHash("?namjera=robna-marka#distributer", locale);
}

/**
 * One service card. Manufacturing lists are short names (nuts, grains), so
 * they read as chips; packaging lists are whole phrases, so they read as
 * checked lines. Compact cards put the icon beside the title to stay short.
 */
function ServiceCard({
  service,
  icon: Icon,
  list,
  compact = false,
  className = "",
}: {
  service: PrivateLabelService;
  icon: LucideIcon;
  list: "chips" | "lines";
  compact?: boolean;
  className?: string;
}) {
  const t = useT();
  const badge = (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
      style={{ background: "var(--forest)", color: "var(--cream)" }}
      aria-hidden
    >
      <Icon size={20} />
    </span>
  );
  const title = (
    <h3 className="text-xl" style={{ color: "var(--forest-deep)" }}>
      {t(service.title)}
    </h3>
  );
  return (
    <li
      className={`flex flex-col rounded-2xl border ${compact ? "gap-2.5 p-5" : "gap-3 p-6"} ${className}`}
      style={{ background: "var(--cream)", borderColor: "var(--line)" }}
    >
      {compact ? (
        <div className="flex items-center gap-3">
          {badge}
          {title}
        </div>
      ) : (
        <>
          {badge}
          {title}
        </>
      )}
      {service.intro && (
        <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          {t(service.intro)}
        </p>
      )}
      {service.items &&
        (list === "chips" ? (
          // rounded-2xl rather than -full: one-line chips still read as
          // pills, and a chip that wraps becomes a rounded box, not a blob.
          <ul className="flex flex-wrap gap-1.5">
            {service.items.map((item) => (
              <li
                key={item.bs}
                className="rounded-2xl border px-3 py-1 text-[13px] leading-snug"
                style={{ borderColor: "var(--line)", background: "var(--paper)", color: "var(--ink)" }}
              >
                {t(item)}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex flex-col gap-2">
            {service.items.map((item) => (
              <li key={item.bs} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: "var(--forest)" }} aria-hidden />
                {t(item)}
              </li>
            ))}
          </ul>
        ))}
      {service.note && (
        <p className="mt-auto border-t pt-3 text-sm leading-relaxed" style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}>
          {t(service.note)}
        </p>
      )}
    </li>
  );
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
            <p className="mt-6 text-base leading-relaxed sm:text-lg" style={{ color: "var(--ink-soft)" }}>
              {t(page.intro)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href={inquiry} variant="buy">
                {t(page.cta)}
              </CtaLink>
              <CtaLink href="#proizvodnja" variant="outline">
                {t(page.manufacturingLink)}
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
        id="proizvodnja"
        className="scroll-mt-24 border-t py-20 sm:py-28"
        style={{ background: "var(--paper)", borderColor: "var(--line)" }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow={t(page.manufacturingEyebrow)} title={t(page.manufacturingTitle)} body={t(page.manufacturingBody)} />
          <ScrollReveal className="mt-12">
            {/* Row one: the three nut services (roasting, frying, nut butter),
                each a third. Row two: extrusion and popcorn, half each and
                compact. On tablets nut butter takes a full row of its own. */}
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              {page.manufacturing.map((service, i) => (
                <ServiceCard
                  key={service.title.bs}
                  service={service}
                  icon={MANUFACTURING_ICONS[i]}
                  list="chips"
                  compact={i > 2}
                  className={i < 2 ? "lg:col-span-2" : i === 2 ? "md:col-span-2 lg:col-span-2" : "lg:col-span-3"}
                />
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t py-20 sm:py-28" style={{ background: "var(--cream)", borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow={t(page.packagingEyebrow)} title={t(page.packagingTitle)} body={t(page.packagingBody)} />
          <ScrollReveal className="mt-12">
            <ul className="grid gap-4 md:grid-cols-3">
              {page.packaging.map((service, i) => (
                <ServiceCard key={service.title.bs} service={service} icon={PACKAGING_ICONS[i]} list="lines" />
              ))}
            </ul>
            <p className="mt-8 text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {t(page.packagingNote)}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 sm:py-28" style={{ background: "var(--forest-deep)" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow={t(page.developmentEyebrow)} title={t(page.developmentTitle)} body={t(page.developmentBody)} dark />
          <ScrollReveal className="mt-12">
            <ol className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {page.developmentSteps.map((step, i) => (
                <li key={step.bs} className="flex items-baseline gap-4 border-t pt-5" style={{ borderColor: "rgba(247,243,234,0.18)" }}>
                  <span className="font-display text-3xl font-semibold tabular-nums" style={{ color: "var(--amber)" }} aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl" style={{ color: "var(--cream)" }}>
                    {t(step)}
                  </h3>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 sm:py-28" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <SectionHeading eyebrow={t(page.partnerEyebrow)} title={t(page.partnerTitle)} align="center" />
          <ScrollReveal className="mt-6 text-base leading-relaxed sm:text-lg" style={{ color: "var(--ink-soft)" }}>
            <p>{t(page.partnerBody)}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-12 font-display text-3xl font-semibold leading-tight text-balance sm:text-5xl" style={{ color: "var(--pop)" }}>
              {t(page.tagline)}
            </p>
            <div className="mt-10">
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
