export const BASE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://supplementstack.space"
).trim();

export const SITE_NAME = "Supplement Guide";

export const navigation = [
  { name: "Articles", href: "/blog" },
  { name: "Supplements", href: "/supplements" },
  { name: "Conditions", href: "/conditions" },
  { name: "Protocols", href: "/protocols" },
  { name: "Tools", href: "/tools" },
  { name: "About", href: "/about" },
];

export const footerPages = [
  { name: "Articles", href: "/blog" },
  { name: "Supplement Database", href: "/supplements" },
  { name: "Conditions", href: "/conditions" },
  { name: "Protocols", href: "/protocols" },
  { name: "Interaction Checker", href: "/tools/interaction-checker" },
  { name: "Protocol Builder", href: "/tools/protocol-builder" },
  { name: "Our Methodology", href: "/methodology" },
  { name: "About", href: "/about" },
];
