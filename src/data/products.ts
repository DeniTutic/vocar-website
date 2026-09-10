import { categories, type Category } from "./categories";
import type { Localized } from "./content";

export interface Product {
  slug: string;
  name: Localized;
  sizes: string;
  category: Category;
  image: string;
  imageAlt: Localized;
  description: Localized;
  /**
   * Honest, generic composition grounded in the product's real name/type —
   * never a fabricated nutrition table. Precise nutrition values live on
   * the physical packaging, which is what the product page says.
   */
  composition: Localized;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function compositionFor(categorySlug: string, name: string): Localized {
  const n = name.toLowerCase();
  if (categorySlug === "peanut-butter") return { bs: "100% pržen kikiriki.", en: "100% roasted peanuts." };
  if (categorySlug === "peanuts") {
    return n.includes("obloženi") || n.includes("coated")
      ? { bs: "Kikiriki, začinska obloga.", en: "Peanuts, seasoned coating." }
      : { bs: "Kikiriki, so.", en: "Peanuts, salt." };
  }
  if (categorySlug === "prunes") {
    return n.includes("čoko") || n.includes("choco")
      ? { bs: "Suha šljiva, kakao premaz.", en: "Dried plum, cocoa coating." }
      : { bs: "Sušena šljiva, bez dodataka.", en: "Dried plum, no additives." };
  }
  if (categorySlug === "groceries") return { bs: "Kukuruz ili pšenica, mljeveno.", en: "Corn or wheat, milled." };
  if (categorySlug === "wafers") return { bs: "Vafel listovi, kremasti fil.", en: "Wafer sheets, creamy filling." };
  if (categorySlug === "popcorn") {
    if (n.includes("čoko") || n.includes("choco")) return { bs: "Kukuruzno zrno, kakao premaz.", en: "Popcorn kernels, cocoa coating." };
    if (n.includes("karamel") || n.includes("caramel")) return { bs: "Kukuruzno zrno, karamel premaz.", en: "Popcorn kernels, caramel coating." };
    return { bs: "Kukuruzno zrno, so.", en: "Popcorn kernels, salt." };
  }
  if (categorySlug === "cereals") {
    return n.includes("nutto")
      ? { bs: "Pšenica, kakao-lješnjak krem.", en: "Wheat, cocoa-hazelnut cream." }
      : { bs: "Kukuruz i pšenica, kakao premaz, vitamini.", en: "Corn and wheat, cocoa coating, vitamins." };
  }
  return { bs: "Kukuruzno brašno, biljno ulje, začini.", en: "Corn flour, vegetable oil, seasoning." };
}

function buildProducts(): Product[] {
  const products: Product[] = [];

  for (const category of categories) {
    const seen = new Map<string, Product>();

    for (const sku of category.skus) {
      const name = sku.name.bs;
      const existing = seen.get(name);
      if (existing) {
        existing.sizes = Array.from(
          new Set([...existing.sizes.split(",").map((s) => s.trim()), ...sku.sizes.split(",").map((s) => s.trim())])
        ).join(", ");
        continue;
      }

      const slug = `${category.slug}-${slugify(name)}`;
      const product: Product = {
        slug,
        name: sku.name,
        sizes: sku.sizes,
        category,
        image: category.image,
        imageAlt: category.imageAlt,
        description: category.description,
        composition: compositionFor(category.slug, name),
      };
      seen.set(name, product);
      products.push(product);
    }
  }

  return products;
}

export const products: Product[] = buildProducts();

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products.filter((p) => p.category.slug === product.category.slug && p.slug !== product.slug).slice(0, limit);
}
