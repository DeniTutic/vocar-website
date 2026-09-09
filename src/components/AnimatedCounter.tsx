"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Animates the numeric prefix of a value like "20+" or "80+" up to its target when scrolled into view. */
export function AnimatedCounter({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
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
    <motion.span ref={ref} className={className}>
      {target === null ? value : display}
    </motion.span>
  );
}
