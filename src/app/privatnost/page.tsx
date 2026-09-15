import type { Metadata } from "next";
import { privacyPage } from "@/data/content";
import { PrivacyPolicyView } from "@/components/PrivacyPolicyView";

export const metadata: Metadata = {
  title: privacyPage.metaTitle,
  description: privacyPage.metaDescription,
  alternates: { canonical: "/privatnost" },
};

export default function PrivacyPage() {
  return <PrivacyPolicyView />;
}
