import { getAllReviews } from "@/lib/sanity-queries";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Supplement Reviews — Unbiased Ratings, Ingredient Analysis & Comparisons",
  description:
    "Browse independent supplement product reviews with ratings, pros/cons, ingredient analysis, and dosing assessments. Science-based evaluations across creatine, protein, CoQ10, NMN, and more.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Supplement Reviews — Unbiased Ratings, Ingredient Analysis & Comparisons",
    description:
      "Browse independent supplement product reviews with ratings, pros/cons, ingredient analysis, and dosing assessments. Science-based evaluations across creatine, protein, CoQ10, NMN, and more.",
    type: "website",
    url: "/reviews",
  },
};

export default async function ReviewsPage() {
  const reviews = await getAllReviews();

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
