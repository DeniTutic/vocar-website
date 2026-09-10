"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { home } from "@/data/content";
import { useT } from "@/lib/locale";

export function CertificateCard({ onClick }: { onClick: () => void }) {
  const t = useT();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="flex aspect-[3/4] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-6 text-center"
      style={{ borderColor: "var(--line)" }}
    >
      <ShieldCheck size={34} style={{ color: "var(--forest)" }} strokeWidth={1.5} />
      <span className="text-sm font-semibold" style={{ color: "var(--forest-deep)" }}>
        {t(home.certificatePlaceholder)}
      </span>
    </motion.button>
  );
}
