"use client";

import Image from "next/image";
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
    <section id="o-nama" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
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
                { value: home.statMarkets.value, label: t(home.statMarkets.label) },
              ]}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-auto">
          <Image
            src="/images/categories/prunes.jpg"
            alt={t(about.driedFruitImageAlt)}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
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
    </section>
  );
}
