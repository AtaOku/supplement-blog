import { BASE_URL, SITE_NAME } from "./config";

const org = {
  "@type": "Organization",
  name: SITE_NAME,
  url: BASE_URL,
};

const author = {
  "@type": "Person",
  name: "Ryan Holt",
  url: `${BASE_URL}/about`,
  sameAs: [`${BASE_URL}/about`],
  jobTitle: "Lead Science Writer",
  description:
    "Sports science background with 8+ years following primary literature in exercise science, clinical nutrition, and longevity biology.",
};

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ryan Holt",
    url: `${BASE_URL}/about`,
    jobTitle: "Lead Science Writer",
    worksFor: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
    description:
      "Sports science background with 8+ years following primary literature in exercise science, clinical nutrition, and longevity biology.",
    knowsAbout: [
      "Longevity Supplements",
      "Evidence-Based Nutrition",
      "Mitochondrial Medicine",
      "Exercise Science",
      "Sports Nutrition",
    ],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "Independent, science-based supplement resource covering performance, longevity, cognition, and metabolic health.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@supplementstack.space",
      contactType: "editorial",
    },
    sameAs: [
      "https://supplementstack.space",
    ],
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  date: string;
  wordCount: number;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    wordCount: post.wordCount,
    author: author,
    publisher: org,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
