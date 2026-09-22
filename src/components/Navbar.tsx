"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { CtaLink } from "./CtaLink";
import { nav, common, buy } from "@/data/content";
import { useLocale, useT, type Locale } from "@/lib/locale";
import { LOCALES, homeHash, path, swapLocale } from "@/lib/routes";

// Hash anchors stay plain <a> tags: a client-routed Link to "/#id" updates the
// URL but does not reliably trigger the browser's native scroll-to-anchor when
// already on "/". A real <a href="/#id"> scrolls natively both from "/" itself
// and, via a full navigation, from any other route.
function navLinks(locale: Locale) {
  return [
    { href: path("home", locale), key: "home" as const, sectionId: null },
    { href: path("products", locale), key: "products" as const, sectionId: null },
    { href: homeHash("#o-nama", locale), key: "about" as const, sectionId: "o-nama" },
    { href: homeHash("#kvalitet", locale), key: "quality" as const, sectionId: "kvalitet" },
    // Katalog is a download, not a destination — it lives in WhereToBuy, the
    // catalog section and the footer, so it doesn't earn a slot in the bar.
    { href: homeHash("#kontakt", locale), key: "contact" as const, sectionId: "kontakt" },
  ];
}
type NavLink = ReturnType<typeof navLinks>[number];

// In page order. "gdje-kupiti" has no nav link, but tracking it means
// "Kvalitet" stops staying highlighted through Where to buy and Testimonials.
const SECTION_IDS = ["o-nama", "kvalitet", "gdje-kupiti", "kontakt"];

/** Navbar height at the top of the page, before it shrinks on scroll.
 * Exported so the Hero section can size itself to exactly fill the first
 * screen (navbar + hero == 100svh) instead of overflowing past the fold. */
export const NAVBAR_HEIGHT_EXPANDED = 104;
const NAVBAR_HEIGHT_COLLAPSED = 76;

/** Tracks which anchor section (if any) the user has scrolled into, so the
 * navbar can highlight the section currently in view rather than only ever
 * highlighting "Home". Picks the last section whose top has passed the
 * sticky header, falling back to `null` (home/top of page) above all of them. */
function useActiveSection(enabled: boolean): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let frame: number | null = null;
    const computeActive = () => {
      frame = null;
      const headerOffset = 140;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - headerOffset <= 0) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(computeActive);
    };

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return activeSection;
}

/** Language is a URL, not state: each option links to this same page in the
 *  other language, so the choice is shareable and indexable. */
function LanguageSwitcher() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const t = useT();

  return (
    <div
      className="flex items-center rounded-full border p-0.5 text-[11px] font-semibold uppercase tracking-wide"
      style={{ borderColor: "var(--line)" }}
      role="group"
      aria-label={t(common.languageLabel)}
    >
      {LOCALES.map((l) => {
        const isActive = locale === l;
        return (
          <motion.a
            key={l}
            href={swapLocale(pathname, l)}
            hrefLang={l}
            aria-current={isActive ? "true" : undefined}
            animate={{
              backgroundColor: isActive ? "#1f3d2e" : "rgba(31,61,46,0)",
              color: isActive ? "#f7f3ea" : "#625a4d",
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="rounded-full px-2.5 py-1.5"
          >
            {l.toUpperCase()}
          </motion.a>
        );
      })}
    </div>
  );
}

function isLinkActive(link: NavLink, pathname: string, activeSection: string | null, home: string): boolean {
  const isHome = pathname === home;
  if (link.href === home) return isHome && activeSection === null;
  if (link.sectionId) return isHome && activeSection === link.sectionId;
  // Route links (e.g. /proizvodi) also own their children (/proizvodi/[slug]).
  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}

function MobileSheet({ onClose, pathname, activeSection }: { onClose: () => void; pathname: string; activeSection: string | null }) {
  const t = useT();
  const { locale } = useLocale();
  const links = navLinks(locale);
  const home = path("home", locale);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={t(nav.menuLabel)}
      className="fixed inset-0 z-[60] flex flex-col lg:hidden"
      style={{ background: "var(--cream)" }}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <Link href={home} onClick={onClose} className="flex items-center">
          <Logo className="h-14 w-auto shrink-0" priority={false} />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label={t(common.close)}
          className="flex h-10 w-10 items-center justify-center rounded-full border"
          style={{ borderColor: "var(--line)" }}
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-4 sm:px-8">
        {links.map((link) => {
          const active = isLinkActive(link, pathname, activeSection, home);
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              aria-current={active ? "true" : undefined}
              className="rounded-xl px-4 py-3 font-display text-2xl font-semibold transition-colors"
              style={{
                color: active ? "var(--forest)" : "var(--ink)",
                background: active ? "rgba(31,61,46,0.08)" : "transparent",
              }}
            >
              {t(nav[link.key])}
            </a>
          );
        })}
      </nav>

      <div
        className="mt-auto border-t px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8"
        style={{ borderColor: "var(--line)" }}
      >
        <CtaLink href={homeHash("#gdje-kupiti", locale)} variant="buy" className="w-full" onClick={onClose}>
          {t(buy.whereToBuy)}
        </CtaLink>
      </div>
    </motion.div>
  );
}

export function Navbar() {
  const t = useT();
  const { locale } = useLocale();
  const pathname = usePathname();
  const links = navLinks(locale);
  const home = path("home", locale);
  const isHome = pathname === home;
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(isHome);
  const closeSheet = () => setOpen(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 24));
  }, [scrollY]);

  // Close the sheet if the route ever changes (e.g. a product page back-link).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const height = useTransform(scrollY, [0, 120], [NAVBAR_HEIGHT_EXPANDED, NAVBAR_HEIGHT_COLLAPSED]);

  return (
    <>
      <motion.header
        style={{ height }}
        className="sticky top-0 z-50 flex items-center border-b transition-colors duration-300"
        animate={{
          backgroundColor: scrolled ? "rgba(247,243,234,0.85)" : "rgba(247,243,234,0)",
          borderColor: scrolled ? "var(--line)" : "rgba(221,210,184,0)",
          backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href={home} className="flex items-center">
            <Logo className="h-16 w-auto shrink-0" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active = isLinkActive(link, pathname, activeSection, home);
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "true" : undefined}
                  animate={{
                    backgroundColor: active ? "#1f3d2e" : "rgba(31,61,46,0)",
                    color: active ? "#f7f3ea" : "#625a4d",
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="rounded-full px-4 py-2 text-sm font-medium"
                >
                  {t(nav[link.key])}
                </motion.a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="hidden sm:block">
              <CtaLink href={homeHash("#gdje-kupiti", locale)} variant="buy" size="sm">
                {t(buy.whereToBuy)}
              </CtaLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label={t(nav.menuLabel)}
              className="flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
              style={{ borderColor: "var(--line)" }}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && <MobileSheet onClose={closeSheet} pathname={pathname} activeSection={activeSection} />}
      </AnimatePresence>
    </>
  );
}
