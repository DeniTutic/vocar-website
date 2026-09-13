"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { CtaLink } from "./CtaLink";
import { nav, common, buy } from "@/data/content";
import { useLocale, useT, type Locale } from "@/lib/locale";

// Hash anchors stay plain <a> tags: a client-routed Link to "/#id" updates the
// URL but does not reliably trigger the browser's native scroll-to-anchor when
// already on "/". A real <a href="/#id"> scrolls natively both from "/" itself
// and, via a full navigation, from any other route.
const links = [
  { href: "/", key: "home" as const, sectionId: null },
  { href: "/#proizvodi", key: "products" as const, sectionId: "proizvodi" },
  { href: "/o-nama", key: "about" as const, sectionId: null },
  { href: "/#katalog", key: "catalog" as const, sectionId: "katalog" },
  { href: "/#kontakt", key: "contact" as const, sectionId: "kontakt" },
];

const SECTION_IDS = links.map((l) => l.sectionId).filter((id): id is string => id !== null);

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

const LOCALES: Locale[] = ["bs", "en"];

function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
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
          <motion.button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={isActive}
            animate={{
              backgroundColor: isActive ? "#1f3d2e" : "rgba(31,61,46,0)",
              color: isActive ? "#f7f3ea" : "#625a4d",
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="rounded-full px-2.5 py-1.5"
          >
            {l.toUpperCase()}
          </motion.button>
        );
      })}
    </div>
  );
}

function isLinkActive(link: (typeof links)[number], pathname: string, activeSection: string | null): boolean {
  const isHome = pathname === "/";
  if (link.href === "/") return isHome && activeSection === null;
  if (link.sectionId) return isHome && activeSection === link.sectionId;
  return pathname === link.href;
}

function MobileSheet({ onClose, pathname, activeSection }: { onClose: () => void; pathname: string; activeSection: string | null }) {
  const t = useT();

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
        <Link href="/" onClick={onClose} className="flex items-center">
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
          const active = isLinkActive(link, pathname, activeSection);
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
        <CtaLink href="/#gdje-kupiti" variant="buy" className="w-full" onClick={onClose}>
          {t(buy.whereToBuy)}
        </CtaLink>
      </div>
    </motion.div>
  );
}

export function Navbar() {
  const t = useT();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(isHome);
  const closeSheet = useCallback(() => setOpen(false), []);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 24));
  }, [scrollY]);

  // Close the sheet when a client-routed link (e.g. /o-nama) changes the route.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const height = useTransform(scrollY, [0, 120], [104, 76]);

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
          <Link href="/" className="flex items-center">
            <Logo className="h-16 w-auto shrink-0" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active = isLinkActive(link, pathname, activeSection);
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
              <CtaLink href="/#gdje-kupiti" variant="buy" size="sm">
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
