import type { Metadata } from "next";
import { privateLabelPage } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { PrivateLabelView } from "@/components/PrivateLabelView";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  key: "privateLabel",
  title: privateLabelPage.metaTitle.en,
  description: privateLabelPage.metaDescription.en,
});

export default function PrivateLabelPageEn() {
  return <PrivateLabelView />;
}
