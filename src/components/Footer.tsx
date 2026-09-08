"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/data/dictionary";

const links = [
  { href: "/", key: "home" as const },
  { href: "/products", key: "products" as const },
  { href: "/about", key: "about" as const },
  { href: "/certificates", key: "certificates" as const },
  { href: "/contact", key: "contact" as const },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8 shrink-0" />
            <span className="font-display text-xl font-semibold">Voćar</span>
          </div>
          <p className="max-w-xs text-sm opacity-70">{t(dictionary.footer.tagline)}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-50">
            {t(dictionary.nav.products)}
          </span>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="w-fit opacity-80 hover:opacity-100">
              {t(dictionary.nav[link.key])}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-50">
            {t(dictionary.contact.heroEyebrow)}
          </span>
          <span className="opacity-80">Gornji Rahić 112, 76207 Gornji Rahić, BiH</span>
          <a href="tel:+38749512415" className="w-fit opacity-80 hover:opacity-100">
            +387 49 512 415
          </a>
          <a href="mailto:sales@vocar.ba" className="w-fit opacity-80 hover:opacity-100">
            sales@vocar.ba
          </a>
        </div>
      </div>

      <div
        className="border-t px-5 py-5 text-xs opacity-60 sm:px-8"
        style={{ borderColor: "color-mix(in srgb, var(--paper) 20%, transparent)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Voćar d.o.o. Brčko — {t(dictionary.footer.rights)}</span>
          <span>{t(dictionary.footer.concept)}</span>
        </div>
      </div>
    </footer>
  );
}
