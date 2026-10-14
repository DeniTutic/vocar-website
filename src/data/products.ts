import { categories, type Category, type EditorialBadge } from "./categories";
import type { Localized } from "./content";
import { productInfo, type Nutrition } from "./productInfo";
import type { TasteKey } from "./tastes";

export type Badge = EditorialBadge | "coko";

export const BADGE_ORDER: Badge[] = ["hit", "novo", "coko"];

export interface Product {
  slug: string;
  name: Localized;
  /** Sorted, comma-joined `sizeList`; "—" when no sizes are known. */
  sizes: string;
  sizeList: string[];
  category: Category;
  image: string;
  imageAlt: Localized;
  flavor: Localized;
  tastes: TasteKey[];
  badges: Badge[];
  description: Localized;
  /**
   * Honest, generic composition grounded in the product's real name/type —
   * shown only where the old shop had no declared ingredient list.
   */
  composition: Localized;
  /** The declared ingredient list, copied from the old vocar.ba shop (see productInfo). */
  ingredients?: Localized;
  /**
   * Only allergens that are certain from the product's name or its declared
   * ingredients (peanuts in peanut products, wheat and soy where the list
   * says so). Rendered as "Sadrži: …".
   */
  allergens?: Localized;
  /** The old shop's own allergen line, verbatim — mostly may-contain-traces. */
  allergenNote?: Localized;
  nutrition?: Nutrition;
}

