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
  /** Dedicated pack shot under /images/products; falls back to the category image. */
  image?: string;
}

export interface Category {
  slug: string;
  name: Localized;
  /** Five-ish words for the homepage tile; `description` is the long read. */
  tagline: Localized;
  description: Localized;
  /** Pack shot — the fallback for SKUs without their own. */
  image: string;
  imageAlt: Localized;
  /** What's inside the bag, not the bag: the homepage tile shows this, cropped round. */
  ingredientImage: string;
  ingredientAlt: Localized;
  /** Accent color lifted from the category's real packaging. */
  accent: string;
  accentDeep: string;
  skus: Sku[];
}

// Order is the order everywhere — homepage carousel, filter chips and the
// "Sve" grid: flips, then popcorn, wafers, prunes, and so on.
export const categories: Category[] = [
  {
    slug: "flips",
    name: { bs: "Flips", en: "Extruded Puffs" },
    tagline: { bs: "Kukuruz, kikiriki i kinoa.", en: "Corn, peanut and quinoa puffs." },
    description: {
      bs: "Flips se pravi ekstruzijom — kukuruzno tijesto se kuha pod pritiskom, a naglo oslobađanje tog pritiska pri izlasku iz mašine čini da se odmah napuše u lagan, hrskav oblik. Tri linije pod jednim krovom: Flips Time u velikim pakovanjima, originalni Timi flips za užinu i Q Flips od kukuruza i kinoe.",
      en: "Flips are made through extrusion — corn dough is cooked under pressure, then the sudden release of that pressure as it exits the machine makes it puff instantly into a light, crunchy shape. Three lines under one roof: Flips Time in big bags, the original Timi snack puffs, and Q Flips made from corn and quinoa.",
    },
    image: "/images/categories/timi-flips.jpg",
    imageAlt: { bs: "Pakovanje Timi Pikant", en: "Timi Pikant package" },
    ingredientImage: "/images/ingredients/flips.jpg",
    ingredientAlt: { bs: "Zdjela kukuruznog flipsa sa kikirikijem", en: "A bowl of corn and peanut puffs" },
    accent: "#D8452E",
    accentDeep: "#7A1E1A",
    skus: [
      {
        name: { bs: "Flips Time pizza", en: "Flips Time Pizza" },
        image: "/images/products/flips-time-flips-time-pizza.jpg",
        sizes: "150g",
        flavor: { bs: "Kukuruzni krugovi sa ukusom pice.", en: "Corn rings with pizza flavor." },
        tastes: ["pizza", "hrskavo", "kukuruz"],
      },
      {
        name: { bs: "Flips Time kikiriki", en: "Flips Time Peanuts" },
        image: "/images/products/flips-time-flips-time-kikiriki.jpg",
        sizes: "150g",
        flavor: { bs: "Kukuruzni krugovi sa kikirikijem.", en: "Corn rings with peanut." },
        tastes: ["kikiriki", "hrskavo", "kukuruz"],
      },
      {
        name: { bs: "Flips Time pikant", en: "Flips Time Piquant" },
        image: "/images/products/flips-time-flips-time-pikant.jpg",
        sizes: "150g",
        flavor: { bs: "Kukuruzni krugovi sa pikantnom notom.", en: "Corn rings with a piquant edge." },
        tastes: ["pikant", "hrskavo", "kukuruz"],
      },
      {
        name: { bs: "Timi Pikant", en: "Timi Pikant" },
        image: "/images/products/timi-flips-timi-pikant.jpg",
        sizes: "30g",
        flavor: { bs: "Originalni pikantni flips za užinu.", en: "The original piquant snack puff." },
        tastes: ["pikant", "hrskavo", "kukuruz"],
      },
      { name: { bs: "Timi Pikant", en: "Timi Pikant" }, sizes: "90g" },
      {
        name: { bs: "Timi Flips sa kikirikijem", en: "Timi Flips with peanuts" },
        image: "/images/products/timi-flips-timi-flips-sa-kikirikijem.jpg",
        sizes: "25g",
        flavor: { bs: "Lagani kukuruzni flips sa kikirikijem.", en: "Light corn puffs with peanut." },
        tastes: ["kikiriki", "lagano", "kukuruz"],
      },
      { name: { bs: "Timi Flips sa kikirikijem", en: "Timi Flips with peanuts" }, sizes: "90g" },
      {
        name: { bs: "Q Flips slatki kukuruz", en: "Q Flips Sweet corn" },
        image: "/images/products/quinoa-flips-q-flips-slatki-kukuruz.jpg",
        sizes: "80g",
        flavor: { bs: "Napuhani kukuruz i kinoa, blago slatki.", en: "Puffed corn and quinoa, gently sweet." },
        tastes: ["slatko", "kukuruz", "kinoa"],
        badges: ["novo"],
      },
      {
        name: { bs: "Q Flips kikiriki", en: "Q Flips Peanuts" },
        image: "/images/products/quinoa-flips-q-flips-kikiriki.jpg",
        sizes: "80g",
        flavor: { bs: "Kinoa flips sa ukusom kikirikija.", en: "Quinoa puffs with peanut flavor." },
        tastes: ["kikiriki", "kinoa", "hrskavo"],
        badges: ["novo"],
      },
      {
        // The pack reads "Bez dodatih masti i soli" and the declared
        // ingredients are corn grits and quinoa only — no peanut.
        name: { bs: "Q Flips bez dodatih masti i soli", en: "Q Flips, no added fat or salt" },
        image: "/images/products/quinoa-flips-q-flips-kikiriki-bez-masti-i-soli.jpg",
        sizes: "60g",
        flavor: { bs: "Samo kukuruz i kinoa, bez dodatih masti i soli.", en: "Just corn and quinoa, no added fat or salt." },
        tastes: ["kinoa", "bezMasti", "bezSoli"],
        badges: ["novo"],
      },
      {
        name: { bs: "Q Flips kečap i kikiriki", en: "Q Flips Ketchup & peanuts" },
        image: "/images/products/quinoa-flips-q-flips-kecap-i-kikiriki.jpg",
        sizes: "80g",
        flavor: { bs: "Kečap i kikiriki u jednom zalogaju.", en: "Ketchup and peanut in one bite." },
        tastes: ["kecap", "kikiriki", "kinoa"],
        badges: ["novo"],
      },
      {
        name: { bs: "Q Flips slani", en: "Q Flips Salted" },
        image: "/images/products/quinoa-flips-q-flips-slani.jpg",
        sizes: "60g",
        flavor: { bs: "Lagano slani flips od kinoe i kukuruza.", en: "Lightly salted quinoa and corn puffs." },
        tastes: ["slano", "kinoa", "kukuruz"],
        badges: ["novo"],
      },
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
    ingredientImage: "/images/ingredients/popcorn-bowl.jpg",
    ingredientAlt: { bs: "Zdjela svježih kokica", en: "A bowl of fresh popcorn" },
    accent: "#C98A3B",
    accentDeep: "#2B2350",
    skus: [
      {
        name: { bs: "Pop Star kokice, slane", en: "Pop Star Popcorn, Salted" },
        image: "/images/products/popcorn-pop-star-kokice-slane.jpg",
        sizes: "40g",
        flavor: { bs: "Klasične slane kokice za film.", en: "Classic salted movie popcorn." },
        tastes: ["slano", "kukuruz", "hrskavo"],
      },
      { name: { bs: "Pop Star kokice, slane", en: "Pop Star Popcorn, Salted" }, sizes: "120g" },
      {
        name: { bs: "Pop Star kokice, slane, kantica", en: "Pop Star Popcorn, Salted, tub" },
        image: "/images/products/popcorn-pop-star-kokice-slane-kantica.jpg",
        sizes: "250g",
        flavor: { bs: "Slane kokice u kantici, za cijelo društvo.", en: "Salted popcorn in a tub, for the whole crowd." },
        tastes: ["slano", "kukuruz", "hrskavo"],
      },
      {
        name: { bs: "Pop Star kokice, čoko", en: "Pop Star Popcorn, Choco" },
        image: "/images/products/popcorn-pop-star-kokice-coko.jpg",
        sizes: "100g",
        flavor: { bs: "Kokice pod slojem kakaa.", en: "Popcorn under a layer of cocoa." },
        tastes: ["coko", "slatko", "hrskavo"],
      },
      {
        name: { bs: "Pop Star kokice, karamel", en: "Pop Star Popcorn, Caramel" },
        image: "/images/products/popcorn-pop-star-kokice-karamel.jpg",
        sizes: "100g",
        flavor: { bs: "Karamel kokice koje nestanu prije filma.", en: "Caramel popcorn that's gone before the movie starts." },
        tastes: ["karamel", "slatko", "hrskavo"],
        badges: ["hit"],
      },
      {
        name: { bs: "Pop Star zrno za kokice", en: "Pop Star Popcorn kernels" },
        image: "/images/products/popcorn-pop-star-zrno-za-kokice.jpg",
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
    tagline: { bs: "Vafel listovi za kolače.", en: "Wafer sheets for cakes." },
    description: {
      // The Tima pack is plain wafer sheets ("vafel listovi") for home
      // baking — the cream goes in at home, not at the plant.
      bs: "Tanki, hrskavi vafel listovi, pečeni između vrućih metalnih ploča — tehnika stara vjekovima, nekad rađena ručno na vatri, danas na modernim mašinama. Osnova za domaće kolače: listove kod kuće filujete kremom po svom ukusu i sječete na komade.",
      en: "Thin, crisp wafer sheets baked between hot metal plates — a technique centuries old, once done by hand over an open fire, now done on modern machines. The base for home-made cakes: layer the sheets with your own cream filling at home and cut them into pieces.",
    },
    image: "/images/categories/wafers.jpg",
    imageAlt: { bs: "Pakovanje Tima oblatne", en: "Tima Wafers package" },
    ingredientImage: "/images/ingredients/wafers-bowl.jpg",
    ingredientAlt: { bs: "Kolač od oblatni u zdjelici", en: "Wafer cake pieces in a small bowl" },
    accent: "#C97FA0",
    accentDeep: "#8A4A63",
    skus: [
      {
        name: { bs: "Tima oblatne", en: "Tima Wafers" },
        image: "/images/products/wafers-tima-oblatne.jpg",
        sizes: "200g",
        flavor: { bs: "Hrskavi vafel listovi za domaće kolače.", en: "Crisp wafer sheets for home-made cakes." },
        tastes: ["hrskavo", "zaKolace"],
      },
    ],
  },
  {
    slug: "prunes",
    name: { bs: "Suhe šljive", en: "Dried Prunes" },
    tagline: { bs: "Samo voće i vrijeme.", en: "Just fruit and time." },
    // Voćar asked for the Požegača sentence to go. "Bez koštice" went with
    // it: this text also stands on the prunes sold with the stone.
    description: {
      bs: "Prirodno sušene šljive, bez dodanog šećera — samo voće i vrijeme.",
      en: "Naturally sun-dried plums, with no added sugar — just fruit and time.",
    },
    image: "/images/categories/prunes.jpg",
    imageAlt: { bs: "Pakovanje Čoko šljiva", en: "Choco Prunes package" },
    ingredientImage: "/images/ingredients/prunes-bowl.jpg",
    ingredientAlt: { bs: "Zdjela suhih šljiva", en: "A bowl of dried prunes" },
    accent: "#7A3B6B",
    accentDeep: "#4B2145",
    skus: [
      {
        name: { bs: "Čoko šljive bez koštice", en: "Choco Prunes pitted" },
        image: "/images/products/prunes-coko-sljive-bez-kostice.jpg",
        sizes: "200g",
        flavor: { bs: "Suha šljiva u tankom sloju belgijske čokolade.", en: "Dried plum in a thin layer of Belgian chocolate." },
        tastes: ["coko", "suhoVoce", "bezKostice"],
        badges: ["hit"],
      },
      {
        name: { bs: "Suhe šljive bez koštice", en: "Prunes pitted" },
        image: "/images/products/prunes-suhe-sljive-bez-kostice.jpg",
        sizes: "200g",
        flavor: { bs: "Samo voće i vrijeme, bez koštice.", en: "Just fruit and time, pitted." },
        tastes: ["suhoVoce", "bezKostice", "bezSecera"],
      },
      { name: { bs: "Suhe šljive bez koštice", en: "Prunes pitted" }, sizes: "200g, 400g" },
      {
        name: { bs: "Suhe šljive bez koštice, kutija", en: "Prunes pitted, box" },
        image: "/images/products/prunes-suhe-sljive-bez-kostice-kutija.jpg",
        sizes: "200g",
        flavor: { bs: "Samo voće i vrijeme, bez koštice, u kutiji.", en: "Just fruit and time, pitted, in a box." },
        tastes: ["suhoVoce", "bezKostice", "bezSecera"],
      },
      {
        name: { bs: "Suhe šljive", en: "Prunes" },
        image: "/images/products/prunes-suhe-sljive.jpg",
        sizes: "250g, 500g",
        flavor: { bs: "Cijela sušena šljiva, bez dodanog šećera.", en: "Whole dried plum, no added sugar." },
        tastes: ["suhoVoce", "bezSecera"],
      },
      {
        name: { bs: "Suhe šljive bez koštice, karton", en: "Prunes pitted, carton" },
        image: "/images/products/prunes-suhe-sljive-bez-kostice-10kg.jpg",
        sizes: "10kg",
        flavor: { bs: "Suhe šljive bez koštice u kartonu od 10 kg.", en: "Pitted prunes in a 10 kg carton." },
        tastes: ["suhoVoce", "bezKostice", "bezSecera"],
      },
    ],
  },
  {
    slug: "peanuts",
    name: { bs: "Kikiriki", en: "Peanuts" },
    tagline: { bs: "Prženi, slani, hrskavi.", en: "Roasted, salted, crunchy." },
    description: {
      bs: "Kikiriki tehnički nije orah nego mahunarka — raste u mahunama pod zemljom, baš kao grah i leća, pa nosi i više proteina od većine pravih oraha. Zrna se prže na visokoj temperaturi dok ne dobiju hrskavu teksturu, a zatim se sole dok su još topla.",
      en: "Peanuts aren't technically nuts at all — they're legumes that grow underground in pods, like beans and lentils, which is part of why they pack more protein than most true tree nuts. The kernels are roasted at high heat until crisp, then salted while still warm.",
    },
    image: "/images/categories/peanuts.jpg",
    imageAlt: { bs: "Pakovanje Sneki kikiriki, slani i prženi", en: "Sneki peanuts, salted and roasted, package" },
    ingredientImage: "/images/ingredients/peanuts-bowl.jpg",
    ingredientAlt: { bs: "Zdjela prženog slanog kikirikija", en: "A bowl of roasted salted peanuts" },
    accent: "#2E7FB8",
    accentDeep: "#1B4F72",
    skus: [
      {
        name: { bs: "Sneki kikiriki obloženi, paprika", en: "Sneki Coated peanuts, paprika" },
        image: "/images/products/peanuts-sneki-kikiriki-oblozeni-paprika.jpg",
        sizes: "85g",
        flavor: { bs: "Hrskava obloga, puna ukusa paprike.", en: "Crunchy coating, full paprika flavor." },
        tastes: ["paprika", "hrskavo", "slano"],
      },
      {
        name: { bs: "Sneki kikiriki obloženi, čili", en: "Sneki Coated peanuts, chili" },
        image: "/images/products/peanuts-sneki-kikiriki-oblozeni-cili.jpg",
        sizes: "85g",
        flavor: { bs: "Hrskava obloga sa ljutim čilijem.", en: "Crunchy coating with a chili kick." },
        tastes: ["cili", "pikant", "hrskavo"],
      },
      {
        name: { bs: "Sneki kikiriki slani, prženi", en: "Sneki Peanuts, salted & roasted" },
        image: "/images/products/peanuts-sneki-kikiriki-slani-przeni.jpg",
        sizes: "200g, 400g",
        flavor: { bs: "Klasik: pržen, slan, hrskav.", en: "The classic: roasted, salted, crunchy." },
        tastes: ["slano", "przeno", "hrskavo"],
      },
      { name: { bs: "Sneki kikiriki slani, prženi", en: "Sneki Peanuts, salted & roasted" }, sizes: "50g, 100g" },
      {
        name: { bs: "Timi kikiriki, limenka", en: "Timi Peanuts, tin" },
        image: "/images/products/peanuts-timi-kikiriki-limenka.jpg",
        // The tin itself reads 180 g; vocar.ba's shop lists 185 g.
        sizes: "180g",
        flavor: { bs: "Prženi i slani kikiriki u limenci — za sto i za put.", en: "Roasted salted peanuts in a tin — for the table and the road." },
        tastes: ["slano", "przeno", "limenka"],
      },
    ],
  },
  {
    slug: "peanut-butter",
    name: { bs: "Puter od kikirikija", en: "Peanut Butter" },
    tagline: { bs: "Pržen kikiriki u tegli.", en: "Roasted peanuts in a jar." },
    description: {
      bs: "Pržen kikiriki, mljeven u glatku kremastu pastu ili ostavljen hrskav sa sitnim komadićima. Kikiriki je zapravo mahunarka, a ne orah, što mu daje izuzetno visok sadržaj proteina — savršena osnova za namaz.",
      en: "Roasted peanuts, ground into a smooth creamy paste or left crunchy with small peanut pieces. Peanuts are technically a legume, not a nut, which gives them an unusually high protein content — a great base for a spread.",
    },
    image: "/images/products/peanut-butter-puter-od-kikirikija-kremasti-100-v2.jpg",
    imageAlt: { bs: "Teglica Puter od kikirikija, kremasti 100%", en: "Peanut Butter, Creamy 100% jar" },
    ingredientImage: "/images/ingredients/peanut-butter.jpg",
    ingredientAlt: { bs: "Otvorena tegla putera od kikirikija sa kašikom", en: "An open jar of peanut butter with a spoon" },
    accent: "#2D5FA0",
    accentDeep: "#1B3A66",
    skus: [
      {
        name: { bs: "Puter od kikirikija, kremasti 100%", en: "Peanut Butter, Creamy 100%" },
        image: "/images/products/peanut-butter-puter-od-kikirikija-kremasti-100-v2.jpg",
        sizes: "350g",
        flavor: { bs: "Glatka pasta od prženog kikirikija.", en: "Smooth roasted-peanut spread." },
        tastes: ["stoPosto", "kremasto", "kikiriki"],
        badges: ["hit"],
      },
      {
        name: { bs: "Puter od kikirikija, kremasti", en: "Peanut Butter, Creamy" },
        image: "/images/products/peanut-butter-puter-od-kikirikija-kremasti.jpg",
        sizes: "350g",
        flavor: { bs: "Glatka kremasta pasta od prženog kikirikija.", en: "Smooth creamy roasted-peanut spread." },
        tastes: ["kremasto", "kikiriki", "przeno"],
      },
      {
        name: { bs: "Puter od kikirikija, hrskavi", en: "Peanut Butter, Crunchy" },
        image: "/images/products/peanut-butter-puter-od-kikirikija-hrskavi.jpg",
        sizes: "350g",
        flavor: { bs: "Kremasti puter sa komadićima kikirikija.", en: "Creamy butter with peanut pieces." },
        tastes: ["hrskavo", "kikiriki", "przeno"],
      },
      { name: { bs: "Puter od kikirikija, kremasti 100%", en: "Peanut Butter, Creamy 100%" }, sizes: "227g" },
      { name: { bs: "Puter od kikirikija, kremasti", en: "Peanut Butter, Creamy" }, sizes: "227g" },
      { name: { bs: "Puter od kikirikija, hrskavi", en: "Peanut Butter, Crunchy" }, sizes: "227g" },
    ],
  },
  {
    slug: "chips",
    name: { bs: "Pelet čips", en: "Pellet Chips" },
    tagline: { bs: "Hrskavi kornetići.", en: "Crunchy cones." },
    description: {
      bs: "Pelet čips nije klasični krompirov čips: pravi se od peleta — malih, osušenih komadića tijesta — koji se kratko prže, pa se u vrelom ulju naglo napušu u lagane, hrskave kornetiće. Dostupan u ukusu piletine, pavlake ili čilija.",
      en: "Pellet chips aren't classic potato chips: they start as pellets — small pieces of dried dough — that are briefly fried and puff up in the hot oil into light, crunchy cones. Available in chicken, sour cream, or chili flavor.",
    },
    image: "/images/categories/chips.jpg",
    imageAlt: { bs: "Pakovanje Crispy Fun, piletina", en: "Crispy Fun, Chicken package" },
    ingredientImage: "/images/ingredients/chips.jpg",
    ingredientAlt: { bs: "Zdjela hrskavih kornetića", en: "A bowl of crunchy snack cones" },
    accent: "#E0522B",
    accentDeep: "#1A1712",
    skus: [
      {
        name: { bs: "Crispy Fun, piletina", en: "Crispy Fun, Chicken" },
        image: "/images/products/chips-crispy-fun-piletina.jpg",
        sizes: "50g, 100g",
        flavor: { bs: "Hrskavi kornetići sa ukusom piletine.", en: "Crunchy cones with chicken flavor." },
        tastes: ["piletina", "hrskavo", "slano"],
        badges: ["hit"],
      },
      {
        name: { bs: "Crispy Fun, pavlaka", en: "Crispy Fun, Sour Cream" },
        // The Sour Cream & Onion pack Voćar sent (October 2026); the name stays "pavlaka".
        image: "/images/products/chips-crispy-fun-pavlaka-luk.jpg",
        sizes: "50g, 100g",
        flavor: { bs: "Hrskavi kornetići sa ukusom pavlake i luka.", en: "Crunchy cones with sour cream and onion flavor." },
        tastes: ["pavlaka", "hrskavo", "slano"],
      },
      {
        name: { bs: "Crispy Fun, čili", en: "Crispy Fun, Chili" },
        image: "/images/products/chips-crispy-fun-cili.jpg",
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
      bs: "Čokoladne kuglice i krem bar sa lješnjacima — dvije različite poslastice za doručak ili užinu.",
      en: "Chocolate cereal balls and a hazelnut cream bar — two different treats for breakfast or a snack.",
    },
    image: "/images/categories/cereals.jpg",
    imageAlt: { bs: "Pakovanje Happy Cerios", en: "Happy Cerios package" },
    ingredientImage: "/images/ingredients/cereals-bowl.jpg",
    ingredientAlt: { bs: "Zdjela čokoladnih kuglica s mlijekom", en: "A bowl of chocolate cereal balls with milk" },
    accent: "#D98A2E",
    accentDeep: "#6B4226",
    skus: [
      {
        name: { bs: "Nutto krem bar, lješnjak", en: "Nutto Cream Bar, hazelnut" },
        image: "/images/products/cereals-nutto-krem-bar-ljesnjak.jpg",
        sizes: "80g",
        flavor: { bs: "Krem bar sa lješnjacima.", en: "Hazelnut cream bar." },
        tastes: ["ljesnjak", "kremasto", "coko"],
        badges: ["novo"],
      },
      {
        // The pack says "kuglice sa vitaminima", but Voćar confirmed there
        // are no added vitamins — the site doesn't repeat the claim.
        name: { bs: "Happy Cerios, čokoladne kuglice", en: "Happy Cerios, chocolate cereal balls" },
        image: "/images/products/cereals-happy-cerios-kuglice-sa-vitaminima.jpg",
        sizes: "250g",
        flavor: { bs: "Čokoladne kuglice za doručak.", en: "Chocolate cereal balls for breakfast." },
        tastes: ["coko", "slatko", "dorucak"],
        badges: ["novo"],
      },
    ],
  },
];

/** Filter links shared before the three flips lines merged still land on flips. */
export const legacyCategorySlugs: Record<string, string> = {
  "flips-time": "flips",
  "timi-flips": "flips",
  "quinoa-flips": "flips",
};

export const totalSkuCount =categories.reduce((sum, c) => sum + c.skus.length, 0);
