"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Variant = "buy" | "secondary" | "outline" | "outlineDark";
type Size = "md" | "sm";

const VARIANT: Record<Variant, string> = {
  buy: "bg-pop text-cream shadow-sm hover:bg-pop-deep",
  secondary: "bg-forest text-cream hover:bg-forest-deep",
  outline: "border border-forest-deep text-forest-deep hover:bg-white/60",
  outlineDark: "border border-cream/60 text-cream hover:bg-cream/10",
};

const SIZE: Record<Size, string> = {
  md: "px-7 py-3.5 text-sm",
  sm: "px-5 py-2.5 text-xs",
};

const SPRING = { type: "spring", stiffness: 400, damping: 15 } as const;

const MotionLink = motion.create(Link);

interface CtaLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  download?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

/**
 * The site's pill button. Red ("buy") is reserved for the one action that
 * moves money on a given surface; everything else is forest or outlined.
 * Hash anchors, mailto and downloads stay plain <a> so the browser's native
 * scroll-to-anchor works from any route.
 */
export function CtaLink({ href, variant = "secondary", size = "md", download, className = "", onClick, children }: CtaLinkProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wide transition-colors ${VARIANT[variant]} ${SIZE[size]} ${className}`;
  const motionProps = {
    whileHover: { y: -2, scale: 1.03 },
    whileTap: { scale: 0.94 },
    transition: SPRING,
  };
  const isRoute = href.startsWith("/") && !href.includes("#");

  if (isRoute) {
    return (
      <MotionLink href={href} className={classes} onClick={onClick} {...motionProps}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.a href={href} download={download} className={classes} onClick={onClick} {...motionProps}>
      {children}
    </motion.a>
  );
}
