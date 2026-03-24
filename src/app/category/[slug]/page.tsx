import { getAllCategories, getArticlesByCategory } from "@/lib/notion-queries";
import ArticleCard from "@/components/ArticleCard";
import type { Metadata } from "next";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getAllCategories();
  const cat = categories.find((c) => c.slug === slug);
  const name = cat?.name ?? slug;
  const title = `${name} — Science-Based Research & Guides`;
  const description = cat?.description
    ? cat.description.slice(0, 155)
    : `Evidence-based ${name} supplement research, dosing guides, and scientific evaluations.`;
  return {
    title,
    description,
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [categories, articles] = await Promise.all([
    getAllCategories(),
    getArticlesByCategory(slug),
  ]);
  const cat = categories.find((c) => c.slug === slug);
  const name = cat?.name ?? slug;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 mb-3 tracking-tight">{name}</h1>
      {cat?.description ? (
        <p className="text-zinc-600 mb-8 max-w-2xl text-base leading-relaxed">{cat.description}</p>
      ) : (
        <p className="text-zinc-500 mb-8">Science-based research and guides on {name}.</p>
      )}

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-zinc-400 text-center py-12">No content in this category yet.</p>
      )}
    </div>
  );
}
