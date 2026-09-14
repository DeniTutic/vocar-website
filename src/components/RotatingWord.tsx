"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const INTERVAL_MS = 2000;

/** Cycles through a handful of one-word brand values, all caps, one at a
 * time, with a soft slide-and-fade between them. */
export function RotatingWord({ words, className = "" }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (words.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <div className={`inline-block ${className}`}>
      {/* mode="wait" fully unmounts the old word before the next mounts, so
          the two never overlap and the wrapper needs no fixed height/width. */}
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="block uppercase tracking-[0.12em]"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
