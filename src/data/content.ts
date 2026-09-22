/**
 * Site copy, kept bilingual (bs/en). Components read the active locale via
 * useT() from @/lib/locale rather than reaching for `.bs` directly, so the
 * navbar language switch is a data change, not a rewrite.
 */
export interface Localized {
  bs: string;
  en: string;
}

export const SITE_URL = "https://vocar.ba";

/** Titles/descriptions for <head>, per locale. Pages read these via lib/metadata. */
export const siteMeta = {
  title: {
    bs: "Voćar — Za bolji okus života",
    en: "Voćar — For a better taste of life",
  },
  description: {
    bs: "Voćar d.o.o. Brčko proizvodi grickalice, suho voće, čips, flips i kikiriki iz Gornjeg Rahića, Bosna i Hercegovina — generacije tradicije, prirodni sastojci, okus koji traje.",
    en: "Voćar d.o.o. Brčko makes snacks, dried fruit, chips, flips and peanuts in Gornji Rahić, Bosnia and Herzegovina — HACCP and IFS Food certified, exporting to 17 countries, open to new importers.",
  },
  homeDescription: {
    bs: "Generacije tradicije. Prirodni sastojci. Okus koji traje. Voćar proizvodi grickalice, suho voće, čips, flips i kikiriki iz Gornjeg Rahića, Bosna i Hercegovina.",
    en: "Generations of tradition. Natural ingredients. A taste that lasts. Voćar makes snacks, dried fruit, chips, flips and peanuts in Gornji Rahić, Bosnia and Herzegovina.",
  },
  ogAlt: { bs: "Voćar — Za bolji okus života", en: "Voćar — For a better taste of life" },
  keywords: {
    bs: ["Voćar", "Voćar d.o.o.", "grickalice Bosna", "suho voće BiH", "čips proizvođač", "Gornji Rahić", "Brčko"],
    en: [
      "Voćar",
      "Bosnian snacks manufacturer",
      "dried prunes supplier",
      "peanut butter producer Bosnia",
      "private label snacks Balkans",
      "IFS Food certified snacks",
      "snack food exporter Bosnia",
    ],
  },
} as const;

export const common = {
  close: { bs: "Zatvori", en: "Close" },
  languageLabel: { bs: "Jezik", en: "Language" },
  backToTop: { bs: "Nazad na vrh", en: "Back to top" },
} as const;

export const nav = {
  home: { bs: "Početna", en: "Home" },
  products: { bs: "Proizvodi", en: "Products" },
  about: { bs: "O nama", en: "About" },
  quality: { bs: "Kvalitet", en: "Quality" },
  catalog: { bs: "Katalog", en: "Catalog" },
  contact: { bs: "Kontakt", en: "Contact" },
  whereToBuy: { bs: "Gdje kupiti", en: "Where to buy" },
  forDistributors: { bs: "Za distributere", en: "For distributors" },
  menuLabel: { bs: "Meni", en: "Menu" },
} satisfies Record<string, Localized>;

/** The one red "buy" language — every action that moves money reads from here. */
export const buy = {
  whereToBuy: { bs: "Gdje kupiti", en: "Where to buy" },
  requestQuote: { bs: "Zatraži ponudu", en: "Request a quote" },
  askUs: { bs: "Ne znate gdje? Pitajte nas", en: "Not sure where? Ask us" },
  seeSnacks: { bs: "Pogledaj grickalice", en: "See snacks" },
  quoteShort: { bs: "Ponuda", en: "Quote" },
} as const;

export const badges = {
  hit: { bs: "Hit", en: "Hit" },
  novo: { bs: "Novo", en: "New" },
  coko: { bs: "Čoko", en: "Choco" },
} as const;

