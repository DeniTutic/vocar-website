import type { Metadata } from "next";
import { termsPage } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { TermsOfUseView } from "@/components/TermsOfUseView";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  key: "terms",
  title: termsPage.metaTitle.en,
  description: termsPage.metaDescription.en,
});

export default function TermsPageEn() {
  return <TermsOfUseView />;
}
