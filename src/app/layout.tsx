import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL, SITE_NAME } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} — Science-Based Reviews & Comparisons`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Unbiased, science-based supplement reviews, comparisons, and guides. Mitochondrial supplements, protein, creatine, vitamins and more.",
  keywords: [
    "supplement",
    "supplement review",
    "best supplements",
    "mitochondrial supplements",
    "NMN",
    "CoQ10",
    "taurine",
    "protein powder",
    "creatine",
    "acetyl l-carnitine",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Science-Based Reviews & Comparisons`,
    description:
      "Unbiased, science-based supplement reviews, comparisons, and guides.",
  },
};

const websiteJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: BASE_URL,
  description:
    "Unbiased, science-based supplement reviews, comparisons, and guides.",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50">
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteJsonLd }}
          strategy="beforeInteractive"
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
