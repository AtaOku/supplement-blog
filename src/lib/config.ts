export const BASE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://supplementstack.space"
).trim();

export const SITE_NAME = "Supplement Guide";

export const navigation = [
  { name: "Articles", href: "/blog" },
  { name: "Supplements", href: "/supplements" },
  { name: "Research", href: "/research" },
  { name: "About", href: "/about" },
];

export const footerPages = [
  { name: "Articles", href: "/blog" },
  { name: "Supplement Database", href: "/supplements" },
  { name: "Interaction Checker", href: "/tools/interaction-checker" },
  { name: "Dosage Calculator", href: "/tools/dosage-calculator" },
  { name: "Research", href: "/research" },
  { name: "Our Research Process", href: "/methodology" },
  { name: "About", href: "/about" },
];
