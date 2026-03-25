export const BASE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://supplementstack.space"
).trim();

export const SITE_NAME = "Supplement Guide";

export const navigation = [
  { name: "Articles", href: "/blog" },
  { name: "Research", href: "/research" },
  { name: "Our Process", href: "/methodology" },
  { name: "About", href: "/about" },
];

export const footerPages = [
  { name: "Articles", href: "/blog" },
  { name: "Research", href: "/research" },
  { name: "Our Research Process", href: "/methodology" },
  { name: "Stack Builder", href: "/tools/supplement-stack-builder" },
  { name: "About", href: "/about" },
];
