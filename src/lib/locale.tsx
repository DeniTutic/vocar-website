"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Localized } from "@/data/content";

export type Locale = "bs" | "en";

const LocaleContext = createContext<Locale>("bs");

/**
 * The locale comes from the URL — each language has its own root layout, so
 * the server renders the right text and `<html lang>` with no flash and no
 * client-side toggle. Switching language is a navigation, not state.
 */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): { locale: Locale } {
  return { locale: useContext(LocaleContext) };
}

export function useT() {
  const locale = useContext(LocaleContext);
  return (value: Localized): string => value[locale];
}
