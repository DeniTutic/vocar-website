import type { Localized } from "./content";
import type { TasteKey } from "./tastes";

/** Hand-picked badges; "coko" is derived from the name at build time. */
export type EditorialBadge = "hit" | "novo";

/**
 * SKUs sharing a `name.bs` are merged into one product, so `flavor`,
 * `tastes` and `badges` only need to live on the first one.
 */
export interface Sku {
  name: Localized;
  sizes: string;
  flavor?: Localized;
  tastes?: TasteKey[];
  badges?: EditorialBadge[];
}

export interface Category {
  slug: string;
  name: Localized;
  /** Five-ish words for the homepage tile; `description` is the long read. */
  tagline: Localized;
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
    slug: "peanuts",
    name: { bs: "Kikiriki", en: "Peanuts" },
    tagline: { bs: "Prženi, slani, hrskavi.", en: "Roasted, salted, crunchy." },
    description: {
      bs: "Kikiriki tehnički nije orah nego mahunarka — raste u mahunama pod zemljom, baš kao grah i leća, pa nosi i više proteina od većine pravih oraha. Zrna se prže na visokoj temperaturi dok ne dobiju hrskavu teksturu, a zatim soli ili vakumiraju dok su svježa. Vakumiranje izbacuje kisik iz pakovanja i sprječava užeglost, pa kikiriki ostaje hrskav mnogo duže.",
      en: "Peanuts aren't technically nuts at all — they're legumes that grow underground in pods, like beans and lentils, which is part of why they pack more protein than most true tree nuts. The kernels are roasted at high heat until crisp, then salted or vacuum-sealed while fresh. Removing the oxygen through vacuum packing keeps the natural oils from turning rancid, so they stay crunchy far longer.",
    },
    image: "/images/categories/peanuts.jpg",
    imageAlt: { bs: "Pakovanje Sneki kikiriki, slani i prženi", en: "Sneki peanuts, salted and roasted, package" },
    accent: "#2E7FB8",
    accentDeep: "#1B4F72",
    skus: [
      {
        name: { bs: "Sneki kikiriki obloženi, paprika", en: "Sneki Coated peanuts, paprika" },
        sizes: "—",
        flavor: { bs: "Hrskava obloga, puna ukusa paprike.", en: "Crunchy coating, full paprika flavor." },
        tastes: ["paprika", "hrskavo", "slano"],
      },
      {
        name: { bs: "Sneki kikiriki obloženi, čili", en: "Sneki Coated peanuts, chili" },
        sizes: "—",
        flavor: { bs: "Hrskava obloga sa ljutim čilijem.", en: "Crunchy coating with a chili kick." },
        tastes: ["cili", "pikant", "hrskavo"],
      },
      {
        name: { bs: "Sneki kikiriki slani, prženi", en: "Sneki Peanuts, salted & roasted" },
        sizes: "200g, 400g",
        flavor: { bs: "Klasik: pržen, slan, hrskav.", en: "The classic: roasted, salted, crunchy." },
        tastes: ["slano", "przeno", "hrskavo"],
      },
      { name: { bs: "Sneki kikiriki slani, prženi", en: "Sneki Peanuts, salted & roasted" }, sizes: "50g, 100g" },
      {
        name: { bs: "Timi kikiriki, vakumirano", en: "Timi Peanuts, vacuum pack" },
        sizes: "200g",
        flavor: { bs: "Svježina zaključana u vakumu.", en: "Freshness locked in under vacuum." },
        tastes: ["slano", "przeno", "vakum"],
      },
      { name: { bs: "Timi kikiriki, vakumirano", en: "Timi Peanuts, vacuum pack" }, sizes: "400g" },
    ],
  },
  {
    slug: "prunes",
    name: { bs: "Suhe šljive", en: "Dried Prunes" },
    tagline: { bs: "Samo voće i vrijeme.", en: "Just fruit and time." },
    description: {
      bs: "Prirodno sušene šljive bez koštice, bez dodanog šećera — samo voće i vrijeme. Bosna i Hercegovina ima dugu tradiciju uzgoja šljiva, prvenstveno domaće sorte Požegača, koja se stoljećima suši baš za ovakve grickalice i za pečenje rakije šljivovice.",
      en: "Naturally sun-dried plums, pitted, with no added sugar — just fruit and time. Bosnia and Herzegovina has a long plum-growing tradition built around the Požegača variety, dried this same way for generations for snacking and for the region's beloved šljivovica brandy.",
    },
    image: "/images/categories/prunes.jpg",
    imageAlt: { bs: "Pakovanje Čoko šljiva", en: "Choco Prunes package" },
    accent: "#7A3B6B",
    accentDeep: "#4B2145",
    skus: [
      {
        name: { bs: "Čoko šljive bez koštice", en: "Choco Prunes pitted" },
        sizes: "200g",
        flavor: { bs: "Suha šljiva pod tankim kakao premazom.", en: "Dried plum under a thin cocoa coat." },
        tastes: ["coko", "suhoVoce", "bezKostice"],
        badges: ["hit"],
      },
      {
        name: { bs: "Suhe šljive bez koštice", en: "Prunes pitted" },
        sizes: "200g",
        flavor: { bs: "Samo voće i vrijeme, bez koštice.", en: "Just fruit and time, pitted." },
        tastes: ["suhoVoce", "bezKostice", "bezSecera"],
      },
      { name: { bs: "Suhe šljive bez koštice", en: "Prunes pitted" }, sizes: "200g, 400g" },
      {
        name: { bs: "Suhe šljive", en: "Prunes" },
        sizes: "250g, 500g",
        flavor: { bs: "Cijela sušena šljiva, bez dodanog šećera.", en: "Whole dried plum, no added sugar." },
        tastes: ["suhoVoce", "bezSecera"],
      },
    ],
  },
  {
    slug: "quinoa-flips",
    name: { bs: "Kinoa Flips", en: "Quinoa Flips" },
    tagline: { bs: "Napuhani kukuruz i kinoa.", en: "Puffed corn and quinoa." },
    description: {
      bs: "Napuhani kukuruz i kinoa u pet ukusa, od slatkog kukuruza do kečapa i kikirikija. Kinoa je porijeklom iz Anda u Južnoj Americi, gdje se gaji već oko 5.000 godina, a jedna je od rijetkih biljnih namirnica koja sadrži svih devet esencijalnih aminokiselina — pravi kompletan protein, uz to i prirodno bez glutena.",
      en: "Puffed corn and quinoa in five flavors, from sweet corn to ketchup and peanut. Quinoa originally comes from the Andes Mountains in South America, where it's been grown for roughly 5,000 years, and it's one of the few plant foods containing all nine essential amino acids — a genuinely complete protein, and naturally gluten-free too.",
    },
    image: "/images/categories/quinoa-flips.jpg",
    imageAlt: { bs: "Pakovanje Q Flips kinoa i kukuruz, kikiriki", en: "Q Flips quinoa and corn, peanuts package" },
    accent: "#5F8A3F",
    accentDeep: "#3B5C26",
    skus: [
      {
        name: { bs: "Q Flips slatki kukuruz", en: "Q Flips Sweet corn" },
        sizes: "80g",
        flavor: { bs: "Napuhani kukuruz i kinoa, blago slatki.", en: "Puffed corn and quinoa, gently sweet." },
        tastes: ["slatko", "kukuruz", "kinoa"],
        badges: ["novo"],
      },
      {
        name: { bs: "Q Flips kikiriki", en: "Q Flips Peanuts" },
        sizes: "80g",
        flavor: { bs: "Kinoa flips sa ukusom kikirikija.", en: "Quinoa puffs with peanut flavor." },
        tastes: ["kikiriki", "kinoa", "hrskavo"],
        badges: ["novo"],
      },
      {
        name: { bs: "Q Flips kikiriki, bez masti i soli", en: "Q Flips Peanuts, no fat or salt" },
        sizes: "60g",
        flavor: { bs: "Kikiriki ukus, bez masti i bez soli.", en: "Peanut flavor, no fat and no salt." },
        tastes: ["kikiriki", "bezMasti", "bezSoli"],
        badges: ["novo"],
      },
      {
        name: { bs: "Q Flips kečap i kikiriki", en: "Q Flips Ketchup & peanuts" },
        sizes: "80g",
        flavor: { bs: "Kečap i kikiriki u jednom zalogaju.", en: "Ketchup and peanut in one bite." },
        tastes: ["kecap", "kikiriki", "kinoa"],
        badges: ["novo"],
      },
      {
        name: { bs: "Q Flips slani", en: "Q Flips Salted" },
        sizes: "60g",
        flavor: { bs: "Lagano slani flips od kinoe i kukuruza.", en: "Lightly salted quinoa and corn puffs." },
        tastes: ["slano", "kinoa", "kukuruz"],
        badges: ["novo"],
      },
    ],
  },
  {
    slug: "flips-time",
    name: { bs: "Flips Time", en: "Flips Time" },
    tagline: { bs: "Kukuruzni krugovi punog ukusa.", en: "Full-flavor corn rings." },
    description: {
      bs: "Kukuruzni krugovi punog ukusa, napravljeni ekstruzijom — kukuruzno tijesto se kuha pod pritiskom, a naglo oslobađanje tog pritiska pri izlasku iz mašine čini da se odmah napuše u svoj poznati oblik. Dostupni u ukusu pice, kikirikija i pikantnom.",
      en: "Full-flavor corn rings made through extrusion — corn dough is cooked under pressure, then the sudden release of that pressure as it exits the machine makes it puff instantly into its familiar shape. Available in pizza, peanut, and piquant flavors.",
    },
    image: "/images/categories/flips-time.jpg",
    imageAlt: { bs: "Pakovanje Flips Time, kikiriki", en: "Flips Time peanuts package" },
    accent: "#C4432B",
    accentDeep: "#231F1B",
    skus: [
      {
        name: { bs: "Flips Time pizza", en: "Flips Time Pizza" },
        sizes: "150g",
        flavor: { bs: "Kukuruzni krugovi sa ukusom pice.", en: "Corn rings with pizza flavor." },
        tastes: ["pizza", "hrskavo", "kukuruz"],
      },
      {
        name: { bs: "Flips Time kikiriki", en: "Flips Time Peanuts" },
        sizes: "150g",
        flavor: { bs: "Kukuruzni krugovi sa kikirikijem.", en: "Corn rings with peanut." },
        tastes: ["kikiriki", "hrskavo", "kukuruz"],
      },
      {
        name: { bs: "Flips Time pikant", en: "Flips Time Piquant" },
        sizes: "150g",
        flavor: { bs: "Kukuruzni krugovi sa pikantnom notom.", en: "Corn rings with a piquant edge." },
        tastes: ["pikant", "hrskavo", "kukuruz"],
      },
    ],
  },
  {
    slug: "timi-flips",
    name: { bs: "Timi Flips", en: "Timi Flips" },
    tagline: { bs: "Originalni flips za užinu.", en: "The original snack puff." },
    description: {
      bs: "Originalni kukuruzni krugovi i kikiriki flipsevi, ekstrudirani pod pritiskom da bi dobili svoju laganu, hrskavu teksturu. Pakovanja za užinu ili za cijelu porodicu, uvijek isti prepoznatljiv ukus.",
      en: "The original corn rings and peanut puffs, extruded under pressure to get their light, crunchy texture. Lunchbox or family-size packs, always the same familiar taste.",
    },
    image: "/images/categories/timi-flips.jpg",
    imageAlt: { bs: "Pakovanje Timi Pikant", en: "Timi Pikant package" },
    accent: "#D8452E",
    accentDeep: "#7A1E1A",
    skus: [
      {
        name: { bs: "Timi Pikant pizza ukus", en: "Timi Pikant Pizza flavor" },
        sizes: "30g",
        flavor: { bs: "Pikantni flips sa ukusom pice.", en: "Piquant puffs with pizza flavor." },
        tastes: ["pizza", "pikant", "hrskavo"],
      },
      {
        name: { bs: "Timi Pikant", en: "Timi Pikant" },
        sizes: "30g",
        flavor: { bs: "Originalni pikantni flips za užinu.", en: "The original piquant snack puff." },
        tastes: ["pikant", "hrskavo", "kukuruz"],
      },
      { name: { bs: "Timi Pikant", en: "Timi Pikant" }, sizes: "90g" },
      {
        name: { bs: "Timi Flips sa kikirikijem", en: "Timi Flips with peanuts" },
        sizes: "25g",
        flavor: { bs: "Lagani kukuruzni flips sa kikirikijem.", en: "Light corn puffs with peanut." },
        tastes: ["kikiriki", "lagano", "kukuruz"],
      },
      { name: { bs: "Timi Flips sa kikirikijem", en: "Timi Flips with peanuts" }, sizes: "90g" },
    ],
  },
  {
    slug: "peanut-butter",
    name: { bs: "Puter od kikirikija", en: "Peanut Butter" },
    tagline: { bs: "100% pržen kikiriki.", en: "100% roasted peanuts." },
    description: {
      bs: "100% pržen kikiriki, mljeven u glatku kremastu pastu ili ostavljen hrskav sa sitnim komadićima. Kikiriki je zapravo mahunarka, a ne orah, što mu daje izuzetno visok sadržaj proteina — savršena osnova za namaz bez suvišnih dodataka.",
      en: "100% roasted peanuts, ground into a smooth creamy paste or left crunchy with small peanut pieces. Peanuts are technically a legume, not a nut, which gives them an unusually high protein content — a great base for a spread with nothing extra needed.",
    },
    image: "/images/categories/peanut-butter.jpg",
    imageAlt: { bs: "Teglica Puter od kikirikija, kremasti 100%", en: "Peanut Butter, Creamy 100% jar" },
    accent: "#2D5FA0",
    accentDeep: "#1B3A66",
    skus: [
      {
        name: { bs: "Puter od kikirikija, kremasti 100%", en: "Peanut Butter, Creamy 100%" },
        sizes: "350g",
        flavor: { bs: "Samo kikiriki, ništa drugo. Glatko.", en: "Nothing but peanuts. Smooth." },
        tastes: ["stoPosto", "kremasto", "kikiriki"],
        badges: ["hit"],
      },
      {
        name: { bs: "Puter od kikirikija, kremasti", en: "Peanut Butter, Creamy" },
        sizes: "350g",
        flavor: { bs: "Glatka kremasta pasta od prženog kikirikija.", en: "Smooth creamy roasted-peanut spread." },
        tastes: ["kremasto", "kikiriki", "przeno"],
      },
      {
        name: { bs: "Puter od kikirikija, hrskavi", en: "Peanut Butter, Crunchy" },
        sizes: "350g",
        flavor: { bs: "Kremasti puter sa komadićima kikirikija.", en: "Creamy butter with peanut pieces." },
        tastes: ["hrskavo", "kikiriki", "przeno"],
      },
      { name: { bs: "Puter od kikirikija, kremasti", en: "Peanut Butter, Creamy" }, sizes: "227g" },
      { name: { bs: "Puter od kikirikija, hrskavi", en: "Peanut Butter, Crunchy" }, sizes: "227g" },
    ],
  },
  {
    slug: "popcorn",
    name: { bs: "Kokice", en: "Popcorn" },
    tagline: { bs: "Slane, karamel ili čoko.", en: "Salted, caramel or choco." },
    description: {
      bs: "Kokice se prave od posebne sorte kukuruza (Zea mays everta) čija tvrda, nepropusna ljuska zadržava paru unutar zrna. Kad pritisak naraste dovoljno visoko, ljuska naglo puca i zrno se napuše i do 50 puta veće od originalne veličine. Slane, karamel ili čokoladne — plus zrno za kuhanje kod kuće.",
      en: "Popcorn is made from a specific type of corn (Zea mays everta) with a hard, non-porous hull that traps steam inside the kernel. Once the pressure builds high enough, the hull bursts and the kernel puffs up to 50 times its original size. Salted, caramel, or chocolate — plus loose kernels for popping at home.",
    },
    image: "/images/categories/popcorn.jpg",
    imageAlt: { bs: "Pakovanje Pop Star kokice, karamel", en: "Pop Star Popcorn, Caramel package" },
    accent: "#C98A3B",
    accentDeep: "#2B2350",
    skus: [
      {
        name: { bs: "Pop Star kokice, slane", en: "Pop Star Popcorn, Salted" },
        sizes: "40g",
        flavor: { bs: "Klasične slane kokice za film.", en: "Classic salted movie popcorn." },
        tastes: ["slano", "kukuruz", "hrskavo"],
      },
      {
        name: { bs: "Pop Star kokice, čoko", en: "Pop Star Popcorn, Choco" },
        sizes: "100g",
        flavor: { bs: "Kokice pod slojem kakaa.", en: "Popcorn under a layer of cocoa." },
        tastes: ["coko", "slatko", "hrskavo"],
      },
      {
        name: { bs: "Pop Star kokice, karamel", en: "Pop Star Popcorn, Caramel" },
        sizes: "100g",
        flavor: { bs: "Karamel kokice koje nestanu prije filma.", en: "Caramel popcorn that's gone before the movie starts." },
        tastes: ["karamel", "slatko", "hrskavo"],
        badges: ["hit"],
      },
      { name: { bs: "Pop Star kokice, slane", en: "Pop Star Popcorn, Salted" }, sizes: "120g, 250g" },
      {
        name: { bs: "Pop Star zrno za kokice", en: "Pop Star Popcorn beans" },
        sizes: "350g",
        flavor: { bs: "Sirovo zrno za kokice kod kuće.", en: "Raw kernels for popping at home." },
        tastes: ["kukuruz", "kodKuce"],
      },
      { name: { bs: "Pop Star zrno za kokice", en: "Pop Star Popcorn kernels" }, sizes: "500g" },
    ],
  },
  {
    slug: "wafers",
    name: { bs: "Oblatne", en: "Wafers" },
    tagline: { bs: "Hrskavi listovi, kremasti fil.", en: "Crisp sheets, creamy filling." },
    description: {
      bs: "Tanki slojevi oblatni peku se između vrućih metalnih ploča dok ne postanu hrskavi i lagani — tehnika stara vjekovima, nekad rađena ručno na vatri, danas na modernim mašinama. Slojevi se zatim slažu sa kremastim filom i sijeku u prepoznatljive komade.",
      en: "Thin wafer sheets are baked between hot metal plates until crisp and light — a technique centuries old, once done by hand over an open fire, now done on modern machines. The sheets are then layered with a smooth cream filling and cut into their familiar shape.",
    },
    image: "/images/categories/wafers.jpg",
    imageAlt: { bs: "Pakovanje Tima oblatne", en: "Tima Wafers package" },
    accent: "#C97FA0",
    accentDeep: "#8A4A63",
    skus: [
      {
        name: { bs: "Tima oblatne", en: "Tima Wafers" },
        sizes: "200g",
        flavor: { bs: "Hrskavi listovi, kremasti fil.", en: "Crisp wafer sheets, creamy filling." },
        tastes: ["hrskavo", "kremasto", "slatko"],
      },
      { name: { bs: "Tima oblatne", en: "Tima Wafers" }, sizes: "200g" },
    ],
  },
  {
    slug: "groceries",
    name: { bs: "Namirnice", en: "Groceries" },
    tagline: { bs: "Griz, polenta, brašno.", en: "Grits, polenta, flour." },
    description: {
      bs: "Griz, instant polenta i kukuruzno brašno, mljeveni fino za svakodnevnu upotrebu. Polenta je osnova za kačamak, tradicionalno bosansko jelo od kukuruznog brašna koje se generacijama sprema na ovim prostorima.",
      en: "Grits, instant polenta, and corn flour, milled fine for everyday cooking. Polenta is the base for kačamak, a traditional Bosnian cornmeal dish that's been made across the region for generations.",
    },
    image: "/images/categories/groceries.jpg",
    imageAlt: { bs: "Pakovanje Zlatna instant polenta", en: "Golden Instant Polenta package" },
    accent: "#C68A2E",
    accentDeep: "#7A551C",
    skus: [
      {
        name: { bs: "Pšenični griz", en: "Wheat Grits" },
        sizes: "200g",
        flavor: { bs: "Fino mljeveni pšenični griz za svaki dan.", en: "Finely milled wheat grits for every day." },
        tastes: ["psenica", "finoMljeveno", "zaKuhanje"],
      },
      {
        name: { bs: "Zlatna instant polenta", en: "Golden Instant Polenta" },
        sizes: "200g",
        flavor: { bs: "Instant polenta, gotova za par minuta.", en: "Instant polenta, ready in minutes." },
        tastes: ["kukuruz", "instant", "zaKuhanje"],
      },
      {
        name: { bs: "Tima palenta (koruzni zdrob)", en: "Tima Palenta (corn grits)" },
        sizes: "800g, 1000g",
        flavor: { bs: "Kukuruzni zdrob za pravi kačamak.", en: "Corn grits for a proper kačamak." },
        tastes: ["kukuruz", "kacamak", "zaKuhanje"],
      },
      {
        name: { bs: "Tima kukuruzno brašno", en: "Tima Corn Flour" },
        sizes: "200g",
        flavor: { bs: "Fino mljeveno kukuruzno brašno.", en: "Finely milled corn flour." },
        tastes: ["kukuruz", "finoMljeveno", "zaKuhanje"],
      },
    ],
  },
  {
    slug: "chips",
    name: { bs: "Čips", en: "Chips" },
    tagline: { bs: "Hrskavi kukuruzni kornetići.", en: "Crunchy corn cones." },
    description: {
      bs: "Kukuruzni čips napravljen ekstruzijom — kukuruzno tijesto se oblikuje i pri izlasku iz mašine naglo napuše u hrskave kornetiće, potpuno drugačijom tehnikom od klasičnog prženog krompirovog čipsa. Dostupan u ukusu piletine, pavlake ili čilija.",
      en: "Corn chips made through extrusion — corn dough is shaped and, as it exits the machine, instantly puffs into crisp cones, a completely different technique from classic fried potato chips. Available in chicken, sour cream, or chili flavor.",
    },
    image: "/images/categories/chips.jpg",
    imageAlt: { bs: "Pakovanje Crispy Fun, piletina", en: "Crispy Fun, Chicken package" },
    accent: "#E0522B",
    accentDeep: "#1A1712",
    skus: [
      {
        name: { bs: "Crispy Fun, piletina", en: "Crispy Fun, Chicken" },
        sizes: "50g, 100g",
        flavor: { bs: "Hrskavi kornetići sa ukusom piletine.", en: "Crunchy cones with chicken flavor." },
        tastes: ["piletina", "hrskavo", "slano"],
        badges: ["hit"],
      },
      {
        name: { bs: "Crispy Fun, pavlaka", en: "Crispy Fun, Sour Cream" },
        sizes: "50g, 100g",
        flavor: { bs: "Hrskavi kornetići sa ukusom pavlake.", en: "Crunchy cones with sour cream flavor." },
        tastes: ["pavlaka", "hrskavo", "slano"],
      },
      {
        name: { bs: "Crispy Fun, čili", en: "Crispy Fun, Chili" },
        sizes: "50g, 100g",
        flavor: { bs: "Hrskavi kornetići sa ljutim čilijem.", en: "Crunchy cones with a chili kick." },
        tastes: ["cili", "pikant", "hrskavo"],
      },
    ],
  },
  {
    slug: "cereals",
    name: { bs: "Žitarice i krem bar", en: "Cereals & Cream Bar" },
    tagline: { bs: "Za doručak i užinu.", en: "For breakfast and snacks." },
    description: {
      bs: "Čokoladne kuglice sa vitaminima, i krem bar sa lješnjacima — dvije različite poslastice za doručak ili užinu.",
      en: "Vitamin-fortified chocolate cereal, and a hazelnut cream bar — two different treats for breakfast or a snack.",
    },
    image: "/images/categories/cereals.jpg",
    imageAlt: { bs: "Pakovanje Happy Cerios, kuglice sa vitaminima", en: "Happy Cerios, vitamin cereal balls package" },
    accent: "#D98A2E",
    accentDeep: "#6B4226",
    skus: [
      {
        name: { bs: "Nutto krem bar, lješnjak", en: "Nutto Cream Bar, hazelnut" },
        sizes: "80g",
        flavor: { bs: "Hrskav spolja, lješnjak krem iznutra.", en: "Crisp outside, hazelnut cream inside." },
        tastes: ["ljesnjak", "kremasto", "coko"],
        badges: ["novo"],
      },
      {
        name: { bs: "Happy Cerios, kuglice sa vitaminima", en: "Happy Cerios, vitamin cereal balls" },
        sizes: "250g",
        flavor: { bs: "Čokoladne kuglice sa vitaminima za doručak.", en: "Chocolate cereal balls with vitamins for breakfast." },
        tastes: ["coko", "vitamini", "dorucak"],
        badges: ["novo"],
      },
    ],
  },
];

export const totalSkuCount = categories.reduce((sum, c) => sum + c.skus.length, 0);
