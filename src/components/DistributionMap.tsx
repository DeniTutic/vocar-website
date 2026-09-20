"use client";

import { motion } from "framer-motion";
import { home } from "@/data/content";
import { MARKETS as NODES } from "@/data/markets";
import { useT } from "@/lib/locale";
import { ScrollReveal } from "./ScrollReveal";

/** Rendered inside WhereToBuy's dark band, so it carries no section chrome of its own. */
export function DistributionMap() {
  const t = useT();
  const origin = NODES[0];

  return (
    <div id="trzista" className="mt-16 scroll-mt-28 border-t pt-14" style={{ borderColor: "rgba(247,243,234,0.15)" }}>
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--amber)" }}>
          {t(home.worldEyebrow)}
        </span>
        <h3 className="mt-3 text-3xl leading-tight sm:text-4xl" style={{ color: "var(--cream)" }}>
          {t(home.worldTitle)}
        </h3>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(247,243,234,0.75)" }}>
          {t(home.worldBody)}
        </p>
      </ScrollReveal>

      <div className="mx-auto mt-12 max-w-3xl">
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
  );
}
