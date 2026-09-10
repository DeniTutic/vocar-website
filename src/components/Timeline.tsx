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

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-5">
        {STEPS.map((step, i) => {
          const isFirst = i === 0;
          const isLast = i === STEPS.length - 1;
          const tooltipAlign = isFirst ? "left-0" : isLast ? "right-0" : "left-1/2 -translate-x-1/2";
          const arrowLeft = isFirst ? "2rem" : isLast ? "calc(100% - 2rem)" : "50%";

          return (
            <ScrollReveal key={step.label.bs} delay={i * 0.1} className="group relative flex flex-col items-center text-center">
              <div
                className="relative flex h-16 w-16 cursor-default items-center justify-center rounded-full border-2 transition-transform duration-200 group-hover:scale-105"
                style={{ borderColor: "var(--forest)", background: "var(--cream)" }}
              >
                <step.icon size={26} style={{ color: "var(--forest)" }} strokeWidth={1.5} />

                <div
                  className={`pointer-events-none absolute bottom-full z-20 mb-3 w-56 scale-95 rounded-xl px-4 py-3 text-left text-sm leading-snug opacity-0 shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 ${tooltipAlign}`}
                  style={{ background: "var(--forest-deep)", color: "var(--cream)" }}
                  role="tooltip"
                >
                  {t(step.comment)}
                  <span
                    className="absolute top-full h-3 w-3 -translate-y-1/2 rotate-45"
                    style={{ background: "var(--forest-deep)", left: arrowLeft, transform: "translateX(-50%) translateY(-50%) rotate(45deg)" }}
                    aria-hidden
                  />
                </div>
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
                {t(step.label)}
              </span>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
