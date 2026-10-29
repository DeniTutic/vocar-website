import type { Metadata } from "next";
import "./globals.css";
import { RootShell } from "@/components/RootShell";
import { NotFoundView } from "@/components/NotFoundView";

export const metadata: Metadata = {
  title: "Stranica nije pronađena - Voćar",
  robots: { index: false, follow: true },
};

/**
 * A URL that matches no route at all. `not-found.tsx` lives inside each
 * language's root layout, so it can't cover this case — Next renders this
 * file on its own, which is why it brings the whole document with it.
 * Bosnian is the default: an unknown URL has no locale to read.
 */
export default function GlobalNotFound() {
  return (
    <RootShell locale="bs">
      <NotFoundView />
    </RootShell>
  );
}
