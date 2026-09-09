import type { Localized } from "./content";

export interface Sku {
  name: Localized;
  sizes: string;
}

export interface Category {
  slug: string;
  name: Localized;
  description: Localized;
  image: string;
  imageAlt: Localized;
  /** Accent color lifted from the category's real packaging. */
  accent: string;
  accentDeep: string;
  skus: Sku[];
}

export const categories: Category[] = [
  {
    slug: "prunes",
    name: { bs: "Suhe šljive", en: "Dried Prunes" },
    description: {
      bs: "Sušene šljive bez koštice — prirodne ili u čokoladi.",
      en: "Pitted, sun-dried plums — plain, or dipped in chocolate.",
    },
    image: "/images/categories/prunes.jpg",
    imageAlt: { bs: "Suhe šljive na zobenoj kaši sa bademima", en: "Dried prunes over oatmeal with almonds" },
    accent: "#7A3B6B",
    accentDeep: "#4B2145",
    skus: [
      { name: { bs: "Čoko šljive bez koštice", en: "Choco Prunes pitted" }, sizes: "200g" },
      { name: { bs: "Suhe šljive bez koštice", en: "Prunes pitted" }, sizes: "200g" },
      { name: { bs: "Suhe šljive bez koštice", en: "Prunes pitted" }, sizes: "200g, 400g" },
      { name: { bs: "Suhe šljive", en: "Prunes" }, sizes: "250g, 500g" },
    ],
  },
  {
    slug: "quinoa-flips",
    name: { bs: "Kinoa Flips", en: "Quinoa Flips" },
    description: {
      bs: "Kukuruz i kinoa, napuhani u pet ukusa: slatki kukuruz, kikiriki, kečap i kikiriki, so, bez soli.",
      en: "Puffed corn and quinoa, five ways: sweet corn, peanut, ketchup and peanut, salted, unsalted.",
    },
    image: "/images/categories/quinoa-flips.jpg",
    imageAlt: { bs: "Zdjela Q Flips kukuruzno-kinoa grickalica", en: "Bowl of Q Flips quinoa and corn puffs" },
    accent: "#5F8A3F",
    accentDeep: "#3B5C26",
    skus: [
      { name: { bs: "Q Flips slatki kukuruz", en: "Q Flips Sweet corn" }, sizes: "80g" },
      { name: { bs: "Q Flips kikiriki", en: "Q Flips Peanuts" }, sizes: "80g" },
      { name: { bs: "Q Flips kikiriki, bez masti i soli", en: "Q Flips Peanuts, no fat or salt" }, sizes: "60g" },
      { name: { bs: "Q Flips kečap i kikiriki", en: "Q Flips Ketchup & peanuts" }, sizes: "80g" },
      { name: { bs: "Q Flips slani", en: "Q Flips Salted" }, sizes: "60g" },
    ],
  },
  {
    slug: "flips-time",
    name: { bs: "Flips Time", en: "Flips Time" },
    description: {
      bs: "Kukuruzni krugovi punog ukusa — pizza, kikiriki, pikant.",
      en: "Full-flavor corn rings — pizza, peanut, piquant.",
    },
    image: "/images/categories/flips-time.jpg",
    imageAlt: { bs: "Vrećice Flips Time sa paradajzom i bosiljkom", en: "Flips Time bags with tomato and basil" },
    accent: "#C4432B",
    accentDeep: "#231F1B",
    skus: [
      { name: { bs: "Flips Time pizza", en: "Flips Time Pizza" }, sizes: "150g" },
      { name: { bs: "Flips Time kikiriki", en: "Flips Time Peanuts" }, sizes: "150g" },
      { name: { bs: "Flips Time pikant", en: "Flips Time Piquant" }, sizes: "150g" },
    ],
  },
  {
    slug: "timi-flips",
    name: { bs: "Timi Flips", en: "Timi Flips" },
    description: {
      bs: "Originalni kukuruzni krugovi i kikiriki flipsevi, u pakovanjima za užinu i za cijelu porodicu.",
      en: "The original corn rings and peanut puffs, in lunchbox and family sizes.",
    },
    image: "/images/categories/timi-flips.jpg",
    imageAlt: { bs: "Timi Pikant i Timi Flips kikiriki pakovanja", en: "Timi Pikant and Timi Flips peanut packs" },
    accent: "#D8452E",
    accentDeep: "#7A1E1A",
    skus: [
      { name: { bs: "Timi Pikant pizza ukus", en: "Timi Pikant Pizza flavor" }, sizes: "30g" },
      { name: { bs: "Timi Pikant", en: "Timi Pikant" }, sizes: "30g" },
      { name: { bs: "Timi Pikant", en: "Timi Pikant" }, sizes: "90g" },
      { name: { bs: "Timi Flips sa kikirikijem", en: "Timi Flips with peanuts" }, sizes: "25g" },
      { name: { bs: "Timi Flips sa kikirikijem", en: "Timi Flips with peanuts" }, sizes: "90g" },
    ],
  },
  {
    slug: "peanuts",
    name: { bs: "Kikiriki", en: "Peanuts" },
    description: {
      bs: "Prženi i slani, u čili ili paprika oblozi, ili vakumirani radi svježine.",
      en: "Roasted and salted, chili- or paprika-coated, or vacuum-sealed for freshness.",
    },
    image: "/images/categories/peanuts.jpg",
    imageAlt: { bs: "Sneki kikiriki u drvenoj zdjeli", en: "Sneki peanuts in a wooden bowl" },
    accent: "#2E7FB8",
    accentDeep: "#1B4F72",
    skus: [
      { name: { bs: "Sneki kikiriki obloženi, paprika", en: "Sneki Coated peanuts, paprika" }, sizes: "—" },
      { name: { bs: "Sneki kikiriki obloženi, čili", en: "Sneki Coated peanuts, chili" }, sizes: "—" },
      { name: { bs: "Sneki kikiriki slani, prženi", en: "Sneki Peanuts, salted & roasted" }, sizes: "200g, 400g" },
      { name: { bs: "Sneki kikiriki slani, prženi", en: "Sneki Peanuts, salted & roasted" }, sizes: "50g, 100g" },
      { name: { bs: "Timi kikiriki, vakumirano", en: "Timi Peanuts, vacuum pack" }, sizes: "200g" },
      { name: { bs: "Timi kikiriki, vakumirano", en: "Timi Peanuts, vacuum pack" }, sizes: "400g" },
    ],
  },
  {
    slug: "peanut-butter",
    name: { bs: "Puter od kikirikija", en: "Peanut Butter" },
    description: {
      bs: "100% kikiriki, pretvoren u kremasti ili ostavljen hrskav.",
      en: "100% peanuts, pressed creamy or left crunchy.",
    },
    image: "/images/categories/peanut-butter.jpg",
    imageAlt: { bs: "Tost sa puterom od kikirikija i džemom", en: "Toast with peanut butter and jam" },
    accent: "#2D5FA0",
    accentDeep: "#1B3A66",
    skus: [
      { name: { bs: "Puter od kikirikija, kremasti 100%", en: "Peanut Butter, Creamy 100%" }, sizes: "350g" },
      { name: { bs: "Puter od kikirikija, kremasti", en: "Peanut Butter, Creamy" }, sizes: "350g" },
      { name: { bs: "Puter od kikirikija, hrskavi", en: "Peanut Butter, Crunchy" }, sizes: "350g" },
      { name: { bs: "Puter od kikirikija, kremasti", en: "Peanut Butter, Creamy" }, sizes: "227g" },
      { name: { bs: "Puter od kikirikija, hrskavi", en: "Peanut Butter, Crunchy" }, sizes: "227g" },
    ],
  },
  {
    slug: "popcorn",
    name: { bs: "Kokice", en: "Popcorn" },
    description: {
      bs: "Slane, karamel ili čokoladne — plus zrno za kuhanje kod kuće.",
      en: "Salted, caramel, or chocolate — plus loose kernels for popping at home.",
    },
    image: "/images/categories/popcorn.jpg",
    imageAlt: { bs: "Kokice koje se prosipaju iz kutije", en: "Popcorn spilling out of a striped tub" },
    accent: "#C98A3B",
    accentDeep: "#2B2350",
    skus: [
      { name: { bs: "Pop Star kokice, slane", en: "Pop Star Popcorn, Salted" }, sizes: "40g" },
      { name: { bs: "Pop Star kokice, čoko", en: "Pop Star Popcorn, Choco" }, sizes: "100g" },
      { name: { bs: "Pop Star kokice, karamel", en: "Pop Star Popcorn, Caramel" }, sizes: "100g" },
      { name: { bs: "Pop Star kokice, slane", en: "Pop Star Popcorn, Salted" }, sizes: "120g, 250g" },
      { name: { bs: "Pop Star zrno za kokice", en: "Pop Star Popcorn beans" }, sizes: "350g" },
      { name: { bs: "Pop Star zrno za kokice", en: "Pop Star Popcorn kernels" }, sizes: "500g" },
    ],
  },
  {
    slug: "wafers",
    name: { bs: "Oblatne", en: "Wafers" },
    description: {
      bs: "Hrskavi slojevi oblatni, kremasti fil, dvije ambalaže.",
      en: "Crisp wafer layers, a smooth cream fill, two pack styles.",
    },
    image: "/images/categories/wafers.jpg",
    imageAlt: { bs: "Naslagane Tima oblatne u ružičastoj zdjeli", en: "Stacked Tima wafers in a pink bowl" },
    accent: "#C97FA0",
    accentDeep: "#8A4A63",
    skus: [
      { name: { bs: "Tima oblatne", en: "Tima Wafers" }, sizes: "200g" },
      { name: { bs: "Tima oblatne", en: "Tima Wafers" }, sizes: "200g" },
    ],
  },
  {
    slug: "groceries",
    name: { bs: "Namirnice", en: "Groceries" },
    description: {
      bs: "Griz, instant polenta i kukuruzno brašno — najfinije mljevenje za svakodnevni lonac.",
      en: "Grits, instant polenta and corn flour — milled fine for the everyday pot.",
    },
    image: "/images/categories/groceries.jpg",
    imageAlt: { bs: "Zdjela sa voćem preko griza i vrećica polente", en: "Bowl of fruit over grits beside polenta packs" },
    accent: "#C68A2E",
    accentDeep: "#7A551C",
    skus: [
      { name: { bs: "Pšenični griz", en: "Wheat Grits" }, sizes: "200g" },
      { name: { bs: "Zlatna instant polenta", en: "Golden Instant Polenta" }, sizes: "200g" },
      { name: { bs: "Tima palenta (koruzni zdrob)", en: "Tima Palenta (corn grits)" }, sizes: "800g, 1000g" },
      { name: { bs: "Tima kukuruzno brašno", en: "Tima Corn Flour" }, sizes: "200g" },
    ],
  },
  {
    slug: "chips",
    name: { bs: "Čips", en: "Chips" },
    description: {
      bs: "Super hrskavi kukuruzni čips — piletina, pavlaka, čili.",
      en: "Super-crunchy corn chips — chicken, sour cream, chili.",
    },
    image: "/images/categories/chips.jpg",
    imageAlt: { bs: "Zdjela Crispy Fun čips kornetića", en: "Bowl of Crispy Fun chip cones" },
    accent: "#E0522B",
    accentDeep: "#1A1712",
    skus: [
      { name: { bs: "Crispy Fun, piletina", en: "Crispy Fun, Chicken" }, sizes: "50g, 100g" },
      { name: { bs: "Crispy Fun, pavlaka", en: "Crispy Fun, Sour Cream" }, sizes: "50g, 100g" },
      { name: { bs: "Crispy Fun, čili", en: "Crispy Fun, Chili" }, sizes: "50g, 100g" },
    ],
  },
  {
    slug: "cereals",
    name: { bs: "Žitarice i krem bar", en: "Cereals & Cream Bar" },
    description: {
      bs: "Čokoladne kuglice sa vitaminima, i krem bar sa lješnjacima.",
      en: "Vitamin-fortified chocolate cereal, and a hazelnut cream bar.",
    },
    image: "/images/categories/cereals.jpg",
    imageAlt: { bs: "Zdjela čokoladnih žitarica i Happy Cerios pakovanje", en: "Bowl of chocolate cereal balls beside a Happy Cerios pack" },
    accent: "#D98A2E",
    accentDeep: "#6B4226",
    skus: [
      { name: { bs: "Nutto krem bar, lješnjak", en: "Nutto Cream Bar, hazelnut" }, sizes: "80g" },
      { name: { bs: "Happy Cerios, kuglice sa vitaminima", en: "Happy Cerios, vitamin cereal balls" }, sizes: "250g" },
    ],
  },
];

export const totalSkuCount = categories.reduce((sum, c) => sum + c.skus.length, 0);
