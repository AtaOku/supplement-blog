import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content");

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

function getFiles(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter((file) => file.endsWith(".mdx"));
}

export function getAllPosts(): PostMeta[] {
  const files = getFiles("blog");
  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const filePath = path.join(contentDirectory, "blog", file);
      const source = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(source);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        category: data.category || "",
        tags: data.tags || [],
        image: data.image,
        readingTime: stats.text,
        published: data.published !== false,
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(contentDirectory, "blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  const stats = readingTime(content);

  return {
    meta: {
      slug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      category: data.category || "",
      tags: data.tags || [],
      image: data.image,
      readingTime: stats.text,
      published: data.published !== false,
    } as PostMeta,
    content,
  };
}

export function getAllReviews(): ReviewMeta[] {
  const files = getFiles("reviews");
  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const filePath = path.join(contentDirectory, "reviews", file);
      const source = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(source);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        category: data.category || "",
        tags: data.tags || [],
        image: data.image,
        readingTime: stats.text,
        published: data.published !== false,
        productName: data.productName || "",
        rating: data.rating || 0,
        pros: data.pros || [],
        cons: data.cons || [],
        affiliateUrl: data.affiliateUrl || "",
        price: data.price,
        brand: data.brand,
      };
    })
    .filter((review) => review.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getReviewBySlug(slug: string) {
  const filePath = path.join(contentDirectory, "reviews", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  const stats = readingTime(content);

  return {
    meta: {
      slug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      category: data.category || "",
      tags: data.tags || [],
      image: data.image,
      readingTime: stats.text,
      published: data.published !== false,
      productName: data.productName || "",
      rating: data.rating || 0,
      pros: data.pros || [],
      cons: data.cons || [],
      affiliateUrl: data.affiliateUrl || "",
      price: data.price,
      brand: data.brand,
    } as ReviewMeta,
    content,
  };
}

export function getCategories(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const reviews = getAllReviews();
  const all = [...posts, ...reviews];
  const categoryMap = new Map<string, number>();

  all.forEach((item) => {
    if (item.category) {
      categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + 1);
    }
  });

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getReviewsByCategory(category: string): ReviewMeta[] {
  return getAllReviews().filter(
    (review) => review.category.toLowerCase() === category.toLowerCase()
  );
}
