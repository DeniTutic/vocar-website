/**
 * Site copy, kept bilingual-shaped (bs/en) so a future language switch is a
 * data change, not a rewrite — but every page currently renders `.bs` only,
 * per the brief's "Bosnian by default" instruction. English strings are
 * filled in for the architecture; wire up a locale switch later to use them.
 */
export interface Localized {
  bs: string;
  en: string;
}

export const SITE_URL = "https://vocar.ba";

export const nav = {
  home: { bs: "Početna", en: "Home" },
  products: { bs: "Proizvodi", en: "Products" },
  about: { bs: "O nama", en: "About" },
  quality: { bs: "Kvalitet", en: "Quality" },
  catalog: { bs: "Katalog", en: "Catalog" },
  contact: { bs: "Kontakt", en: "Contact" },
} satisfies Record<string, Localized>;

export const home = {
  heroHeadline: { bs: "Za bolji okus života.", en: "For a better taste of life." },
  heroSub: {
    bs: "Generacije tradicije. Prirodni sastojci. Okus koji traje.",
    en: "Generations of tradition. Natural ingredients. A taste that lasts.",
  },
  ctaPrimary: { bs: "Otkrijte proizvode", en: "Discover products" },
  ctaSecondary: { bs: "Saznajte više o nama", en: "Learn more about us" },

  storyEyebrow: { bs: "O Voćaru", en: "About Voćar" },
  storyTitle: { bs: "Okus tradicije. Pogled u budućnost.", en: "The taste of tradition. A look to the future." },
  storyBody1: {
    bs: "Voćar d.o.o. proizvodi grickalice, suho voće, čips, flips i kikiriki iz Gornjeg Rahića kod Brčkog, u srcu Bosne i Hercegovine. Ime nosi malo obećanje — voćar, onaj koji njeguje voće — i ista pažnja se prepoznaje u svakoj vrećici koju napunimo.",
    en: "Voćar d.o.o. produces snacks, dried fruit, chips, flips and peanuts from Gornji Rahić near Brčko, in the heart of Bosnia and Herzegovina. The name carries a small promise — voćar, the fruit grower — and the same care shows in every bag we fill.",
  },
  storyBody2: {
    bs: "Od pažljivo odabranih sirovina do moderne proizvodnje, svaki korak čuva ukus po kojem nas generacije prepoznaju — i otvara put ka novim tržištima izvan Bosne i Hercegovine.",
    en: "From carefully selected raw materials to modern production, every step preserves the taste generations recognize us by — and opens the way to markets beyond Bosnia and Herzegovina.",
  },
  statYears: { value: "20+", label: { bs: "godina iskustva", en: "years of experience" } },
  statProducts: { value: "80+", label: { bs: "proizvoda", en: "products" } },
  statMarkets: { value: "BiH", label: { bs: "i međunarodna tržišta", en: "and international markets" } },

  showcaseEyebrow: { bs: "Asortiman", en: "The range" },
  showcaseTitle: { bs: "Naši proizvodi", en: "Our products" },
  showcaseBody: {
    bs: "Jedanaest porodica proizvoda, svaka sa svojim karakterom — od suhog voća do kokica.",
    en: "Eleven product families, each with its own character — from dried fruit to popcorn.",
  },
  viewProduct: { bs: "Pogledaj proizvod", en: "View product" },

  featuredEyebrow: { bs: "Izdvajamo", en: "Featured" },
  featuredTitle: { bs: "Naši favoriti", en: "Our favorites" },
  learnMore: { bs: "Saznaj više", en: "Learn more" },
  qualityBadge: { bs: "100% kvalitet", en: "100% quality" },
  bestsellerBadge: { bs: "Najprodavaniji", en: "Best seller" },
  favoriteBadge: { bs: "Omiljeno kupaca", en: "Customer favorite" },
  seasonalBadge: { bs: "Hit sezone", en: "Seasonal hit" },

  qualityEyebrow: { bs: "Kvalitet", en: "Quality" },
  qualityTitle: { bs: "Kvalitet koji se osjeti.", en: "Quality you can taste." },
  qualityBody: {
    bs: "Od pažljivo odabranih sirovina do stroge kontrole u svakoj fazi proizvodnje — kvalitet nije jedan korak, nego cijeli proces. Ova stranica čuva mjesto za naše stvarne certifikate čim budu spremni za objavu.",
    en: "From carefully selected raw materials to strict control at every stage of production — quality isn't one step, it's the whole process. This section holds a place for our real certificates once they're ready to publish.",
  },
  qualityPoint1: { bs: "Pažljivo odabrani sastojci", en: "Carefully selected ingredients" },
  qualityPoint2: { bs: "Moderna proizvodnja", en: "Modern production" },
  qualityPoint3: { bs: "Kontrola kvaliteta u svakoj fazi", en: "Quality control at every stage" },
  qualityPoint4: { bs: "Sigurnost hrane i dosljedan kvalitet", en: "Food safety and consistent quality" },
  certificatePlaceholder: { bs: "Rezervisano za certifikat", en: "Reserved for certificate" },

  processEyebrow: { bs: "Proces", en: "Process" },
  processTitle: { bs: "Od sastojka do vaše police.", en: "From ingredient to your shelf." },
  processStep1Comment: {
    bs: "Sve što koristimo treba da bude svježe i testirano prije nego uđe u proizvodnju.",
    en: "Everything we use has to be fresh and tested before it enters production.",
  },
  processStep2Comment: {
    bs: "Rade edukovani profesionalci, uz opremu koja se redovno održava.",
    en: "Run by trained professionals, on equipment that's regularly maintained.",
  },
  processStep3Comment: {
    bs: "Svaka serija se provjerava prije nego napusti pogon.",
    en: "Every batch is checked before it leaves the plant.",
  },
  processStep4Comment: {
    bs: "Pakujemo brzo, ali nikad na račun higijene.",
    en: "We package quickly, but never at the expense of hygiene.",
  },
  processStep5Comment: {
    bs: "Stiže svježe na policu, bez obzira koliko je put dug.",
    en: "It arrives fresh on the shelf, no matter how long the trip.",
  },

  worldEyebrow: { bs: "Prisutnost", en: "Presence" },
  worldTitle: { bs: "Od Balkana do svijeta.", en: "From the Balkans to the world." },
  worldBody: {
    bs: "Voćar proizvodi putuju iz Gornjeg Rahića u Bosni i Hercegovini na tržišta regije, Evrope i Bliskog istoka, kroz partnere u Hrvatskoj, Sloveniji, Austriji, Njemačkoj, Turskoj, Saudijskoj Arabiji i Sjedinjenim Američkim Državama.",
    en: "Voćar products travel from Gornji Rahić in Bosnia and Herzegovina to markets across the region, Europe and the Middle East, through partners in Croatia, Slovenia, Austria, Germany, Turkey, Saudi Arabia and the United States.",
  },

  catalogEyebrow: { bs: "Katalog", en: "Catalog" },
  catalogTitle: { bs: "Istražite naš katalog.", en: "Explore our catalog." },
  catalogBody: {
    bs: "Pregledajte kompletan asortiman Voćar proizvoda.",
    en: "Browse the complete Voćar product range.",
  },
  catalogCta: { bs: "Preuzmi katalog", en: "Download catalog" },
} as const;

