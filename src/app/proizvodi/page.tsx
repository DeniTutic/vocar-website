import type { Metadata } from "next";
import { Suspense } from "react";
import { home } from "@/data/content";
import { ProductShowcase } from "@/components/ProductShowcase";

export const metadata: Metadata = {
  title: home.catalogPageTitle.bs,
  description: home.catalogPageDescription.bs,
  alternates: { canonical: "/proizvodi" },
};

export default function ProductsPage() {
  // useSearchParams needs a Suspense boundary to keep the page static.
  return (
    <Suspense>
      <ProductShowcase />
    </Suspense>
  );
}
