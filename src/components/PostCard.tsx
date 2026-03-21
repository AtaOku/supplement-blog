import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
          {post.category}
        </span>
        <span className="text-xs text-gray-500">{post.readingTime}</span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">
        <Link href={`/blog/${post.slug}`} className="hover:text-green-600 transition-colors">
          {post.title}
        </Link>
      </h3>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.description}</p>

      <div className="flex items-center justify-between">
        <time className="text-xs text-gray-500">
          {new Date(post.date).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          Devamini Oku &rarr;
        </Link>
      </div>
    </article>
  );
}
