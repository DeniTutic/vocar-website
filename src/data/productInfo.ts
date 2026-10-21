import type { Localized } from "./content";

/**
 * Per 100 g unless `per` says otherwise. Values are strings in the old
 * label's own decimal-comma form ("26,70"), copied as published — a missing
 * field means the old shop printed "/" there.
 */
export interface Nutrition {
  per: string;
  energyKj?: string;
  energyKcal?: string;
  fat?: string;
  saturates?: string;
  carbs?: string;
  sugars?: string;
  fibre?: string;
  protein?: string;
  salt?: string;
  /** One label (Timi flips with peanuts) gives sodium instead of salt. */
  sodium?: string;
}

export interface ProductInfo {
  /** The declared ingredient list. Absent where the old shop had none. */
  ingredients?: Localized;
  /**
   * What the product contains, as Voćar declared it ("Alergen: …"). Overrides
   * the allergens products.ts derives from the name; shown as "Sadrži: …".
   */
  allergens?: Localized;
  /** The may-contain-traces line — the old shop's, or Voćar's correction of it. */
  allergenNote?: Localized;
  nutrition?: Nutrition;
  /** Where this came from, for re-checking: the old vocar.ba product page or Voćar's correction list. */
  source: string;
}

const shop =(product: string) => `https://www.vocar.ba/?product=${product}`;
/** Voćar's own corrections, sent as "Korekcije web stranica.docx" (October 2026). */
const CORRECTIONS = "Korekcije web stranica (Voćar, October 2026)";

