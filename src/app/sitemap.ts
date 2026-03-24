import { MetadataRoute } from "next";
import { getAllArticles, getAllCategories } from "@/lib/notion-queries";
import { BASE_URL } from "@/lib/config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/research`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/tools/supplement-stack-builder`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  try {
    const [articles, categories] = await Promise.all([
      getAllArticles(),
      getAllCategories(),
    ]);

    const articlePages = articles.map((a) => ({
      url: `${BASE_URL}/${a.type === "Scientific Review" ? "research" : "blog"}/${a.slug}`,
      lastModified: a.date ? new Date(a.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const categoryPages = categories.map((cat) => ({
      url: `${BASE_URL}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticPages, ...categoryPages, ...articlePages];
  } catch {
    return staticPages;
  }
}
