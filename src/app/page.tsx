import Link from "next/link";
import { getAllArticles, getAllCategories } from "@/lib/notion-queries";
import { FadeIn } from "@/components/MotionWrapper";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import CategoryGrid from "@/components/CategoryGrid";
import protocols from "@/data/protocols.json";

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
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-28">
          <FadeIn>
            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl md:text-[3.5rem] font-bold tracking-tight leading-[1.1] text-zinc-900 mb-6">
                Supplement science you can actually trust
              </h1>
              <p className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-lg mb-8">
                No affiliate hype. No star ratings. Just peer-reviewed evidence
                on what works, what doesn&apos;t, and what we don&apos;t know yet.
              </p>
              <div className="flex gap-3 mb-10">
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
              {/* Trust metrics */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-400">
                <span><strong className="text-zinc-600 font-semibold">{allArticles.length}</strong> evidence-based articles</span>
                <span className="hidden sm:inline text-zinc-200">·</span>
                <span><strong className="text-zinc-600 font-semibold">{protocols.length}</strong> protocol analyses</span>
                <span className="hidden sm:inline text-zinc-200">·</span>
                <span><strong className="text-zinc-600 font-semibold">{categories.length}</strong> supplement topics</span>
                <span className="hidden sm:inline text-zinc-200">·</span>
                <span>Peer-reviewed sources only</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <FadeIn>
            <h2 className="font-serif text-2xl font-semibold text-zinc-900 mb-8 tracking-tight">
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
                <h2 className="font-serif text-2xl font-semibold text-zinc-900 tracking-tight">
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
                <h2 className="font-serif text-2xl font-semibold text-zinc-900 tracking-tight">
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

      {/* Protocol Analysis Section */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                  Independent Analysis
                </span>
                <h2 className="font-serif text-2xl font-semibold text-zinc-900 tracking-tight mt-3">
                  Famous Supplement Protocols
                </h2>
                <p className="text-sm text-zinc-500 mt-1">
                  Every supplement in Bryan Johnson&apos;s, Huberman&apos;s, and Attia&apos;s stacks — run through peer-reviewed research.
                </p>
              </div>
              <Link href="/protocols" className="hidden sm:block text-sm text-zinc-400 hover:text-zinc-900 transition-colors shrink-0 ml-8">
                View all
              </Link>
            </div>
          </FadeIn>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {protocols.map((p) => {
              const strongCount = p.supplements.filter((s) => s.evidence === "strong").length;
              const totalStudies = p.supplements.reduce((acc, s) => acc + s.studyCount, 0);
              return (
                <Link
                  key={p.slug}
                  href={`/protocols/${p.slug}`}
                  className="group bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{p.image}</span>
                    <div>
                      <div className="font-semibold text-zinc-900 text-sm group-hover:text-emerald-600 transition-colors">
                        {p.name}
                      </div>
                      <div className="text-xs text-zinc-400">{p.protocol}</div>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-3 line-clamp-2">{p.description}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                      {strongCount} strong evidence
                    </span>
                    <span className="text-zinc-400">{totalStudies.toLocaleString()}+ studies</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-4 sm:hidden text-center">
            <Link href="/protocols" className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors">
              View all protocols →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white border-t border-zinc-100">
        <div className="max-w-lg mx-auto px-4 md:px-8">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
