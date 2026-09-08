"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className="inline-flex items-center rounded-full border p-0.5 text-xs font-semibold tracking-wide"
      style={{ borderColor: "var(--line)" }}
      role="group"
      aria-label="Language"
    >
      {(["bs", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className="rounded-full px-2.5 py-1 uppercase transition-colors cursor-pointer"
          style={{
            background: locale === code ? "var(--brand-red)" : "transparent",
            color: locale === code ? "var(--surface)" : "var(--ink-soft)",
          }}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
