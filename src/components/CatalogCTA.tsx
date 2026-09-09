import { Download } from "lucide-react";
import { home } from "@/data/content";
import { categories } from "@/data/categories";
import { ScrollReveal } from "./ScrollReveal";

export function CatalogCTA() {
  return (
    <section id="katalog" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <ol className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {categories.map((c, i) => (
              <li key={c.slug} className="flex items-center justify-between gap-4 border-b py-3" style={{ borderColor: "var(--line)" }}>
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

        <ScrollReveal delay={0.1} className="mt-14">
          <div
            className="flex flex-col items-center gap-6 rounded-3xl px-8 py-16 text-center"
            style={{ background: "var(--forest)", color: "var(--cream)" }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--amber)" }}>
              {home.catalogEyebrow.bs}
            </span>
            <h2 className="text-4xl sm:text-5xl">{home.catalogTitle.bs}</h2>
            <p className="max-w-md text-base opacity-85 sm:text-lg">{home.catalogBody.bs}</p>
            <a
              href="/files/vocar-katalog.pdf"
              download
              className="mt-2 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide"
              style={{ background: "var(--cream)", color: "var(--forest-deep)" }}
            >
              <Download size={16} />
              {home.catalogCta.bs}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