export const home = {
  heroMotto: { bs: "Za bolji okus života.", en: "For a better taste of life." },
  heroWord1: { bs: "Domaće", en: "Homemade" },
  heroWord2: { bs: "Svježe", en: "Fresh" },
  heroWord3: { bs: "Ukusno", en: "Tasty" },
  heroWord4: { bs: "Prirodno", en: "Natural" },
  heroWord5: { bs: "Pošteno", en: "Honest" },

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
  statYears: { value: "35+", label: { bs: "godina iskustva", en: "years of experience" } },
  statProducts: { value: "40+", label: { bs: "proizvoda", en: "products" } },
  statHappyFaces: { value: "100.000+", label: { bs: "nasmijanih lica", en: "happy faces" } },
  statMarkets: { value: "BiH", label: { bs: "i međunarodna tržišta", en: "and international markets" } },

  showcaseEyebrow: { bs: "Asortiman", en: "The range" },
  showcaseTitle: { bs: "Naši proizvodi", en: "Our products" },
  showcaseBody: {
    bs: "Dvanaest porodica proizvoda, svaka sa svojim karakterom — od suhog voća do kroasana.",
    en: "Twelve product families, each with its own character — from dried fruit to croissants.",
  },
  familiesBody: { bs: "Dvanaest porodica proizvoda — izaberite svoju.", en: "Twelve product families — pick yours." },
  familiesView: { bs: "Pogledaj", en: "View" },
  familiesAll: { bs: "Cijeli asortiman", en: "Full range" },
  catalogPageTitle: { bs: "Proizvodi", en: "Products" },
  catalogPageDescription: {
    bs: "Kompletan Voćar asortiman — kikiriki, suhe šljive, flips, kokice, puter od kikirikija, oblatne, keksi, kroasani, čips i namirnice. Filtrirajte po kategoriji ili ukusu.",
    en: "The complete Voćar range — peanuts, prunes, flips, popcorn, peanut butter, wafers, biscuits, croissants, chips and pantry staples. Filter by category or taste.",
  },
  viewProduct: { bs: "Pogledaj proizvod", en: "View product" },
  showcaseAll: { bs: "Sve", en: "All" },
  tasteFilterLabel: { bs: "Ukus", en: "Taste" },
  showcaseEmpty: { bs: "Ništa u ovoj kombinaciji — probajte drugi ukus.", en: "Nothing in this combination — try another taste." },
  showcaseClear: { bs: "Poništi filtere", en: "Clear filters" },

  featuredEyebrow: { bs: "Degustacija", en: "Tasting" },
  featuredTitle: { bs: "Probajte prvo ovo.", en: "Try these first." },
  qualityBadge: { bs: "100% kvalitet", en: "100% quality" },
  favoriteBadge: { bs: "Omiljeno kupaca", en: "Customer favorite" },

  qualityEyebrow: { bs: "Kvalitet", en: "Quality" },
  qualityTitle: { bs: "Kvalitet koji se osjeti.", en: "Quality you can taste." },
  qualityBody: {
    bs: "Od pažljivo odabranih sirovina do stroge kontrole u svakoj fazi proizvodnje — kvalitet nije jedan korak, nego cijeli proces.",
    en: "From carefully selected raw materials to strict control at every stage of production — quality isn't one step, it's the whole process.",
  },
  qualityPoint1: { bs: "Pažljivo odabrani sastojci", en: "Carefully selected ingredients" },
  qualityPoint2: { bs: "Moderna proizvodnja", en: "Modern production" },
  qualityPoint3: { bs: "Kontrola kvaliteta u svakoj fazi", en: "Quality control at every stage" },
  qualityPoint4: { bs: "Sigurnost hrane i dosljedan kvalitet", en: "Food safety and consistent quality" },
  certificateViewFull: { bs: "Pogledaj cijeli sertifikat", en: "View full certificate" },

  processEyebrow: { bs: "Proces", en: "Process" },
  processTitle: { bs: "Od sastojka do vaše police.", en: "From ingredient to your shelf." },
  processStep1Label: { bs: "Sastojci", en: "Ingredients" },
  processStep2Label: { bs: "Proizvodnja", en: "Production" },
  processStep3Label: { bs: "Kontrola kvaliteta", en: "Quality control" },
  processStep4Label: { bs: "Pakovanje", en: "Packaging" },
  processStep5Label: { bs: "Distribucija", en: "Distribution" },
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
    bs: "Voćar proizvodi putuju iz Gornjeg Rahića u Bosni i Hercegovini na tržišta regije, Evrope i šire — kroz partnere u Hrvatskoj, Crnoj Gori, Sloveniji, Mađarskoj, Austriji, Njemačkoj, Švedskoj, Nizozemskoj, Turskoj, Saudijskoj Arabiji, Ujedinjenim Arapskim Emiratima, Litvaniji, Latviji i Libiji, sve do Sjedinjenih Američkih Država, Kanade i Australije.",
    en: "Voćar products travel from Gornji Rahić in Bosnia and Herzegovina to markets across the region, Europe and beyond — through partners in Croatia, Montenegro, Slovenia, Hungary, Austria, Germany, Sweden, the Netherlands, Turkey, Saudi Arabia, the United Arab Emirates, Lithuania, Latvia and Libya, all the way to the United States, Canada and Australia.",
  },

  testimonialsEyebrow: { bs: "Utisci", en: "Testimonials" },
  testimonialsTitle: { bs: "Šta kažu naši kupci.", en: "What our customers say." },

  catalogCta: { bs: "Preuzmi katalog", en: "Download catalog" },
} as const;

