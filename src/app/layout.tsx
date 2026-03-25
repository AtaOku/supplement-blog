import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Lora } from "next/font/google";
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

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    types: {
      "application/rss+xml": "/feed.xml",
    },
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
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50">
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <>
            <Script id="gtm-init" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
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
