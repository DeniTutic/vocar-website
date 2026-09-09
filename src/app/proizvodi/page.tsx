import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { home } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Proizvodi",
  description: "Kompletan asortiman Voćar proizvoda — suho voće, kikiriki, čips, flips, kokice, puter od kikirikija i još mnogo toga.",
  alternates: { canonical: "/proizvodi" },
};

export default function ProizvodiPage() {
  return (
    <>
      <section className="border-b px-5 py-16 sm:px-8 sm:py-24" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
            {home.showcaseEyebrow.bs}
          </span>
          <h1 className="mt-3 text-5xl sm:text-6xl" style={{ color: "var(--forest-deep)" }}>
            {home.showcaseTitle.bs}
          </h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            {home.showcaseBody.bs}
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="rounded-full border px-3.5 py-1.5 text-sm"
              style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}
            >
              {c.name.bs}
            </a>
          ))}
        </div>
      </section>

      {categories.map((category) => {
        const items = products.filter((p) => p.category.slug === category.slug);
        return (
          <section key={category.slug} id={category.slug} className="scroll-mt-20 border-b px-5 py-16 sm:px-8 sm:py-20" style={{ borderColor: "var(--line)" }}>
            <div className="mx-auto max-w-7xl">
              <SectionHeading eyebrow={`${items.length} proizvoda`} title={category.name.bs} body={category.description.bs} />
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((product, i) => (
                  <ScrollReveal key={product.slug} delay={Math.min(i, 4) * 0.05}>
                    <ProductCard product={product} className="h-full" />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
