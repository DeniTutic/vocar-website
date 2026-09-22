import type { Metadata } from "next";
import { privacyPage } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { PrivacyPolicyView } from "@/components/PrivacyPolicyView";

export const metadata: Metadata = pageMetadata({
  locale: "bs",
  key: "privacy",
  title: privacyPage.metaTitle.bs,
  description: privacyPage.metaDescription.bs,
});

export default function PrivacyPage() {
  return <PrivacyPolicyView />;
}
