import Link from "next/link";
import { HoverLift } from "@/components/MotionWrapper";
import type { PostMeta } from "@/lib/mdx";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <HoverLift className="group">
      <Link href={`/blog/${post.slug}`} className="block p-6 rounded-2xl border border-zinc-200/80 bg-white hover:border-zinc-300 transition-colors">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-zinc-400">{post.readingTime}</span>
        </div>

        <h3 className="text-base font-semibold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors leading-snug">
          {post.title}
        </h3>

        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-4">{post.description}</p>

        <time className="text-xs text-zinc-400">
          {new Date(post.date).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </Link>
    </HoverLift>
  );
}
