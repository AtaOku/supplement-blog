import { getAllArticles } from "@/lib/notion-queries";
import { BASE_URL, SITE_NAME, SCIENTIFIC_REVIEW_TYPE } from "@/lib/config";

export const revalidate = 3600;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getAllArticles().catch(() => []);

  const items = articles
    .slice(0, 50)
    .map((a) => {
      const path = a.type === SCIENTIFIC_REVIEW_TYPE ? "research" : "blog";
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${BASE_URL}/${path}/${a.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/${path}/${a.slug}</guid>
      <description>${escapeXml(a.description)}</description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <category>${escapeXml(a.category)}</category>
      <dc:creator>${escapeXml(a.author)}</dc:creator>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${BASE_URL}</link>
    <description>Unbiased, science-based supplement reviews, comparisons, and guides.</description>
    <language>en</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
