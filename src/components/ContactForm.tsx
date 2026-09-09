"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { contact } from "@/data/content";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = contact.formErrorRequired.bs;
    if (!email.trim()) next.email = contact.formErrorRequired.bs;
    else if (!EMAIL_RE.test(email)) next.email = contact.formErrorEmail.bs;
    if (!message.trim()) next.message = contact.formErrorRequired.bs;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = encodeURIComponent(`Poruka sa sajta — ${name}`);
    const body = encodeURIComponent(
      `Ime: ${name}\nEmail: ${email}\nTelefon: ${phone || "—"}\n\n${message}`
    );
    window.location.href = `mailto:sales@vocar.ba?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const fieldStyle = {
    borderColor: "var(--line)",
    background: "var(--cream)",
    color: "var(--ink)",
  } as const;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--ink)" }}>
          {contact.formName.bs}
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
          style={fieldStyle}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs" style={{ color: "var(--berry)" }}>
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--ink)" }}>
            {contact.formEmail.bs}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
            style={fieldStyle}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs" style={{ color: "var(--berry)" }}>
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--ink)" }}>
            {contact.formPhone.bs}
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
            style={fieldStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--ink)" }}>
          {contact.formMessage.bs}
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none"
          style={fieldStyle}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs" style={{ color: "var(--berry)" }}>
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex w-fit items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide"
        style={{ background: "var(--forest)", color: "var(--cream)" }}
      >
        <Send size={16} />
        {contact.formSubmit.bs}
      </button>

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
            {contact.formSuccess.bs}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
