import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY || "placeholder",
});

export const n2m = new NotionToMarkdown({ notionClient: notion });

export const ARTICLES_DB = process.env.NOTION_ARTICLES_DB!;
export const CATEGORIES_DB = process.env.NOTION_CATEGORIES_DB!;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Extract plain text from a Notion rich text array */
export function richTextToPlain(
  rt: { plain_text: string }[] | undefined
): string {
  if (!rt || !Array.isArray(rt)) return "";
  return rt.map((t) => t.plain_text).join("");
}

/** Extract a select value */
export function selectValue(
  prop: { select?: { name: string } | null } | undefined
): string {
  return prop?.select?.name ?? "";
}

/** Extract multi-select values */
export function multiSelectValues(
  prop: { multi_select?: { name: string }[] } | undefined
): string[] {
  return prop?.multi_select?.map((s) => s.name) ?? [];
}

/** Extract a date value */
export function dateValue(
  prop: { date?: { start: string } | null } | undefined
): string {
  return prop?.date?.start ?? "";
}

/** Extract checkbox value */
export function checkboxValue(
  prop: { checkbox?: boolean } | undefined
): boolean {
  return prop?.checkbox ?? false;
}

/** Proxy Notion S3 image URLs through our API route to avoid 1-hour expiry */
export function proxyImageUrl(url: string): string {
  if (!url) return "";
  // Only proxy Notion S3 URLs
  if (
    url.includes("s3.us-west-2.amazonaws.com") ||
    url.includes("prod-files-secure")
  ) {
    return `/api/notion-image?url=${encodeURIComponent(url)}`;
  }
  return url;
}
