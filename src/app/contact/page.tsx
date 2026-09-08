"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/data/dictionary";

const MAPS_SRC =
  "https://www.google.com/maps?q=Vo%C4%87ar+d.o.o.+Gornji+Rahi%C4%87+112%2C+76207+Gornji+Rahi%C4%87%2C+Bosna+i+Hercegovina&output=embed";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="border-b px-5 py-14 sm:px-8 sm:py-20" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-red)" }}>
            {t(dictionary.contact.heroEyebrow)}
          </span>
          <h1 className="mt-3 text-4xl font-semibold sm:text-6xl">{t(dictionary.contact.heroTitle)}</h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            {t(dictionary.contact.heroBody)}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-14">
          <div className="flex flex-col gap-6">
            <ContactCard label={t(dictionary.contact.addressLabel)}>
              Voćar d.o.o. Brčko
              <br />
              Gornji Rahić 112
              <br />
              76207 Gornji Rahić, BiH
            </ContactCard>

            <ContactCard label={t(dictionary.contact.phoneLabel)}>
              <a href="tel:+38749512415" className="block hover:underline">
                +387 49 512 415
              </a>
              <a href="tel:+38749513360" className="block hover:underline">
                +387 49 513 360
              </a>
            </ContactCard>

            <ContactCard label={t(dictionary.contact.faxLabel)}>+387 49 513 261</ContactCard>

            <ContactCard label={t(dictionary.contact.emailLabel)}>
              <a href="mailto:sales@vocar.ba" className="block hover:underline">
                sales@vocar.ba
              </a>
              <a href="mailto:info@vocar.ba" className="block hover:underline">
                info@vocar.ba
              </a>
              <a href="mailto:vocar@vocar.ba" className="block hover:underline">
                vocar@vocar.ba
              </a>
            </ContactCard>
          </div>

          <div className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-3xl border shadow-sm" style={{ borderColor: "var(--line)" }}>
              <iframe
                title="Voćar d.o.o. — Gornji Rahić"
                src={MAPS_SRC}
                width="100%"
                height="420"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
              {t(dictionary.contact.mapNote)}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
      <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-red)" }}>
        {label}
      </div>
      <div className="mt-2 text-base leading-relaxed" style={{ color: "var(--ink)" }}>
        {children}
      </div>
    </div>
  );
}
