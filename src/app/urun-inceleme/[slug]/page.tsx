import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getReviewBySlug, getAllReviews } from "@/lib/mdx";
import { reviewJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { StarRating } from "@/components/StarRating";
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
    title: `${review.meta.productName} Review`,
    description: review.meta.description,
    alternates: {
      canonical: hreflang.canonical,
      languages: hreflang.languages,
    },
    openGraph: {
      title: `${review.meta.productName} Review`,
      description: review.meta.description,
      type: "article",
      url: `/urun-inceleme/${slug}`,
    },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) notFound();

  const jsonLd = reviewJsonLd({
    title: review.meta.title,
    description: review.meta.description,
    date: review.meta.date,
    rating: review.meta.rating,
    productName: review.meta.productName,
    brand: review.meta.brand,
    slug,
  });

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "" },
    { name: "Reviews", path: "/urun-inceleme" },
    { name: review.meta.productName, path: `/urun-inceleme/${slug}` },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-green-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/urun-inceleme" className="hover:text-green-600">Reviews</Link></li>
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
            <h3 className="font-semibold text-green-700 mb-2">Pros</h3>
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
            <h3 className="font-semibold text-red-700 mb-2">Cons</h3>
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
            <span className="text-sm text-gray-600">Price: <strong>{review.meta.price}</strong></span>
            <AffiliateLink href={review.meta.affiliateUrl} productName={review.meta.productName}>
              View Price
            </AffiliateLink>
          </div>
        )}
      </div>

      <div className="prose">
        <MDXRemote source={review.content} />
      </div>

      <div className="mt-12 bg-emerald-50 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-zinc-900 mb-2">
          Get {review.meta.productName}
        </h3>
        <p className="text-sm text-zinc-500 mb-1">
          Check current pricing and availability.
        </p>
        <p className="text-xs text-zinc-400 mb-4 italic">
          Affiliate link — we may earn a commission at no extra cost to you.
        </p>
        <AffiliateLink href={review.meta.affiliateUrl} productName={review.meta.productName}>
          Check Price
        </AffiliateLink>
      </div>

      <RelatedPosts currentSlug={slug} category={review.meta.category} type="review" />
    </article>
  );
}