const FLIPS_TIME_TRACES: Localized = {
  bs: "Može da sadrži u tragovima: gluten, soju, slačicu, sezam, jaja, mlijeko i mliječne proizvode.",
  en: "May contain traces of: gluten, soy, mustard, sesame, eggs, milk and dairy products.",
};
const TIMI_TRACES: Localized = {
  bs: "Može da sadrži u tragovima: gluten i mliječne sastojke.",
  en: "May contain traces of: gluten and dairy ingredients.",
};
const Q_FLIPS_TRACES: Localized = {
  bs: "Može da sadrži u tragovima: gluten, soju, kikiriki, mlijeko i mliječne proizvode.",
  en: "May contain traces of: gluten, soy, peanuts, milk and dairy products.",
};
const Q_FLIPS_NUTRITION: Nutrition = {
  per: "100 g",
  energyKj: "2023",
  energyKcal: "483",
  fat: "22,70",
  saturates: "6,20",
  carbs: "52,90",
  sugars: "2,50",
  protein: "16,70",
  salt: "2,10",
};
const POPCORN_TRACES: Localized = {
  bs: "Može sadržavati gluten u tragovima: gluten, kikiriki, soju, mliječne sastojke.",
  en: "May contain traces of: gluten, peanuts, soy, dairy ingredients.",
};
const SALTED_POPCORN_INGREDIENTS: Localized = {
  bs: "Kukuruz kokičar, suncokretovo ulje, so.",
  en: "Popping corn, sunflower oil, salt.",
};
const SALTED_POPCORN_NUTRITION: Nutrition = {
  per: "100 g",
  energyKj: "2060",
  energyKcal: "491",
  fat: "22,3",
  saturates: "10,5",
  carbs: "63,6",
  sugars: "1,8",
  fibre: "3,3",
  protein: "9,06",
  salt: "3,5",
};
const SOY: Localized = { bs: "Soja.", en: "Soy." };
const PRUNE_INGREDIENTS: Localized = {
  bs: "Šljiva, voda, konzervans E200.",
  en: "Plums, water, preservative E200.",
};
const PRUNE_TRACES: Localized = {
  bs: "Može da sadrži tragove kikirikija.",
  en: "May contain traces of peanuts.",
};
const PRUNE_NUTRITION: Nutrition = {
  per: "100 g",
  energyKj: "800",
  energyKcal: "190",
  fat: "0,1",
  saturates: "0,1",
  carbs: "43,00",
  sugars: "43,00",
  fibre: "7,80",
  protein: "1,5",
  salt: "0,05",
};
const SNEKI_COATED_TRACES: Localized = {
  bs: "Može da sadrži u tragovima: soju, jaja, senf, celer, kikiriki.",
  en: "May contain traces of: soy, eggs, mustard, celery, peanuts.",
};
const SNEKI_COATED_NUTRITION: Nutrition = {
  per: "100 g",
  energyKj: "2259",
  energyKcal: "542",
  fat: "4,00",
  saturates: "10,00",
  carbs: "44,00",
  sugars: "3,70",
  fibre: "4,5",
  protein: "13,00",
  salt: "2,00",
};
const snekiCoatedIngredients = (spice: Localized): Localized => ({
  bs: `Kikiriki, pšenični škrob, modifikovani kukuruzni škrob, palmino ulje, modifikovani kukuruzni škrob E 4122, kukuruzni škrob, dekstroza, maltodekstrin, sol, mješavina začina (pojačivač ukusa: mononatrijum glutamat, bijeli luk u prahu, ${spice.bs}). Pojačivač ukusa: dinatrijum gvanilat, dinatrijum inozinat, aroma paprike, boja za hranu narandžasta.`,
  en: `Peanuts, wheat starch, modified corn starch, palm oil, modified corn starch E 4122, corn starch, dextrose, maltodextrin, salt, spice blend (flavour enhancer: monosodium glutamate, garlic powder, ${spice.en}). Flavour enhancers: disodium guanylate, disodium inosinate, paprika flavouring, orange food colouring.`,
});
const PEANUT_BUTTER_TRACES: Localized = {
  bs: "Može da sadrži u tragovima: mlijeko, gluten, soju i orašaste sastojke.",
  en: "May contain traces of: milk, gluten, soy and nuts.",
};
const PEANUT_BUTTER_95: Localized = {
  bs: "95% pečeni kikiriki, hidrogenizirano palmino/suncokretovo ulje, šećer, sol.",
  en: "95% roasted peanuts, hydrogenated palm/sunflower oil, sugar, salt.",
};
const PEANUT_BUTTER_NUTRITION: Nutrition = {
  per: "100 g",
  energyKj: "2615",
  energyKcal: "563",
  fat: "51",
  saturates: "10",
  carbs: "14,00",
  sugars: "10,01",
  fibre: "26,00",
  protein: "26",
  salt: "0,33",
};
// Voćar gave one table for all three Crispy Fun flavours.
const CRISPY_FUN_NUTRITION: Nutrition = {
  per: "100 g",
  energyKj: "2232",
  energyKcal: "534",
  fat: "32",
  saturates: "3,5",
  carbs: "55,6",
  sugars: "3,1",
  fibre: "2,1",
  protein: "2,9",
  salt: "2,15",
};
const CRISPY_FUN_TRACES: Localized = {
  bs: "Može da sadrži kikiriki u tragovima.",
  en: "May contain traces of peanuts.",
};

/**
 * Ingredients, allergen notes and nutrition, keyed by product slug. First
 * copied from the old vocar.ba shop (October 2026), typos included; entries
 * Voćar has since corrected follow its correction list instead. Numbers
 * stay exactly as given — don't "fix" them without Voćar.
 */
