import { client } from "@/sanity/client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FAQ {
  question: string;
  answer: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
  readingTime: string;
  published: boolean;
  lang: string;
  categorySlug?: string;
  faqs?: FAQ[];
}

export interface ReviewMeta extends PostMeta {
  productName: string;
  rating: number;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  price?: string;
  brand?: string;
}

export interface SanityCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

// Raw Sanity portable text block (simplified)
type Block = { _type: string; children?: { text?: string }[] };

function extractText(blocks: Block[]): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .join(" ");
}

function calcReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins} min read`;
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export async function getAllCategories(): Promise<SanityCategory[]> {
  return client.fetch(
    `*[_type == "category"] | order(name asc) { _id, name, "slug": slug.current, description }`
  );
}

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------

const POST_FIELDS = `
  _id,
  "slug": slug.current,
  title,
  description,
  "date": coalesce(publishedAt, _createdAt),
  "category": category->{ name, "slug": slug.current },
  tags,
  published,
  lang,
  body,
  markdownBody,
  faqs
`;

function mapPost(raw: Record<string, unknown>): PostMeta & { body?: Block[]; markdownBody?: string } {
  const bodyText =
    typeof raw.markdownBody === "string"
      ? raw.markdownBody
      : extractText((raw.body as Block[]) ?? []);

  return {
    slug: raw.slug as string,
    title: raw.title as string,
    description: (raw.description as string) ?? "",
    date: raw.date ? String(raw.date).slice(0, 10) : "",
    category: (raw.category as { name: string } | null)?.name ?? "",
    categorySlug: (raw.category as { slug: string } | null)?.slug ?? "",
    tags: (raw.tags as string[]) ?? [],
    readingTime: calcReadingTime(bodyText),
    published: (raw.published as boolean) !== false,
    lang: (raw.lang as string) ?? "en",
    faqs: (raw.faqs as FAQ[]) ?? undefined,
    body: raw.body as Block[],
    markdownBody: raw.markdownBody as string | undefined,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const raw: Record<string, unknown>[] = await client.fetch(
    `*[_type == "post" && lang != "tr" && published == true] | order(date desc) { ${POST_FIELDS} }`
  );
  return raw.map(mapPost);
}

export async function getPostBySlug(slug: string) {
  const raw: Record<string, unknown> | null = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS} }`,
    { slug }
  );
  if (!raw) return null;
  return mapPost(raw);
}

export async function getPostsByCategory(categorySlug: string): Promise<PostMeta[]> {
  const raw: Record<string, unknown>[] = await client.fetch(
    `*[_type == "post" && lang != "tr" && published == true && category->slug.current == $categorySlug] | order(date desc) { ${POST_FIELDS} }`,
    { categorySlug }
  );
  return raw.map(mapPost);
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

const REVIEW_FIELDS = `
  _id,
  "slug": slug.current,
  title,
  description,
  "date": coalesce(publishedAt, _createdAt),
  "category": category->{ name, "slug": slug.current },
  tags,
  published,
  lang,
  productName,
  brand,
  rating,
  price,
  affiliateUrl,
  pros,
  cons,
  body,
  markdownBody,
  faqs
`;

function mapReview(raw: Record<string, unknown>): ReviewMeta & { body?: Block[]; markdownBody?: string } {
  const bodyText =
    typeof raw.markdownBody === "string"
      ? raw.markdownBody
      : extractText((raw.body as Block[]) ?? []);

  return {
    slug: raw.slug as string,
    title: raw.title as string,
    description: (raw.description as string) ?? "",
    date: raw.date ? String(raw.date).slice(0, 10) : "",
    category: (raw.category as { name: string } | null)?.name ?? "",
    categorySlug: (raw.category as { slug: string } | null)?.slug ?? "",
    tags: (raw.tags as string[]) ?? [],
    readingTime: calcReadingTime(bodyText),
    published: (raw.published as boolean) !== false,
    lang: (raw.lang as string) ?? "en",
    faqs: (raw.faqs as FAQ[]) ?? undefined,
    productName: (raw.productName as string) ?? "",
    brand: raw.brand as string | undefined,
    rating: (raw.rating as number) ?? 0,
    price: raw.price as string | undefined,
    affiliateUrl: (raw.affiliateUrl as string) ?? "",
    pros: (raw.pros as string[]) ?? [],
    cons: (raw.cons as string[]) ?? [],
    body: raw.body as Block[],
    markdownBody: raw.markdownBody as string | undefined,
  };
}

export async function getAllReviews(): Promise<ReviewMeta[]> {
  const raw: Record<string, unknown>[] = await client.fetch(
    `*[_type == "review" && lang != "tr" && published == true] | order(date desc) { ${REVIEW_FIELDS} }`
  );
  return raw.map(mapReview);
}

export async function getReviewBySlug(slug: string) {
  const raw: Record<string, unknown> | null = await client.fetch(
    `*[_type == "review" && slug.current == $slug][0] { ${REVIEW_FIELDS} }`,
    { slug }
  );
  if (!raw) return null;
  return mapReview(raw);
}

export async function getReviewsByCategory(categorySlug: string): Promise<ReviewMeta[]> {
  const raw: Record<string, unknown>[] = await client.fetch(
    `*[_type == "review" && lang != "tr" && published == true && category->slug.current == $categorySlug] | order(date desc) { ${REVIEW_FIELDS} }`,
    { categorySlug }
  );
  return raw.map(mapReview);
}
