import { Baloo_2, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { LocaleProvider, type Locale } from "@/lib/locale";
import { SITE_URL } from "@/data/content";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// The mobile number is published on the English site only.
const organizationJsonLd = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Voćar d.o.o. Brčko",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gornji Rahić 112",
    postalCode: "76207",
    addressLocality: "Gornji Rahić",
    addressCountry: "BA",
  },
  telephone: locale === "en" ? ["+387 49 512 415", "+387 60 35 62 480"] : ["+387 49 512 415"],
  email: "vocar@vocar.ba",
});

/**
 * The document both root layouts render. Each language has its own root
 * layout (app/(bs) and app/(en)) so `<html lang>` and the server-rendered
 * text are correct per locale without any client-side toggle.
 */
export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    // data-scroll-behavior: Next 16 stopped disabling CSS smooth scroll during
    // navigation; without this a product page opens with a visible glide from
    // wherever the catalog was scrolled to. Anchor links stay smooth.
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${baloo.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)) }} />
        <SmoothScroll />
        <LocaleProvider locale={locale}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
