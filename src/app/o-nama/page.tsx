import type { Metadata } from "next";
import Image from "next/image";
import { Leaf, Hammer, Gauge, HeartHandshake } from "lucide-react";
import { about, home } from "@/data/content";
import { categories } from "@/data/categories";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Stats } from "@/components/Stats";

export const metadata: Metadata = {
  title: "O nama",
  description: "Historija, misija i vrijednosti Voćar d.o.o. Brčko — proizvođača grickalica i prehrambenih proizvoda iz Gornjeg Rahića.",
  alternates: { canonical: "/o-nama" },
};

const VALUES = [
  { icon: Leaf, text: about.value1.bs },
  { icon: Hammer, text: about.value2.bs },
  { icon: Gauge, text: about.value3.bs },
  { icon: HeartHandshake, text: about.value4.bs },
];

export default function ONamaPage() {
  return (
    <>
      <section className="border-b px-5 py-16 sm:px-8 sm:py-24" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
            {about.eyebrow.bs}
          </span>
          <h1 className="mt-3 text-5xl sm:text-6xl" style={{ color: "var(--forest-deep)" }}>
            {about.title.bs}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <ScrollReveal className="flex flex-col gap-10">
            <div>
              <h2 className="text-3xl" style={{ color: "var(--forest-deep)" }}>
                {about.historyTitle.bs}
              </h2>
              <p className="mt-3 text-base leading-relaxed sm:text-lg" style={{ color: "var(--ink-soft)" }}>
                {about.historyBody.bs}
              </p>
            </div>
            <div>
              <h2 className="text-3xl" style={{ color: "var(--forest-deep)" }}>
                {about.missionTitle.bs}
              </h2>
              <p className="mt-3 text-base leading-relaxed sm:text-lg" style={{ color: "var(--ink-soft)" }}>
                {about.missionBody.bs}
              </p>
            </div>

            <Stats
              items={[
                { value: home.statYears.value, label: home.statYears.label.bs },
                { value: home.statProducts.value, label: home.statProducts.label.bs },
                { value: home.statMarkets.value, label: home.statMarkets.label.bs },
              ]}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/cover.jpg"
              alt="Voćar proizvodi"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-16 border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <h2 className="text-3xl" style={{ color: "var(--forest-deep)" }}>
            {about.valuesTitle.bs}
          </h2>
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

        <ScrollReveal className="mt-16 border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <p className="max-w-2xl text-base" style={{ color: "var(--ink-soft)" }}>
            {categories.length} porodica proizvoda, preko {home.statProducts.value} artikala — pogledajte cijeli asortiman na stranici Proizvodi.
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
