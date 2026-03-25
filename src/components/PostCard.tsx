import Link from "next/link";
import { HoverLift } from "@/components/MotionWrapper";
import type { PostMeta } from "@/lib/mdx";

export default function PostCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  return (
    <HoverLift className="group h-full">
      <Link
        href={`/blog/${post.slug}`}
        className={`flex flex-col h-full rounded-2xl border border-zinc-200/80 bg-white hover:border-zinc-300 transition-colors ${featured ? "p-8" : "p-6"}`}
      >
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-zinc-400">{post.readingTime}</span>
        </div>

        <h3 className={`font-semibold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors leading-snug ${featured ? "text-2xl md:text-3xl tracking-tight" : "text-base"}`}>
          {post.title}
        </h3>

        <p className={`text-zinc-500 leading-relaxed mb-4 flex-1 ${featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"}`}>
          {post.description}
        </p>

        <time className="text-xs text-zinc-400 mt-auto">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </Link>
    </HoverLift>
  );
}
