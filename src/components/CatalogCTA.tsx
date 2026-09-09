import { Download } from "lucide-react";
import { home } from "@/data/content";
import { ScrollReveal } from "./ScrollReveal";

export function CatalogCTA({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <ScrollReveal className="mx-auto max-w-3xl">
        <div
          className="flex flex-col items-center gap-6 rounded-3xl px-8 py-16 text-center"
          style={{ background: "var(--forest)", color: "var(--cream)" }}
        >
          {showHeading && (
            <>
              <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--amber)" }}>
                {home.catalogEyebrow.bs}
              </span>
              <h2 className="text-4xl sm:text-5xl">{home.catalogTitle.bs}</h2>
              <p className="max-w-md text-base opacity-85 sm:text-lg">{home.catalogBody.bs}</p>
            </>
          )}
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
    </section>
  );
}
