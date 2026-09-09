"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { home } from "@/data/content";

const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), {
  ssr: false,
});

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
  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden border-b"
      style={{ borderColor: "var(--line)", background: "linear-gradient(180deg, #faf7f0 0%, #f7f3ea 55%, #ede3d0 100%)" }}
    >
      <HeroScene />

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
        <motion.h1
          variants={item}
          className="text-5xl leading-[1.05] sm:text-7xl lg:text-8xl"
          style={{ color: "var(--forest-deep)" }}
        >
          {home.heroHeadline.bs}
        </motion.h1>
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed sm:text-xl"
          style={{ color: "var(--ink-soft)" }}
        >
          {home.heroSub.bs}
        </motion.p>
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Plain <a>, not <Link>: reliably scrolls to the same-page anchor. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/#proizvodi"
            className="rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide shadow-sm transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--forest)", color: "var(--cream)" }}
          >
            {home.ctaPrimary.bs}
          </a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/#o-nama"
            className="rounded-full border px-7 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-white/60"
            style={{ borderColor: "var(--forest-deep)", color: "var(--forest-deep)" }}
          >
            {home.ctaSecondary.bs}
          </a>
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
