"use client";

import { Wheat, Factory, ClipboardCheck, PackageCheck, Truck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { home } from "@/data/content";
import { useT } from "@/lib/locale";
import { SectionHeading } from "./SectionHeading";
import { ScrollReveal } from "./ScrollReveal";

const STEPS = [
  { icon: Wheat, label: home.processStep1Label, comment: home.processStep1Comment },
  { icon: Factory, label: home.processStep2Label, comment: home.processStep2Comment },
  { icon: ClipboardCheck, label: home.processStep3Label, comment: home.processStep3Comment },
  { icon: PackageCheck, label: home.processStep4Label, comment: home.processStep4Comment },
  { icon: Truck, label: home.processStep5Label, comment: home.processStep5Comment },
];

export function Timeline() {
  const t = useT();

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading eyebrow={t(home.processEyebrow)} title={t(home.processTitle)} align="center" />

      <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-5 sm:gap-6">
        {STEPS.map((step, i) => (
          <ScrollReveal key={step.label.bs} delay={i * 0.1} className="relative flex flex-col items-center text-center">
            <div
              className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2"
              style={{ borderColor: "var(--forest)", background: "var(--cream)" }}
            >
              <step.icon size={26} style={{ color: "var(--forest)" }} strokeWidth={1.5} />
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="absolute left-[calc(50%+2rem)] top-8 hidden h-px w-[calc(100%-2rem)] sm:block"
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
              {t(step.label)}
            </span>
            <p
              className="mt-2 max-w-[13rem] text-xs leading-relaxed sm:max-w-[10.5rem]"
              style={{ color: "var(--ink-soft)" }}
            >
              {t(step.comment)}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
