import type { Metadata } from "next";
import { getAllArticles } from "@/lib/notion-queries";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Scientific Reviews — Evidence-Based Supplement Evaluations",
  description:
    "Independent scientific evaluations of popular supplements. Each review examines clinical trial data, mechanisms of action, dosing evidence, and limitations.",
  alternates: { canonical: "/research" },
};

export default async function ResearchPage() {
  const articles = await getAllArticles();
  const research = articles.filter((a) => a.type === "Scientific Review");

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
      <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
        Scientific Reviews
      </h1>
      <p className="text-zinc-500 mb-10 max-w-xl">
        Independent evaluations based on clinical trial data. No star ratings, no affiliate links — just evidence.
      </p>

      {research.length === 0 ? (
        <p className="text-zinc-400 text-center py-20">No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {research.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
