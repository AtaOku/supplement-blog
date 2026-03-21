import type { Metadata } from "next";
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
    default: "Supplement Rehberi - Tarafsiz Supplement Incelemeleri ve Rehberleri",
    template: "%s | Supplement Rehberi",
  },
  description:
    "Protein, kreatin, vitamin ve diger supplementler hakkinda tarafsiz incelemeler, karsilastirmalar ve bilimsel rehberler.",
  keywords: [
    "supplement",
    "protein tozu",
    "kreatin",
    "vitamin",
    "pre-workout",
    "supplement inceleme",
    "en iyi protein tozu",
    "mitokondri takviyesi",
    "NMN",
    "CoQ10",
    "taurin",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Supplement Rehberi",
    url: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
