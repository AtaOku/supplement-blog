import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { getBlogHreflang } from "@/lib/hreflang";
import RelatedPosts from "@/components/RelatedPosts";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const hreflang = getBlogHreflang(slug);

  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: {
      canonical: hreflang.canonical,
      languages: hreflang.languages,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      url: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    dateModified: post.meta.date,
    wordCount: post.content.split(/\s+/).length,
    author: {
      "@type": "Organization",
      name: "Supplement Rehberi",
      url: "https://supplementrehberi.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Supplement Rehberi",
      url: "https://supplementrehberi.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://supplementrehberi.com/blog/${slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: "https://supplementrehberi.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://supplementrehberi.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.meta.title,
        item: `https://supplementrehberi.com/blog/${slug}`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {post.meta.faqs && post.meta.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: post.meta.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }),
          }}
        />
      )}

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-green-600">Ana Sayfa</Link></li>
          <li>/</li>
          <li><Link href="/blog" className="hover:text-green-600">Blog</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate max-w-xs">{post.meta.title}</li>
        </ol>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={`/kategori/${post.meta.category.toLowerCase().replace(/ /g, "-")}`}
            className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full hover:bg-green-100"
          >
            {post.meta.category}
          </Link>
          <span className="text-sm text-gray-500">{post.meta.readingTime}</span>
          <time className="text-sm text-gray-500">
            {new Date(post.meta.date).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {post.meta.title}
        </h1>
        <p className="mt-4 text-lg text-gray-600">{post.meta.description}</p>
      </div>

      <div className="prose">
        <MDXRemote source={post.content} />
      </div>

      <RelatedPosts currentSlug={slug} category={post.meta.category} type="blog" />
    </article>
  );
}
