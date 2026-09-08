import type { Sku } from "@/data/categories";
import type { Locale } from "@/data/dictionary";

export function ProductChip({
  sku,
  locale,
  accent,
}: {
  sku: Sku;
  locale: Locale;
  accent: string;
}) {
  return (
    <li
      className="flex items-baseline justify-between gap-4 rounded-xl border bg-white/70 px-4 py-3 text-sm"
      style={{ borderColor: "color-mix(in srgb, " + accent + " 35%, var(--line))" }}
    >
      <span className="font-medium text-ink">{sku.name[locale]}</span>
      <span
        className="shrink-0 font-mono text-xs font-semibold tabular-nums"
        style={{ color: accent }}
      >
        {sku.sizes}
      </span>
    </li>
  );
}
