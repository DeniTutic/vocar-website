import type { Metadata } from "next";
import { home } from "@/data/content";
import { QualitySection } from "@/components/QualitySection";
import { Timeline } from "@/components/Timeline";

export const metadata: Metadata = {
  title: "Kvalitet",
  description: "Kako Voćar osigurava kvalitet — od pažljivo odabranih sastojaka do kontrole u svakoj fazi proizvodnje.",
  alternates: { canonical: "/kvalitet" },
};

export default function KvalitetPage() {
  return (
    <>
      <section className="border-b px-5 pb-12 pt-16 sm:px-8 sm:pt-24" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
            {home.qualityEyebrow.bs}
          </span>
          <h1 className="mt-3 text-5xl sm:text-6xl" style={{ color: "var(--forest-deep)" }}>
            {home.qualityTitle.bs}
          </h1>
        </div>
      </section>

      <QualitySection showHeading={false} />
      <Timeline />
    </>
  );
}
