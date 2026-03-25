import { getAllReviews } from "@/lib/mdx";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urun Incelemeleri",
  description: "Tarafsiz supplement urun incelemeleri ve puanlamalari.",
};

export default function ReviewsPage() {
  const reviews = getAllReviews();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Urun Incelemeleri</h1>
      <p className="text-gray-600 mb-8">
        Tarafsiz ve detayli supplement urun incelemeleri.
      </p>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Henuz urun incelemesi bulunmuyor.</p>
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
