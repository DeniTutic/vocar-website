import type { Metadata } from "next";
import "../globals.css";
import { RootShell } from "@/components/RootShell";
import { rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = rootMetadata("bs");

export default function BosnianLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="bs">{children}</RootShell>;
}
