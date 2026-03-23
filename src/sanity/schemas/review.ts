import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Product Review",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "productName", title: "Product Name", type: "string" }),
    defineField({ name: "brand", title: "Brand", type: "string" }),
    defineField({ name: "rating", title: "Rating (0-5)", type: "number", validation: (r) => r.min(0).max(5) }),
    defineField({ name: "price", title: "Price", type: "string" }),
    defineField({
      name: "affiliateUrl",
      title: "Affiliate URL",
      type: "url",
      description: "Amazon / iHerb / DoNotAge affiliate link",
    }),
    defineField({ name: "pros", title: "Pros", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "cons", title: "Cons", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "markdownBody", title: "Markdown Body (Legacy)", type: "text", description: "For migrated MDX content. New reviews should use Body (block editor) above." }),
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
    select: { title: "productName", rating: "rating", lang: "lang" },
    prepare({ title, rating, lang }) {
      return { title, subtitle: `${lang?.toUpperCase()} • ★ ${rating}` };
    },
  },
});
