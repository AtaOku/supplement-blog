"use client";

import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-zinc-900">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-3 text-zinc-900">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-2 text-zinc-900">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold mt-4 mb-2 text-zinc-800">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-zinc-700">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-4 my-6 italic text-zinc-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1 text-zinc-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1 text-zinc-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-zinc-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-800">{children}</code>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        rel="nofollow noopener noreferrer"
        target="_blank"
        className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700"
      >
        {children}
      </a>
    ),
  },
};

import type { TypedObject } from "@portabletext/types";

export default function PortableTextRenderer({ value }: { value: TypedObject[] }) {
  return (
    <div className="prose prose-zinc max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
