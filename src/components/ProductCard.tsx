import Link from "next/link";
import { HoverLift } from "@/components/MotionWrapper";
import type { ReviewMeta } from "@/lib/mdx";

function CompactRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? "text-amber-400" : "text-zinc-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs font-medium text-zinc-500 ml-1.5">{rating}/5</span>
    </div>
  );
}

export default function ProductCard({ review }: { review: ReviewMeta }) {
  return (
    <HoverLift className="group">
      <Link href={`/urun-inceleme/${review.slug}`} className="block p-6 rounded-2xl border border-zinc-200/80 bg-white hover:border-zinc-300 transition-colors">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            {review.category}
          </span>
          {review.price && (
            <span className="text-xs font-semibold text-zinc-900 bg-zinc-100 px-2.5 py-1 rounded-full">{review.price}</span>
          )}
        </div>

        <h3 className="text-base font-semibold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors leading-snug">
          {review.productName}
        </h3>

        <CompactRating rating={review.rating} />

        <p className="text-sm text-zinc-500 leading-relaxed mt-3 line-clamp-2">{review.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {review.pros.slice(0, 2).map((pro) => (
            <span key={pro} className="text-xs text-emerald-700 bg-emerald-50/60 px-2 py-0.5 rounded">
              {pro}
            </span>
          ))}
        </div>
      </Link>
    </HoverLift>
  );
}
