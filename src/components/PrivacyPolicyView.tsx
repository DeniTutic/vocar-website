"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { privacyPage, nav } from "@/data/content";
import { useT } from "@/lib/locale";
import { CtaLink } from "./CtaLink";
import { ScrollReveal } from "./ScrollReveal";

export function PrivacyPolicyView() {
  const t = useT();

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium"
        style={{ color: "var(--forest)" }}
      >
        <ArrowLeft size={16} />
        {t(nav.home)}
      </Link>

      <ScrollReveal className="mt-8">
        <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
          {t(privacyPage.eyebrow)}
        </span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl" style={{ color: "var(--forest-deep)" }}>
          {t(privacyPage.title)}
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--ink-soft)" }}>
          {t(privacyPage.updated)}
        </p>
        <p className="mt-6 text-base leading-relaxed sm:text-lg" style={{ color: "var(--ink)" }}>
          {t(privacyPage.intro)}
        </p>
      </ScrollReveal>

      <div className="mt-12 flex flex-col gap-8 border-t pt-10" style={{ borderColor: "var(--line)" }}>
        {privacyPage.sections.map((section, i) => (
          <ScrollReveal key={section.title.bs} delay={Math.min(i * 0.05, 0.3)}>
            <h2 className="text-xl sm:text-2xl" style={{ color: "var(--forest-deep)" }}>
              {t(section.title)}
            </h2>
            <p className="mt-2 text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {t(section.body)}
            </p>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal
        className="mt-12 rounded-2xl border p-5 text-sm leading-relaxed"
        style={{ borderColor: "var(--line)", color: "var(--ink-soft)", background: "var(--beige)" }}
      >
        {t(privacyPage.disclaimer)}
      </ScrollReveal>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <span className="text-base" style={{ color: "var(--ink)" }}>
          {t(privacyPage.contactCta)}
        </span>
        <CtaLink href="mailto:sales@vocar.ba" variant="secondary" size="sm">
          sales@vocar.ba
        </CtaLink>
      </div>
    </section>
  );
}
