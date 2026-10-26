import type { CSSProperties } from "react";
import Image from "next/image";

interface FloatingProduct {
  src: string;
  alt: string;
  wrapperClass: string;
  sizeClass: string;
  rotate: number;
  duration: number;
  delay: number;
  objectPosition: string;
  hideOnMobile?: boolean;
}

// Real product package photos, each centered on a matching beige backdrop,
// so a dead-center object-position works safely at every crop ratio here.
const PRODUCTS: FloatingProduct[] = [
  {
    src: "/images/categories/flips-time.jpg",
    alt: "Pakovanje Flips Time, kikiriki",
    wrapperClass: "left-[2%] top-[7%] sm:left-[5%] sm:top-[22%]",
    sizeClass: "h-20 w-36 sm:h-36 sm:w-64 lg:h-40 lg:w-72",
    rotate: -7,
    duration: 5.2,
    delay: 0,
    objectPosition: "50% 50%",
  },
  {
    src: "/images/categories/chips.jpg",
    alt: "Pakovanje Crispy Fun, piletina",
    wrapperClass: "left-[4%] bottom-[4%] sm:left-[9%] sm:bottom-[14%]",
    sizeClass: "h-24 w-24 sm:h-44 sm:w-44 lg:h-52 lg:w-52",
    rotate: 5,
    duration: 6.1,
    delay: 0.6,
    objectPosition: "50% 50%",
  },
  {
    src: "/images/categories/peanuts.jpg",
    alt: "Pakovanje Sneki kikiriki, slani i prženi",
    wrapperClass: "right-[3%] top-[6%] sm:right-[6%] sm:top-[20%]",
    sizeClass: "h-24 w-24 sm:h-48 sm:w-48 lg:h-56 lg:w-56",
    rotate: 6,
    duration: 5.8,
    delay: 0.3,
    objectPosition: "50% 50%",
  },
  {
    src: "/images/categories/wafers.jpg",
    alt: "Pakovanje Tima oblatne",
    wrapperClass: "right-[4%] bottom-[5%] sm:right-[8%] sm:bottom-[12%]",
    sizeClass: "h-20 w-36 sm:h-36 sm:w-60 lg:h-40 lg:w-72",
    rotate: -5,
    duration: 4.7,
    delay: 0.9,
    objectPosition: "50% 50%",
  },
  {
    src: "/images/categories/prunes.jpg",
    alt: "Pakovanje Čoko šljiva",
    wrapperClass: "left-[1%] top-[46%] sm:left-[2%] sm:top-[44%]",
    sizeClass: "h-28 w-20 sm:h-40 sm:w-32 lg:h-44 lg:w-36",
    rotate: 8,
    duration: 6.6,
    delay: 1.2,
    objectPosition: "50% 50%",
    hideOnMobile: true,
  },
  {
    src: "/images/categories/quinoa-flips.jpg",
    alt: "Pakovanje Q Flips kinoa i kukuruz, kikiriki",
    wrapperClass: "right-[1%] top-[44%] sm:right-[2%] sm:top-[42%]",
    sizeClass: "h-28 w-20 sm:h-40 sm:w-32 lg:h-44 lg:w-36",
    rotate: -8,
    duration: 5.9,
    delay: 0.8,
    objectPosition: "50% 50%",
    hideOnMobile: true,
  },
  {
    src: "/images/categories/cereals.jpg",
    alt: "Pakovanje Happy Cerios",
    wrapperClass: "left-[27%] top-[32%] sm:left-[28%] sm:top-[30%]",
    sizeClass: "h-16 w-16 sm:h-24 sm:w-24 lg:h-28 lg:w-28",
    rotate: 4,
    duration: 5.4,
    delay: 1.5,
    objectPosition: "50% 50%",
    hideOnMobile: true,
  },
  {
    src: "/images/categories/timi-flips.jpg",
    alt: "Pakovanje Timi Pikant",
    wrapperClass: "right-[27%] top-[32%] sm:right-[28%] sm:top-[30%]",
    sizeClass: "h-16 w-16 sm:h-24 sm:w-24 lg:h-28 lg:w-28",
    rotate: -4,
    duration: 6.3,
    delay: 0.4,
    objectPosition: "50% 50%",
    hideOnMobile: true,
  },
];

export function HeroProductField() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {PRODUCTS.map((p) => (
        <div
          key={p.src}
          className={`absolute ${p.wrapperClass} ${p.hideOnMobile ? "hidden sm:block" : ""}`}
          style={{ transform: `rotate(${p.rotate}deg)` }}
        >
          <div
            className={`hero-float relative ${p.sizeClass} overflow-hidden rounded-3xl shadow-xl ring-4 ring-white/70`}
            style={{ "--float-duration": `${p.duration}s`, "--float-delay": `${p.delay}s` } as CSSProperties}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 144px"
              // On a phone one of these packs is the LCP element, so the four
              // that show there skip lazy loading; the desktop-only ones stay
              // lazy so phones never fetch them.
              loading={p.hideOnMobile ? "lazy" : "eager"}
              fetchPriority={p.hideOnMobile ? undefined : "high"}
              className="object-cover"
              style={{ objectPosition: p.objectPosition }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
