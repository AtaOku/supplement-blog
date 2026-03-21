// TR-EN blog post mappings for hreflang
export const blogHreflangMap: Record<string, string> = {
  // TR slug -> EN slug
  "protein-tozu-rehberi": "protein-powder-guide",
  "kreatin-kulllanim-rehberi": "creatine-guide",
  "mitokondri-sagligi-takviyeler": "mitochondrial-supplements-guide",
  "taurin-yaslanma-bilim": "taurine-longevity-science",
  "acetil-l-karnitin-rehberi": "acetyl-l-carnitine-guide",
  "nad-nmn-rehberi": "nad-nmn-guide",
};

// EN slug -> TR slug (reverse mapping)
export const blogHreflangMapReverse: Record<string, string> = Object.fromEntries(
  Object.entries(blogHreflangMap).map(([tr, en]) => [en, tr])
);

// TR-EN review mappings for hreflang
export const reviewHreflangMap: Record<string, string> = {
  "optimum-nutrition-gold-standard-whey": "on-gold-standard-whey-review",
  "kreatin-monohidrat-karsilastirma": "best-creatine-monohydrate",
  "en-iyi-coq10-takviyesi": "best-coq10-supplement",
  "en-iyi-nmn-takviyesi": "best-nmn-supplement",
};

export const reviewHreflangMapReverse: Record<string, string> = Object.fromEntries(
  Object.entries(reviewHreflangMap).map(([tr, en]) => [en, tr])
);

const BASE_URL = "https://supplementrehberi.com";

export function getBlogHreflang(slug: string) {
  const enSlug = blogHreflangMap[slug];
  const trSlug = blogHreflangMapReverse[slug];

  if (enSlug) {
    // Current is TR, alternate is EN
    return {
      canonical: `/blog/${slug}`,
      languages: {
        "tr": `${BASE_URL}/blog/${slug}`,
        "en": `${BASE_URL}/blog/${enSlug}`,
        "x-default": `${BASE_URL}/blog/${slug}`,
      },
    };
  } else if (trSlug) {
    // Current is EN, alternate is TR
    return {
      canonical: `/blog/${slug}`,
      languages: {
        "en": `${BASE_URL}/blog/${slug}`,
        "tr": `${BASE_URL}/blog/${trSlug}`,
        "x-default": `${BASE_URL}/blog/${trSlug}`,
      },
    };
  }
  return { canonical: `/blog/${slug}`, languages: undefined };
}

export function getReviewHreflang(slug: string) {
  const enSlug = reviewHreflangMap[slug];
  const trSlug = reviewHreflangMapReverse[slug];

  if (enSlug) {
    return {
      canonical: `/urun-inceleme/${slug}`,
      languages: {
        "tr": `${BASE_URL}/urun-inceleme/${slug}`,
        "en": `${BASE_URL}/urun-inceleme/${enSlug}`,
        "x-default": `${BASE_URL}/urun-inceleme/${slug}`,
      },
    };
  } else if (trSlug) {
    return {
      canonical: `/urun-inceleme/${slug}`,
      languages: {
        "en": `${BASE_URL}/urun-inceleme/${slug}`,
        "tr": `${BASE_URL}/urun-inceleme/${trSlug}`,
        "x-default": `${BASE_URL}/urun-inceleme/${trSlug}`,
      },
    };
  }
  return { canonical: `/urun-inceleme/${slug}`, languages: undefined };
}
