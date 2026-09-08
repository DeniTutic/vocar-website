"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/data/dictionary";

const links = [
  { href: "/", key: "home" as const },
  { href: "/products", key: "products" as const },
  { href: "/about", key: "about" as const },
  { href: "/certificates", key: "certificates" as const },
  { href: "/contact", key: "contact" as const },
];

export function Nav() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{ borderColor: "var(--line)", background: "color-mix(in srgb, var(--paper) 88%, transparent)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo className="h-8 w-8 shrink-0" />
          <span className="font-display text-xl font-semibold tracking-tight">Voćar</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors"
                style={{
                  color: active ? "var(--surface)" : "var(--ink-soft)",
                  background: active ? "var(--brand-red)" : "transparent",
                }}
              >
                {t(dictionary.nav[link.key])}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border md:hidden"
            style={{ borderColor: "var(--line)" }}
          >
            <span className="relative block h-3 w-4">
              <span
                className="absolute left-0 right-0 h-[1.5px] transition-transform"
                style={{ background: "var(--ink)", top: open ? "6px" : "0", transform: open ? "rotate(45deg)" : "none" }}
              />
              <span
                className="absolute left-0 right-0 top-[6px] h-[1.5px] transition-opacity"
                style={{ background: "var(--ink)", opacity: open ? 0 : 1 }}
              />
              <span
                className="absolute left-0 right-0 h-[1.5px] transition-transform"
                style={{ background: "var(--ink)", top: open ? "6px" : "12px", transform: open ? "rotate(-45deg)" : "none" }}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          className="border-t md:hidden"
          style={{ borderColor: "var(--line)", background: "var(--paper)" }}
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium"
                style={{
                  color: pathname === link.href ? "var(--brand-red)" : "var(--ink)",
                }}
              >
                {t(dictionary.nav[link.key])}
              </Link>
            ))}
            <div className="pt-2">
              <LanguageToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
