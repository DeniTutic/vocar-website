"use client";

import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/data/dictionary";

const placeholders = [1, 2, 3, 4];

export default function CertificatesPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="border-b px-5 py-14 sm:px-8 sm:py-20" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-red)" }}>
            {t(dictionary.certificates.heroEyebrow)}
          </span>
          <h1 className="mt-3 text-4xl font-semibold sm:text-6xl">{t(dictionary.certificates.heroTitle)}</h1>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            {t(dictionary.certificates.body)}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {placeholders.map((n) => (
            <div
              key={n}
              className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center"
              style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
                <rect x="6" y="4" width="28" height="32" rx="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 13h16M12 19h16M12 25h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                {t(dictionary.certificates.placeholderTitle)}
              </span>
              <span className="text-xs leading-relaxed">{t(dictionary.certificates.placeholderBody)}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
