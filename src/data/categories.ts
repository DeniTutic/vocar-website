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
    slug: "peanuts",
    name: { bs: "Kikiriki", en: "Peanuts" },
    description: {
      bs: "Kikiriki tehnički nije orah nego mahunarka — raste u mahunama pod zemljom, baš kao grah i leća, pa nosi i više proteina od većine pravih oraha. Zrna se prže na visokoj temperaturi dok ne dobiju hrskavu teksturu, a zatim soli ili vakumiraju dok su svježa. Vakumiranje izbacuje kisik iz pakovanja i sprječava užeglost, pa kikiriki ostaje hrskav mnogo duže.",
      en: "Peanuts aren't technically nuts at all — they're legumes that grow underground in pods, like beans and lentils, which is part of why they pack more protein than most true tree nuts. The kernels are roasted at high heat until crisp, then salted or vacuum-sealed while fresh. Removing the oxygen through vacuum packing keeps the natural oils from turning rancid, so they stay crunchy far longer.",
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
    slug: "prunes",
    name: { bs: "Suhe šljive", en: "Dried Prunes" },
    description: {
      bs: "Prirodno sušene šljive bez koštice, bez dodanog šećera — samo voće i vrijeme. Bosna i Hercegovina ima dugu tradiciju uzgoja šljiva, prvenstveno domaće sorte Požegača, koja se stoljećima suši baš za ovakve grickalice i za pečenje rakije šljivovice.",
      en: "Naturally sun-dried plums, pitted, with no added sugar — just fruit and time. Bosnia and Herzegovina has a long plum-growing tradition built around the Požegača variety, dried this same way for generations for snacking and for the region's beloved šljivovica brandy.",
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
      bs: "Napuhani kukuruz i kinoa u pet ukusa, od slatkog kukuruza do kečapa i kikirikija. Kinoa je porijeklom iz Anda u Južnoj Americi, gdje se gaji već oko 5.000 godina, a jedna je od rijetkih biljnih namirnica koja sadrži svih devet esencijalnih aminokiselina — pravi kompletan protein, uz to i prirodno bez glutena.",
      en: "Puffed corn and quinoa in five flavors, from sweet corn to ketchup and peanut. Quinoa originally comes from the Andes Mountains in South America, where it's been grown for roughly 5,000 years, and it's one of the few plant foods containing all nine essential amino acids — a genuinely complete protein, and naturally gluten-free too.",
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
      bs: "Kukuruzni krugovi punog ukusa, napravljeni ekstruzijom — kukuruzno tijesto se kuha pod pritiskom, a naglo oslobađanje tog pritiska pri izlasku iz mašine čini da se odmah napuše u svoj poznati oblik. Dostupni u ukusu pice, kikirikija i pikantnom.",
      en: "Full-flavor corn rings made through extrusion — corn dough is cooked under pressure, then the sudden release of that pressure as it exits the machine makes it puff instantly into its familiar shape. Available in pizza, peanut, and piquant flavors.",
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
      bs: "Originalni kukuruzni krugovi i kikiriki flipsevi, ekstrudirani pod pritiskom da bi dobili svoju laganu, hrskavu teksturu. Pakovanja za užinu ili za cijelu porodicu, uvijek isti prepoznatljiv ukus.",
      en: "The original corn rings and peanut puffs, extruded under pressure to get their light, crunchy texture. Lunchbox or family-size packs, always the same familiar taste.",
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
    slug: "peanut-butter",
    name: { bs: "Puter od kikirikija", en: "Peanut Butter" },
    description: {
      bs: "100% pržen kikiriki, mljeven u glatku kremastu pastu ili ostavljen hrskav sa sitnim komadićima. Kikiriki je zapravo mahunarka, a ne orah, što mu daje izuzetno visok sadržaj proteina — savršena osnova za namaz bez suvišnih dodataka.",
      en: "100% roasted peanuts, ground into a smooth creamy paste or left crunchy with small peanut pieces. Peanuts are technically a legume, not a nut, which gives them an unusually high protein content — a great base for a spread with nothing extra needed.",
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
      bs: "Kokice se prave od posebne sorte kukuruza (Zea mays everta) čija tvrda, nepropusna ljuska zadržava paru unutar zrna. Kad pritisak naraste dovoljno visoko, ljuska naglo puca i zrno se napuše i do 50 puta veće od originalne veličine. Slane, karamel ili čokoladne — plus zrno za kuhanje kod kuće.",
      en: "Popcorn is made from a specific type of corn (Zea mays everta) with a hard, non-porous hull that traps steam inside the kernel. Once the pressure builds high enough, the hull bursts and the kernel puffs up to 50 times its original size. Salted, caramel, or chocolate — plus loose kernels for popping at home.",
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
      bs: "Tanki slojevi oblatni peku se između vrućih metalnih ploča dok ne postanu hrskavi i lagani — tehnika stara vjekovima, nekad rađena ručno na vatri, danas na modernim mašinama. Slojevi se zatim slažu sa kremastim filom i sijeku u prepoznatljive komade.",
      en: "Thin wafer sheets are baked between hot metal plates until crisp and light — a technique centuries old, once done by hand over an open fire, now done on modern machines. The sheets are then layered with a smooth cream filling and cut into their familiar shape.",
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
      bs: "Griz, instant polenta i kukuruzno brašno, mljeveni fino za svakodnevnu upotrebu. Polenta je osnova za kačamak, tradicionalno bosansko jelo od kukuruznog brašna koje se generacijama sprema na ovim prostorima.",
      en: "Grits, instant polenta, and corn flour, milled fine for everyday cooking. Polenta is the base for kačamak, a traditional Bosnian cornmeal dish that's been made across the region for generations.",
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
      bs: "Kukuruzni čips napravljen ekstruzijom — kukuruzno tijesto se oblikuje i pri izlasku iz mašine naglo napuše u hrskave kornetiće, potpuno drugačijom tehnikom od klasičnog prženog krompirovog čipsa. Dostupan u ukusu piletine, pavlake ili čilija.",
      en: "Corn chips made through extrusion — corn dough is shaped and, as it exits the machine, instantly puffs into crisp cones, a completely different technique from classic fried potato chips. Available in chicken, sour cream, or chili flavor.",
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
      bs: "Čokoladne kuglice sa vitaminima, i krem bar sa lješnjacima — dvije različite poslastice za doručak ili užinu.",
      en: "Vitamin-fortified chocolate cereal, and a hazelnut cream bar — two different treats for breakfast or a snack.",
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
