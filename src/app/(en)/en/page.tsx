import type { Metadata } from "next";
import { siteMeta } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/Hero";
import { ProductFamilies } from "@/components/ProductFamilies";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { BrandStory } from "@/components/BrandStory";
import { QualitySection } from "@/components/QualitySection";
import { WhereToBuy } from "@/components/WhereToBuy";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { BackToTop } from "@/components/BackToTop";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  key: "home",
  title: siteMeta.title.en,
  absoluteTitle: true,
  description: siteMeta.homeDescription.en,
});

export default function HomeEn() {
  return (
    <>
      <Hero />
      <ProductFamilies />
      <FeaturedProducts />
      <BrandStory />
      <QualitySection />
      <WhereToBuy />
      <Testimonials />
      <ContactSection />
      <BackToTop />
    </>
  );
}
