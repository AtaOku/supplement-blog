import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/PostCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Science-based articles about supplements, mitochondrial health, and longevity.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">Blog</h1>
      <p className="text-zinc-500 mb-8">
        Science-based articles about supplements and health.
      </p>

      {posts.length === 0 ? (
        <p className="text-zinc-400 text-center py-12">No articles yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