function parseSizes(raw: string): string[] {
  const unique = new Set(
    raw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s && s !== "—")
  );
  return Array.from(unique).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
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

  // Three lines share the flips category; each keeps its own story.
  if (categorySlug === "flips") {
    if (n.startsWith("q flips")) {
      return {
        bs: "Napuhani kukuruz i kinoa u pet ukusa, od slatkog kukuruza do kečapa i kikirikija. Kinoa je porijeklom iz Anda u Južnoj Americi, gdje se gaji već oko 5.000 godina, a jedna je od rijetkih biljnih namirnica koja sadrži svih devet esencijalnih aminokiselina — pravi kompletan protein, uz to i prirodno bez glutena.",
        en: "Puffed corn and quinoa in five flavors, from sweet corn to ketchup and peanut. Quinoa originally comes from the Andes Mountains in South America, where it's been grown for roughly 5,000 years, and it's one of the few plant foods containing all nine essential amino acids — a genuinely complete protein, and naturally gluten-free too.",
      };
    }
    if (n.startsWith("timi")) {
      return {
        bs: "Originalni kukuruzni krugovi i kikiriki flipsevi, ekstrudirani pod pritiskom da bi dobili svoju laganu, hrskavu teksturu. Pakovanja za užinu ili za cijelu porodicu, uvijek isti prepoznatljiv ukus.",
        en: "The original corn rings and peanut puffs, extruded under pressure to get their light, crunchy texture. Lunchbox or family-size packs, always the same familiar taste.",
      };
    }
    return {
      bs: "Kukuruzni krugovi punog ukusa, napravljeni ekstruzijom — kukuruzno tijesto se kuha pod pritiskom, a naglo oslobađanje tog pritiska pri izlasku iz mašine čini da se odmah napuše u svoj poznati oblik. Dostupni u ukusu pice, kikirikija i pikantnom.",
      en: "Full-flavor corn rings made through extrusion — corn dough is cooked under pressure, then the sudden release of that pressure as it exits the machine makes it puff instantly into its familiar shape. Available in pizza, peanut, and piquant flavors.",
    };
  }

  if (categorySlug === "peanuts") {
    if (n.includes("obloženi") || n.includes("coated")) {
      return {
        bs: "Isti prženi kikiriki, ali sa hrskavom slanom oblogom punom ukusa paprike ili čilija — savršeno uz piće ili kao brza užina. Kikiriki tehnički nije orah nego mahunarka, pa nosi i više proteina od većine pravih oraha.",
        en: "The same roasted peanuts, wrapped in a crunchy savory coating loaded with paprika or chili — great with a drink or as a quick snack. Peanuts aren't technically nuts at all; they're legumes, part of why they carry more protein than most true tree nuts.",
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
  if (categorySlug === "peanut-butter") return { bs: "Pržen kikiriki.", en: "Roasted peanuts." };
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
  if (categorySlug === "flips" && n.startsWith("q flips")) {
    return n.includes("bez masti")
      ? { bs: "Kukuruz, kinoa.", en: "Corn, quinoa." }
      : { bs: "Kukuruz, kinoa, začini.", en: "Corn, quinoa, seasoning." };
  }
  if (categorySlug === "wafers") return { bs: "Vafel listovi.", en: "Wafer sheets." };
  if (categorySlug === "popcorn") {
    if (n.includes("čoko") || n.includes("choco")) return { bs: "Kukuruzno zrno, kakao premaz.", en: "Popcorn kernels, cocoa coating." };
    if (n.includes("karamel") || n.includes("caramel")) return { bs: "Kukuruzno zrno, karamel premaz.", en: "Popcorn kernels, caramel coating." };
    return { bs: "Kukuruzno zrno, so.", en: "Popcorn kernels, salt." };
  }
  if (categorySlug === "cereals") {
    return n.includes("nutto")
      ? { bs: "Pšenica, kakao-lješnjak krem.", en: "Wheat, cocoa-hazelnut cream." }
      // Read off the Happy Cerios pack: cereals 71% (whole wheat flour 37%,
      // corn semolina, rice semolina), sugar, chocolate 4.9%.
      : { bs: "Žitarice (pšenica, kukuruz, riža), šećer, čokolada, vitamini.", en: "Cereals (wheat, corn, rice), sugar, chocolate, vitamins." };
  }
  return { bs: "Kukuruzno brašno, biljno ulje, začini.", en: "Corn flour, vegetable oil, seasoning." };
}

function allergensFor(categorySlug: string, name: string): Localized | undefined {
  const n = name.toLowerCase();
  const peanut = { bs: "Kikiriki.", en: "Peanuts." };
  if (categorySlug === "peanuts") {
    // The coating's declared ingredients start with wheat starch.
    return n.includes("obloženi")
      ? { bs: "Kikiriki, gluten (pšenica).", en: "Peanuts, gluten (wheat)." }
      : peanut;
  }
  if (categorySlug === "peanut-butter") return peanut;
  if (categorySlug === "flips") {
    // Every Flips Time declares ground peanuts; Timi with peanuts adds soy flour.
    if (n.startsWith("flips time")) return peanut;
    if (n.startsWith("timi") && n.includes("kikiriki")) return { bs: "Kikiriki, soja.", en: "Peanuts, soy." };
    if (n.includes("kikiriki")) return peanut;
    return undefined;
  }
  if (categorySlug === "wafers") return { bs: "Gluten (pšenica), soja.", en: "Gluten (wheat), soy." };
  if (categorySlug === "cereals") {
    // Happy Cerios' own label bolds three: whole wheat flour, barley malt
    // extract and soy lecithin. Nutto's name gives hazelnut, the wafer base
    // gives wheat, and the old shop's list adds whey, skimmed milk and soy.
    return n.includes("nutto")
      ? { bs: "Gluten (pšenica), mlijeko, soja, lješnjak.", en: "Gluten (wheat), milk, soy, hazelnut." }
      : { bs: "Gluten (pšenica, ječam), soja.", en: "Gluten (wheat, barley), soy." };
  }
  return undefined;
}

function buildProducts(): Product[] {
  const products: Product[] = [];

  for (const category of categories) {
    const seen = new Map<string, Product>();

    for (const sku of category.skus) {
      const name = sku.name.bs;
      const existing = seen.get(name);
      if (existing) {
        existing.sizeList = parseSizes([...existing.sizeList, ...parseSizes(sku.sizes)].join(","));
        existing.sizes = existing.sizeList.length ? existing.sizeList.join(", ") : "—";
        existing.flavor = existing.flavor ?? sku.flavor!;
        existing.tastes = existing.tastes.length ? existing.tastes : (sku.tastes ?? []);
        for (const badge of sku.badges ?? []) {
          if (!existing.badges.includes(badge)) existing.badges.push(badge);
        }
        continue;
      }

      const slug = `${category.slug}-${slugify(name)}`;
      const sizeList = parseSizes(sku.sizes);
      const info = productInfo[slug];
      const product: Product = {
        slug,
        name: sku.name,
        sizes: sizeList.length ? sizeList.join(", ") : "—",
        sizeList,
        category,
        image: sku.image ?? category.image,
        imageAlt: category.imageAlt,
        flavor: sku.flavor!,
        tastes: sku.tastes ?? [],
        badges: [...(sku.badges ?? [])],
        description: descriptionFor(category.slug, name, category.description),
        composition: compositionFor(category.slug, name),
        ingredients: info?.ingredients,
        allergens: allergensFor(category.slug, name),
        allergenNote: info?.allergenNote,
        nutrition: info?.nutrition,
      };
      seen.set(name, product);
      products.push(product);
    }
  }

  // A renamed product would silently lose its declaration; fail the build instead.
  for (const slug of Object.keys(productInfo)) {
    if (!products.some((p) => p.slug === slug)) throw new Error(`productInfo has no product "${slug}"`);
  }

  for (const product of products) {
    if (!product.flavor) throw new Error(`Missing flavor for ${product.slug}`);
    if (product.name.bs.toLowerCase().includes("čoko") && !product.badges.includes("coko")) {
      product.badges.push("coko");
    }
    product.badges.sort((a, b) => BADGE_ORDER.indexOf(a) - BADGE_ORDER.indexOf(b));
  }

  return products;
}

export const products: Product[] = buildProducts();

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = Infinity): Product[] {
  return products.filter((p) => p.category.slug === product.category.slug && p.slug !== product.slug).slice(0, limit);
}
