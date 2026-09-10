"use client";

import { motion } from "framer-motion";
import { home, type Localized } from "@/data/content";
import { useT } from "@/lib/locale";
import { SectionHeading } from "./SectionHeading";

// Hand-placed to roughly echo real bearing/distance from Gornji Rahić rather
// than an even hub-and-spoke wheel — nearby ex-Yugoslav markets cluster close,
// Germany and Turkey sit further out, and the US/Mexico/Russia/Australia sit
// far across the map. The first seven markets were requested directly; the
// UAE/Australia/Russia/Mexico additions match Voćar's real export markets.
const NODES: {
  x: number;
  y: number;
  label: Localized;
  origin?: true;
  anchor: "start" | "middle" | "end";
  dx: number;
  dy: number;
}[] = [
  { x: 440, y: 195, label: { bs: "Gornji Rahić, BiH", en: "Gornji Rahić, Bosnia" }, origin: true, anchor: "middle", dx: 0, dy: 26 },
  { x: 385, y: 172, label: { bs: "Hrvatska", en: "Croatia" }, anchor: "middle", dx: 0, dy: -14 },
  { x: 350, y: 125, label: { bs: "Slovenija", en: "Slovenia" }, anchor: "middle", dx: 0, dy: -14 },
  { x: 395, y: 82, label: { bs: "Austrija", en: "Austria" }, anchor: "middle", dx: 0, dy: -14 },
  { x: 330, y: 42, label: { bs: "Njemačka", en: "Germany" }, anchor: "middle", dx: 0, dy: -14 },
  { x: 570, y: 235, label: { bs: "Turska", en: "Turkey" }, anchor: "start", dx: 10, dy: 5 },
  { x: 615, y: 285, label: { bs: "Saudijska Arabija", en: "Saudi Arabia" }, anchor: "middle", dx: 0, dy: 24 },
  { x: 55, y: 135, label: { bs: "Sjedinjene Američke Države", en: "United States" }, anchor: "start", dx: 10, dy: -12 },
  { x: 640, y: 260, label: { bs: "Ujedinjeni Arapski Emirati", en: "United Arab Emirates" }, anchor: "start", dx: 10, dy: 5 },
  { x: 760, y: 30, label: { bs: "Rusija", en: "Russia" }, anchor: "end", dx: -10, dy: 20 },
  { x: 25, y: 235, label: { bs: "Meksiko", en: "Mexico" }, anchor: "start", dx: 8, dy: -10 },
  { x: 790, y: 380, label: { bs: "Australija", en: "Australia" }, anchor: "end", dx: -10, dy: -12 },
];

export function DistributionMap() {
  const t = useT();
  const origin = NODES[0];

  return (
    <section className="py-20 sm:py-28" style={{ background: "var(--forest-deep)" }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={t(home.worldEyebrow)} title={t(home.worldTitle)} body={t(home.worldBody)} align="center" dark />

        <div className="mx-auto mt-14 max-w-3xl">
          <svg
            viewBox="0 0 820 400"
            className="w-full"
            role="img"
            aria-label={NODES.map((n) => t(n.label)).join(", ")}
          >
            {NODES.slice(1).map((node) => (
              <motion.line
                key={node.label.bs}
                x1={origin.x}
                y1={origin.y}
                x2={node.x}
                y2={node.y}
                stroke="var(--amber)"
                strokeWidth={1.5}
                strokeDasharray="4 6"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.7 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            ))}

            {NODES.map((node) => (
              <g key={node.label.bs}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.origin ? 7 : 5}
                  fill={node.origin ? "var(--amber)" : "var(--cream)"}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: node.origin ? 0 : 0.6 }}
                />
                {node.origin && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={7}
                    fill="none"
                    stroke="var(--amber)"
                    strokeWidth={1.5}
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <text
                  x={node.x + node.dx}
                  y={node.y + node.dy}
                  textAnchor={node.anchor}
                  fontSize="13"
                  fill="var(--beige)"
                  fontFamily="var(--font-body)"
                >
                  {t(node.label)}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
