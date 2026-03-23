import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "lang", title: "Language", type: "string", options: { list: ["en", "tr"] }, initialValue: "en" }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: true }),
    defineField({ name: "markdownBody", title: "Markdown Body (Legacy)", type: "text", description: "For migrated MDX content. New posts should use Body (block editor) above." }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Question" },
            { name: "answer", type: "text", title: "Answer" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", lang: "lang", published: "published" },
    prepare({ title, lang, published }) {
      return { title, subtitle: `${lang?.toUpperCase()} • ${published ? "✓" : "Draft"}` };
    },
  },
});
