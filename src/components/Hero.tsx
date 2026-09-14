"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { home, buy } from "@/data/content";
import { useT } from "@/lib/locale";
import { HeroProductField } from "./HeroProductField";
import { Logo } from "./Logo";
import { NAVBAR_HEIGHT_EXPANDED } from "./Navbar";
import { CtaLink } from "./CtaLink";
import { RotatingWord } from "./RotatingWord";

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
  const words = [home.heroWord1, home.heroWord2, home.heroWord3, home.heroWord4, home.heroWord5].map(t);

  return (
    <section
      className="relative isolate flex flex-col justify-center overflow-hidden border-b"
      style={{
        borderColor: "var(--line)",
        background: "linear-gradient(180deg, #faf7f0 0%, #f7f3ea 55%, #ede3d0 100%)",
        // Navbar is sticky (occupies normal-flow height), not fixed, so the
        // hero must be shorter than a full screen by exactly that height —
        // otherwise the two together overflow the viewport on first load.
        height: `calc(100svh - ${NAVBAR_HEIGHT_EXPANDED}px)`,
      }}
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
        className="relative z-10 mx-auto w-full max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-20"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 0.14, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE_OUT }}
          aria-hidden
        >
          <Logo decorative priority={false} className="h-[120%] w-auto sm:h-[130%]" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Brand first: the real logo and the company motto are what should
              catch the eye before anything product-specific. */}
          <motion.div variants={item}>
            <Logo className="h-12 w-auto sm:h-14" />
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-4 max-w-2xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl"
            style={{ color: "var(--forest-deep)" }}
          >
            {t(home.heroMotto)}
          </motion.h1>

          <motion.div variants={item} className="mt-6">
            <RotatingWord words={words} className="text-2xl font-semibold text-forest sm:text-3xl" />
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CtaLink href="/#gdje-kupiti" variant="buy">
              {t(buy.whereToBuy)}
            </CtaLink>
            <CtaLink href="/#proizvodi" variant="secondary">
              {t(buy.seeSnacks)}
            </CtaLink>
          </motion.div>
        </div>
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
