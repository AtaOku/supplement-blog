import Link from "next/link";
import { getAllPosts, getAllReviews } from "@/lib/mdx";
import { FadeIn } from "@/components/MotionWrapper";
import PostCard from "@/components/PostCard";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  const posts = getAllPosts().slice(0, 4);
  const reviews = getAllReviews().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-32">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-emerald-600 mb-4 tracking-wide">
                Science-based guidance
              </p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none text-zinc-900 mb-6">
                Unbiased supplement reviews you can trust
              </h1>
              <p className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-lg mb-8">
                From mitochondrial supplements to protein powders — evidence-based
                reviews, comparisons, and guides.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/blog"
                  className="bg-zinc-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-zinc-800 active:scale-[0.98] transition-all"
                >
                  Read the Blog
                </Link>
                <Link
                  href="/urun-inceleme"
                  className="border border-zinc-200 text-zinc-700 px-6 py-3 rounded-xl text-sm font-medium hover:bg-zinc-50 active:scale-[0.98] transition-all"
                >
                  Product Reviews
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <FadeIn>
            <h2 className="text-xl font-semibold text-zinc-900 mb-8 tracking-tight">
              Categories
            </h2>
          </FadeIn>
          <CategoryGrid />
        </div>
      </section>

      {/* Latest Reviews */}
      {reviews.length > 0 && (
        <section className="py-20 bg-white border-y border-zinc-100">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="flex items-baseline justify-between mb-8">
              <FadeIn>
                <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">
                  Latest Reviews
                </h2>
              </FadeIn>
              <Link href="/urun-inceleme" className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((review) => (
                <ProductCard key={review.slug} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts */}
      {posts.length > 0 && (
        <section className="py-20">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="flex items-baseline justify-between mb-8">
              <FadeIn>
                <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">
                  Latest Articles
                </h2>
              </FadeIn>
              <Link href="/blog" className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {posts[0] && (
                <div className="md:col-span-2 md:row-span-2">
                  <PostCard post={posts[0]} featured />
                </div>
              )}
              {posts.slice(1).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-20 bg-white border-t border-zinc-100">
        <div className="max-w-lg mx-auto px-4 md:px-8">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
