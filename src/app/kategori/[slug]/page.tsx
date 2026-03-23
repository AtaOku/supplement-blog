import { getPostsByCategory, getReviewsByCategory } from "@/lib/mdx";
import PostCard from "@/components/PostCard";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

const categoryNames: Record<string, string> = {
  mitokondri: "Mitokondri",
  longevity: "Longevity",
  protein: "Protein",
  kreatin: "Kreatin",
  vitamin: "Vitamin",
  "pre-workout": "Pre-Workout",
  "amino-asit": "Amino Asit",
  saglik: "Saglik",
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = categoryNames[slug] || slug;
  return {
    title: `${name} - Supplement Rehberi`,
    description: `${name} kategorisindeki supplement incelemeleri ve rehber yazilar.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const name = categoryNames[slug] || slug;
  const posts = getPostsByCategory(name);
  const reviews = getReviewsByCategory(name);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
      <p className="text-gray-600 mb-8">
        {name} kategorisindeki tum icerikler.
      </p>

      {reviews.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Urun Incelemeleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ProductCard key={review.slug} review={review} />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Blog Yazilari</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && reviews.length === 0 && (
        <p className="text-gray-500 text-center py-12">
          Bu kategoride henuz icerik bulunmuyor.
        </p>
      )}
    </div>
  );
}
