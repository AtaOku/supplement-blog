import Link from "next/link";
import type { ReviewMeta } from "@/lib/mdx";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 ml-1">{rating}/5</span>
    </div>
  );
}

export default function ProductCard({ review }: { review: ReviewMeta }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
          {review.category}
        </span>
        {review.price && (
          <span className="text-sm font-bold text-gray-900">{review.price}</span>
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">
        <Link href={`/urun-inceleme/${review.slug}`} className="hover:text-green-600 transition-colors">
          {review.productName}
        </Link>
      </h3>

      <StarRating rating={review.rating} />

      <p className="text-sm text-gray-600 mt-3 mb-4 line-clamp-2">{review.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {review.pros.slice(0, 2).map((pro) => (
          <span key={pro} className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
            + {pro}
          </span>
        ))}
      </div>

      <Link
        href={`/urun-inceleme/${review.slug}`}
        className="text-sm font-medium text-green-600 hover:text-green-700"
      >
        Detayli Inceleme &rarr;
      </Link>
    </div>
  );
}
