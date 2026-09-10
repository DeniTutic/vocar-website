import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Voćar"
      width={427}
      height={424}
      priority
      className={className}
    />
  );
}
