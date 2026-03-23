import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllReviews, getReviewBySlug } from "@/lib/sanity-queries";
import { reviewJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { StarRating } from "@/components/StarRating";
import AffiliateLink from "@/components/AffiliateLink";
import RelatedPosts from "@/components/RelatedPosts";
import { getReviewHreflang } from "@/lib/hreflang";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import type { Metadata } from "next";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const reviews = await getAllReviews();
  return reviews.map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) return {};

  const hreflang = getReviewHreflang(slug);

  return {
    title: `${review.productName} Review`,
    description: review.description,
    alternates: {
      canonical: hreflang.canonical,
      languages: hreflang.languages,
    },
    openGraph: {
      title: `${review.productName} Review`,
      description: review.description,
      type: "article",
      url: `/reviews/${slug}`,
    },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) notFound();

  const jsonLd = reviewJsonLd({
    title: review.title,
    description: review.description,
    date: review.date,
    rating: review.rating,
    productName: review.productName,
    brand: review.brand,
    slug,
  });

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "" },
    { name: "Reviews", path: "/reviews" },
    { name: review.productName, path: `/reviews/${slug}` },
  ]);

  const categorySlug = review.categorySlug ?? review.category.toLowerCase().replace(/ /g, "-");

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
          <li><Link href="/reviews" className="hover:text-green-600">Reviews</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate max-w-xs">{review.productName}</li>
        </ol>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={`/category/${categorySlug}`}
            className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full hover:bg-green-100"
          >
            {review.category}
          </Link>
          <span className="text-sm text-gray-500">{review.readingTime}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          {review.title}
        </h1>
        <StarRating rating={review.rating} />
        <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm shrink-0">
            AO
          </div>
          <div>
            <Link href="/about" className="text-sm font-medium text-gray-900 hover:text-green-600">
              Ata Okuzcuoglu
            </Link>
            <p className="text-xs text-gray-500">Founder &amp; Lead Writer · Sports Science · Longevity Biology</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-green-700 mb-2">Pros</h3>
            <ul className="space-y-1">
              {review.pros.map((pro) => (
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
              {review.cons.map((con) => (
                <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-red-500 mt-0.5">-</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {review.price && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">Price: <strong>{review.price}</strong></span>
            <AffiliateLink href={review.affiliateUrl} productName={review.productName}>
              View Price
            </AffiliateLink>
          </div>
        )}
      </div>

      {/* Render: markdownBody (legacy MDX) or body (Portable Text) */}
      {review.markdownBody ? (
        <div className="prose">
          <MDXRemote source={review.markdownBody} />
        </div>
      ) : review.body && (review.body as unknown[]).length > 0 ? (
        <PortableTextRenderer value={review.body as import("@portabletext/types").TypedObject[]} />
      ) : null}

      <div className="mt-12 bg-emerald-50 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-zinc-900 mb-2">
          Get {review.productName}
        </h3>
        <p className="text-sm text-zinc-500 mb-1">
          Check current pricing and availability.
        </p>
        <p className="text-xs text-zinc-400 mb-4 italic">
          Affiliate link — we may earn a commission at no extra cost to you.
        </p>
        <AffiliateLink href={review.affiliateUrl} productName={review.productName}>
          Check Price
        </AffiliateLink>
      </div>

      <RelatedPosts currentSlug={slug} category={review.category} type="review" />
    </article>
  );
}
