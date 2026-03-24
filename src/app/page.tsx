import Link from "next/link";
import { getAllArticles, getAllCategories } from "@/lib/notion-queries";
import { FadeIn } from "@/components/MotionWrapper";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import CategoryGrid from "@/components/CategoryGrid";

export const revalidate = 3600;

export default async function Home() {
  const [allArticles, categories] = await Promise.all([
    getAllArticles().catch(() => []),
    getAllCategories().catch(() => []),
  ]);

  const guides = allArticles.filter((a) => a.type !== "Scientific Review").slice(0, 4);
  const research = allArticles.filter((a) => a.type === "Scientific Review").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-32">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-emerald-600 mb-4 tracking-wide">
                Evidence-based research
              </p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none text-zinc-900 mb-6">
                Supplement science you can actually trust
              </h1>
              <p className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-lg mb-8">
                No affiliate hype. No star ratings. Just peer-reviewed evidence
                on what works, what doesn&apos;t, and what we don&apos;t know yet.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/blog"
                  className="bg-zinc-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-zinc-800 active:scale-[0.98] transition-all"
                >
                  Read Articles
                </Link>
                <Link
                  href="/research"
                  className="border border-zinc-200 text-zinc-700 px-6 py-3 rounded-xl text-sm font-medium hover:bg-zinc-50 active:scale-[0.98] transition-all"
                >
                  Scientific Reviews
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <FadeIn>
            <h2 className="text-xl font-semibold text-zinc-900 mb-8 tracking-tight">
              Topics
            </h2>
          </FadeIn>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      {/* Latest Research */}
      {research.length > 0 && (
        <section className="py-20 bg-white border-y border-zinc-100">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="flex items-baseline justify-between mb-8">
              <FadeIn>
                <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">
                  Latest Research
                </h2>
              </FadeIn>
              <Link href="/research" className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {research.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {guides.length > 0 && (
        <section className="py-20">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="flex items-baseline justify-between mb-8">
              <FadeIn>
                <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">
                  Latest Articles
                </h2>
              </FadeIn>
              <Link href="/blog" className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {guides[0] && (
                <div className="md:col-span-2 md:row-span-2">
                  <ArticleCard article={guides[0]} featured />
                </div>
              )}
              {guides.slice(1).map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-20 bg-white border-t border-zinc-100">
        <div className="max-w-lg mx-auto px-4 md:px-8">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
