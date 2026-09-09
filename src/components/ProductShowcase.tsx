"use client";

import { useMemo, useRef, useState } from "react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { home } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { ProductCard } from "./ProductCard";

export function ProductShowcase() {
  const [active, setActive] = useState<string>(categories[0].slug);
  const trackRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => products.filter((p) => p.category.slug === active), [active]);

  return (
    <section className="py-20 sm:py-28" style={{ background: "var(--beige)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={home.showcaseEyebrow.bs} title={home.showcaseTitle.bs} body={home.showcaseBody.bs} />

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => {
                setActive(c.slug);
                trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
              }}
              className="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
              style={{
                borderColor: active === c.slug ? "var(--forest)" : "var(--line)",
                background: active === c.slug ? "var(--forest)" : "transparent",
                color: active === c.slug ? "var(--cream)" : "var(--ink)",
              }}
            >
              {c.name.bs}
            </button>
          ))}
        </div>

        <div ref={trackRef} className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {visible.map((product) => (
            <div key={product.slug} className="w-[78vw] shrink-0 snap-start sm:w-[320px]">
              <ProductCard product={product} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
