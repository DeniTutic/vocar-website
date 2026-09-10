"use client";

import { Wheat, Factory, ClipboardCheck, PackageCheck, Truck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { home } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { ScrollReveal } from "./ScrollReveal";

const STEPS = [
  { icon: Wheat, label: "Sastojci" },
  { icon: Factory, label: "Proizvodnja" },
  { icon: ClipboardCheck, label: "Kontrola kvaliteta" },
  { icon: PackageCheck, label: "Pakovanje" },
  { icon: Truck, label: "Distribucija" },
];

export function Timeline() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading eyebrow={home.processEyebrow.bs} title={home.processTitle.bs} align="center" />

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-5">
        {STEPS.map((step, i) => (
          <ScrollReveal key={step.label} delay={i * 0.1} className="relative flex flex-col items-center text-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full border-2"
              style={{ borderColor: "var(--forest)", background: "var(--cream)" }}
            >
              <step.icon size={26} style={{ color: "var(--forest)" }} strokeWidth={1.5} />
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="absolute left-[calc(50%+2rem)] top-8 hidden h-px w-[calc(100%-4rem)] sm:block"
                aria-hidden
              >
                <span className="absolute inset-0" style={{ background: "var(--line)" }} />
                <motion.div
                  className="absolute top-1/2"
                  style={{ transform: "translate(-50%, -50%)" }}
                  animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: i * 0.25 }}
                >
                  <ChevronRight size={14} style={{ color: "var(--forest)" }} strokeWidth={2} />
                </motion.div>
              </div>
            )}
            <span className="mt-4 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--forest-deep)" }}>
              {step.label}
            </span>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
