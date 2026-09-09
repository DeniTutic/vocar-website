import { categories, type Category } from "./categories";

export interface Product {
  slug: string;
  name: string;
  sizes: string;
  category: Category;
  image: string;
  imageAlt: string;
  description: string;
  /**
   * Honest, generic composition grounded in the product's real name/type —
   * never a fabricated nutrition table. Precise nutrition values live on
   * the physical packaging, which is what the product page says.
   */
  composition: string;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function compositionFor(categorySlug: string, name: string): string {
  const n = name.toLowerCase();
  if (categorySlug === "peanut-butter") return "100% pržen kikiriki.";
  if (categorySlug === "peanuts") return "Kikiriki" + (n.includes("obloženi") || n.includes("coated") ? ", začinska obloga." : ", so.");
  if (categorySlug === "prunes") return n.includes("čoko") || n.includes("choco") ? "Suha šljiva, kakao premaz." : "Sušena šljiva, bez dodataka.";
  if (categorySlug === "groceries") return "Kukuruz ili pšenica, mljeveno.";
  if (categorySlug === "wafers") return "Vafel listovi, kremasti fil.";
  if (categorySlug === "popcorn") return "Kukuruzno zrno" + (n.includes("čoko") || n.includes("choco") ? ", kakao premaz." : n.includes("karamel") || n.includes("caramel") ? ", karamel premaz." : ", so.");
  if (categorySlug === "cereals") return n.includes("nutto") ? "Pšenica, kakao-lješnjak krem." : "Kukuruz i pšenica, kakao premaz, vitamini.";
  return "Kukuruzno brašno, biljno ulje, začini.";
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
        name,
        sizes: sku.sizes,
        category,
        image: category.image,
        imageAlt: category.imageAlt.bs,
        description: category.description.bs,
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
