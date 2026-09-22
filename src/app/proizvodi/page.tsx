import type { Metadata } from "next";
import { Suspense } from "react";
import { home } from "@/data/content";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ScrollToTopOnArrival } from "@/components/ScrollToTopOnArrival";

export const metadata: Metadata = {
  title: home.catalogPageTitle.bs,
  description: home.catalogPageDescription.bs,
  alternates: { canonical: "/proizvodi" },
};

export default function ProductsPage() {
  // useSearchParams needs a Suspense boundary to keep the page static. The
  // fallback keeps the document tall and jumps to the top, so the frame
  // before the catalog streams in isn't the footer.
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
