export type Locale = "bs" | "en";

export interface Localized {
  bs: string;
  en: string;
}

export const dictionary = {
  nav: {
    home: { bs: "Početna", en: "Home" },
    products: { bs: "Proizvodi", en: "Products" },
    about: { bs: "O nama", en: "About" },
    certificates: { bs: "Kvaliteta", en: "Quality" },
    contact: { bs: "Kontakt", en: "Contact" },
  },
  common: {
    tagline: { bs: "Za bolji okus života", en: "For a better taste of life" },
    viewProducts: { bs: "Pogledaj proizvode", en: "View products" },
    ourRange: { bs: "Naš asortiman", en: "Our range" },
    getInTouch: { bs: "Pišite nam", en: "Get in touch" },
    categories: { bs: "kategorija", en: "categories" },
    skus: { bs: "proizvoda", en: "products" },
  },
  home: {
    heroEyebrow: { bs: "Voćar d.o.o. Brčko", en: "Voćar d.o.o. Brčko" },
    heroTitle1: { bs: "Grickalice koje", en: "Snacks worth" },
    heroTitle2: { bs: "prave trenutak.", en: "the moment." },
    heroBody: {
      bs: "Od hrskavog kukuruznog flipsa do kokica koje pucaju u tvojoj kuhinji — pravimo grickalice iz Gornjeg Rahića za cijelu regiju.",
      en: "From crunchy corn flips to popcorn that pops in your own kitchen — we make snacks in Gornji Rahić for the whole region.",
    },
    shelfEyebrow: { bs: "Asortiman", en: "The range" },
    shelfTitle: { bs: "Jedanaest polica, jedan Voćar.", en: "Eleven shelves, one Voćar." },
    introEyebrow: { bs: "Otkako pucaju kokice", en: "Since the popcorn started popping" },
    introTitle: { bs: "Napravljeno da se dijeli.", en: "Made to be shared." },
    introBody: {
      bs: "Voćar proizvodi grickalice, orašaste plodove, namaze i osnovne namirnice iz Gornjeg Rahića kod Brčkog — od suhih šljiva i putera od kikirikija do kokica i čipsa. Isti apetit za dobrim ukusom, u jedanaest različitih porodica proizvoda.",
      en: "Voćar makes snacks, nuts, spreads and pantry staples out of Gornji Rahić near Brčko — from dried plums and peanut butter to popcorn and chips. One appetite for good taste, spread across eleven product families.",
    },
    introCta: { bs: "Upoznaj asortiman", en: "Meet the range" },
    ctaTitle: { bs: "Tražite distributera?", en: "Looking to stock Voćar?" },
    ctaBody: {
      bs: "Javite nam se — rado ćemo razgovarati o saradnji, izvozu i vašem tržištu.",
      en: "Reach out — we're always glad to talk distribution, export and your market.",
    },
    ctaButton: { bs: "Kontaktirajte nas", en: "Contact us" },
  },
  products: {
    heroEyebrow: { bs: "Katalog proizvoda", en: "Product catalogue" },
    heroTitle: { bs: "Sve što pravimo.", en: "Everything we make." },
    heroBody: {
      bs: "Jedanaest kategorija, od sušenog voća do kokica — svaka nosi boju svog pakovanja.",
      en: "Eleven categories, from dried fruit to popcorn — each one carries its own packaging's color.",
    },
    jumpTo: { bs: "Idi na", en: "Jump to" },
  },
  about: {
    heroEyebrow: { bs: "O Voćaru", en: "About Voćar" },
    heroTitle: { bs: "Iz Gornjeg Rahića, za sto svakog dana.", en: "From Gornji Rahić, for every table." },
    p1: {
      bs: "Voćar d.o.o. je proizvođač grickalica i prehrambenih proizvoda sa sjedištem u Gornjem Rahiću kod Brčkog, u Bosni i Hercegovini. Ime nosi zavjet iz naziva — voćar, onaj koji njeguje voće — i taj isti pristup prenosimo na svaku vrećicu koju napunimo.",
      en: "Voćar d.o.o. is a snack and food producer based in Gornji Rahić, near Brčko, Bosnia and Herzegovina. The name carries a promise — voćar, \"the fruit grower\" — and that same care runs through every bag we fill.",
    },
    p2: {
      bs: "Asortiman je namjerno širok: suhe šljive i kikiriki, kukuruzni flips i kokice, puter od kikirikija i oblatne, žitarice i osnovne namirnice poput griza i polente. Različiti proizvodi, ista ideja — bolji okus svakog dana.",
      en: "The range is deliberately wide: dried plums and peanuts, corn flips and popcorn, peanut butter and wafers, cereal and pantry staples like grits and polenta. Different products, the same idea — a better taste, every day.",
    },
    p3: {
      bs: "Naši proizvodi putuju i van Bosne i Hercegovine — imamo partnere za distribuciju u Sloveniji i Austriji — ali svaka vrećica i dalje kreće iz iste fabrike u Gornjem Rahiću.",
      en: "Our products travel beyond Bosnia and Herzegovina too — we work with distribution partners in Slovenia and Austria — but every bag still starts at the same plant in Gornji Rahić.",
    },
    statLabel1: { bs: "porodica proizvoda", en: "product families" },
    statLabel2: { bs: "tržišta izvoza", en: "export markets" },
    statLabel3: { bs: "ime na svakoj vrećici", en: "name on every bag" },
  },
  certificates: {
    heroEyebrow: { bs: "Kvaliteta i standardi", en: "Quality & standards" },
    heroTitle: { bs: "Kako pazimo na kvalitetu.", en: "How we handle quality." },
    body: {
      bs: "Proizvodnja grickalica, orašastih plodova i namirnica podliježe strogim standardima sigurnosti hrane, od ulazne kontrole sirovina do pakovanja. Ova stranica je predviđena da ugosti stvarne certifikate i dokumente Voćara — trenutno je prazna polica, spremna da se popuni pravim sadržajem kada ga dostavite.",
      en: "Producing snacks, nuts and pantry staples means working under strict food-safety standards, from raw-material intake through to packaging. This page is built to hold Voćar's real certificates and documents — right now it's an empty shelf, ready to be filled with the real thing once it's supplied.",
    },
    placeholderTitle: { bs: "Rezervisano mjesto za certifikat", en: "Certificate placeholder" },
    placeholderBody: {
      bs: "Ovdje dolazi sken ili PDF stvarnog certifikata (npr. HACCP, ISO, halal) čim nam ga proslijedite.",
      en: "A scan or PDF of the real certificate (e.g. HACCP, ISO, halal) goes here once it's provided.",
    },
  },
  contact: {
    heroEyebrow: { bs: "Kontakt", en: "Contact" },
    heroTitle: { bs: "Popričajmo.", en: "Let's talk." },
    heroBody: {
      bs: "Za narudžbe, distribuciju ili bilo koje pitanje o asortimanu — tu smo.",
      en: "For orders, distribution, or any question about the range — we're here.",
    },
    addressLabel: { bs: "Adresa", en: "Address" },
    phoneLabel: { bs: "Telefon", en: "Phone" },
    faxLabel: { bs: "Faks", en: "Fax" },
    emailLabel: { bs: "E-mail", en: "Email" },
    mapNote: { bs: "Gornji Rahić 112, 76207 Gornji Rahić, Bosna i Hercegovina", en: "Gornji Rahić 112, 76207 Gornji Rahić, Bosnia and Herzegovina" },
  },
  footer: {
    tagline: { bs: "Za bolji okus života.", en: "For a better taste of life." },
    rights: { bs: "Sva prava zadržana.", en: "All rights reserved." },
    concept: {
      bs: "Konceptualni redizajn sajta — nije zvanična stranica vocar.ba.",
      en: "A concept redesign — not the official vocar.ba site.",
    },
  },
} as const;
