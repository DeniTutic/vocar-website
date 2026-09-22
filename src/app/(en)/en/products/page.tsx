import type { Metadata } from "next";
import { Suspense } from "react";
import { home } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ScrollToTopOnArrival } from "@/components/ScrollToTopOnArrival";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  key: "products",
  title: home.catalogPageTitle.en,
  description: home.catalogPageDescription.en,
});

export default function ProductsPageEn() {
  // Same Suspense shape as the Bosnian catalog: useSearchParams needs the
  // boundary, and the tall fallback keeps the footer from flashing.
  return (
    <Suspense
      fallback={
        <section className="min-h-[80vh] py-12 sm:py-16" style={{ background: "var(--cream)" }} aria-busy>
          <ScrollToTopOnArrival />
        </section>
      }
    >
      <ProductShowcase />
    </Suspense>
  );
}
