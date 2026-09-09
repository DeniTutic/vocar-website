"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { home } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { CertificateCard } from "./CertificateCard";

const POINTS = [home.qualityPoint1.bs, home.qualityPoint2.bs, home.qualityPoint3.bs, home.qualityPoint4.bs];

export function QualitySection({ showHeading = true }: { showHeading?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28" style={{ background: "var(--charcoal)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {showHeading ? (
              <SectionHeading eyebrow={home.qualityEyebrow.bs} title={home.qualityTitle.bs} body={home.qualityBody.bs} dark />
            ) : (
              <p className="max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "rgba(247,243,234,0.75)" }}>
                {home.qualityBody.bs}
              </p>
            )}
            <ul className="mt-8 flex flex-col gap-3">
              {POINTS.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm sm:text-base" style={{ color: "var(--beige)" }}>
                  <Check size={18} style={{ color: "var(--amber)" }} />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <CertificateCard key={i} onClick={() => setOpenIndex(i)} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6"
            onClick={() => setOpenIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex aspect-[3/4] w-full max-w-sm flex-col items-center justify-center gap-4 rounded-2xl p-8 text-center"
              style={{ background: "var(--cream)" }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Zatvori"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border"
                style={{ borderColor: "var(--line)" }}
              >
                <X size={16} />
              </button>
              <p className="text-base" style={{ color: "var(--ink-soft)" }}>
                {home.qualityBody.bs}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