export const whereToBuyContent = {
  eyebrow: { bs: "Gdje kupiti", en: "Where to buy" },
  title: { bs: "Na polici blizu vas.", en: "On a shelf near you." },
  body: {
    bs: "Voćar proizvode potražite u marketima i trafikama širom Bosne i Hercegovine — a preko partnera stižu i na police u {count} zemalja.",
    en: "Look for Voćar products in supermarkets and kiosks across Bosnia and Herzegovina — and, through our partners, on shelves in {count} countries.",
  },
  bagTitle: { bs: "Tražite vrećicu?", en: "Looking for a bag?" },
  // Split around the link so "Javite nam se" can point at the contact section.
  bagBody: {
    bs: "Voćar proizvode naći ćete u supermarketima i trafikama širom Bosne i Hercegovine — od Sarajeva i Tuzle, preko Banje Luke i Bijeljine, do Mostara i Zenice. Ne vidite nas na polici u svom gradu?",
    en: "You'll find Voćar products in supermarkets and kiosks across Bosnia and Herzegovina — from Sarajevo and Tuzla to Banja Luka, Bijeljina, Mostar and Zenica. Don't see us on a shelf near you yet?",
  },
  bagLink: { bs: "Javite nam se", en: "Let us know" },
  bagBodyAfter: { bs: "i pomoći ćemo da to promijenimo.", en: "and we'll help change that." },
  retailersTitle: { bs: "Trgovine", en: "Retailers" },
  palletTitle: { bs: "Tražite paletu?", en: "Looking for a pallet?" },
  palletBody: {
    bs: "Za trgovine, distributere i uvoznike: veleprodajne količine, otvorena tržišta i kompletan katalog.",
    en: "For shops, distributors and importers: wholesale volumes, open markets and the full catalog.",
  },
  palletPoint1: { bs: "HACCP i IFS Food certificirana proizvodnja", en: "HACCP and IFS Food certified production" },
  palletPoint2: { bs: "Izvoz u {count} zemalja, otvoreni za nova tržišta", en: "Exporting to {count} countries, open to new markets" },
  palletPoint3: { bs: "Višejezična ambalaža (BS · EN · DE · SL · RU · AR)", en: "Multilingual packaging (BS · EN · DE · SL · RU · AR)" },
  palletPoint4: { bs: "Uvoznici već u Sloveniji (Voćar Ljubljana) i Austriji (Dulipak)", en: "Importers already in Slovenia (Voćar Ljubljana) and Austria (Dulipak)" },
  palletPoint5: { bs: "Kompletan katalog (PDF) · odgovor u roku od 1 radnog dana", en: "Full catalog (PDF) · reply within 1 business day" },
} as const;

