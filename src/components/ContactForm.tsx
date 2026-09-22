"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { contact, buy } from "@/data/content";
import { categories } from "@/data/categories";
import { exportCountries } from "@/data/whereToBuy";
import { useLocale, useT } from "@/lib/locale";
import { track } from "@/lib/track";

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
  const { locale } = useLocale();
  const [mode, setMode] = useState<Mode>("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [market, setMarket] = useState("");
  const [volume, setVolume] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error" | "rate_limited">("idle");
  const [website, setWebsite] = useState(""); // honeypot
  const [product, setProduct] = useState("");
  const [size, setSize] = useState("");
  const [families, setFamilies] = useState<string[]>([]);
  const [sample, setSample] = useState(false);

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

  // Product pages link to "/?proizvod=…&pakovanje=…[&namjera=kupac]#distributer"
  // so the form opens pre-filled. The locale provider reads the stored language
  // a beat after mount, so this runs again on locale change and re-derives the
  // prefill — but only while the message is still the text we wrote ourselves.
  const prefillRef = useRef("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("proizvod");
    if (!p) return;
    const s = params.get("pakovanje");
    const k = params.get("kategorija");
    const asCustomer = params.get("namjera") === "kupac";
    const label = `${p}${s ? ` (${s})` : ""}`;
    const next = t(asCustomer ? contact.prefillWhereToBuy : contact.prefillQuote).replace("{product}", label);

    // Reads an SSR-unavailable external store (the URL) after mount — the
    // same justification as the locale provider's localStorage read.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProduct(p);
    setSize(s ?? "");
    setMode(asCustomer ? "customer" : "trade");
    if (!asCustomer) {
      if (k && categories.some((c) => c.slug === k)) setFamilies([k]);
      if (params.get("uzorak") === "1") setSample(true);
    }
    // Capture before overwriting: the updater runs later, at render time.
    const previous = prefillRef.current;
    prefillRef.current = next;
    setMessage((m) => (m === "" || m === previous ? next : m));
    // `t` changes identity with the locale, which is exactly the trigger we want.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  function toggleFamily(slug: string) {
    setFamilies((f) => (f.includes(slug) ? f.filter((x) => x !== slug) : [...f, slug]));
  }

  const isTrade = mode === "trade";

  function openMailto() {
    const subject = encodeURIComponent(isTrade ? `Upit za ponudu — ${company}` : `Poruka sa sajta — ${name}`);
    const familyNames = families.map((slug) => categories.find((c) => c.slug === slug)?.name.bs ?? slug).join(", ");
    const tradeLines = isTrade
      ? `Firma: ${company}\nTržište: ${market || "—"}\nKoličina: ${volume || "—"}\nProizvodi: ${familyNames || "—"}\nUzorak: ${sample ? "da" : "ne"}\n`
      : "";
    const body = encodeURIComponent(`Ime: ${name}\nEmail: ${email}\nTelefon: ${phone || "—"}\n${tradeLines}\n${message}`);
    window.location.href = `mailto:sales@vocar.ba?subject=${subject}&body=${body}`;
    setStatus("mailto");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = t(contact.formErrorRequired);
    if (!email.trim()) next.email = t(contact.formErrorRequired);
    else if (!EMAIL_RE.test(email)) next.email = t(contact.formErrorEmail);
    if (!message.trim()) next.message = t(contact.formErrorRequired);
    if (isTrade && !company.trim()) next.company = t(contact.formErrorRequired);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    track({ name: "quote_submit", mode, sample: isTrade ? sample : undefined });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, name, email, phone, company, market, volume, message, product, size, families, sample, website }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      // No sending backend configured yet — hand off to the mail client.
      if (res.status === 503) {
        openMailto();
        return;
      }
      setStatus(res.status === 429 ? "rate_limited" : "error");
    } catch {
      setStatus("error");
    }
  }

  const feedback =
    status === "sent"
      ? { text: t(contact.formSent), ok: true }
      : status === "mailto"
        ? { text: t(contact.formSuccess), ok: true }
        : status === "rate_limited"
          ? { text: t(contact.formRateLimited), ok: false }
          : status === "error"
            ? { text: t(contact.formError), ok: false }
            : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-5">
      <ul className="-mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "var(--ink-soft)" }}>
        {[t(contact.trustCertified), t(contact.trustExport).replace("{count}", String(exportCountries.length)), t(contact.trustReply)].map((item) => (
          <li key={item} className="inline-flex items-center gap-1.5">
            <CheckCircle2 size={13} style={{ color: "var(--forest)" }} />
            {item}
          </li>
        ))}
      </ul>

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

              <div>
                <span className={labelClass} style={{ color: "var(--ink)" }}>
                  {t(contact.formFamilies)}
                </span>
                <div className="flex flex-wrap gap-2" role="group" aria-label={t(contact.formFamilies)}>
                  {categories.map((c) => {
                    const on = families.includes(c.slug);
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleFamily(c.slug)}
                        className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                        style={{
                          borderColor: on ? "#1f3d2e" : "var(--line)",
                          background: on ? "#1f3d2e" : "var(--cream)",
                          color: on ? "#f7f3ea" : "var(--ink)",
                        }}
                      >
                        {t(c.name)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm" style={{ color: "var(--ink)" }}>
                <input
                  type="checkbox"
                  checked={sample}
                  onChange={(e) => setSample(e.target.checked)}
                  className="h-4 w-4 accent-[#1f3d2e]"
                />
                {t(contact.formSample)}
              </label>
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

      {/* Honeypot: off-screen, tab-skipped, never labelled for humans. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <motion.button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className={`inline-flex w-fit items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-colors disabled:opacity-60 ${
          isTrade ? "bg-pop shadow-sm hover:bg-pop-deep" : "bg-forest hover:bg-forest-deep"
        }`}
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Send size={16} />
        {status === "sending" ? t(contact.formSending) : isTrade ? t(buy.requestQuote) : t(contact.formSubmit)}
      </motion.button>

      <AnimatePresence>
        {feedback && (
          <motion.p
            key={status}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="flex items-center gap-2 text-sm"
            style={{ color: feedback.ok ? "var(--forest)" : "var(--berry)" }}
          >
            {feedback.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {feedback.text}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
