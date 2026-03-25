import Link from "next/link";
import { HoverLift } from "@/components/MotionWrapper";
import type { ArticleMeta } from "@/lib/notion-queries";

const typeColors: Record<string, string> = {
  Guide: "text-emerald-600 bg-emerald-50",
  "Scientific Review": "text-purple-600 bg-purple-50",
  "Deep Dive": "text-orange-600 bg-orange-50",
  News: "text-blue-600 bg-blue-50",
};

const typeIcon: Record<string, string> = {
  "Scientific Review": "🔬",
  "Deep Dive": "🧪",
  Guide: "📋",
  News: "📰",
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
  const icon = typeIcon[article.type] ?? "📋";

  return (
    <HoverLift className="group h-full">
      <Link
        href={articleHref(article)}
        className={`flex flex-col h-full rounded-2xl border border-zinc-200/80 bg-white hover:border-zinc-300 transition-colors ${featured ? "p-8" : "p-6"}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${colorClass}`}>
            <span>{icon}</span>
            {article.type || article.category}
          </span>
          <span className="text-xs text-zinc-300">·</span>
          <span className="text-xs text-zinc-400">{article.readingTime}</span>
        </div>

        <h3
          className={`font-serif font-semibold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors leading-snug ${featured ? "text-2xl md:text-3xl tracking-tight" : "text-base"}`}
        >
          {article.title}
        </h3>

        <p
          className={`text-zinc-500 leading-relaxed mb-4 flex-1 ${featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"}`}
        >
          {article.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-50">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-[9px] shrink-0">
              RH
            </div>
            <span className="text-xs text-zinc-400">{article.author || "Ryan Holt"}</span>
          </div>
          <time className="text-xs text-zinc-300">
            {article.date
              ? new Date(article.date).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : ""}
          </time>
        </div>
      </Link>
    </HoverLift>
  );
}
