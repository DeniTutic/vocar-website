import Image from "next/image";

export function Logo({
  className = "",
  priority = true,
  decorative = false,
}: {
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt={decorative ? "" : "Voćar"}
      aria-hidden={decorative || undefined}
      width={427}
      height={424}
      priority={priority}
      className={className}
    />
  );
}
