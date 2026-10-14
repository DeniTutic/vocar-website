"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Hammer, Gauge, HeartHandshake, Volume2, VolumeX } from "lucide-react";
import { home, about } from "@/data/content";
import { useT } from "@/lib/locale";
import { ScrollReveal } from "./ScrollReveal";
import { Stats } from "./Stats";

const VALUES = [
  { icon: Leaf, text: about.value1, desc: about.value1Desc },
  { icon: Hammer, text: about.value2, desc: about.value2Desc },
  { icon: Gauge, text: about.value3, desc: about.value3Desc },
  { icon: HeartHandshake, text: about.value4, desc: about.value4Desc },
];

export function BrandStory() {
  const t = useT();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(videoEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="o-nama" className="scroll-mt-20 py-20 sm:py-28" style={{ background: "var(--beige)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
              {t(home.storyEyebrow)}
            </span>
            <h2 className="mt-3 text-4xl leading-[1.08] sm:text-5xl" style={{ color: "var(--forest-deep)" }}>
              {t(home.storyTitle)}
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed sm:text-lg" style={{ color: "var(--ink-soft)" }}>
              <p>{t(about.historyBody)}</p>
              <p>{t(about.missionBody)}</p>
            </div>

            <div className="mt-12">
              <Stats
                items={[
                  { value: home.statYears.value, label: t(home.statYears.label) },
                  { value: home.statProducts.value, label: t(home.statProducts.label) },
                  { value: home.statHappyFaces.value, label: t(home.statHappyFaces.label) },
                  { value: home.statMarkets.value, label: t(home.statMarkets.label) },
                ]}
              />
            </div>
          </ScrollReveal>

          {/* The plant from the air, not another packshot. The director's
              words sit on the photo itself — same treatment the slogan had,
              so it stays one image, not a second section. */}
          <ScrollReveal delay={0.15} className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[4/3] lg:aspect-auto lg:min-h-[460px]">
            <Image
              src="/images/about/vocar-iz-zraka.jpg"
              alt={t(about.plantImageAlt)}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[45%_40%]"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 sm:h-1/2"
              style={{ background: "linear-gradient(180deg, rgba(20,32,26,0) 0%, rgba(20,32,26,0.55) 45%, rgba(20,32,26,0.92) 100%)" }}
              aria-hidden
            />
            <motion.figure
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-6 left-6 right-6"
            >
              <blockquote className="font-display text-lg italic leading-snug sm:text-2xl" style={{ color: "var(--cream)" }}>
                &ldquo;{t(about.quote)}&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-sm" style={{ color: "rgba(247,243,234,0.75)" }}>
                <span className="font-semibold" style={{ color: "var(--amber)" }}>
                  {t(about.quoteAuthor)}
                </span>
                {" — "}
                {t(about.quoteRole)}
              </figcaption>
            </motion.figure>
          </ScrollReveal>
        </div>

        {/* Aerial footage of the plant, its own beat rather than a photo swap.
            Plays/pauses as it enters or leaves view; muted by default since
            autoplay-with-sound is blocked by browsers and unwanted anyway. */}
        <ScrollReveal className="mt-16 border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <h3 className="text-2xl" style={{ color: "var(--forest-deep)" }}>
            {t(about.videoSectionTitle)}
          </h3>
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl" style={{ background: "var(--forest-deep)" }}>
            <video
              ref={videoRef}
              src="/videos/vocar-pogon.mp4"
              poster="/images/about/vocar-pogon-video-poster.jpg"
              aria-label={t(about.videoLabel)}
              muted={muted}
              loop
              playsInline
              preload="none"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => {
                const next = !muted;
                setMuted(next);
                // Some browsers pause an autoplaying-muted video the moment
                // it's unmuted; resume explicitly inside this click handler
                // so the user gesture still counts and sound isn't silently lost.
                if (!next) videoRef.current?.play().catch(() => {});
              }}
              aria-label={t(muted ? about.unmuteVideo : about.muteVideo)}
              className="group absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-sm transition-transform duration-300 hover:scale-105"
              style={{ background: "rgba(20,32,26,0.45)", border: "1px solid rgba(247,243,234,0.4)" }}
            >
              {muted ? (
                <VolumeX size={18} style={{ color: "var(--cream)" }} />
              ) : (
                <Volume2 size={18} style={{ color: "var(--cream)" }} />
              )}
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16 border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <h3 className="text-2xl" style={{ color: "var(--forest-deep)" }}>
            {t(about.valuesTitle)}
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.text.bs}
                className="group flex flex-col items-start gap-3 rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: "var(--line)", background: "var(--cream)" }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-[var(--forest)]"
                  style={{ background: "rgba(31,61,46,0.08)" }}
                >
                  <v.icon
                    size={24}
                    className="transition-colors duration-300 group-hover:text-[var(--cream)]"
                    style={{ color: "var(--forest)" }}
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-base font-semibold" style={{ color: "var(--ink)" }}>
                  {t(v.text)}
                </span>
                <span className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {t(v.desc)}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
