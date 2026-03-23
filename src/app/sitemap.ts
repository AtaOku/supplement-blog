import { MetadataRoute } from "next";
import { getAllPosts, getAllReviews, getAllCategories } from "@/lib/sanity-queries";
import { BASE_URL } from "@/lib/config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/reviews`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/tools/supplement-stack-builder`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  try {
    const [posts, reviews, categories] = await Promise.all([
      getAllPosts(),
      getAllReviews(),
      getAllCategories(),
    ]);

    const postPages = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const reviewPages = reviews.map((review) => ({
      url: `${BASE_URL}/reviews/${review.slug}`,
      lastModified: review.date ? new Date(review.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    const categoryPages = categories.map((cat) => ({
      url: `${BASE_URL}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticPages, ...categoryPages, ...postPages, ...reviewPages];
  } catch {
    // If Sanity is unavailable during build, return static pages only
    return staticPages;
  }
}
