import Image from "next/image";
import { home } from "@/data/content";
import { ScrollReveal } from "./ScrollReveal";
import { Stats } from "./Stats";

export function BrandStory() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <ScrollReveal>
          <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
            {home.storyEyebrow.bs}
          </span>
          <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl" style={{ color: "var(--forest-deep)" }}>
            {home.storyTitle.bs}
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed sm:text-lg" style={{ color: "var(--ink-soft)" }}>
            <p>{home.storyBody1.bs}</p>
            <p>{home.storyBody2.bs}</p>
          </div>

          <div className="mt-12">
            <Stats
              items={[
                { value: home.statYears.value, label: home.statYears.label.bs },
                { value: home.statProducts.value, label: home.statProducts.label.bs },
                { value: home.statMarkets.value, label: home.statMarkets.label.bs },
              ]}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-auto">
          <Image
            src="/images/categories/prunes.jpg"
            alt="Sušeno voće Voćar"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
