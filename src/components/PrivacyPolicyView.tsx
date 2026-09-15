"use client";

import { privacyPage } from "@/data/content";
import { LegalPageView } from "./LegalPageView";

export function PrivacyPolicyView() {
  return <LegalPageView content={privacyPage} />;
}
