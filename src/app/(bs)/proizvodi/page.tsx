import type { Metadata } from "next";
import { home } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { ProductShowcase } from "@/components/ProductShowcase";
import { CatalogPendingStyle } from "@/components/CatalogPendingStyle";

export const metadata: Metadata = pageMetadata({
  locale: "bs",
  key: "products",
  title: home.catalogPageTitle.bs,
  description: home.catalogPageDescription.bs,
});

export default function ProductsPage() {
  // The catalog prerenders in full (only its query-string reader waits for
  // the browser); the script hides the results on filtered links until
  // they're applied, so those never flash the unfiltered list.
  return (
    <>
      <CatalogPendingStyle />
      <ProductShowcase />
    </>
  );
}
