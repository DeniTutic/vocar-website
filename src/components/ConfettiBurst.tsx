"use client";

import { m } from "framer-motion";
import { Check } from "lucide-react";

const CONFETTI_COLORS = ["var(--pop)", "var(--amber)", "var(--plum)", "var(--forest)"];

export interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
  delay: number;
  size: number;
}

// Call from an event handler, not during render — Math.random() would
// otherwise break component purity.
export function generateConfetti(count = 16): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.7;
    const distance = 55 + Math.random() * 65;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 15,
      rotate: (Math.random() - 0.5) * 360,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 0.12,
      size: 5 + Math.random() * 5,
    };
  });
}

export function ConfettiBurst({ pieces }: { pieces: ConfettiPiece[] }) {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      {pieces.map((p) => (
        <m.span
          key={p.id}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{ background: p.color, width: p.size, height: p.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 1, rotate: p.rotate }}
          transition={{ duration: 0.9, delay: p.delay, ease: "easeOut" }}
          aria-hidden
        />
      ))}
      <m.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.1 }}
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: "var(--forest)" }}
      >
        <Check size={28} style={{ color: "var(--cream)" }} strokeWidth={3} />
      </m.div>
    </div>
  );
}
