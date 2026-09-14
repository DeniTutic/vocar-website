import type { Metadata } from "next";
import { BrandStory } from "@/components/BrandStory";
import { QualitySection } from "@/components/QualitySection";
import { Timeline } from "@/components/Timeline";
import { DistributionMap } from "@/components/DistributionMap";
import { aboutPage } from "@/data/content";

export const metadata: Metadata = {
  title: aboutPage.metaTitle,
  description: aboutPage.metaDescription,
  alternates: { canonical: "/o-nama" },
  openGraph: {
    title: "O nama — Voćar",
    description: aboutPage.metaDescription,
    images: [{ url: "/images/cover.jpg" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <BrandStory />
      <QualitySection />
      <Timeline />
      <DistributionMap />
    </>
  );
}
