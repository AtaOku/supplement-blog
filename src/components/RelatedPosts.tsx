import Link from "next/link";
import { getAllPosts, getAllReviews } from "@/lib/mdx";

type Props = {
  currentSlug: string;
  category: string;
  type: "blog" | "review";
  limit?: number;
};

export default function RelatedPosts({ currentSlug, category, type, limit = 3 }: Props) {
  const items = type === "blog"
    ? getAllPosts().filter((p) => p.slug !== currentSlug && p.category === category).slice(0, limit)
    : getAllReviews().filter((r) => r.slug !== currentSlug && r.category === category).slice(0, limit);

  // Also grab cross-type items (blog posts for reviews, reviews for blog posts)
  const crossItems = type === "blog"
    ? getAllReviews().filter((r) => r.category === category).slice(0, 2)
    : getAllPosts().filter((p) => p.category === category).slice(0, 2);

  if (items.length === 0 && crossItems.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Ilgili Icerikler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={type === "blog" ? `/blog/${item.slug}` : `/urun-inceleme/${item.slug}`}
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-sm transition-all"
          >
            <span className="text-xs font-medium text-green-600">{item.category}</span>
            <h3 className="mt-1 font-semibold text-gray-900 text-sm line-clamp-2">{item.title}</h3>
            <p className="mt-1 text-xs text-gray-500">{item.readingTime}</p>
          </Link>
        ))}
        {crossItems.map((item) => (
          <Link
            key={item.slug}
            href={type === "blog" ? `/urun-inceleme/${item.slug}` : `/blog/${item.slug}`}
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-sm transition-all"
          >
            <span className="text-xs font-medium text-green-600">
              {type === "blog" ? "Urun Inceleme" : "Blog"} - {item.category}
            </span>
            <h3 className="mt-1 font-semibold text-gray-900 text-sm line-clamp-2">{item.title}</h3>
            <p className="mt-1 text-xs text-gray-500">{item.readingTime}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
