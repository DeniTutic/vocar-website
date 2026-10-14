"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { nav, footerContent, salesEmail } from "@/data/content";
import { useLocale, useT, type Locale } from "@/lib/locale";
import { homeHash, path } from "@/lib/routes";
import { ScrollReveal } from "./ScrollReveal";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "./SocialIcons";
import { NewsletterInline } from "./NewsletterInline";
import { track } from "@/lib/track";

const socialLinks = [
  { href: "https://www.instagram.com/vocardoo/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.facebook.com/p/Vo%C4%87ar-Br%C4%8Dko-100094245247924/", label: "Facebook", Icon: FacebookIcon },
];

const exploreLinks = (locale: Locale) => [
  { href: path("home", locale), key: "home" as const },
  { href: path("products", locale), key: "products" as const },
  { href: homeHash("#o-nama", locale), key: "about" as const },
  { href: homeHash("#kvalitet", locale), key: "quality" as const },
  { href: homeHash("#kontakt", locale), key: "contact" as const },
];

// The catalog is a PDF download, so it lives with the buying links.
const buyLinks = (locale: Locale) => [
  { href: homeHash("#gdje-kupiti", locale), key: "whereToBuy" as const },
  { href: homeHash("#distributer", locale), key: "forDistributors" as const },
  { href: "/files/vocar-katalog.pdf", key: "catalog" as const },
];

function LinkColumn({ label, links }: { label: string; links: { href: string; key: keyof typeof nav }[] }) {
  const t = useT();
  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-50">{label}</span>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={link.key === "catalog" ? () => track({ name: "catalog_download", where: "footer" }) : undefined}
          className="w-fit opacity-80 transition-opacity hover:opacity-100"
        >
          {t(nav[link.key])}
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  const t = useT();
  const { locale } = useLocale();

  return (
    <footer style={{ background: "var(--charcoal)", color: "var(--beige)" }}>
      <ScrollReveal className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <NewsletterInline />
      </ScrollReveal>

      <ScrollReveal className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <Logo className="h-20 w-auto shrink-0" />
          </div>
          <p className="max-w-xs text-sm italic opacity-70">{t(footerContent.tagline)}</p>
          <div className="mt-1 flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-50">
              {t(footerContent.followUs)}
            </span>
            <div className="-m-2 flex items-center gap-1">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center opacity-80 transition-opacity hover:opacity-100"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <LinkColumn label={t(footerContent.exploreLabel)} links={exploreLinks(locale)} />
        <LinkColumn label={t(footerContent.buyLabel)} links={buyLinks(locale)} />

        <div className="flex flex-col gap-2 text-sm">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-50">
            {t(footerContent.contactLabel)}
          </span>
          <span className="opacity-80">Voćar d.o.o. Brčko</span>
          <span className="opacity-80">Gornji Rahić 112, 76207 Gornji Rahić</span>
          <span className="opacity-80">Bosna i Hercegovina</span>
          <a href="tel:+38749512415" className="w-fit opacity-80 transition-opacity hover:opacity-100">
            +387 49 512 415
          </a>
          {/* Mobile + WhatsApp on the English site only; Bosnian shows the landline. */}
          {locale === "en" && (
            <>
              <a href="tel:+387603562480" className="w-fit opacity-80 transition-opacity hover:opacity-100">
                +387 60 35 62 480
              </a>
              <a
                href="https://wa.me/387603562480"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track({ name: "whatsapp_click", where: "footer" })}
                className="inline-flex w-fit items-center gap-1.5 opacity-80 transition-opacity hover:opacity-100"
              >
                <WhatsAppIcon size={14} />
                WhatsApp
              </a>
            </>
          )}
          <a href="mailto:vocar@vocar.ba" className="w-fit opacity-80 transition-opacity hover:opacity-100">
            vocar@vocar.ba
          </a>
          <a href={`mailto:${t(salesEmail)}`} className="w-fit opacity-80 transition-opacity hover:opacity-100">
            {t(salesEmail)}
          </a>
        </div>
      </ScrollReveal>

      <div
        className="border-t px-5 py-5 text-xs opacity-60 sm:px-8"
        style={{ borderColor: "rgba(237,227,208,0.15)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} VOĆAR — {t(footerContent.rights)}</span>
          <div className="flex items-center gap-4">
            <Link href={path("privacy", locale)} className="w-fit opacity-80 transition-opacity hover:opacity-100">
              {t(footerContent.privacyLabel)}
            </Link>
            <Link href={path("terms", locale)} className="w-fit opacity-80 transition-opacity hover:opacity-100">
              {t(footerContent.termsLabel)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
