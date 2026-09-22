import type { Metadata } from "next";
import { privacyPage } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { PrivacyPolicyView } from "@/components/PrivacyPolicyView";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  key: "privacy",
  title: privacyPage.metaTitle.en,
  description: privacyPage.metaDescription.en,
});

export default function PrivacyPageEn() {
  return <PrivacyPolicyView />;
}
