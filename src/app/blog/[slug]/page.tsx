import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllArticles, getArticleBySlug } from "@/lib/notion-queries";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import type { Metadata } from "next";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles
    .filter((a) => a.type !== "Scientific Review")
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      url: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const wordCount = article.markdownContent.split(/\s+/).length;

  const jsonLd = articleJsonLd({
    title: article.title,
    description: article.description,
    date: article.date,
    wordCount,
    slug,
  });

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "" },
    { name: "Articles", path: "/blog" },
    { name: article.title, path: `/blog/${slug}` },
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

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-green-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/blog" className="hover:text-green-600">Articles</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate max-w-xs">{article.title}</li>
        </ol>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={`/category/${article.categorySlug}`}
            className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full hover:bg-green-100"
          >
            {article.category}
          </Link>
          <span className="text-sm text-gray-500">{article.readingTime}</span>
          <time className="text-sm text-gray-500">
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl leading-tight">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">{article.description}</p>

        {/* Evidence badge */}
        <div className="mt-5 flex items-center gap-4 text-xs text-zinc-400">
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Evidence-Based
          </span>
          <span>{article.readingTime}</span>
          <span>Updated {new Date(article.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
        </div>

        <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm shrink-0">
            RH
          </div>
          <div>
            <Link href="/about" className="text-sm font-medium text-gray-900 hover:text-emerald-600">
              {article.author}
            </Link>
            <p className="text-xs text-gray-500">Lead Science Writer · Peer-Reviewed Sources</p>
          </div>
        </div>
      </div>

      {/* Markdown content from Notion */}
      <div
        className="prose prose-zinc max-w-none prose-headings:font-semibold prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{
          __html: (await import("@/lib/markdown")).renderMarkdown(article.markdownContent),
        }}
      />
    </article>
  );
}
