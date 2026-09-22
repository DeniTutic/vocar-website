import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { SITE_URL } from "@/data/content";
import type { Locale } from "@/lib/locale";
import { productMetadata } from "@/lib/metadata";
import { productPath } from "@/lib/routes";
import { ProductDetailView } from "@/components/ProductDetailView";

/** Both language routes render this; only the locale differs. */
export async function productRouteMetadata(locale: Locale, { slug }: { slug: string }): Promise<Metadata> {
  const product = getProductBySlug(slug);
  if (!product) return {};
  return productMetadata(locale, product);
}

export function ProductRoute({ locale, slug }: { locale: Locale; slug: string }) {
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  // No `offers`: there's no price and no shop here. Product + brand + image
  // is enough for a product rich result and stays honest.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name[locale],
    image: `${SITE_URL}${product.image}`,
    description: product.description[locale],
    sku: product.slug,
    category: product.category.name[locale],
    brand: { "@type": "Brand", name: "Voćar" },
    manufacturer: { "@type": "Organization", name: "Voćar d.o.o. Brčko", url: SITE_URL },
    url: `${SITE_URL}${productPath(product.slug, locale)}`,
    inLanguage: locale === "en" ? "en" : "bs",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailView product={product} related={related} />
    </>
  );
}
