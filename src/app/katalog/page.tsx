import type { Metadata } from "next";
import { home } from "@/data/content";
import { categories } from "@/data/categories";
import { CatalogCTA } from "@/components/CatalogCTA";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Katalog",
  description: "Preuzmite kompletan Voćar katalog proizvoda — jedanaest porodica proizvoda, od suhog voća do kokica.",
  alternates: { canonical: "/katalog" },
};

export default function KatalogPage() {
  return (
    <>
      <section className="border-b px-5 py-16 sm:px-8 sm:py-24" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
            {home.catalogEyebrow.bs}
          </span>
          <h1 className="mt-3 text-5xl sm:text-6xl" style={{ color: "var(--forest-deep)" }}>
            {home.catalogTitle.bs}
          </h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            {home.catalogBody.bs}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <ScrollReveal>
          <ol className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {categories.map((c, i) => (
              <li key={c.slug} className="flex items-center justify-between gap-4 border-b py-3.5" style={{ borderColor: "var(--line)" }}>
                <span className="flex items-baseline gap-4">
                  <span className="text-xs font-mono" style={{ color: "var(--ink-soft)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg" style={{ color: "var(--ink)" }}>
                    {c.name.bs}
                  </span>
                </span>
                <span className="shrink-0 text-sm tabular-nums" style={{ color: "var(--forest)" }}>
                  {c.skus.length}
                </span>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </section>

      <CatalogCTA showHeading={false} />
    </>
  );
}
