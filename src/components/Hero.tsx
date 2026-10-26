"use client";

import type { CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import { home, buy } from "@/data/content";
import { useLocale, useT } from "@/lib/locale";
import { homeHash, path } from "@/lib/routes";
import { HeroProductField } from "./HeroProductField";
import { Logo } from "./Logo";
import { NAVBAR_HEIGHT_EXPANDED } from "./Navbar";
import { CtaLink } from "./CtaLink";
import { RotatingWord } from "./RotatingWord";

// Staggered entrance: 0.1s in, then 0.12s between items (see .hero-rise).
const rise = (step: number) => ({ "--hero-delay": `${0.1 + step * 0.12}s` }) as CSSProperties;

export function Hero() {
  const t = useT();
  const { locale } = useLocale();
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

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-20"
      >
        <div className="relative z-10 flex flex-col items-center">
          {/* Brand first: the real logo and the company motto are what should
              catch the eye before anything product-specific. */}
          <div className="hero-rise" style={rise(0)}>
            <Logo className="h-12 w-auto sm:h-14" />
          </div>

          <h1
            className="hero-rise mt-4 max-w-2xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl"
            style={{ color: "var(--forest-deep)", ...rise(1) }}
          >
            {t(home.heroMotto)}
          </h1>

          <div className="hero-rise mt-6" style={rise(2)}>
            <RotatingWord words={words} className="text-2xl font-semibold text-forest sm:text-3xl" />
          </div>

          <div className="hero-rise mt-8 flex flex-wrap items-center justify-center gap-4" style={rise(3)}>
            <CtaLink href={homeHash("#gdje-kupiti", locale)} variant="buy">
              {t(buy.whereToBuy)}
            </CtaLink>
            <CtaLink href={path("products", locale)} variant="secondary">
              {t(buy.seeSnacks)}
            </CtaLink>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-[hero-fade-in_0.6s_1.1s_both]"
        aria-hidden
      >
        <div className="animate-[hero-bob_1.8s_ease-in-out_infinite]">
          <ChevronDown size={22} style={{ color: "var(--forest)" }} />
        </div>
      </div>
    </section>
  );
}