export const about = {
  eyebrow: { bs: "O nama", en: "About us" },
  title: { bs: "Voćar — okus koji traje generacijama.", en: "Voćar — a taste that lasts generations." },
  historyTitle: { bs: "Historija", en: "History" },
  historyBody: {
    bs: "Voćar d.o.o. je osnovan 1989. godine u Brčkom. Danas posluje sa sjedištem u Gornjem Rahiću, na proizvodno-administrativnom kompleksu od 18.000 m², opremljenom najmodernijom tehnologijom vodećih svjetskih proizvođača. Kroz godine rada, asortiman je narastao na više od 40 proizvoda — od suhog voća i kikirikija, preko kukuruznog flipsa i kokica, do putera od kikirikija, oblatni i osnovnih namirnica.",
    en: "Voćar d.o.o. was founded in 1989 in Brčko. Today it operates from an 18,000 m² production and administration complex in Gornji Rahić, equipped with the latest technology from the world's leading manufacturers. Over the years, the range has grown to more than 40 products — from dried fruit and peanuts, through corn flips and popcorn, to peanut butter, wafers and pantry staples.",
  },
  slogan: { bs: "Kvalitet je poštenje.", en: "Quality is honesty." },
  missionTitle: { bs: "Misija", en: "Mission" },
  missionBody: {
    bs: "Praviti grickalice i namirnice po istom standardu, bez obzira da li vrećica ide na policu u Gornjem Rahiću ili preko granice — i zadržati vaše povjerenje kroz naraštaje.",
    en: "Making snacks and pantry staples to the same standard, whether the bag ends up on a shelf in Gornji Rahić or across the border — and keeping your trust across generations.",
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
  driedFruitImageAlt: { bs: "Sušeno voće Voćar", en: "Voćar dried fruit" },
  plantImageAlt: {
    bs: "Voćar proizvodi u rukama, ispred proizvodnog pogona u Gornjem Rahiću",
    en: "Voćar products held in front of the production plant in Gornji Rahić",
  },
} as const;

export const contact = {
  eyebrow: { bs: "Kontakt", en: "Contact" },
  title: { bs: "Razgovarajmo.", en: "Let's talk." },
  body: {
    bs: "Za narudžbe, distribuciju ili bilo koje pitanje o asortimanu — tu smo.",
    en: "For orders, distribution, or any question about the range — we're here.",
  },
  addressLabel: { bs: "Adresa", en: "Address" },
  addressNote: {
    bs: "Proizvodni pogon, nije maloprodaja. Posjete uz prethodnu najavu.",
    en: "Production site, not a retail shop. Visits by appointment.",
  },
  phoneLabel: { bs: "Telefon", en: "Phone" },
  mobileLabel: { bs: "Mobitel", en: "Mobile" },
  whatsapp: { bs: "Pišite nam na WhatsApp", en: "Message us on WhatsApp" },
  emailLabel: { bs: "E-mail", en: "Email" },
  emailGeneral: { bs: "opšta pitanja", en: "general questions" },
  emailSales: { bs: "narudžbe i prodaja", en: "orders and trade" },
  officeSloveniaLabel: { bs: "Predstavništvo Slovenija", en: "Slovenia office" },
  formName: { bs: "Ime", en: "Name" },
  formEmail: { bs: "Email", en: "Email" },
  formPhone: { bs: "Telefon", en: "Phone" },
  formMessage: { bs: "Poruka", en: "Message" },
  formSubmit: { bs: "Pošalji poruku", en: "Send message" },
  formModeLabel: { bs: "Javljam se kao", en: "I'm reaching out as" },
  formModeCustomer: { bs: "Kupac", en: "Customer" },
  formModeTrade: { bs: "Trgovina / uvoznik", en: "Shop / importer" },
  formCompany: { bs: "Firma", en: "Company" },
  formMarket: { bs: "Tržište / zemlja", en: "Market / country" },
  formVolume: { bs: "Okvirna količina", en: "Estimated volume" },
  formVolumePlaceholder: { bs: "npr. 2 palete mjesečno", en: "e.g. 2 pallets a month" },
  formFamilies: { bs: "Proizvodi od interesa", en: "Products of interest" },
  formSample: { bs: "Zanima me uzorak", en: "I'd like a sample" },
  prefillWhereToBuy: { bs: "Gdje mogu kupiti: {product}?", en: "Where can I buy: {product}?" },
  prefillQuote: { bs: "Zanima me ponuda za: {product}.", en: "I'd like a quote for: {product}." },
  trustCertified: { bs: "HACCP + IFS Food", en: "HACCP + IFS Food" },
  trustExport: { bs: "Izvoz u {count} zemalja", en: "Exporting to {count} countries" },
  trustReply: { bs: "Odgovor u roku od 1 radnog dana", en: "Reply within 1 business day" },
  formSuccess: {
    bs: "Otvara se vaš e-mail program sa popunjenom porukom — samo je pošaljite.",
    en: "Your email app is opening with the message filled in — just hit send.",
  },
  formSent: {
    bs: "Poruka je poslana. Javljamo se u roku od jednog radnog dana.",
    en: "Message sent. We'll get back to you within one business day.",
  },
  formSending: { bs: "Šaljem…", en: "Sending…" },
  formError: {
    bs: "Slanje nije uspjelo. Pokušajte ponovo ili nam pišite direktno na sales@vocar.ba.",
    en: "Sending failed. Try again or write to us directly at sales@vocar.ba.",
  },
  formRateLimited: { bs: "Prebrzo — sačekajte pola minute pa pokušajte ponovo.", en: "Too fast — wait half a minute and try again." },
  formErrorRequired: { bs: "Ovo polje je obavezno.", en: "This field is required." },
  formErrorEmail: { bs: "Unesite ispravnu e-mail adresu.", en: "Enter a valid email address." },
} as const;

export const productPage = {
  categoryLabel: { bs: "Kategorija", en: "Category" },
  sizesLabel: { bs: "Pakovanje", en: "Packaging" },
  compositionLabel: { bs: "Sastav", en: "Composition" },
  allergensLabel: { bs: "Alergeni", en: "Allergens" },
  nutritionLabel: { bs: "Nutritivne vrijednosti", en: "Nutritional information" },
  nutritionNote: {
    bs: "Detaljne nutritivne vrijednosti nalaze se na deklaraciji svakog pakovanja.",
    en: "Detailed nutritional values are printed on each package's label.",
  },
  relatedTitle: { bs: "Iz iste kategorije", en: "From the same category" },
  breadcrumbLabel: { bs: "Putanja", en: "Breadcrumb" },
  sizeOnRequest: { bs: "Na upit", en: "On request" },
  share: { bs: "Podijeli", en: "Share" },
  copied: { bs: "Link kopiran", en: "Link copied" },
  siblingsTitle: { bs: "Još ukusa iz kategorije", en: "More flavors from" },
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
  errorEmail: { bs: "Unesite ispravnu e-mail adresu.", en: "Enter a valid email address." },
} as const;

export const notFoundPage = {
  eyebrow: { bs: "404", en: "404" },
  title: { bs: "Ta vrećica se otkotrljala.", en: "That bag rolled away." },
  body: {
    bs: "Stranica koju tražite ne postoji ili je premještena. Evo par hitova da ne odete praznih ruku.",
    en: "The page you're looking for doesn't exist or has moved. Here are a few hits so you don't leave empty-handed.",
  },
  cta: { bs: "Svi proizvodi", en: "All products" },
  hitsTitle: { bs: "Najtraženije", en: "Most wanted" },
} as const;

export const footerContent = {
  tagline: { bs: "Za bolji okus života.", en: "For a better taste of life." },
  followUs: { bs: "Pratite nas", en: "Follow us" },
  companyLabel: { bs: "Kompanija", en: "Company" },
  exploreLabel: { bs: "Istraži", en: "Explore" },
  buyLabel: { bs: "Kupovina", en: "Buying" },
  contactLabel: { bs: "Kontakt", en: "Contact" },
  rights: { bs: "Sva prava zadržana.", en: "All rights reserved." },
  privacyLabel: { bs: "Politika privatnosti", en: "Privacy policy" },
  termsLabel: { bs: "Uslovi korištenja", en: "Terms of use" },
} as const;

/**
 * Written from scratch, grounded in what this codebase actually does —
 * localStorage "vocar_locale" is the only client storage, forms submit via
 * mailto with no server-side storage, and the Google Maps embed is the only
 * third-party resource. Not a substitute for legal review, and says so.
 */
export const privacyPage = {
  metaTitle: { bs: "Politika privatnosti", en: "Privacy policy" },
  metaDescription: {
    bs: "Politika privatnosti sajta Voćar d.o.o. Brčko — koje podatke prikupljamo, kako se koriste i kome se obratiti za pitanja o privatnosti.",
    en: "Privacy policy for Voćar d.o.o. Brčko — what data we collect, how it's used, and who to contact about it.",
  },
  eyebrow: { bs: "Pravne informacije", en: "Legal" },
  title: { bs: "Politika privatnosti", en: "Privacy policy" },
  updated: { bs: "Zadnje ažurirano: 22. septembar 2026.", en: "Last updated: September 22, 2026." },
  intro: {
    bs: "Ova politika opisuje koje podatke Voćar d.o.o. Brčko (Gornji Rahić 112, 76207 Gornji Rahić, Bosna i Hercegovina) prikuplja preko ove web stranice, zašto, i kome se možete obratiti u vezi s tim. Ne odnosi se na naše profile na društvenim mrežama (Instagram, Facebook), koji imaju vlastita pravila privatnosti.",
    en: "This policy describes what data Voćar d.o.o. Brčko (Gornji Rahić 112, 76207 Gornji Rahić, Bosnia and Herzegovina) collects through this website, why, and who to contact about it. It doesn't cover our social media profiles (Instagram, Facebook), which have their own privacy rules.",
  },
  sections: [
    {
      title: { bs: "Koje podatke prikupljamo", en: "What we collect" },
      body: {
        bs: "Ako popunite formular za kontakt: ime, e-mail, telefon (opcionalno) i sadržaj poruke. Ako se prijavite na newsletter: samo e-mail adresa. Ne prikupljamo nikakve podatke o plaćanju — ova stranica nema online prodavnicu.",
        en: "If you fill out the contact form: name, email, phone (optional) and your message. If you sign up for the newsletter: just your email address. We don't collect any payment information — this site has no online store.",
      },
    },
    {
      title: { bs: "Kako formulari zapravo rade", en: "How the forms actually work" },
      body: {
        bs: "Oba formulara otvaraju vaš vlastiti e-mail program s unaprijed popunjenom porukom upućenom na sales@vocar.ba — poruku šaljete direktno sa svog naloga, baš kao svaki drugi e-mail. Mi ne čuvamo podatke iz formulara na serveru; jedini zapis poruke je onaj koji ostaje u vašem poslatom e-mailu.",
        en: "Both forms open your own email app with a message pre-filled to sales@vocar.ba — you send it directly from your own account, just like any other email. We don't store form data on a server; the only record of the message is the one in your own sent mail.",
      },
    },
    {
      title: { bs: "Kolačići i lokalno skladištenje", en: "Cookies and local storage" },
      body: {
        bs: "Ova stranica ne koristi kolačiće za praćenje. Jedino što čuvamo u vašem pregledaču je odabir jezika (bosanski/engleski), lokalno na vašem uređaju — taj podatak se nikad ne šalje nama niti trećim stranama. Za mjerenje posjećenosti koristimo Vercel Web Analytics, koji radi bez kolačića i bilježi samo zbirne podatke (koje su stranice posjećene, koliko puta je kliknut katalog ili WhatsApp) — bez ličnih podataka i bez praćenja između stranica.",
        en: "This site doesn't use tracking cookies. The only thing we store in your browser is your language choice (Bosnian/English), locally on your device — it's never sent to us or anyone else. To measure traffic we use Vercel Web Analytics, which works without cookies and records only aggregate data (which pages were visited, how often the catalog or WhatsApp was clicked) — no personal data and no cross-site tracking.",
      },
    },
    {
      title: { bs: "Google mapa", en: "Google Map" },
      body: {
        bs: "Sekcija za kontakt sadrži ugrađenu Google mapu naše lokacije. Kad se ta mapa učita, Google može postaviti vlastite kolačiće u skladu sa svojom politikom privatnosti, nezavisno od nas.",
        en: "The contact section embeds a Google Map of our location. When that map loads, Google may set its own cookies under its own privacy policy, independent of us.",
      },
    },
    {
      title: { bs: "Vaša prava", en: "Your rights" },
      body: {
        bs: "Možete tražiti uvid, ispravku ili brisanje bilo kojih podataka koje ste nam poslali (npr. e-mail iz prijave na newsletter). Pišite nam na sales@vocar.ba.",
        en: "You can ask to see, correct, or delete any data you've sent us (e.g. an email from a newsletter signup). Write to us at sales@vocar.ba.",
      },
    },
    {
      title: { bs: "Treće strane", en: "Third parties" },
      body: {
        bs: "Ne prodajemo niti dijelimo vaše podatke s trećim stranama u marketinške svrhe. Vanjski servisi na stranici su Google mapa i Vercel Web Analytics, oba opisana iznad; stranicu hostuje Vercel.",
        en: "We don't sell or share your data with third parties for marketing purposes. The outside services on this site are the Google Map and Vercel Web Analytics, both described above; the site is hosted on Vercel.",
      },
    },
    {
      title: { bs: "Djeca", en: "Children" },
      body: {
        bs: "Ova stranica nije namijenjena djeci mlađoj od 16 godina i ne prikupljamo svjesno podatke od njih.",
        en: "This site isn't directed at children under 16, and we don't knowingly collect data from them.",
      },
    },
    {
      title: { bs: "Izmjene ove politike", en: "Changes to this policy" },
      body: {
        bs: "Ako promijenimo kako radimo sa podacima, ažuriraćemo ovu stranicu i datum na vrhu.",
        en: "If how we handle data changes, we'll update this page and the date at the top.",
      },
    },
  ],
  disclaimer: {
    bs: "Ovo je opšti opis naše prakse, a ne formalni pravni dokument — za specifične zakonske zahtjeve (npr. GDPR za tržište Slovenije) preporučujemo pravnu provjeru.",
    en: "This is a plain-language description of our practice, not a formal legal document — for specific legal requirements (e.g. GDPR for the Slovenia market), we recommend a legal review.",
  },
  contactCta: { bs: "Imate pitanje o privatnosti?", en: "Have a privacy question?" },
} as const;

/**
 * Written from scratch — vocar.ba has no terms page either — and scoped to
 * what this site actually does: no checkout, no accounts, no user-submitted
 * content. Every CTA on the site either opens a mailto or downloads the PDF
 * catalog, so no sale is ever concluded here.
 */
export const termsPage = {
  metaTitle: { bs: "Uslovi korištenja", en: "Terms of use" },
  metaDescription: {
    bs: "Uslovi korištenja sajta Voćar d.o.o. Brčko — šta stranica jeste i nije, autorska prava, i mjerodavno pravo.",
    en: "Terms of use for the Voćar d.o.o. Brčko website — what this site is and isn't, copyright, and governing law.",
  },
  eyebrow: { bs: "Pravne informacije", en: "Legal" },
  title: { bs: "Uslovi korištenja", en: "Terms of use" },
  updated: { bs: "Zadnje ažurirano: 16. septembar 2026.", en: "Last updated: September 16, 2026." },
  intro: {
    bs: "Korištenjem ove web stranice prihvatate ove uslove. Stranicu održava Voćar d.o.o. Brčko (Gornji Rahić 112, 76207 Gornji Rahić, Bosna i Hercegovina). Ako se ne slažete s bilo kojim dijelom ovih uslova, molimo da ne koristite stranicu.",
    en: "By using this website, you accept these terms. The site is maintained by Voćar d.o.o. Brčko (Gornji Rahić 112, 76207 Gornji Rahić, Bosnia and Herzegovina). If you don't agree with any part of these terms, please don't use the site.",
  },
  sections: [
    {
      title: { bs: "Ova stranica nije online prodavnica", en: "This site is not an online store" },
      body: {
        bs: "Ovdje ne možete kupiti proizvode niti platiti narudžbu. Dugmad poput \"Gdje kupiti\" i \"Zatraži ponudu\" otvaraju vaš e-mail program ili vas usmjeravaju na fizičke prodajne kanale — nijedan ugovor o kupoprodaji se ne sklapa preko ove stranice.",
        en: "You can't buy products or pay for an order here. Buttons like \"Where to buy\" and \"Request a quote\" open your email app or point you to physical retail channels — no sales contract is formed on this site.",
      },
    },
    {
      title: { bs: "Podaci o proizvodima su informativni", en: "Product information is for reference only" },
      body: {
        bs: "Opisi, sastojci i fotografije proizvoda su informativni i mogu se razlikovati od stvarnog pakovanja. Tačan sastav, alergeni i nutritivne vrijednosti uvijek provjerite na deklaraciji fizičkog proizvoda.",
        en: "Product descriptions, composition notes and photos are for reference and may differ from the actual package. Always check the physical product's label for exact composition, allergens and nutritional values.",
      },
    },
    {
      title: { bs: "Autorska prava i žig", en: "Copyright and trademark" },
      body: {
        bs: "Naziv Voćar, logo i fotografije proizvoda na ovoj stranici su vlasništvo Voćar d.o.o. Brčko ili se koriste uz dozvolu. Ne smiju se kopirati niti koristiti u komercijalne svrhe bez našeg pismenog odobrenja.",
        en: "The Voćar name, logo and product photography on this site belong to Voćar d.o.o. Brčko or are used with permission. They may not be copied or used commercially without our written consent.",
      },
    },
    {
      title: { bs: "Vanjski linkovi i servisi", en: "External links and services" },
      body: {
        bs: "Stranica sadrži linkove ka Instagramu i Facebooku, te ugrađenu Google mapu. Ti servisi imaju vlastite uslove korištenja i politike privatnosti, van naše kontrole i odgovornosti.",
        en: "The site links to Instagram and Facebook, and embeds a Google Map. Those services have their own terms and privacy policies, outside our control and responsibility.",
      },
    },
    {
      title: { bs: "Ograničenje odgovornosti", en: "Limitation of liability" },
      body: {
        bs: "Trudimo se da sadržaj bude tačan i ažuran, ali ga dajemo \"kakav jeste\", bez garancija. Ne odgovaramo za eventualne greške u opisu, dostupnosti proizvoda ili privremenu nedostupnost stranice.",
        en: "We try to keep this content accurate and current, but it's provided \"as is\", without warranties. We're not liable for errors in descriptions, product availability, or temporary downtime of the site.",
      },
    },
    {
      title: { bs: "Mjerodavno pravo", en: "Governing law" },
      body: {
        bs: "Ovi uslovi se tumače u skladu sa zakonima Bosne i Hercegovine.",
        en: "These terms are governed by the laws of Bosnia and Herzegovina.",
      },
    },
    {
      title: { bs: "Izmjene ovih uslova", en: "Changes to these terms" },
      body: {
        bs: "Ako promijenimo ove uslove, ažuriraćemo ovu stranicu i datum na vrhu.",
        en: "If we change these terms, we'll update this page and the date at the top.",
      },
    },
  ],
  disclaimer: {
    bs: "Ovo je opšti, jednostavan opis pravila korištenja, a ne formalni pravni dokument — za specifične zakonske zahtjeve preporučujemo pravnu provjeru.",
    en: "This is a plain-language description of our terms, not a formal legal document — for specific legal requirements, we recommend a legal review.",
  },
  contactCta: { bs: "Imate pitanje o ovim uslovima?", en: "Have a question about these terms?" },
} as const;
