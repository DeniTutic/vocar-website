export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Voćar">
      <path
        d="M50 34 C 34 20 12 34 14 57 C 16 81 33 93 50 91 C 67 93 84 81 86 57 C 88 34 66 20 50 34 Z"
        fill="var(--forest, #1f3d2e)"
      />
      <path
        d="M49 14 C 57 17 62 26 55 33 C 47 30 42 21 49 14 Z"
        fill="var(--amber, #c98a3b)"
      />
    </svg>
  );
}