export const about = {
  eyebrow: { bs: "O nama", en: "About us" },
  title: { bs: "Voćar — okus koji traje generacijama.", en: "Voćar — a taste that lasts generations." },
  historyTitle: { bs: "Historija", en: "History" },
  historyBody: {
    bs: "Voćar d.o.o. je proizvođač grickalica i prehrambenih proizvoda sa sjedištem u Gornjem Rahiću kod Brčkog. Kroz godine rada, asortiman je narastao od nekoliko osnovnih linija do preko 80 proizvoda — od suhog voća i kikirikija, preko kukuruznog flipsa i kokica, do putera od kikirikija, oblatni i osnovnih namirnica.",
    en: "Voćar d.o.o. is a snack and food producer based in Gornji Rahić, near Brčko. Over the years, the range has grown from a handful of core lines to more than 80 products — from dried fruit and peanuts, through corn flips and popcorn, to peanut butter, wafers and pantry staples.",
  },
  missionTitle: { bs: "Misija", en: "Mission" },
  missionBody: {
    bs: "Praviti grickalice i namirnice po istom standardu, bez obzira da li vrećica ide na policu u Gornjem Rahiću ili preko granice.",
    en: "Making snacks and pantry staples to the same standard, whether the bag ends up on a shelf in Gornji Rahić or across the border.",
  },
  valuesTitle: { bs: "Vrijednosti", en: "Values" },
  value1: { bs: "Prirodni sastojci", en: "Natural ingredients" },
  value1Desc: { bs: "Birani sastojci, bez nepotrebnih aditiva.", en: "Selected ingredients, no unnecessary additives." },
  value2: { bs: "Zanatska pažnja u proizvodnji", en: "Craftsmanship in production" },
  value2Desc: { bs: "Svaka serija prolazi kroz pažljivu ručnu kontrolu.", en: "Every batch gets careful, hands-on attention." },
  value3: { bs: "Dosljedan kvalitet", en: "Consistent quality" },
  value3Desc: { bs: "Isti ukus u svakoj vrećici, iz godine u godinu.", en: "The same taste in every bag, year after year." },
  value4: { bs: "Poštenje prema kupcu", en: "Honesty with the customer" },
  value4Desc: { bs: "Jasna deklaracija i transparentan sastav.", en: "Clear labeling and transparent composition." },
} as const;

