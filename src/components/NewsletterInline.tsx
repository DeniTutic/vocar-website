"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { newsletter } from "@/data/content";
import { useT } from "@/lib/locale";
import { ConfettiBurst, generateConfetti, type ConfettiPiece } from "./ConfettiBurst";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterInline() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError(t(newsletter.errorEmail));
      return;
    }
    setError("");
    const subject = encodeURIComponent("Prijava na newsletter");
    const body = encodeURIComponent(`Email za prijavu: ${email}`);
    window.location.href = `mailto:sales@vocar.ba?subject=${subject}&body=${body}`;
    setConfetti(generateConfetti());
    setSent(true);
  }

  return (
    <div
      className="grid gap-8 rounded-3xl p-6 sm:p-8 md:grid-cols-2 md:items-center"
      style={{ background: "var(--cream)", color: "var(--ink)" }}
    >
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(31,61,46,0.08)" }}>
          <Mail size={22} style={{ color: "var(--forest)" }} strokeWidth={1.5} />
        </div>
        <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
          {t(newsletter.eyebrow)}
        </span>
        <h3 className="mt-2 text-3xl leading-tight" style={{ color: "var(--forest-deep)" }}>
          {t(newsletter.title)}
        </h3>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          {t(newsletter.body)}
        </p>
      </div>

      {sent ? (
        <div className="flex flex-col items-center gap-3 py-2 text-center" role="status">
          <ConfettiBurst pieces={confetti} />
          <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            {t(newsletter.success)}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t(newsletter.placeholder)}
            aria-label={t(newsletter.placeholder)}
            aria-invalid={!!error}
            className="w-full rounded-full border px-5 py-3 text-sm outline-none"
            style={{ borderColor: "var(--line)", background: "var(--paper)", color: "var(--ink)" }}
          />
          {error && (
            <p className="text-xs" style={{ color: "var(--berry)" }}>
              {error}
            </p>
          )}
          <motion.button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-forest px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-forest-deep"
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {t(newsletter.submit)}
          </motion.button>
          <p className="text-center text-xs" style={{ color: "var(--ink-soft)" }}>
            {t(newsletter.disclaimer)}
          </p>
        </form>
      )}
    </div>
  );
}
