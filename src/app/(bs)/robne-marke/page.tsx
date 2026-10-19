import type { Metadata } from "next";
import { privateLabelPage } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { PrivateLabelView } from "@/components/PrivateLabelView";

export const metadata: Metadata = pageMetadata({
  locale: "bs",
  key: "privateLabel",
  title: privateLabelPage.metaTitle.bs,
  description: privateLabelPage.metaDescription.bs,
});

export default function PrivateLabelPage() {
  return <PrivateLabelView />;
}
