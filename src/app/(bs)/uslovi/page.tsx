import type { Metadata } from "next";
import { termsPage } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { TermsOfUseView } from "@/components/TermsOfUseView";

export const metadata: Metadata = pageMetadata({
  locale: "bs",
  key: "terms",
  title: termsPage.metaTitle.bs,
  description: termsPage.metaDescription.bs,
});

export default function TermsPage() {
  return <TermsOfUseView />;
}
