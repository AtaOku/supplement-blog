import { getAllPosts } from "@/lib/sanity-queries";
import PostCard from "@/components/PostCard";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Supplement Science Blog — Evidence-Based Guides & Research Summaries",
  description:
    "Read science-backed supplement articles covering performance, longevity, mitochondrial health, and cognitive enhancement. Evidence-graded guides written by sports science researchers.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Supplement Science Blog — Evidence-Based Guides & Research Summaries",
    description:
      "Read science-backed supplement articles covering performance, longevity, mitochondrial health, and cognitive enhancement. Evidence-graded guides written by sports science researchers.",
    type: "website",
    url: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

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
