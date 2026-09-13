"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { contact, buy } from "@/data/content";
import { useT } from "@/lib/locale";

type Mode = "customer" | "trade";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TRADE_HASH = "#distributer";

const fieldStyle = {
  borderColor: "var(--line)",
  background: "var(--cream)",
  color: "var(--ink)",
} as const;

const labelClass = "mb-1.5 block text-sm font-medium";
const inputClass = "w-full rounded-lg border px-4 py-3 text-sm outline-none";

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass} style={{ color: "var(--ink)" }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
        style={fieldStyle}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs" style={{ color: "var(--berry)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function ModeSwitch({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  const t = useT();
  const options: { value: Mode; label: string }[] = [
    { value: "customer", label: t(contact.formModeCustomer) },
    { value: "trade", label: t(contact.formModeTrade) },
  ];

  return (
    <div>
      <span className={labelClass} style={{ color: "var(--ink)" }}>
        {t(contact.formModeLabel)}
      </span>
      <div
        role="radiogroup"
        aria-label={t(contact.formModeLabel)}
        className="inline-flex rounded-full border p-0.5 text-sm font-medium"
        style={{ borderColor: "var(--line)" }}
      >
        {options.map((option) => {
          const isActive = mode === option.value;
          return (
            <motion.button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(option.value)}
              animate={{
                backgroundColor: isActive ? "#1f3d2e" : "rgba(31,61,46,0)",
                color: isActive ? "#f7f3ea" : "#625a4d",
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="rounded-full px-4 py-2"
            >
              {option.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function ContactForm() {
  const t = useT();
  const [mode, setMode] = useState<Mode>("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [market, setMarket] = useState("");
  const [volume, setVolume] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  // "/#distributer" links (footer, where-to-buy card) preselect trade mode.
  // A hash is used instead of a query param so the page stays fully static.
  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === TRADE_HASH) setMode("trade");
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const isTrade = mode === "trade";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = t(contact.formErrorRequired);
    if (!email.trim()) next.email = t(contact.formErrorRequired);
    else if (!EMAIL_RE.test(email)) next.email = t(contact.formErrorEmail);
    if (!message.trim()) next.message = t(contact.formErrorRequired);
    if (isTrade && !company.trim()) next.company = t(contact.formErrorRequired);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = encodeURIComponent(isTrade ? `Upit za ponudu — ${company}` : `Poruka sa sajta — ${name}`);
    const tradeLines = isTrade ? `Firma: ${company}\nTržište: ${market || "—"}\nKoličina: ${volume || "—"}\n` : "";
    const body = encodeURIComponent(`Ime: ${name}\nEmail: ${email}\nTelefon: ${phone || "—"}\n${tradeLines}\n${message}`);
    window.location.href = `mailto:sales@vocar.ba?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <ModeSwitch mode={mode} onChange={setMode} />

      <Field id="name" label={t(contact.formName)} value={name} onChange={setName} error={errors.name} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" type="email" label={t(contact.formEmail)} value={email} onChange={setEmail} error={errors.email} />
        <Field id="phone" type="tel" label={t(contact.formPhone)} value={phone} onChange={setPhone} />
      </div>

      <AnimatePresence initial={false}>
        {isTrade && (
          <motion.div
            key="trade-fields"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-5">
              <Field id="company" label={t(contact.formCompany)} value={company} onChange={setCompany} error={errors.company} />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="market" label={t(contact.formMarket)} value={market} onChange={setMarket} />
                <Field
                  id="volume"
                  label={t(contact.formVolume)}
                  value={volume}
                  onChange={setVolume}
                  placeholder={t(contact.formVolumePlaceholder)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <label htmlFor="message" className={labelClass} style={{ color: "var(--ink)" }}>
          {t(contact.formMessage)}
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} resize-none`}
          style={fieldStyle}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs" style={{ color: "var(--berry)" }}>
            {errors.message}
          </p>
        )}
      </div>

      <motion.button
        type="submit"
        className={`inline-flex w-fit items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-colors ${
          isTrade ? "bg-pop shadow-sm hover:bg-pop-deep" : "bg-forest hover:bg-forest-deep"
        }`}
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Send size={16} />
        {isTrade ? t(buy.requestQuote) : t(contact.formSubmit)}
      </motion.button>

      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="flex items-center gap-2 text-sm"
            style={{ color: "var(--forest)" }}
          >
            <CheckCircle2 size={16} />
            {t(contact.formSuccess)}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
