"use client";

import type { ReactNode } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Ships only the animation features the site uses (animate, variants, exit,
 * whileInView, hover/tap) instead of the full `motion` bundle, which cuts the
 * JS a phone has to parse before the page is interactive. Components use `m.*`;
 * `strict` throws if a full `motion.*` component sneaks back in. Layout and
 * drag animations would need `domMax` here.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
