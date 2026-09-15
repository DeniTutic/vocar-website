"use client";

import { termsPage } from "@/data/content";
import { LegalPageView } from "./LegalPageView";

export function TermsOfUseView() {
  return <LegalPageView content={termsPage} />;
}
