"use client";

import { Logo } from "./Logo";
import { nav, footerContent } from "@/data/content";
import { useT } from "@/lib/locale";
import { ScrollReveal } from "./ScrollReveal";
import { NewsletterInline } from "./NewsletterInline";
import { InstagramIcon, FacebookIcon } from "./SocialIcons";

const socialLinks = [
  { href: "https://www.instagram.com/vocardoo/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.facebook.com/p/Vo%C4%87ar-Br%C4%8Dko-100094245247924/", label: "Facebook", Icon: FacebookIcon },
];

const exploreLinks = [
  { href: "/", key: "home" as const },
  { href: "/#proizvodi", key: "products" as const },
  { href: "/#o-nama", key: "about" as const },
  { href: "/#kvalitet", key: "quality" as const },
  { href: "/#katalog", key: "catalog" as const },
  { href: "/#kontakt", key: "contact" as const },
];

const buyLinks = [
  { href: "/#gdje-kupiti", key: "whereToBuy" as const },
  { href: "/#distributer", key: "forDistributors" as const },
];

function LinkColumn({ label, links }: { label: string; links: { href: string; key: keyof typeof nav }[] }) {
  const t = useT();
  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-50">{label}</span>
      {links.map((link) => (
        <a key={link.href} href={link.href} className="w-fit opacity-80 transition-opacity hover:opacity-100">
          {t(nav[link.key])}
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  const t = useT();

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
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="opacity-80 transition-opacity hover:opacity-100"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <LinkColumn label={t(footerContent.exploreLabel)} links={exploreLinks} />
        <LinkColumn label={t(footerContent.buyLabel)} links={buyLinks} />

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
          <a href="tel:+38749513360" className="w-fit opacity-80 transition-opacity hover:opacity-100">
            +387 49 513 360
          </a>
          <a href="mailto:sales@vocar.ba" className="w-fit opacity-80 transition-opacity hover:opacity-100">
            sales@vocar.ba
          </a>
        </div>
      </ScrollReveal>

      <div
        className="border-t px-5 py-5 text-xs opacity-60 sm:px-8"
        style={{ borderColor: "rgba(237,227,208,0.15)" }}
      >
        <div className="mx-auto max-w-7xl">
          <span>© {new Date().getFullYear()} VOĆAR — {t(footerContent.rights)}</span>
        </div>
      </div>
    </footer>
  );
}
