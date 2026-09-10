"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Localized } from "@/data/content";

export type Locale = "bs" | "en";

const STORAGE_KEY = "vocar_locale";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
} | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bs");

  useEffect(() => {
    // Reads an SSR-unavailable external store (localStorage) after mount —
    // one of the two effect use-cases React's own docs call out as valid,
    // not state that could be derived during render.
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "bs" || stored === "en") setLocaleState(stored);
    } catch {
      // localStorage unavailable — fall back to default "bs".
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — selection just won't persist.
    }
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}

export function useT() {
  const { locale } = useLocale();
  return (value: Localized): string => value[locale];
}
