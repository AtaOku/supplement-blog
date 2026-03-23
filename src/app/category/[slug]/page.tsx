import { getAllCategories, getPostsByCategory, getReviewsByCategory } from "@/lib/sanity-queries";
import PostCard from "@/components/PostCard";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getAllCategories();
  const cat = categories.find((c) => c.slug === slug);
  const name = cat?.name ?? slug;
  const title = `Best ${name} Supplements — Science-Based Reviews & Dosing Guides`;
  const description =
    cat?.description
      ? cat.description.slice(0, 155)
      : `Science-backed ${name} supplement reviews, evidence-graded dosing guides, and product comparisons. Find the best ${name} supplements based on clinical research.`;
  return {
    title,
    description,
    alternates: { canonical: `/category/${slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [categories, posts, reviews] = await Promise.all([
    getAllCategories(),
    getPostsByCategory(slug),
    getReviewsByCategory(slug),
  ]);
  const cat = categories.find((c) => c.slug === slug);
  const name = cat?.name ?? slug;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 mb-3 tracking-tight">{name} Supplements</h1>
      {cat?.description ? (
        <p className="text-zinc-600 mb-8 max-w-2xl text-base leading-relaxed">{cat.description}</p>
      ) : (
        <p className="text-zinc-500 mb-8">Science-based reviews and guides in the {name} category.</p>
      )}

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
