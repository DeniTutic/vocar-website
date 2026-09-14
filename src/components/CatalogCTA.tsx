"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { home } from "@/data/content";
import { useT } from "@/lib/locale";
import { ScrollReveal } from "./ScrollReveal";
import { CtaLink } from "./CtaLink";
import { WIGGLE } from "./ProductBadge";

export function CatalogCTA() {
  const t = useT();

  return (
    <section id="katalog" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28" style={{ background: "var(--cream)" }}>
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          {/* Styled like a snack pack: dashed crimp lines top and bottom, red seal in the corner. */}
          <div
            className="relative flex flex-col items-center gap-6 rounded-[28px] border-2 border-dashed px-8 py-14 text-center shadow-lg"
            style={{ borderColor: "var(--amber)", background: "var(--paper)", color: "var(--forest-deep)" }}
          >
            <div className="pointer-events-none absolute inset-x-6 top-3 h-px border-t border-dashed" style={{ borderColor: "var(--line)" }} aria-hidden />
            <div className="pointer-events-none absolute inset-x-6 bottom-3 h-px border-t border-dashed" style={{ borderColor: "var(--line)" }} aria-hidden />

            <motion.div
              className="absolute -right-3 -top-4 flex h-20 w-20 rotate-[-12deg] cursor-default items-center justify-center rounded-full text-center text-[11px] font-bold uppercase leading-tight shadow-md"
              style={{ background: "var(--pop)", color: "var(--cream)" }}
              {...WIGGLE}
            >
              {t(home.catalogSeal)}
            </motion.div>

            <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
              {t(home.catalogEyebrow)}
            </span>
            <h2 className="text-4xl sm:text-5xl">{t(home.catalogTitle)}</h2>
            <p className="max-w-md text-base sm:text-lg" style={{ color: "var(--ink-soft)" }}>
              {t(home.catalogBody)}
            </p>
            <CtaLink href="/files/vocar-katalog.pdf" download variant="buy" className="mt-2">
              <Download size={16} />
              {t(home.catalogCta)}
            </CtaLink>
            <span className="text-xs" style={{ color: "var(--ink-soft)" }}>
              {t(home.catalogSize)}
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
