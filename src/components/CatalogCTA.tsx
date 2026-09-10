"use client";

import { Download } from "lucide-react";
import { home } from "@/data/content";
import { useT } from "@/lib/locale";
import { ScrollReveal } from "./ScrollReveal";

export function CatalogCTA() {
  const t = useT();

  return (
    <section id="katalog" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div
            className="flex flex-col items-center gap-6 rounded-3xl px-8 py-16 text-center"
            style={{ background: "var(--forest)", color: "var(--cream)" }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--amber)" }}>
              {t(home.catalogEyebrow)}
            </span>
            <h2 className="text-4xl sm:text-5xl">{t(home.catalogTitle)}</h2>
            <p className="max-w-md text-base opacity-85 sm:text-lg">{t(home.catalogBody)}</p>
            <a
              href="/files/vocar-katalog.pdf"
              download
              className="mt-2 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide"
              style={{ background: "var(--cream)", color: "var(--forest-deep)" }}
            >
              <Download size={16} />
              {t(home.catalogCta)}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
