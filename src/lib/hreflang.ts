import { BASE_URL } from "./config";

// TR-EN blog post mappings for hreflang
export const blogHreflangMap: Record<string, string> = {
  "protein-tozu-rehberi": "protein-powder-guide",
  "kreatin-kulllanim-rehberi": "creatine-guide",
  "mitokondri-sagligi-takviyeler": "mitochondrial-supplements-guide",
  "taurin-yaslanma-bilim": "taurine-longevity-science",
  "acetil-l-karnitin-rehberi": "acetyl-l-carnitine-guide",
  "nad-nmn-rehberi": "nad-nmn-guide",
};

export const blogHreflangMapReverse: Record<string, string> = Object.fromEntries(
  Object.entries(blogHreflangMap).map(([tr, en]) => [en, tr])
);

export const reviewHreflangMap: Record<string, string> = {
  "optimum-nutrition-gold-standard-whey": "on-gold-standard-whey-review",
  "kreatin-monohidrat-karsilastirma": "best-creatine-monohydrate",
  "en-iyi-coq10-takviyesi": "best-coq10-supplement",
  "en-iyi-nmn-takviyesi": "best-nmn-supplement",
};

export const reviewHreflangMapReverse: Record<string, string> = Object.fromEntries(
  Object.entries(reviewHreflangMap).map(([tr, en]) => [en, tr])
);

function resolveHreflang(
  slug: string,
  forwardMap: Record<string, string>,
  reverseMap: Record<string, string>,
  pathPrefix: string,
) {
  const enSlug = forwardMap[slug];
  const trSlug = reverseMap[slug];

  if (enSlug) {
    return {
      canonical: `${pathPrefix}/${slug}`,
      languages: {
        tr: `${BASE_URL}${pathPrefix}/${slug}`,
        en: `${BASE_URL}${pathPrefix}/${enSlug}`,
        "x-default": `${BASE_URL}${pathPrefix}/${slug}`,
      },
    };
  } else if (trSlug) {
    return {
      canonical: `${pathPrefix}/${slug}`,
      languages: {
        en: `${BASE_URL}${pathPrefix}/${slug}`,
        tr: `${BASE_URL}${pathPrefix}/${trSlug}`,
        "x-default": `${BASE_URL}${pathPrefix}/${trSlug}`,
      },
    };
  }
  return { canonical: `${pathPrefix}/${slug}`, languages: undefined };
}

export function getBlogHreflang(slug: string) {
  return resolveHreflang(slug, blogHreflangMap, blogHreflangMapReverse, "/blog");
}

export function getReviewHreflang(slug: string) {
  return resolveHreflang(slug, reviewHreflangMap, reviewHreflangMapReverse, "/urun-inceleme");
}
