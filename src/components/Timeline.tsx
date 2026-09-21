"use client";

import { Wheat, Factory, ClipboardCheck, PackageCheck, Truck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { home } from "@/data/content";
import { useT } from "@/lib/locale";
import { ScrollReveal } from "./ScrollReveal";

const STEPS = [
  { icon: Wheat, label: home.processStep1Label, comment: home.processStep1Comment },
  { icon: Factory, label: home.processStep2Label, comment: home.processStep2Comment },
  { icon: ClipboardCheck, label: home.processStep3Label, comment: home.processStep3Comment },
  { icon: PackageCheck, label: home.processStep4Label, comment: home.processStep4Comment },
  { icon: Truck, label: home.processStep5Label, comment: home.processStep5Comment },
];

/** The five production steps, rendered as a block inside the Quality section. */
export function Timeline() {
  const t = useT();

  return (
    <div className="mt-20 border-t pt-16" style={{ borderColor: "var(--line)" }}>
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
          {t(home.processEyebrow)}
        </span>
        <h3 className="mt-3 text-3xl leading-tight sm:text-4xl" style={{ color: "var(--forest-deep)" }}>
          {t(home.processTitle)}
        </h3>
      </ScrollReveal>

      <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-5 sm:gap-6">
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
    </div>
  );
}
