import Link from "next/link";
import { FadeIn } from "@/components/MotionWrapper";
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

  const crossItems = type === "blog"
    ? getAllReviews().filter((r) => r.category === category).slice(0, 2)
    : getAllPosts().filter((p) => p.category === category).slice(0, 2);

  if (items.length === 0 && crossItems.length === 0) return null;

  const allItems = [
    ...items.map((item) => ({
      ...item,
      href: type === "blog" ? `/blog/${item.slug}` : `/urun-inceleme/${item.slug}`,
      label: item.category,
    })),
    ...crossItems.map((item) => ({
      ...item,
      href: type === "blog" ? `/urun-inceleme/${item.slug}` : `/blog/${item.slug}`,
      label: `${type === "blog" ? "Inceleme" : "Blog"} \u2022 ${item.category}`,
    })),
  ];

  return (
    <div className="mt-16 pt-10 border-t border-zinc-100">
      <h2 className="text-lg font-semibold text-zinc-900 mb-5 tracking-tight">Ilgili icerikler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {allItems.map((item, i) => (
          <FadeIn key={item.slug} delay={i * 0.05}>
            <Link
              href={item.href}
              className="block p-4 rounded-xl border border-zinc-200/80 bg-white hover:border-zinc-300 transition-colors"
            >
              <span className="text-xs text-emerald-600 font-medium">{item.label}</span>
              <h3 className="mt-1 text-sm font-semibold text-zinc-900 line-clamp-2">{item.title}</h3>
              <p className="mt-1 text-xs text-zinc-400">{item.readingTime}</p>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
