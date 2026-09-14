"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { home, about } from "@/data/content";
import { useT } from "@/lib/locale";
import { CtaLink } from "./CtaLink";
import { ScrollReveal } from "./ScrollReveal";
import { Stats } from "./Stats";

export function StoryTeaser() {
  const t = useT();

  return (
    <section id="prica" className="scroll-mt-20 py-20 sm:py-28" style={{ background: "var(--cream)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
              {t(home.storyEyebrow)}
            </span>
            <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl" style={{ color: "var(--forest-deep)" }}>
              {t(home.storyTitle)}
            </h2>
            <p className="mt-6 text-base leading-relaxed sm:text-lg" style={{ color: "var(--ink-soft)" }}>
              {t(home.storyBody1)}
            </p>
            <div className="mt-8">
              <CtaLink href="/o-nama" variant="secondary">
                {t(home.storyTeaserCta)} <span aria-hidden>→</span>
              </CtaLink>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/images/categories/prunes.jpg"
              alt={t(about.driedFruitImageAlt)}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
              style={{ background: "linear-gradient(180deg, rgba(20,32,26,0) 0%, rgba(20,32,26,0.75) 100%)" }}
              aria-hidden
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display absolute bottom-6 left-6 right-6 text-2xl italic leading-snug sm:text-3xl"
              style={{ color: "var(--cream)" }}
            >
              {t(about.slogan)}
            </motion.p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-16 border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <Stats
            columns={4}
            items={[
              { value: home.statYears.value, label: t(home.statYears.label) },
              { value: home.statProducts.value, label: t(home.statProducts.label) },
              { value: home.statHappyFaces.value, label: t(home.statHappyFaces.label) },
              { value: home.statMarkets.value, label: t(home.statMarkets.label) },
            ]}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
