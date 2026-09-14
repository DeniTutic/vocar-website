"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { home, buy } from "@/data/content";
import { getProductBySlug } from "@/data/products";
import { useT } from "@/lib/locale";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { HeroProductField } from "./HeroProductField";
import { Logo } from "./Logo";
import { NAVBAR_HEIGHT_EXPANDED } from "./Navbar";
import { CtaLink } from "./CtaLink";
import { ProductBadge } from "./ProductBadge";

const FLAGSHIP_SLUG = "popcorn-pop-star-kokice-karamel";
const flagship = getProductBySlug(FLAGSHIP_SLUG)!;

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const MotionLink = motion.create(Link);

export function Hero() {
  const t = useT();
  const reducedMotion = useReducedMotion();

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
          <motion.span
            variants={item}
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: "var(--forest)" }}
          >
            {t(home.heroEyebrow)}
          </motion.span>

          {/* Three layers: stagger entrance, idle float, hover lift — each owns its own `y`. */}
          <motion.div variants={item} className="mt-6">
            <motion.div
              animate={reducedMotion ? undefined : { y: [-6, 6, -6] }}
              transition={reducedMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
            <MotionLink
              href={`/proizvodi/${flagship.slug}`}
              className="relative block h-36 w-36 sm:h-48 sm:w-48"
              whileHover={{ y: -4, rotate: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              aria-label={t(flagship.name)}
            >
              <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/80">
                <Image
                  src={flagship.image}
                  alt={t(home.heroFlagshipAlt)}
                  fill
                  priority
                  sizes="(min-width: 640px) 192px, 144px"
                  className="object-cover"
                  style={{ objectPosition: "50% 100%" }}
                />
              </div>
              <ProductBadge badge="hit" wiggle className="absolute -left-2 -top-2 rotate-[-8deg] shadow-md" />
            </MotionLink>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 max-w-4xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
            style={{ color: "var(--forest-deep)" }}
          >
            {t(flagship.flavor)}
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--ink-soft)" }}
          >
            {t(home.heroSkuLine)}
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-4">
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