export const productInfo: Record<string, ProductInfo> = {
  // ── Flips ────────────────────────────────────────────────────────────
  "flips-flips-time-pizza": {
    ingredients: {
      bs: "Kukuruzni griz, mljeveni kikiriki, biljno ulje (palmina), aroma „pizza“, sol, beta karoten, oregano.",
      en: "Corn grits, ground peanuts, vegetable oil (palm), \"pizza\" flavouring, salt, beta-carotene, oregano.",
    },
    allergenNote: FLIPS_TIME_TRACES,
    nutrition: { per: "100 g", energyKj: "2300", energyKcal: "480", fat: "26,70", saturates: "10,70", carbs: "52,80", sugars: "1,20", fibre: "3,3", protein: "12,80", salt: "1,40" },
    source: shop("flips-time-pizza-150-g-pakiranje-16-kom-karton"),
  },
  "flips-flips-time-kikiriki": {
    ingredients: {
      bs: "Kukuruzni griz, mljeveni kikiriki, biljno ulje (palmina), sol.",
      en: "Corn grits, ground peanuts, vegetable oil (palm), salt.",
    },
    allergenNote: FLIPS_TIME_TRACES,
    // Voćar's corrected table. 2300 kJ and 480 kcal don't match (480 kcal is
    // about 2010 kJ) — kept as given until Voćar confirms.
    nutrition: { per: "100 g", energyKj: "2300", energyKcal: "480", fat: "24", saturates: "9,7", carbs: "52,80", sugars: "1,2", fibre: "3,3", protein: "14", salt: "0,8" },
    source: CORRECTIONS,
  },
  "flips-flips-time-pikant": {
    ingredients: {
      bs: "Kukuruzni griz, mljeveni kikiriki, biljno ulje (palmina), aroma, sol.",
      en: "Corn grits, ground peanuts, vegetable oil (palm), flavouring, salt.",
    },
    allergenNote: FLIPS_TIME_TRACES,
    nutrition: { per: "100 g", energyKj: "2300", energyKcal: "480", fat: "24,00", saturates: "9,70", carbs: "52,80", sugars: "1,20", fibre: "3,3", protein: "14,0", salt: "1,4" },
    source: shop("flips-time-150-g-pikant-150-g-pakiranje-16-kom-karton"),
  },
  "flips-timi-pikant": {
    ingredients: {
      bs: "Kukuruzna krupica, biljna mast (palmina), aroma (dvopek, šećer, ojačivač okusa E 621, so), so max 3,5%, crvena paprika.",
      en: "Corn semolina, vegetable fat (palm), flavouring (rusk, sugar, flavour enhancer E 621, salt), salt max. 3.5%, red paprika.",
    },
    allergenNote: TIMI_TRACES,
    nutrition: { per: "100 g", energyKj: "1993", energyKcal: "476", fat: "26,70", saturates: "10,70", carbs: "52,80", sugars: "1,20", fibre: "3,3", protein: "12,80", salt: "0,80" },
    source: shop("flips-pikant-timi-35-g-pakiranje-30-kom-karton"),
  },
  "flips-timi-flips-sa-kikirikijem": {
    ingredients: {
      bs: "Kukuruzna krupica, kikiriki (min 22%), biljna mast (palmina), sojino brašno, jestiva so max. 3,5%.",
      en: "Corn semolina, peanuts (min. 22%), vegetable fat (palm), soy flour, edible salt max. 3.5%.",
    },
    allergenNote: TIMI_TRACES,
    nutrition: { per: "100 g", energyKj: "2301", energyKcal: "550", fat: "34,30", saturates: "8,50", carbs: "44,20", sugars: "5,00", fibre: "1,95", protein: "16,00", sodium: "0,48" },
    source: shop("flips-timi-25-g-sa-kikirikijem-pakiranje-50-kom-karton"),
  },
  // Q Flips ingredients are Voćar's corrections; the shared nutrition table
  // and traces line are still the old shop's.
  "flips-q-flips-slatki-kukuruz": {
    ingredients: {
      bs: "Kukuruzni griz, kvinoja, suncokretovo ulje, aroma slatkog kukuruza, so.",
      en: "Corn grits, quinoa, sunflower oil, sweet corn flavouring, salt.",
    },
    allergenNote: Q_FLIPS_TRACES,
    nutrition: Q_FLIPS_NUTRITION,
    source: shop("quinoa-flips-slatki-kukuruz-80g-pakiranje-20-komada"),
  },
  "flips-q-flips-kikiriki": {
    ingredients: {
      bs: "Kukuruzni griz, kikiriki, kvinoja, suncokretovo ulje, so.",
      en: "Corn grits, peanuts, quinoa, sunflower oil, salt.",
    },
    allergenNote: Q_FLIPS_TRACES,
    nutrition: Q_FLIPS_NUTRITION,
    source: shop("quinoja-flips-kikiriki-80g-pakiranje-20-komada"),
  },
  "flips-q-flips-bez-dodatih-masti-i-soli": {
    ingredients: { bs: "Kukuruzni griz, kvinoja.", en: "Corn grits, quinoa." },
    allergenNote: Q_FLIPS_TRACES,
    nutrition: Q_FLIPS_NUTRITION,
    source: shop("quinoa-flips-bez-dodatnih-masti-i-soli-60g-pakiranje-20-komada"),
  },
  "flips-q-flips-kecap-i-kikiriki": {
    ingredients: {
      bs: "Kukuruzni griz, kvinoja, kikiriki, suncokretovo ulje, aroma kečapa, so.",
      en: "Corn grits, quinoa, peanuts, sunflower oil, ketchup flavouring, salt.",
    },
    allergenNote: Q_FLIPS_TRACES,
    nutrition: Q_FLIPS_NUTRITION,
    source: shop("quinoa-flips-kikiriki-kecap-80g-pakiranje-20-komada"),
  },
  "flips-q-flips-slani": {
    ingredients: { bs: "Kukuruzni griz, kvinoja, suncokretovo ulje, so.", en: "Corn grits, quinoa, sunflower oil, salt." },
    allergenNote: Q_FLIPS_TRACES,
    nutrition: Q_FLIPS_NUTRITION,
    source: shop("quinoa-flips-slani-60g-pakiranje-20-komada"),
  },

  // ── Popcorn ──────────────────────────────────────────────────────────
  // Salted (40 g, 120 g and the 250 g tub): ingredients and table from
  // Voćar's corrections; the traces line is still the old shop's.
  "popcorn-pop-star-kokice-slane": {
    ingredients: SALTED_POPCORN_INGREDIENTS,
    allergenNote: POPCORN_TRACES,
    nutrition: SALTED_POPCORN_NUTRITION,
    source: CORRECTIONS,
  },
  "popcorn-pop-star-kokice-slane-kantica": {
    ingredients: SALTED_POPCORN_INGREDIENTS,
    allergenNote: POPCORN_TRACES,
    nutrition: SALTED_POPCORN_NUTRITION,
    source: CORRECTIONS,
  },
  // Choco and caramel: ingredients and "Alergen: soja" from Voćar's
  // corrections; nutrition and traces line still the old shop's.
  "popcorn-pop-star-kokice-coko": {
    ingredients: {
      bs: "Kukuruz kokičar, šećer, kakao, glukozni sirup, biljna mast palmina/suncokretova, sojin lecitin.",
      en: "Popping corn, sugar, cocoa, glucose syrup, vegetable fat (palm/sunflower), soy lecithin.",
    },
    allergens: SOY,
    allergenNote: POPCORN_TRACES,
    nutrition: { per: "100 g", energyKj: "1583", energyKcal: "373", fat: "2,40", saturates: "1,10", carbs: "85,00", sugars: "38,00", fibre: "0", protein: "3,1", salt: "0,5" },
    source: shop("popcorn-coko-100-g-pakiranje-20-kom-karton"),
  },
  "popcorn-pop-star-kokice-karamel": {
    ingredients: {
      bs: "Kukuruz kokičar, šećer, glukozni sirup, biljna mast palmina/suncokretova, sojin lecitin.",
      en: "Popping corn, sugar, glucose syrup, vegetable fat (palm/sunflower), soy lecithin.",
    },
    allergens: SOY,
    allergenNote: POPCORN_TRACES,
    nutrition: { per: "100 g", energyKj: "1583", energyKcal: "373", fat: "20,00", saturates: "1,00", carbs: "85,00", sugars: "38,00", fibre: "0", protein: "3,0", salt: "0,5" },
    source: shop("popcorn-caramel-100-g-pakiranje-20-kom-karton"),
  },
  "popcorn-pop-star-zrno-za-kokice": {
    ingredients: { bs: "Kukuruz kokičar.", en: "Popping corn." },
    allergenNote: POPCORN_TRACES,
    nutrition: { per: "100 g", energyKj: "1588", energyKcal: "376", fat: "3,4", saturates: "0,6", carbs: "70,90", sugars: "1,4", protein: "10,2", salt: "0,01" },
    source: shop("kukuruz-kokicar-tegla-350-g-pakiranje-12-kom-karton"),
  },

  // ── Wafers ───────────────────────────────────────────────────────────
  "wafers-tima-oblatne": {
    ingredients: {
      bs: "Pšenično brašno, kukuruzni škrob, sojino brašno, biljna mast (palmina), voda, tvar za rahljenje: E 503, E 500, sol, sojin lecitin.",
      en: "Wheat flour, corn starch, soy flour, vegetable fat (palm), water, raising agents: E 503, E 500, salt, soy lecithin.",
    },
    allergenNote: {
      bs: "Može da sadrži u tragovima: kikiriki, orašaste plodove i mliječne sastojke.",
      en: "May contain traces of: peanuts, nuts and dairy ingredients.",
    },
    nutrition: { per: "100 g", energyKj: "1723", energyKcal: "407", fat: "3,4", saturates: "0,7", carbs: "76,60", sugars: "1,4", fibre: "3,7", protein: "13,70", salt: "1,20" },
    source: shop("oblatne-tima-sa-listom-200-g-pakiranje-23-kom-karton"),
  },

  // ── Prunes ───────────────────────────────────────────────────────────
  "prunes-coko-sljive-bez-kostice": {
    ingredients: { bs: "Suha šljiva, čokoladni preliv.", en: "Dried plum, chocolate coating." },
    allergenNote: {
      bs: "Može da sadrži u tragovima: mlijeko, gluten, soju i orašaste sastojke.",
      en: "May contain traces of: milk, gluten, soy and nuts.",
    },
    nutrition: { per: "100 g", energyKj: "1506", energyKcal: "377", fat: "11", saturates: "10", carbs: "60,00", sugars: "38,00", fibre: "4,80", protein: "2,4", salt: "0,01" },
    source: shop("suha-sljiva-bez-kostice-sa-cokoladnim-prelivom-200-g-pakiranje-10-kom-karton"),
  },
  // The boxed 200 g page; the bagged 200 g/400 g pages print 643 kcal
  // beside the same 800 kJ.
  "prunes-suhe-sljive-bez-kostice": {
    ingredients: PRUNE_INGREDIENTS,
    allergenNote: PRUNE_TRACES,
    nutrition: PRUNE_NUTRITION,
    source: shop("suha-sljiva-bez-kostice-200-g-12-1-kutija"),
  },
  "prunes-suhe-sljive": {
    ingredients: PRUNE_INGREDIENTS,
    allergenNote: PRUNE_TRACES,
    nutrition: PRUNE_NUTRITION,
    source: shop("suha-sljiva-sa-kosticom-500-g-pakiranje-15-kom-karton"),
  },

  // ── Peanuts ──────────────────────────────────────────────────────────
  "peanuts-sneki-kikiriki-oblozeni-paprika": {
    ingredients: snekiCoatedIngredients({ bs: "paprika u prahu", en: "paprika powder" }),
    allergenNote: SNEKI_COATED_TRACES,
    nutrition: SNEKI_COATED_NUTRITION,
    source: shop("kikiriki-sneki-oblozeni-paprika-85g-18kom-karton"),
  },
  "peanuts-sneki-kikiriki-oblozeni-cili": {
    ingredients: snekiCoatedIngredients({ bs: "chilli aroma", en: "chilli flavouring" }),
    allergenNote: SNEKI_COATED_TRACES,
    nutrition: SNEKI_COATED_NUTRITION,
    source: shop("kikiriki-sneki-oblozeni-chilli-85g-18kom-karton"),
  },
  "peanuts-sneki-kikiriki-slani-przeni": {
    ingredients: { bs: "Kikiriki, suncokretovo ulje, kuhinjska sol.", en: "Peanuts, sunflower oil, table salt." },
    allergenNote: {
      bs: "Može da sadrži u tragovima: jezgrasto voće, kikiriki.",
      en: "May contain traces of: tree nuts, peanuts.",
    },
    nutrition: { per: "100 g", energyKj: "2577", energyKcal: "621", fat: "50,00", saturates: "11,00", carbs: "14,00", sugars: "3,40", protein: "25,00", salt: "1,98" },
    source: shop("kikiriki-sneki-200g-30kom-karton"),
  },
  "peanuts-timi-kikiriki-limenka": {
    ingredients: {
      bs: "Kikiriki, jestivo biljno ulje (suncokretovo), jestiva sol max. 3,5%.",
      en: "Peanuts, edible vegetable oil (sunflower), edible salt max. 3.5%.",
    },
    allergenNote: {
      bs: "Može da sadrži u tragovima: gluten, soju, slačicu, sezam, jaja, mlijeko i mliječne proizvode.",
      en: "May contain traces of: gluten, soy, mustard, sesame, eggs, milk and dairy products.",
    },
    // The old page heads this table "185g", not "100g".
    nutrition: { per: "185 g", energyKj: "2575", energyKcal: "615", fat: "50,00", saturates: "9,10", carbs: "14,00", sugars: "5,40", protein: "25,0", salt: "1,0" },
    source: shop("kikiriki-timi-185-g-limenka-pakiranje-24-kom-karton"),
  },

  // ── Peanut butter ────────────────────────────────────────────────────
  "peanut-butter-puter-od-kikirikija-kremasti-100": {
    ingredients: { bs: "100% kikiriki.", en: "100% peanuts." },
    allergenNote: PEANUT_BUTTER_TRACES,
    nutrition: { per: "100 g", energyKj: "2615", energyKcal: "563", fat: "51", saturates: "10", carbs: "14,00", sugars: "10,01", protein: "26", salt: "0,33" },
    source: shop("kikiriki-maslac-100-350g-staklo-12-1"),
  },
  "peanut-butter-puter-od-kikirikija-kremasti": {
    ingredients: PEANUT_BUTTER_95,
    allergenNote: PEANUT_BUTTER_TRACES,
    nutrition: PEANUT_BUTTER_NUTRITION,
    source: shop("kikiriki-maslac-creamy-crveni-350-g-pakiranje-12-kom-karton"),
  },
  "peanut-butter-puter-od-kikirikija-hrskavi": {
    ingredients: PEANUT_BUTTER_95,
    allergenNote: PEANUT_BUTTER_TRACES,
    nutrition: PEANUT_BUTTER_NUTRITION,
    source: shop("kikiriki-maslac-crunchy-plavi-350-g-pakiranje-12-kom-karton"),
  },

  // ── Pellet chips ─────────────────────────────────────────────────────
  // All three from Voćar's corrections. Chicken came without an "Alergen"
  // line; its wheat is read off its own ingredient list.
  "chips-crispy-fun-piletina": {
    ingredients: {
      bs: "Pšenično brašno, suncokretovo ulje, kukuruzni škrob, aroma piletine (so, maltodekstrin, monosodium glutamat, kurkuma u prahu, bijeli luk u prahu, bijeli biber u prahu, paprika u prahu).",
      en: "Wheat flour, sunflower oil, corn starch, chicken flavouring (salt, maltodextrin, monosodium glutamate, turmeric powder, garlic powder, white pepper powder, paprika powder).",
    },
    allergens: { bs: "Gluten (pšenica).", en: "Gluten (wheat)." },
    nutrition: CRISPY_FUN_NUTRITION,
    source: CORRECTIONS,
  },
  "chips-crispy-fun-pavlaka": {
    ingredients: {
      bs: "Pšenično brašno, suncokretovo ulje, kukuruzni škrob, aroma pavlake i luka (mlijeko u prahu, luk u prahu, so, maltodekstrin, monosodium glutamat, peršun u prahu, kopar u prahu, limunska kiselina).",
      en: "Wheat flour, sunflower oil, corn starch, sour cream and onion flavouring (milk powder, onion powder, salt, maltodextrin, monosodium glutamate, parsley powder, dill powder, citric acid).",
    },
    allergens: { bs: "Gluten (pšenica), mlijeko.", en: "Gluten (wheat), milk." },
    allergenNote: CRISPY_FUN_TRACES,
    nutrition: CRISPY_FUN_NUTRITION,
    source: CORRECTIONS,
  },
  "chips-crispy-fun-cili": {
    ingredients: {
      bs: "Pšenično brašno, suncokretovo ulje, kukuruzni škrob, aroma ljutog čilija (čili u prahu, so, maltodekstrin, monosodium glutamat, luk u prahu, cimet u prahu, limunska kiselina).",
      en: "Wheat flour, sunflower oil, corn starch, hot chilli flavouring (chilli powder, salt, maltodextrin, monosodium glutamate, onion powder, cinnamon powder, citric acid).",
    },
    allergens: { bs: "Gluten (pšenica).", en: "Gluten (wheat)." },
    allergenNote: CRISPY_FUN_TRACES,
    nutrition: CRISPY_FUN_NUTRITION,
    source: CORRECTIONS,
  },

  // ── Cereals & cream bar ──────────────────────────────────────────────
  "cereals-happy-cerios-kuglice-sa-vitaminima": {
    ingredients: {
      bs: "Pšenično brašno, kukuruzni griz, rižin griz, šećer, čokolada 4,9% (nemasni kakao, šećer, kakao puter), glukozni sirup, repičino ulje, odmašćeni kakao, jodirana kuhinjska sol (kalijumova sol, jodat), ekstrakt ječmenog slada, emulgator: sojin lecitin, aroma.",
      en: "Wheat flour, corn grits, rice grits, sugar, chocolate 4.9% (low-fat cocoa, sugar, cocoa butter), glucose syrup, rapeseed oil, defatted cocoa, iodised table salt (potassium salt, iodate), barley malt extract, emulsifier: soy lecithin, flavouring.",
    },
    allergens: { bs: "Gluten (pšenica, ječam), soja.", en: "Gluten (wheat, barley), soy." },
    nutrition: { per: "100 g", energyKj: "1671", energyKcal: "396", fat: "5,7", saturates: "1,1", carbs: "75", sugars: "24", fibre: "6,5", protein: "7,8", salt: "0,53" },
    source: CORRECTIONS,
  },
  // Ingredients and allergens from Voćar's corrections (no wheat, so no
  // gluten); the nutrition table is still the old shop's.
  "cereals-nutto-krem-bar-ljesnjak": {
    ingredients: {
      bs: "Šećer, biljna mast (palmina), surutka u prahu, kakao prah sa smanjenim sadržajem masti, biljno ulje (suncokretovo), sojino brašno, obrano mlijeko u prahu, lješnjak pasta 5%, sojin lecitin, aroma lješnika.",
      en: "Sugar, vegetable fat (palm), whey powder, fat-reduced cocoa powder, vegetable oil (sunflower), soy flour, skimmed milk powder, hazelnut paste 5%, soy lecithin, hazelnut flavouring.",
    },
    allergens: { bs: "Mlijeko, soja, lješnjak.", en: "Milk, soy, hazelnut." },
    nutrition: { per: "100 g", energyKj: "2238", energyKcal: "536", fat: "30,30", saturates: "26,00", carbs: "59,00", sugars: "58,10", fibre: "5,7", protein: "2,00", salt: "0,25" },
    source: shop("krem-tabla-nutto-bar-80-g-pakiranje-40-kom-karton"),
  },
};
