import Image from "next/image";
import { Leaf, Hammer, Gauge, HeartHandshake } from "lucide-react";
import { home, about } from "@/data/content";
import { ScrollReveal } from "./ScrollReveal";
import { Stats } from "./Stats";

const VALUES = [
  { icon: Leaf, text: about.value1.bs },
  { icon: Hammer, text: about.value2.bs },
  { icon: Gauge, text: about.value3.bs },
  { icon: HeartHandshake, text: about.value4.bs },
];

export function BrandStory() {
  return (
    <section id="o-nama" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <ScrollReveal>
          <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
            {home.storyEyebrow.bs}
          </span>
          <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl" style={{ color: "var(--forest-deep)" }}>
            {home.storyTitle.bs}
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed sm:text-lg" style={{ color: "var(--ink-soft)" }}>
            <p>{about.historyBody.bs}</p>
            <p>{about.missionBody.bs}</p>
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

      <ScrollReveal className="mt-16 border-t pt-12" style={{ borderColor: "var(--line)" }}>
        <h3 className="text-2xl" style={{ color: "var(--forest-deep)" }}>
          {about.valuesTitle.bs}
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.text} className="flex flex-col items-start gap-3 rounded-2xl border p-6" style={{ borderColor: "var(--line)" }}>
              <v.icon size={26} style={{ color: "var(--forest)" }} strokeWidth={1.5} />
              <span className="text-base font-medium" style={{ color: "var(--ink)" }}>
                {v.text}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
