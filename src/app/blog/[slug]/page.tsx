import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/sanity-queries";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";
import { getBlogHreflang } from "@/lib/hreflang";
import RelatedPosts from "@/components/RelatedPosts";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import type { Metadata } from "next";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const hreflang = getBlogHreflang(slug);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: hreflang.canonical,
      languages: hreflang.languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const bodyText = post.markdownBody ?? "";
  const wordCount = bodyText.split(/\s+/).length;

  const jsonLd = articleJsonLd({
    title: post.title,
    description: post.description,
    date: post.date,
    wordCount,
    slug,
  });

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ]);

  const categorySlug = post.categorySlug ?? post.category.toLowerCase().replace(/ /g, "-");

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
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(post.faqs)) }}
        />
      )}

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-green-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/blog" className="hover:text-green-600">Blog</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate max-w-xs">{post.title}</li>
        </ol>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={`/category/${categorySlug}`}
            className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full hover:bg-green-100"
          >
            {post.category}
          </Link>
          <span className="text-sm text-gray-500">{post.readingTime}</span>
          <time className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-gray-600">{post.description}</p>
        <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm shrink-0">
            RH
          </div>
          <div>
            <Link href="/about" className="text-sm font-medium text-gray-900 hover:text-green-600">
              Ryan Holt
            </Link>
            <p className="text-xs text-gray-500">Lead Science Writer · Sports Science · Longevity Biology</p>
          </div>
        </div>
      </div>

      {/* Render: markdownBody (legacy MDX) or body (Portable Text) */}
      {post.markdownBody ? (
        <div className="prose">
          <MDXRemote source={post.markdownBody} />
        </div>
      ) : post.body && post.body.length > 0 ? (
        <PortableTextRenderer value={post.body as import("@portabletext/types").TypedObject[]} />
      ) : null}

      <RelatedPosts currentSlug={slug} category={post.category} type="blog" />
    </article>
  );
}
