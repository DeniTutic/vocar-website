import { AnimatedCounter } from "./AnimatedCounter";

export interface StatItem {
  value: string;
  label: string;
}

export function Stats({ items, dark = false, columns = 2 }: { items: StatItem[]; dark?: boolean; columns?: 2 | 4 }) {
  return (
    <div className={`grid grid-cols-2 gap-x-6 gap-y-8 ${columns === 4 ? "sm:grid-cols-4" : ""}`}>
      {items.map((item, i) => (
        <div key={i}>
          <div
            className="font-display text-4xl tabular-nums sm:text-5xl"
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
