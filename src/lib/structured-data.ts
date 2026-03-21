import { BASE_URL, SITE_NAME } from "./config";

const org = {
  "@type": "Organization",
  name: SITE_NAME,
  url: BASE_URL,
};

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
    author: org,
    publisher: org,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

export function reviewJsonLd(review: {
  title: string;
  description: string;
  date: string;
  rating: number;
  productName: string;
  brand?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    name: review.title,
    description: review.description,
    datePublished: review.date,
    dateModified: review.date,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
    },
    itemReviewed: {
      "@type": "Product",
      name: review.productName,
      brand: review.brand ? { "@type": "Brand", name: review.brand } : undefined,
    },
    author: org,
    publisher: org,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/urun-inceleme/${review.slug}`,
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
