"use client";

import { MapPin, Phone, Smartphone, Mail } from "lucide-react";
import { WhatsAppIcon } from "./SocialIcons";
import { contact } from "@/data/content";
import { useT } from "@/lib/locale";
import { ScrollReveal } from "./ScrollReveal";
import { ContactForm } from "./ContactForm";
import { track } from "@/lib/track";

const MAPS_SRC =
  "https://www.google.com/maps?q=Vo%C4%87ar+d.o.o.+Gornji+Rahi%C4%87+112%2C+76207+Gornji+Rahi%C4%87%2C+Bosna+i+Hercegovina&output=embed";

export function ContactSection() {
  const t = useT();

  return (
    <section
      id="kontakt"
      className="scroll-mt-20 border-t px-5 py-20 sm:px-8 sm:py-28"
      style={{ borderColor: "var(--line)", background: "var(--beige)" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
          {t(contact.eyebrow)}
        </span>
        <h2 className="mt-3 text-4xl sm:text-5xl" style={{ color: "var(--forest-deep)" }}>
          {t(contact.title)}
        </h2>
        <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          {t(contact.body)}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <ScrollReveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <MapPin size={22} style={{ color: "var(--forest)" }} className="mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--forest-deep)" }}>
                  {t(contact.addressLabel)}
                </div>
                <p className="mt-1 text-base" style={{ color: "var(--ink-soft)" }}>
                  Voćar d.o.o. Brčko
                  <br />
                  Gornji Rahić 112, 76207 Gornji Rahić
                  <br />
                  Bosna i Hercegovina
                </p>
                <p className="mt-2 text-sm italic" style={{ color: "var(--ink-soft)" }}>
                  {t(contact.addressNote)}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone size={22} style={{ color: "var(--forest)" }} className="mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--forest-deep)" }}>
                  {t(contact.phoneLabel)}
                </div>
                <a href="tel:+38749512415" onClick={() => track({ name: "tel_click", number: "+38749512415" })} className="mt-1 block text-base hover:underline" style={{ color: "var(--ink-soft)" }}>
                  +387 49 512 415
                </a>
                <a href="tel:+38749513360" onClick={() => track({ name: "tel_click", number: "+38749513360" })} className="block text-base hover:underline" style={{ color: "var(--ink-soft)" }}>
                  +387 49 513 360
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Smartphone size={22} style={{ color: "var(--forest)" }} className="mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--forest-deep)" }}>
                  {t(contact.mobileLabel)}
                </div>
                <a href="tel:+38761720012" onClick={() => track({ name: "tel_click", number: "+38761720012" })} className="mt-1 block text-base hover:underline" style={{ color: "var(--ink-soft)" }}>
                  +387 61 720 012
                </a>
                <a
                  href="https://wa.me/38761720012"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track({ name: "whatsapp_click", where: "kontakt" })}
                  className="mt-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-cream transition-colors"
                  style={{ background: "#25D366" }}
                >
                  <WhatsAppIcon size={16} />
                  {t(contact.whatsapp)}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail size={22} style={{ color: "var(--forest)" }} className="mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--forest-deep)" }}>
                  {t(contact.emailLabel)}
                </div>
                <a href="mailto:vocar@vocar.ba" className="mt-1 block text-base hover:underline" style={{ color: "var(--ink-soft)" }}>
                  vocar@vocar.ba <span className="text-sm">— {t(contact.emailGeneral)}</span>
                </a>
                <a href="mailto:prodaja@vocar.ba" className="block text-base hover:underline" style={{ color: "var(--ink-soft)" }}>
                  prodaja@vocar.ba <span className="text-sm">— {t(contact.emailSales)}</span>
                </a>
              </div>
            </div>

            <div className="flex gap-4 border-t pt-6" style={{ borderColor: "var(--line)" }}>
              <MapPin size={22} style={{ color: "var(--amber)" }} className="mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--forest-deep)" }}>
                  {t(contact.officeSloveniaLabel)}
                </div>
                <p className="mt-1 text-base" style={{ color: "var(--ink-soft)" }}>
                  Voćar Ljubljana d.o.o.
                  <br />
                  Šmartinska cesta 130, 1000 Ljubljana, Slovenija
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--line)" }}>
            <iframe
              title="Voćar d.o.o. — Gornji Rahić"
              src={MAPS_SRC}
              width="100%"
              height="280"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </ScrollReveal>

        {/* On desktop the form rides along while the contact details scroll,
            and stops where the grid ends — just above the newsletter. */}
        <ScrollReveal delay={0.1} className="lg:sticky lg:top-24">
          <div id="distributer" className="scroll-mt-24 rounded-2xl border p-6 sm:p-10" style={{ borderColor: "var(--line)" }}>
            <ContactForm />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
