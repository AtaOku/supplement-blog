import { MetadataRoute } from "next";
import { getAllArticles, getAllCategories } from "@/lib/notion-queries";
import { BASE_URL } from "@/lib/config";
import protocols from "@/data/protocols.json";
import conditions from "@/data/conditions.json";
import supplements from "@/data/supplements.json";

export const revalidate = 3600;

// Static JSON data was last updated 2026-03-25 — update this when data files change
const DATA_LAST_MODIFIED = new Date("2026-03-25");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const protocolPages = protocols.map((p) => ({
    url: `${BASE_URL}/protocols/${p.slug}`,
    lastModified: DATA_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const conditionPages = conditions.map((c) => ({
    url: `${BASE_URL}/conditions/${c.slug}`,
    lastModified: DATA_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const supplementPages = supplements.map((s) => ({
    url: `${BASE_URL}/supplements/${s.slug}`,
    lastModified: DATA_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/research`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/supplements`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/conditions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/protocols`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/supplement-stack-builder`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE_URL}/tools/interaction-checker`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE_URL}/tools/dosage-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE_URL}/tools/protocol-builder`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE_URL}/methodology`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    ...protocolPages,
    ...conditionPages,
    ...supplementPages,
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
