import { AnimatedCounter } from "./AnimatedCounter";

export interface StatItem {
  value: string;
  label: string;
}

export function Stats({ items, dark = false }: { items: StatItem[]; dark?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item, i) => (
        <div key={i}>
          <div
            className="font-display text-5xl tabular-nums"
            style={{ color: dark ? "var(--amber)" : "var(--forest)" }}
          >
            <AnimatedCounter value={item.value} />
          </div>
          <div className="mt-1 text-sm" style={{ color: dark ? "rgba(247,243,234,0.7)" : "var(--ink-soft)" }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
