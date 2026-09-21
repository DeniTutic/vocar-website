import type { Metadata } from "next";
import { Baloo_2, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { LocaleProvider } from "@/lib/locale";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Voćar — Za bolji okus života",
    template: "%s — Voćar",
  },
  description:
    "Voćar d.o.o. Brčko proizvodi grickalice, suho voće, čips, flips i kikiriki iz Gornjeg Rahića, Bosna i Hercegovina — generacije tradicije, prirodni sastojci, okus koji traje.",
  keywords: [
    "Voćar",
    "Voćar d.o.o.",
    "grickalice Bosna",
    "suho voće BiH",
    "čips proizvođač",
    "Gornji Rahić",
    "Brčko",
  ],
  authors: [{ name: "Voćar d.o.o. Brčko" }],
  openGraph: {
    type: "website",
    locale: "bs_BA",
    siteName: "Voćar",
    title: "Voćar — Za bolji okus života",
    description: "Generacije tradicije. Prirodni sastojci. Okus koji traje.",
    url: SITE_URL,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Voćar — Za bolji okus života" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voćar — Za bolji okus života",
    description: "Generacije tradicije. Prirodni sastojci. Okus koji traje.",
    images: ["/images/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bs" className={`${baloo.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
              telephone: ["+387 49 512 415", "+387 61 720 012"],
              email: "info@vocar.ba",
            }),
          }}
        />
        <SmoothScroll />
        <LocaleProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
