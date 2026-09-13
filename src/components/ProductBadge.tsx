"use client";

import { motion } from "framer-motion";
import { badges as badgeCopy } from "@/data/content";
import type { Badge } from "@/data/products";
import { TASTES, type TasteKey } from "@/data/tastes";
import { useT } from "@/lib/locale";

const BADGE_STYLE: Record<Badge, string> = {
  hit: "bg-amber text-forest-deep",
  novo: "bg-forest text-cream",
  coko: "bg-plum text-cream",
};

export const WIGGLE = {
  whileHover: { rotate: [0, -4, 4, -3, 3, 0], scale: 1.06 },
  transition: { duration: 0.5 },
};

export function ProductBadge({ badge, wiggle = false, className = "" }: { badge: Badge; wiggle?: boolean; className?: string }) {
  const t = useT();
  const classes = `inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${BADGE_STYLE[badge]} ${className}`;

  if (wiggle) {
    return (
      <motion.span className={`cursor-default ${classes}`} {...WIGGLE}>
        {t(badgeCopy[badge])}
      </motion.span>
    );
  }
  return <span className={classes}>{t(badgeCopy[badge])}</span>;
}

export function TasteChips({ tastes, dark = false, className = "" }: { tastes: TasteKey[]; dark?: boolean; className?: string }) {
  const t = useT();
  if (!tastes.length) return null;
  const chip = dark ? "border-cream/30 text-cream" : "border-line text-ink";

  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {tastes.map((key) => (
        <li key={key} className={`rounded-full border px-2.5 py-1 text-xs ${chip}`}>
          {t(TASTES[key])}
        </li>
      ))}
    </ul>
  );
}
