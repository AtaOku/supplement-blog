import { getAllReviews } from "@/lib/mdx";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Reviews",
  description: "Unbiased supplement product reviews and ratings.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const reviews = getAllReviews();

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">Product Reviews</h1>
      <p className="text-zinc-500 mb-8">
        Unbiased, detailed supplement product reviews.
      </p>

      {reviews.length === 0 ? (
        <p className="text-zinc-400 text-center py-12">No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ProductCard key={review.slug} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
