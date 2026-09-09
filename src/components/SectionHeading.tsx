import type { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  body?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <ScrollReveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span
        className="text-xs font-semibold uppercase tracking-[0.14em]"
        style={{ color: dark ? "var(--amber)" : "var(--forest)" }}
      >
        {eyebrow}
      </span>
      <h2
        className="mt-3 text-4xl leading-tight sm:text-5xl"
        style={{ color: dark ? "var(--cream)" : "var(--forest-deep)" }}
      >
        {title}
      </h2>
      {body && (
        <p
          className="mt-4 text-base leading-relaxed sm:text-lg"
          style={{ color: dark ? "rgba(247,243,234,0.75)" : "var(--ink-soft)" }}
        >
          {body}
        </p>
      )}
    </ScrollReveal>
  );
}
