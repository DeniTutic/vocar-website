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

/**
 * Per-variant description overrides for categories whose flavors are
 * different enough to deserve their own sentence (a coated peanut isn't
 * the same product as a plain one). Falls back to the category's own
 * description for everything else, so closely related SKUs — sizes of
 * the same flavor, or categories with no real variation — naturally
 * share identical copy instead of needing bespoke text each.
 */
function descriptionFor(categorySlug: string, name: string, categoryDescription: Localized): Localized {
  const n = name.toLowerCase();

  if (categorySlug === "peanuts") {
    if (n.includes("obloženi") || n.includes("coated")) {
      return {
        bs: "Isti prženi kikiriki, ali sa hrskavom slanom oblogom punom ukusa paprike ili čilija — savršeno uz piće ili kao brza užina. Kikiriki tehnički nije orah nego mahunarka, pa nosi i više proteina od većine pravih oraha.",
        en: "The same roasted peanuts, wrapped in a crunchy savory coating loaded with paprika or chili — great with a drink or as a quick snack. Peanuts aren't technically nuts at all; they're legumes, part of why they carry more protein than most true tree nuts.",
      };
    }
    if (n.includes("vakumirano") || n.includes("vacuum")) {
      return {
        bs: "Prženi i slani kikiriki, odmah vakumiran dok je svjež. Vakumiranje izbacuje kisik iz pakovanja i sprječava užeglost prirodnih ulja u kikirikiju, pa zrna ostaju hrskava i puna ukusa mnogo duže.",
        en: "Roasted and salted peanuts, vacuum-sealed right away while fresh. Removing the oxygen from the pack keeps the peanuts' natural oils from turning rancid, so they stay crunchy and full-flavored much longer.",
      };
    }
    return categoryDescription;
  }

  if (categorySlug === "prunes" && (n.includes("čoko") || n.includes("choco"))) {
    return {
      bs: "Sušene šljive umočene u tanak sloj kakao premaza — spoj tradicionalnog bosanskog voća i slatkog zadovoljstva. Prave se od šljiva u tradiciji čuvene domaće sorte Požegača, koja stoljećima raste na Balkanu i tradicionalno se koristi za sušenje i pečenje rakije šljivovice.",
      en: "Sun-dried plums dipped in a thin layer of cocoa coating — a meeting of traditional Bosnian fruit and a bit of sweetness. Made in the tradition of Požegača, the old Balkan plum variety grown for centuries and historically the go-to choice for both drying and distilling šljivovica.",
    };
  }

  if (categorySlug === "popcorn") {
    if (n.includes("zrno") || n.includes("kernel") || n.includes("bean")) {
      return {
        bs: "Sirovo zrno posebne sorte kukuruza (Zea mays everta) za kuhanje kokica kod kuće. Tvrda ljuska zrna zadržava paru dok pritisak ne postane dovoljno velik da je raznese, a zrno se tad napuše i do 50 puta veće od originalne veličine.",
        en: "Raw kernels of a specific popping-corn variety (Zea mays everta), for popping at home. The kernel's hard hull traps steam until the pressure builds high enough to burst it, expanding the kernel up to 50 times its original size.",
      };
    }
    if (n.includes("karamel") || n.includes("caramel")) {
      return {
        bs: "Napravljene od posebne sorte kukuruza (Zea mays everta) čija ljuska zadrži paru dok zrno naglo ne eksplodira i do 50 puta veće od originala. Ove su preliven slojem karamela za slatku, ljepljivo-hrskavu verziju klasika.",
        en: "Made from a specific popping-corn variety (Zea mays everta) whose hull traps steam until the kernel bursts to up to 50 times its size. These get a caramel coating for a sweet, sticky-crunchy twist on the classic.",
      };
    }
    if (n.includes("čoko") || n.includes("choco")) {
      return {
        bs: "Napravljene od posebne sorte kukuruza (Zea mays everta) čija ljuska zadrži paru dok zrno naglo ne eksplodira i do 50 puta veće od originala. Ove su preliven slojem kakaa za slađu verziju klasika.",
        en: "Made from a specific popping-corn variety (Zea mays everta) whose hull traps steam until the kernel bursts to up to 50 times its size. These get a cocoa coating for a sweeter take on the classic.",
      };
    }
    return categoryDescription;
  }

  if (categorySlug === "cereals") {
    if (n.includes("nutto") || n.includes("lješnjak") || n.includes("hazelnut")) {
      return {
        bs: "Krem bar sa lješnjacima — a lješnjaci najčešće stižu iz Turske, koja sama proizvodi oko 70% svjetske ponude ovog oraha. Hrskav spolja, kremast iznutra.",
        en: "A cream bar built on hazelnuts — around 70% of the world's hazelnuts come from a single country, Turkey. Crisp on the outside, creamy in the middle.",
      };
    }
    return {
      bs: "Čokoladne žitarice u obliku kuglica, obogaćene vitaminima — brz i ukusan doručak uz mlijeko ili jogurt, za djecu i odrasle.",
      en: "Chocolate cereal balls fortified with vitamins — a quick, tasty breakfast with milk or yogurt, for kids and adults alike.",
    };
  }

  return categoryDescription;
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
        description: descriptionFor(category.slug, name, category.description),
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
