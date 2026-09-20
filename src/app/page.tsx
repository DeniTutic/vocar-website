import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ProductFamilies } from "@/components/ProductFamilies";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { BrandStory } from "@/components/BrandStory";
import { QualitySection } from "@/components/QualitySection";
import { WhereToBuy } from "@/components/WhereToBuy";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { BackToTop } from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Voćar — Za bolji okus života",
  description:
    "Generacije tradicije. Prirodni sastojci. Okus koji traje. Voćar proizvodi grickalice, suho voće, čips, flips i kikiriki iz Gornjeg Rahića, Bosna i Hercegovina.",
  alternates: { canonical: "/" },
};

export default function Home() {
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