export const contact = {
  eyebrow: { bs: "Kontakt", en: "Contact" },
  title: { bs: "Razgovarajmo.", en: "Let's talk." },
  body: {
    bs: "Za narudžbe, distribuciju ili bilo koje pitanje o asortimanu — tu smo.",
    en: "For orders, distribution, or any question about the range — we're here.",
  },
  addressLabel: { bs: "Adresa", en: "Address" },
  phoneLabel: { bs: "Telefon", en: "Phone" },
  emailLabel: { bs: "E-mail", en: "Email" },
  officeSloveniaLabel: { bs: "Predstavništvo Slovenija", en: "Slovenia office" },
  formName: { bs: "Ime", en: "Name" },
  formEmail: { bs: "Email", en: "Email" },
  formPhone: { bs: "Telefon", en: "Phone" },
  formMessage: { bs: "Poruka", en: "Message" },
  formSubmit: { bs: "Pošalji poruku", en: "Send message" },
  formSuccess: {
    bs: "Otvara se vaš e-mail program sa popunjenom porukom — samo je pošaljite.",
    en: "Your email app is opening with the message filled in — just hit send.",
  },
  formErrorRequired: { bs: "Ovo polje je obavezno.", en: "This field is required." },
  formErrorEmail: { bs: "Unesite ispravnu e-mail adresu.", en: "Enter a valid email address." },
} as const;

export const productPage = {
  categoryLabel: { bs: "Kategorija", en: "Category" },
  sizesLabel: { bs: "Pakovanje", en: "Packaging" },
  compositionLabel: { bs: "Sastav", en: "Composition" },
  nutritionLabel: { bs: "Nutritivne vrijednosti", en: "Nutritional information" },
  nutritionNote: {
    bs: "Detaljne nutritivne vrijednosti nalaze se na deklaraciji svakog pakovanja.",
    en: "Detailed nutritional values are printed on each package's label.",
  },
  relatedTitle: { bs: "Iz iste kategorije", en: "From the same category" },
  backToCategory: { bs: "Nazad na kategoriju", en: "Back to category" },
} as const;

export const newsletter = {
  eyebrow: { bs: "Newsletter", en: "Newsletter" },
  title: { bs: "Ne propustite novosti.", en: "Don't miss what's new." },
  body: {
    bs: "Prijavite se za nove proizvode, popuste i akcije — direktno u vaš inbox.",
    en: "Sign up for new products, discounts and offers — straight to your inbox.",
  },
  placeholder: { bs: "Vaš e-mail", en: "Your email" },
  submit: { bs: "Prijavi me", en: "Sign me up" },
  disclaimer: { bs: "Bez spama. Odjava u bilo kojem trenutku.", en: "No spam. Unsubscribe anytime." },
  success: {
    bs: "Hvala! Otvara se vaš e-mail program — samo pošaljite poruku da potvrdite prijavu.",
    en: "Thanks! Your email app is opening — just hit send to confirm your signup.",
  },
  close: { bs: "Zatvori", en: "Close" },
  errorEmail: { bs: "Unesite ispravnu e-mail adresu.", en: "Enter a valid email address." },
} as const;

export const footerContent = {
  tagline: { bs: "Za bolji okus života.", en: "For a better taste of life." },
  companyLabel: { bs: "Kompanija", en: "Company" },
  contactLabel: { bs: "Kontakt", en: "Contact" },
  rights: { bs: "Sva prava zadržana.", en: "All rights reserved." },
} as const;
