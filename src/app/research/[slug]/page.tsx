import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllArticles, getArticleBySlug } from "@/lib/notion-queries";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { renderMarkdown } from "@/lib/markdown";
import type { Metadata } from "next";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles
    .filter((a) => a.type === "Scientific Review")
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/research/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      url: `/research/${slug}`,
    },
  };
}

export default async function ResearchPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const wordCount = article.markdownContent.split(/\s+/).length;

  const jsonLd = articleJsonLd({
    title: article.title,
    description: article.description,
    date: article.date,
    wordCount,
    slug: `research/${slug}`,
  });

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "" },
    { name: "Research", path: "/research" },
    { name: article.title, path: `/research/${slug}` },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-green-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/research" className="hover:text-green-600">Research</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate max-w-xs">{article.title}</li>
        </ol>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            Scientific Review
          </span>
          <Link
            href={`/category/${article.categorySlug}`}
            className="text-sm font-medium text-zinc-500 hover:text-green-600"
          >
            {article.category}
          </Link>
          <span className="text-sm text-gray-500">{article.readingTime}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-gray-600">{article.description}</p>
        <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold text-sm shrink-0">
            RH
          </div>
          <div>
            <Link href="/about" className="text-sm font-medium text-gray-900 hover:text-green-600">
              {article.author}
            </Link>
            <p className="text-xs text-gray-500">Lead Science Writer</p>
          </div>
        </div>
      </div>

      <div
        className="prose prose-zinc max-w-none prose-headings:font-semibold prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(article.markdownContent) }}
      />
    </article>
  );
}
