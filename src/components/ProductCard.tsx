import Link from "next/link";
import { HoverLift } from "@/components/MotionWrapper";
import { StarRating } from "@/components/StarRating";
import type { ReviewMeta } from "@/lib/sanity-queries";

export default function ProductCard({ review }: { review: ReviewMeta }) {
  return (
    <HoverLift className="group">
      <Link href={`/reviews/${review.slug}`} className="block p-6 rounded-2xl border border-zinc-200/80 bg-white hover:border-zinc-300 transition-colors">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            {review.category}
          </span>
        </div>

        <h3 className="text-base font-semibold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors leading-snug">
          {review.productName}
        </h3>

        <StarRating rating={review.rating} size="sm" />

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
