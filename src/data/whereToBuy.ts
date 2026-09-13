import type { Localized } from "./content";

export interface Region {
  name: Localized;
  cities: string[];
}

export interface Retailer {
  name: string;
  kind: "chain" | "shop" | "online";
  url?: string;
  cities?: string[];
  countries?: string[];
}

export const bihRegions: Region[] = [
  { name: { bs: "Sjeveroistok", en: "Northeast" }, cities: ["Brčko", "Tuzla", "Bijeljina", "Gradačac", "Orašje", "Srebrenik"] },
  { name: { bs: "Sarajevo i centralna Bosna", en: "Sarajevo & Central Bosnia" }, cities: ["Sarajevo", "Zenica", "Travnik", "Visoko", "Kakanj"] },
  { name: { bs: "Sjeverozapad", en: "Northwest" }, cities: ["Banja Luka", "Prijedor", "Doboj", "Bihać", "Cazin"] },
  { name: { bs: "Hercegovina", en: "Herzegovina" }, cities: ["Mostar", "Trebinje", "Čapljina", "Široki Brijeg"] },
];

export { EXPORT_MARKETS as exportCountries } from "./markets";

// Retailer names are not public yet; fill this in and WhereToBuy renders them.
export const retailers: Retailer[] = [];
