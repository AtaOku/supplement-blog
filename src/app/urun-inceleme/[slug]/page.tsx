import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getReviewBySlug, getAllReviews } from "@/lib/mdx";
import AffiliateLink from "@/components/AffiliateLink";
import RelatedPosts from "@/components/RelatedPosts";
import { getReviewHreflang } from "@/lib/hreflang";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const reviews = getAllReviews();
  return reviews.map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return {};

  const hreflang = getReviewHreflang(slug);

  return {
    title: `${review.meta.productName} Inceleme`,
    description: review.meta.description,
    alternates: {
      canonical: hreflang.canonical,
      languages: hreflang.languages,
    },
    openGraph: {
      title: `${review.meta.productName} Inceleme`,
      description: review.meta.description,
      type: "article",
      url: `/urun-inceleme/${slug}`,
    },
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-6 h-6 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-lg font-bold text-gray-900 ml-2">{rating}/5</span>
    </div>
  );
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: review.meta.title,
    description: review.meta.description,
    datePublished: review.meta.date,
    dateModified: review.meta.date,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.meta.rating,
      bestRating: 5,
    },
    itemReviewed: {
      "@type": "Product",
      name: review.meta.productName,
      brand: { "@type": "Brand", name: review.meta.brand },
    },
    author: {
      "@type": "Organization",
      name: "Supplement Rehberi",
      url: "https://supplementrehberi.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Supplement Rehberi",
      url: "https://supplementrehberi.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://supplementrehberi.com/urun-inceleme/${slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: "https://supplementrehberi.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Urun Incelemeleri",
        item: "https://supplementrehberi.com/urun-inceleme",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: review.meta.productName,
        item: `https://supplementrehberi.com/urun-inceleme/${slug}`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-green-600">Ana Sayfa</Link></li>
          <li>/</li>
          <li><Link href="/urun-inceleme" className="hover:text-green-600">Urun Incelemeleri</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate max-w-xs">{review.meta.productName}</li>
        </ol>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={`/kategori/${review.meta.category.toLowerCase().replace(/ /g, "-")}`}
            className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full hover:bg-green-100"
          >
            {review.meta.category}
          </Link>
          <span className="text-sm text-gray-500">{review.meta.readingTime}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          {review.meta.title}
        </h1>
        <StarRating rating={review.meta.rating} />
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-green-700 mb-2">Artilari</h3>
            <ul className="space-y-1">
              {review.meta.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-500 mt-0.5">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-700 mb-2">Eksileri</h3>
            <ul className="space-y-1">
              {review.meta.cons.map((con) => (
                <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-red-500 mt-0.5">-</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {review.meta.price && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">Fiyat: <strong>{review.meta.price}</strong></span>
            <AffiliateLink href={review.meta.affiliateUrl} productName={review.meta.productName}>
              Fiyati Gor
            </AffiliateLink>
          </div>
        )}
      </div>

      <div className="prose">
        <MDXRemote source={review.content} />
      </div>

      <div className="mt-12 bg-green-50 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {review.meta.productName} Satin Al
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          En iyi fiyat garantisi ile hemen siparis verin.
        </p>
        <AffiliateLink href={review.meta.affiliateUrl} productName={review.meta.productName}>
          Satin Al
        </AffiliateLink>
      </div>

      <RelatedPosts currentSlug={slug} category={review.meta.category} type="review" />
    </article>
  );
}
