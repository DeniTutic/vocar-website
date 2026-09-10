"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { home } from "@/data/content";
import { useT } from "@/lib/locale";
import { HeroProductField } from "./HeroProductField";
import { Logo } from "./Logo";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export function Hero() {
  const t = useT();

  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden border-b"
      style={{ borderColor: "var(--line)", background: "linear-gradient(180deg, #faf7f0 0%, #f7f3ea 55%, #ede3d0 100%)" }}
    >
      <HeroProductField />

      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(247,243,234,0.82) 0%, rgba(247,243,234,0.45) 55%, rgba(247,243,234,0) 78%)",
        }}
        aria-hidden
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-5xl px-5 py-24 text-center sm:px-8"
      >
        <div className="relative">
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 0.14, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE_OUT }}
            aria-hidden
          >
            <Logo decorative priority={false} className="h-[260%] w-auto sm:h-[300%]" />
          </motion.div>
          <motion.h1
            variants={item}
            className="relative z-10 text-5xl leading-[1.05] sm:text-7xl lg:text-8xl"
            style={{ color: "var(--forest-deep)" }}
          >
            {t(home.heroHeadline)}
          </motion.h1>
        </div>
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed sm:text-xl"
          style={{ color: "var(--ink-soft)" }}
        >
          {t(home.heroSub)}
        </motion.p>
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Plain <a>, not <Link>: reliably scrolls to the same-page anchor. */}
          <motion.a
            href="/#proizvodi"
            className="rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide shadow-sm"
            style={{ background: "var(--forest)", color: "var(--cream)" }}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {t(home.ctaPrimary)}
          </motion.a>
          <motion.a
            href="/#o-nama"
            className="rounded-full border px-7 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-white/60"
            style={{ borderColor: "var(--forest-deep)", color: "var(--forest-deep)" }}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {t(home.ctaSecondary)}
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} style={{ color: "var(--forest)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
