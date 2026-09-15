"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface Certificate {
  key: string;
  name: string;
  icon: string;
  iconAlt: string;
}

export function CertificateCard({ cert, onClick }: { cert: Certificate; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="flex aspect-[3/4] flex-col items-center justify-center gap-4 rounded-2xl border p-6 text-center shadow-sm"
      style={{ borderColor: "var(--line)", background: "var(--cream)" }}
    >
      <div className="relative h-16 w-16 sm:h-20 sm:w-20">
        <Image src={cert.icon} alt={cert.iconAlt} fill sizes="80px" className="object-contain" />
      </div>
      <span className="text-lg font-semibold" style={{ color: "var(--forest-deep)" }}>
        {cert.name}
      </span>
    </motion.button>
  );
}
