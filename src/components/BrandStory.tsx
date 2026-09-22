"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Hammer, Gauge, HeartHandshake } from "lucide-react";
import { home, about } from "@/data/content";
import { useT } from "@/lib/locale";
import { ScrollReveal } from "./ScrollReveal";
import { Stats } from "./Stats";

const VALUES = [
  { icon: Leaf, text: about.value1, desc: about.value1Desc },
  { icon: Hammer, text: about.value2, desc: about.value2Desc },
  { icon: Gauge, text: about.value3, desc: about.value3Desc },
  { icon: HeartHandshake, text: about.value4, desc: about.value4Desc },
];

export function BrandStory() {
  const t = useT();

  return (
    <section id="o-nama" className="scroll-mt-20 py-20 sm:py-28" style={{ background: "var(--beige)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
              {t(home.storyEyebrow)}
            </span>
            <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl" style={{ color: "var(--forest-deep)" }}>
              {t(home.storyTitle)}
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed sm:text-lg" style={{ color: "var(--ink-soft)" }}>
              <p>{t(about.historyBody)}</p>
              <p>{t(about.missionBody)}</p>
            </div>

            <div className="mt-12">
              <Stats
                items={[
                  { value: home.statYears.value, label: t(home.statYears.label) },
                  { value: home.statProducts.value, label: t(home.statProducts.label) },
                  { value: home.statHappyFaces.value, label: t(home.statHappyFaces.label) },
                  { value: home.statMarkets.value, label: t(home.statMarkets.label) },
                ]}
              />
            </div>
          </ScrollReveal>

          {/* A real photo of the plant and the range, not another packshot —
              the one thing the rest of the page can't show. The director's
              words sit in a card that overlaps it, so the two read as one
              piece instead of a caption under a picture. */}
          <ScrollReveal delay={0.15} className="relative self-start">
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl sm:aspect-[4/3] lg:aspect-[5/6]">
              <Image
                src="/images/about/vocar-pogon.jpg"
                alt={t(about.plantImageAlt)}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[68%_28%]"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                style={{ background: "linear-gradient(180deg, rgba(20,32,26,0) 0%, rgba(20,32,26,0.45) 100%)" }}
                aria-hidden
              />
            </div>

            <motion.figure
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 -mt-6 ml-4 mr-4 rounded-2xl border p-6 shadow-lg sm:-mt-8 sm:ml-10 sm:mr-6 sm:p-7"
              style={{ borderColor: "var(--line)", background: "var(--paper)" }}
            >
              <span
                aria-hidden
                className="font-display block text-6xl leading-[0.7] sm:text-7xl"
                style={{ color: "var(--amber)" }}
              >
                &ldquo;
              </span>
              <blockquote className="font-display mt-2 text-xl italic leading-snug sm:text-2xl" style={{ color: "var(--forest-deep)" }}>
                {t(about.quote)}
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="h-px w-8 shrink-0" style={{ background: "var(--amber)" }} aria-hidden />
                <span className="text-sm leading-tight" style={{ color: "var(--ink-soft)" }}>
                  <span className="block font-semibold" style={{ color: "var(--ink)" }}>
                    {t(about.quoteAuthor)}
                  </span>
                  {t(about.quoteRole)}
                </span>
              </figcaption>
            </motion.figure>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-16 border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <h3 className="text-2xl" style={{ color: "var(--forest-deep)" }}>
            {t(about.valuesTitle)}
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.text.bs}
                className="group flex flex-col items-start gap-3 rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: "var(--line)", background: "var(--cream)" }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-[var(--forest)]"
                  style={{ background: "rgba(31,61,46,0.08)" }}
                >
                  <v.icon
                    size={24}
                    className="transition-colors duration-300 group-hover:text-[var(--cream)]"
                    style={{ color: "var(--forest)" }}
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-base font-semibold" style={{ color: "var(--ink)" }}>
                  {t(v.text)}
                </span>
                <span className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {t(v.desc)}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
