import type { Localized } from "./content";

export interface Market {
  x: number;
  y: number;
  label: Localized;
  origin?: true;
  anchor: "start" | "middle" | "end";
  dx: number;
  dy: number;
}

// Hand-placed to roughly echo real bearing/distance from Gornji Rahić rather
// than an even hub-and-spoke wheel — nearby ex-Yugoslav markets cluster close,
// Germany and Turkey sit further out, and the US/Mexico/Russia/Australia sit
// far across the map.
export const MARKETS: Market[] = [
  { x: 440, y: 195, label: { bs: "Gornji Rahić, BiH", en: "Gornji Rahić, Bosnia" }, origin: true, anchor: "middle", dx: 0, dy: 26 },
  { x: 385, y: 172, label: { bs: "Hrvatska", en: "Croatia" }, anchor: "middle", dx: 0, dy: -14 },
  { x: 350, y: 125, label: { bs: "Slovenija", en: "Slovenia" }, anchor: "middle", dx: 0, dy: -14 },
  { x: 395, y: 82, label: { bs: "Austrija", en: "Austria" }, anchor: "middle", dx: 0, dy: -14 },
  { x: 330, y: 42, label: { bs: "Njemačka", en: "Germany" }, anchor: "middle", dx: 0, dy: -14 },
  { x: 570, y: 235, label: { bs: "Turska", en: "Turkey" }, anchor: "start", dx: 10, dy: 5 },
  { x: 615, y: 285, label: { bs: "Saudijska Arabija", en: "Saudi Arabia" }, anchor: "middle", dx: 0, dy: 24 },
  { x: 55, y: 135, label: { bs: "Sjedinjene Američke Države", en: "United States" }, anchor: "start", dx: 10, dy: -12 },
  { x: 640, y: 260, label: { bs: "Ujedinjeni Arapski Emirati", en: "United Arab Emirates" }, anchor: "start", dx: 10, dy: 5 },
  { x: 760, y: 30, label: { bs: "Rusija", en: "Russia" }, anchor: "end", dx: -10, dy: 20 },
  { x: 25, y: 235, label: { bs: "Meksiko", en: "Mexico" }, anchor: "start", dx: 8, dy: -10 },
  { x: 790, y: 380, label: { bs: "Australija", en: "Australia" }, anchor: "end", dx: -10, dy: -12 },
  { x: 505, y: 270, label: { bs: "Libija", en: "Libya" }, anchor: "middle", dx: 0, dy: 22 },
];

export const EXPORT_MARKETS = MARKETS.filter((m) => !m.origin);
