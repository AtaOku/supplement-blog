const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

export function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "w-3.5 h-3.5" : "w-6 h-6";
  const textClass = size === "sm" ? "text-xs font-medium text-zinc-500 ml-1.5" : "text-lg font-bold text-gray-900 ml-2";
  const activeColor = size === "sm" ? "text-amber-400" : "text-yellow-400";
  const inactiveColor = size === "sm" ? "text-zinc-200" : "text-gray-300";

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClass} ${star <= rating ? activeColor : inactiveColor}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
      <span className={textClass}>{rating}/5</span>
    </div>
  );
}
