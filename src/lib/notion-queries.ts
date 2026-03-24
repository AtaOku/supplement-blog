import {
  notion,
  n2m,
  ARTICLES_DB,
  CATEGORIES_DB,
  richTextToPlain,
  selectValue,
  multiSelectValues,
  dateValue,
  checkboxValue,
} from "./notion";

// ---------------------------------------------------------------------------
// Types (same interface as before for easy migration)
// ---------------------------------------------------------------------------

export interface ArticleMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  categorySlug: string;
  tags: string[];
  type: string;
  author: string;
  readingTime: string;
  featured: boolean;
  lang: string;
}

export interface ArticleFull extends ArticleMeta {
  markdownContent: string;
}

export interface CategoryMeta {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function calcReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins} min read`;
}

function categoryToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapArticle(page: any): ArticleMeta {
  const props = page.properties;
  const category = selectValue(props.Category);

  return {
    id: page.id,
    slug: richTextToPlain(props.Slug?.rich_text),
    title: richTextToPlain(props.Title?.title),
    description: richTextToPlain(props.Description?.rich_text),
    date: dateValue(props["Published Date"]),
    category,
    categorySlug: categoryToSlug(category),
    tags: multiSelectValues(props.Tags),
    type: selectValue(props.Type),
    author: richTextToPlain(props.Author?.rich_text) || "Ryan Holt",
    readingTime: "5 min read", // placeholder, updated when content is fetched
    featured: checkboxValue(props.Featured),
    lang: selectValue(props.Language) || "en",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCategory(page: any): CategoryMeta {
  const props = page.properties;
  return {
    id: page.id,
    name: richTextToPlain(props.Name?.title),
    slug: richTextToPlain(props.Slug?.rich_text),
    description: richTextToPlain(props.Description?.rich_text),
    icon: richTextToPlain(props.Icon?.rich_text),
  };
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export async function getAllArticles(): Promise<ArticleMeta[]> {
  try {
    const response = await notion.databases.query({
      database_id: ARTICLES_DB,
      filter: {
        and: [
          { property: "Status", select: { equals: "Published" } },
          { property: "Language", select: { equals: "en" } },
        ],
      },
      sorts: [{ property: "Published Date", direction: "descending" }],
    });

    return response.results.map(mapArticle);
  } catch {
    return [];
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleFull | null> {
  try {
    const response = await notion.databases.query({
      database_id: ARTICLES_DB,
      filter: {
        and: [
          { property: "Slug", rich_text: { equals: slug } },
          { property: "Status", select: { equals: "Published" } },
        ],
      },
      page_size: 1,
    });

    if (response.results.length === 0) return null;

    const page = response.results[0];
    const meta = mapArticle(page);

    // Fetch page content as markdown
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const markdownContent = n2m.toMarkdownString(mdBlocks).parent;

    return {
      ...meta,
      readingTime: calcReadingTime(markdownContent),
      markdownContent,
    };
  } catch {
    return null;
  }
}

export async function getArticlesByCategory(
  categorySlug: string
): Promise<ArticleMeta[]> {
  try {
    const categories = await getAllCategories();
    const cat = categories.find((c) => c.slug === categorySlug);
    if (!cat) return [];

    const response = await notion.databases.query({
      database_id: ARTICLES_DB,
      filter: {
        and: [
          { property: "Status", select: { equals: "Published" } },
          { property: "Language", select: { equals: "en" } },
          { property: "Category", select: { equals: cat.name } },
        ],
      },
      sorts: [{ property: "Published Date", direction: "descending" }],
    });

    return response.results.map(mapArticle);
  } catch {
    return [];
  }
}

export async function getAllCategories(): Promise<CategoryMeta[]> {
  try {
    const response = await notion.databases.query({
      database_id: CATEGORIES_DB,
      sorts: [{ property: "Name", direction: "ascending" }],
    });

    return response.results.map(mapCategory);
  } catch {
    return [];
  }
}
