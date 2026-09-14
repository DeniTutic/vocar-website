import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { WhereToBuy } from "@/components/WhereToBuy";
import { StoryTeaser } from "@/components/StoryTeaser";
import { Testimonials } from "@/components/Testimonials";
import { CatalogCTA } from "@/components/CatalogCTA";
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
      <ProductShowcase />
      <FeaturedProducts />
      <WhereToBuy />
      <StoryTeaser />
      <Testimonials />
      <CatalogCTA />
      <ContactSection />
      <BackToTop />
    </>
  );
}
