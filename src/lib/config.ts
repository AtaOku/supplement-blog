import type { Icon } from "@phosphor-icons/react";

export const BASE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://supplementstack.space"
).trim();

export const SITE_NAME = "Supplement Guide";

export interface Category {
  name: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  { name: "Mitochondria", slug: "mitokondri", description: "CoQ10, NAD+, PQQ, taurine" },
  { name: "Longevity", slug: "longevity", description: "NMN, resveratrol, anti-aging" },
  { name: "Protein", slug: "protein", description: "Whey, casein, vegan protein" },
  { name: "Creatine", slug: "kreatin", description: "Performance and strength" },
  { name: "Vitamins", slug: "vitamin", description: "D3, B12, multivitamin" },
  { name: "Pre-Workout", slug: "pre-workout", description: "Pre-training supplements" },
  { name: "Amino Acids", slug: "amino-asit", description: "BCAA, EAA, glutamine" },
  { name: "Health", slug: "saglik", description: "Omega-3, probiotics, minerals" },
];

export const categorySlugToName: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.slug, c.name])
);

export const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "Reviews", href: "/reviews" },
  { name: "Stack Builder", href: "/tools/supplement-stack-builder" },
  { name: "About", href: "/about" },
];

export const footerPages = [
  { name: "Blog", href: "/blog" },
  { name: "Product Reviews", href: "/reviews" },
  { name: "Free Stack Builder", href: "/tools/supplement-stack-builder" },
  { name: "About", href: "/about" },
];
