"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { home } from "@/data/content";
import { useT } from "@/lib/locale";
import { SectionHeading } from "./SectionHeading";
import { ProductCard } from "./ProductCard";

export function ProductShowcase() {
  const t = useT();
  const [active, setActive] = useState<string>(categories[0].slug);
  const trackRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => products.filter((p) => p.category.slug === active), [active]);

  return (
    <section id="proizvodi" className="scroll-mt-20 py-20 sm:py-28" style={{ background: "var(--beige)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t(home.showcaseEyebrow)} title={t(home.showcaseTitle)} body={t(home.showcaseBody)} />

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => {
            const isActive = active === c.slug;
            return (
              <motion.button
                key={c.slug}
                type="button"
                onClick={() => {
                  setActive(c.slug);
                  trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                }}
                animate={{
                  backgroundColor: isActive ? "#1f3d2e" : "rgba(31,61,46,0)",
                  borderColor: isActive ? "#1f3d2e" : "#ddd2b8",
                  color: isActive ? "#f7f3ea" : "#262420",
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="shrink-0 rounded-full border px-4 py-2 text-sm font-medium"
              >
                {t(c.name)}
              </motion.button>
            );
          })}
        </div>

        <motion.div
          key={active}
          ref={trackRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        >
          {visible.map((product) => (
            <div key={product.slug} className="w-[78vw] shrink-0 snap-start sm:w-[320px]">
              <ProductCard product={product} className="h-full" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
