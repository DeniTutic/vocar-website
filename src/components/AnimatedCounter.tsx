"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Animates the numeric prefix of a value like "20+" or "80+" up to its target when scrolled into view. */
export function AnimatedCounter({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Two-value shorthand: shrink only top/bottom. A single "-60px" expands to
  // all four sides, which on narrow (mobile) viewports can shrink the
  // horizontal intersection window enough that a multi-column grid's side
  // items never register as in-view at all.
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : "0");

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!inView || target === null || reducedMotion) {
      if (reducedMotion) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDisplay(value);
      }
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(String(Math.round(eased * target)) + suffix);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, suffix, reducedMotion, value]);

  return (
    <m.span ref={ref} className={className}>
      {target === null ? value : display}
    </m.span>
  );
}
