import Link from "next/link";
import { HoverLift } from "@/components/MotionWrapper";
import type { ArticleMeta } from "@/lib/notion-queries";

const typeColors: Record<string, string> = {
  Guide: "text-emerald-600 bg-emerald-50",
  "Scientific Review": "text-purple-600 bg-purple-50",
  "Deep Dive": "text-orange-600 bg-orange-50",
  News: "text-blue-600 bg-blue-50",
};

function articleHref(article: ArticleMeta): string {
  if (article.type === "Scientific Review") return `/research/${article.slug}`;
  return `/blog/${article.slug}`;
}

export default function ArticleCard({
  article,
  featured = false,
}: {
  article: ArticleMeta;
  featured?: boolean;
}) {
  const colorClass = typeColors[article.type] ?? "text-emerald-600 bg-emerald-50";

  return (
    <HoverLift className="group h-full">
      <Link
        href={articleHref(article)}
        className={`flex flex-col h-full rounded-2xl border border-zinc-200/80 bg-white hover:border-zinc-300 transition-colors ${featured ? "p-8" : "p-6"}`}
      >
        <div className="flex items-center gap-2.5 mb-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colorClass}`}>
            {article.type || article.category}
          </span>
          <span className="text-xs text-zinc-400">{article.readingTime}</span>
        </div>

        <h3
          className={`font-semibold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors leading-snug ${featured ? "text-2xl md:text-3xl tracking-tight" : "text-base"}`}
        >
          {article.title}
        </h3>

        <p
          className={`text-zinc-500 leading-relaxed mb-4 flex-1 ${featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"}`}
        >
          {article.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <time className="text-xs text-zinc-400">
            {article.date
              ? new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : ""}
          </time>
          {article.category && (
            <span className="text-xs text-zinc-400">{article.category}</span>
          )}
        </div>
      </Link>
    </HoverLift>
  );
}
