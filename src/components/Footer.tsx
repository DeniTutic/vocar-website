import Link from "next/link";
import { Logo } from "./Logo";
import { nav, footerContent } from "@/data/content";

const links = [
  { href: "/", key: "home" as const },
  { href: "/proizvodi", key: "products" as const },
  { href: "/o-nama", key: "about" as const },
  { href: "/kvalitet", key: "quality" as const },
  { href: "/katalog", key: "catalog" as const },
  { href: "/kontakt", key: "contact" as const },
];

export function Footer() {
  return (
    <footer style={{ background: "var(--charcoal)", color: "var(--beige)" }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8 shrink-0" />
            <span className="font-display text-2xl" style={{ color: "var(--cream)" }}>
              Voćar
            </span>
          </div>
          <p className="max-w-xs text-sm italic opacity-70">{footerContent.tagline.bs}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-50">
            {nav.products.bs}
          </span>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="w-fit opacity-80 hover:opacity-100">
              {nav[link.key].bs}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-50">
            {footerContent.contactLabel.bs}
          </span>
          <span className="opacity-80">Voćar d.o.o. Brčko</span>
          <span className="opacity-80">Gornji Rahić 112, 76207 Gornji Rahić</span>
          <span className="opacity-80">Bosna i Hercegovina</span>
          <a href="tel:+38749512415" className="w-fit opacity-80 hover:opacity-100">
            +387 49 512 415
          </a>
          <a href="tel:+38749513360" className="w-fit opacity-80 hover:opacity-100">
            +387 49 513 360
          </a>
          <a href="mailto:sales@vocar.ba" className="w-fit opacity-80 hover:opacity-100">
            sales@vocar.ba
          </a>
        </div>
      </div>

      <div
        className="border-t px-5 py-5 text-xs opacity-60 sm:px-8"
        style={{ borderColor: "rgba(237,227,208,0.15)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} VOĆAR — {footerContent.rights.bs}</span>
          <span>Konceptualni redizajn sajta — nije zvanična stranica vocar.ba.</span>
        </div>
      </div>
    </footer>
  );
}
