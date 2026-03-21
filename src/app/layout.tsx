import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://supplementrehberi.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Supplement Guide — Science-Based Reviews & Comparisons",
    template: "%s | Supplement Guide",
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
    siteName: "Supplement Guide",
    url: BASE_URL,
  },
};

const websiteJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Supplement Guide",
  url: BASE_URL,
  description:
    "Unbiased, science-based supplement reviews, comparisons, and guides.",
  publisher: {
    "@type": "Organization",
    name: "Supplement Guide",
    url: BASE_URL,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
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
