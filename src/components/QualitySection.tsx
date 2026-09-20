"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X, ExternalLink } from "lucide-react";
import { home, common } from "@/data/content";
import { useT } from "@/lib/locale";
import { SectionHeading } from "./SectionHeading";
import { CertificateCard, type Certificate } from "./CertificateCard";
import { Timeline } from "./Timeline";

const POINTS = [home.qualityPoint1, home.qualityPoint2, home.qualityPoint3, home.qualityPoint4];

// Sourced from the official vocar.ba site.
const CERTS: (Certificate & { fullImage: string })[] = [
  {
    key: "haccp",
    name: "HACCP",
    icon: "/images/certificates/haccp-icon.png",
    iconAlt: "HACCP certified seal",
    fullImage: "/images/certificates/haccp-full.jpg",
  },
  {
    key: "ifs",
    name: "IFS Food",
    icon: "/images/certificates/ifs-icon.png",
    iconAlt: "IFS Food logo",
    fullImage: "/images/certificates/ifs-full.jpg",
  },
];

export function QualitySection() {
  const t = useT();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openCert = openIndex !== null ? CERTS[openIndex] : null;

  return (
    <section id="kvalitet" className="scroll-mt-20 border-t py-20 sm:py-28" style={{ background: "var(--cream)", borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow={t(home.qualityEyebrow)} title={t(home.qualityTitle)} body={t(home.qualityBody)} />
            <ul className="mt-8 flex flex-col gap-3">
              {POINTS.map((point) => (
                <li key={point.bs} className="flex items-center gap-3 text-sm sm:text-base" style={{ color: "var(--ink)" }}>
                  <Check size={18} style={{ color: "var(--forest)" }} />
                  {t(point)}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {CERTS.map((cert, i) => (
              <CertificateCard key={cert.key} cert={cert} onClick={() => setOpenIndex(i)} />
            ))}
          </div>
        </div>

        <Timeline />
      </div>

      <AnimatePresence>
        {openCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6"
            onClick={() => setOpenIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={openCert.name}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[85vh] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-2xl p-6 sm:p-8"
              style={{ background: "var(--cream)" }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label={t(common.close)}
                className="absolute right-4 top-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: "var(--line)", background: "var(--cream)" }}
              >
                <X size={16} />
              </button>

              <h3 className="pr-10 text-2xl" style={{ color: "var(--forest-deep)" }}>
                {openCert.name}
              </h3>

              <div className="relative overflow-hidden rounded-xl border" style={{ borderColor: "var(--line)" }}>
                <Image
                  src={openCert.fullImage}
                  alt={openCert.name}
                  width={1000}
                  height={1414}
                  sizes="(min-width: 640px) 448px, 90vw"
                  className="h-auto w-full"
                />
              </div>

              <Link
                href={openCert.fullImage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wide"
                style={{ color: "var(--forest)" }}
              >
                {t(home.certificateViewFull)}
                <ExternalLink size={14} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
