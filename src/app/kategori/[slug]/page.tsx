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
    title: `${name} Supplements`,
    description: `Supplement reviews and guides in the ${name} category.`,
    alternates: { canonical: `/kategori/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const name = categoryNames[slug] || slug;
  const posts = getPostsByCategory(name);
  const reviews = getReviewsByCategory(name);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">{name}</h1>
      <p className="text-zinc-500 mb-8">
        All content in the {name} category.
      </p>

      {reviews.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">Product Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ProductCard key={review.slug} review={review} />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">Blog Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && reviews.length === 0 && (
        <p className="text-zinc-400 text-center py-12">
          No content in this category yet.
        </p>
      )}
    </div>
  );
}
