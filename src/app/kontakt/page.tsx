import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { contact } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktirajte Voćar d.o.o. Brčko — adresa, telefon, e-mail i predstavništvo u Sloveniji.",
  alternates: { canonical: "/kontakt" },
};

const MAPS_SRC =
  "https://www.google.com/maps?q=Vo%C4%87ar+d.o.o.+Gornji+Rahi%C4%87+112%2C+76207+Gornji+Rahi%C4%87%2C+Bosna+i+Hercegovina&output=embed";

export default function KontaktPage() {
  return (
    <>
      <section className="border-b px-5 py-16 sm:px-8 sm:py-24" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
            {contact.eyebrow.bs}
          </span>
          <h1 className="mt-3 text-5xl sm:text-6xl" style={{ color: "var(--forest-deep)" }}>
            {contact.title.bs}
          </h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            {contact.body.bs}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ScrollReveal className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <MapPin size={22} style={{ color: "var(--forest)" }} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--forest-deep)" }}>
                    {contact.addressLabel.bs}
                  </div>
                  <p className="mt-1 text-base" style={{ color: "var(--ink-soft)" }}>
                    Voćar d.o.o. Brčko
                    <br />
                    Gornji Rahić 112, 76207 Gornji Rahić
                    <br />
                    Bosna i Hercegovina
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone size={22} style={{ color: "var(--forest)" }} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--forest-deep)" }}>
                    {contact.phoneLabel.bs}
                  </div>
                  <a href="tel:+38749512415" className="mt-1 block text-base hover:underline" style={{ color: "var(--ink-soft)" }}>
                    +387 49 512 415
                  </a>
                  <a href="tel:+38749513360" className="block text-base hover:underline" style={{ color: "var(--ink-soft)" }}>
                    +387 49 513 360
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail size={22} style={{ color: "var(--forest)" }} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--forest-deep)" }}>
                    {contact.emailLabel.bs}
                  </div>
                  <a href="mailto:sales@vocar.ba" className="mt-1 block text-base hover:underline" style={{ color: "var(--ink-soft)" }}>
                    sales@vocar.ba
                  </a>
                </div>
              </div>

              <div className="flex gap-4 border-t pt-6" style={{ borderColor: "var(--line)" }}>
                <MapPin size={22} style={{ color: "var(--amber)" }} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--forest-deep)" }}>
                    {contact.officeSloveniaLabel.bs}
                  </div>
                  <p className="mt-1 text-base" style={{ color: "var(--ink-soft)" }}>
                    Vočar Ljubljana d.o.o.
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

          <ScrollReveal delay={0.1} className="rounded-2xl border p-6 sm:p-10" style={{ borderColor: "var(--line)" }}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
