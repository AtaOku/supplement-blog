import { MetadataRoute } from "next";
import { getAllPosts, getAllReviews } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://supplementrehberi.com"; // TODO: Update with actual domain

  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const reviews = getAllReviews().map((review) => ({
    url: `${baseUrl}/urun-inceleme/${review.slug}`,
    lastModified: new Date(review.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categories = ["mitokondri", "longevity", "protein", "kreatin", "vitamin", "pre-workout", "amino-asit", "saglik"];
  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/kategori/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/urun-inceleme`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...categoryPages,
    ...posts,
    ...reviews,
  ];
}
