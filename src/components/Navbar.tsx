"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav } from "@/data/content";

const links = [
  { href: "/", key: "home" as const },
  { href: "/proizvodi", key: "products" as const },
  { href: "/o-nama", key: "about" as const },
  { href: "/kvalitet", key: "quality" as const },
  { href: "/katalog", key: "catalog" as const },
  { href: "/kontakt", key: "contact" as const },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 24));
  }, [scrollY]);

  const height = useTransform(scrollY, [0, 120], [88, 64]);

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
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo className="h-8 w-8 shrink-0" />
          <span className="font-display text-xl tracking-tight" style={{ color: "var(--forest)" }}>
            Voćar
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  color: active ? "var(--cream)" : "var(--ink-soft)",
                  background: active ? "var(--forest)" : "transparent",
                }}
              >
                {nav[link.key].bs}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/proizvodi"
            className="hidden rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wide sm:inline-flex"
            style={{ background: "var(--forest)", color: "var(--cream)" }}
          >
            Naši proizvodi
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Meni"
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
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium"
                style={{ color: pathname === link.href ? "var(--forest)" : "var(--ink)" }}
              >
                {nav[link.key].bs}
              </Link>
            ))}
            <Link
              href="/proizvodi"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold uppercase tracking-wide"
              style={{ background: "var(--forest)", color: "var(--cream)" }}
            >
              Naši proizvodi
            </Link>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
