"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav, common } from "@/data/content";
import { useLocale, useT, type Locale } from "@/lib/locale";

// Plain <a> tags, not next/link: these are same-page hash anchors, and a
// client-routed Link to "/#id" updates the URL but does not reliably
// trigger the browser's native scroll-to-anchor when already on "/".
// A real <a href="/#id"> scrolls natively both from "/" itself and, via a
// full navigation, from any other route (e.g. a product detail page).
const links = [
  { href: "/", key: "home" as const },
  { href: "/#proizvodi", key: "products" as const },
  { href: "/#o-nama", key: "about" as const },
  { href: "/#kvalitet", key: "quality" as const },
  { href: "/#katalog", key: "catalog" as const },
  { href: "/#kontakt", key: "contact" as const },
];

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

export function Navbar() {
  const t = useT();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 24));
  }, [scrollY]);

  const height = useTransform(scrollY, [0, 120], [104, 76]);

  return (
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
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Logo className="h-16 w-auto shrink-0" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = link.href === "/" && isHome;
            return (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  color: active ? "var(--cream)" : "var(--ink-soft)",
                  background: active ? "var(--forest)" : "transparent",
                }}
              >
                {t(nav[link.key])}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <motion.a
            href="/#proizvodi"
            className="hidden rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wide sm:inline-flex"
            style={{ background: "var(--forest)", color: "var(--cream)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {t(nav.ctaProducts)}
          </motion.a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={t(nav.menuLabel)}
            className="flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
            style={{ borderColor: "var(--line)" }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="absolute left-0 right-0 top-full border-t lg:hidden"
          style={{ borderColor: "var(--line)", background: "var(--cream)" }}
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium"
                style={{ color: "var(--ink)" }}
              >
                {t(nav[link.key])}
              </a>
            ))}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/#proizvodi"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold uppercase tracking-wide"
              style={{ background: "var(--forest)", color: "var(--cream)" }}
            >
              {t(nav.ctaProducts)}
            </a>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
