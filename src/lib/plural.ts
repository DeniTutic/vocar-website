import type { Locale } from "./locale";

export function productsLabel(n: number, locale: Locale): string {
  if (locale === "bs") return n % 10 === 1 && n % 100 !== 11 ? "proizvod" : "proizvoda";
  return n === 1 ? "product" : "products";
}
