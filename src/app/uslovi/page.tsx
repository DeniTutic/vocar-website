import type { Metadata } from "next";
import { termsPage } from "@/data/content";
import { TermsOfUseView } from "@/components/TermsOfUseView";

export const metadata: Metadata = {
  title: termsPage.metaTitle,
  description: termsPage.metaDescription,
  alternates: { canonical: "/uslovi" },
};

export default function TermsPage() {
  return <TermsOfUseView />;
}
