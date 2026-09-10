"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, X, CheckCircle2 } from "lucide-react";
import { newsletter } from "@/data/content";
import { useT } from "@/lib/locale";

const STORAGE_KEY = "vocar_newsletter_seen";
const SHOW_DELAY_MS = 8000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterPopup() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      alreadySeen = false;
    }
    if (alreadySeen) return;

    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable — popup may reappear next visit, harmless.
    }
  }

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
    setSent(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: "rgba(20,32,26,0.55)", backdropFilter: "blur(2px)" }}
            onClick={close}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-title"
            className="relative w-full max-w-md rounded-3xl p-8 shadow-2xl"
            style={{ background: "var(--cream)" }}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={close}
              aria-label={t(newsletter.close)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-black/5"
              style={{ color: "var(--ink-soft)" }}
            >
              <X size={18} />
            </button>

            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: "rgba(31,61,46,0.08)" }}
            >
              <Mail size={22} style={{ color: "var(--forest)" }} strokeWidth={1.5} />
            </div>

            <span
              className="mt-5 block text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--forest)" }}
            >
              {t(newsletter.eyebrow)}
            </span>
            <h3 id="newsletter-title" className="mt-2 text-3xl leading-tight" style={{ color: "var(--forest-deep)" }}>
              {t(newsletter.title)}
            </h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {t(newsletter.body)}
            </p>

            {sent ? (
              <div className="mt-6 flex items-start gap-2 text-sm" style={{ color: "var(--forest)" }} role="status">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <span>{t(newsletter.success)}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t(newsletter.placeholder)}
                  aria-label={t(newsletter.placeholder)}
                  aria-invalid={!!error}
                  className="w-full rounded-full border px-5 py-3 text-sm outline-none"
                  style={{ borderColor: "var(--line)", background: "var(--cream)", color: "var(--ink)" }}
                />
                {error && (
                  <p className="text-xs" style={{ color: "var(--berry)" }}>
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide"
                  style={{ background: "var(--forest)", color: "var(--cream)" }}
                >
                  {t(newsletter.submit)}
                </button>
                <p className="text-center text-xs" style={{ color: "var(--ink-soft)" }}>
                  {t(newsletter.disclaimer)}
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
