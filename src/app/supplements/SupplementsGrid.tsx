"use client";

import { useState } from "react";
import Link from "next/link";
import supplements from "@/data/supplements.json";

const levelColor: Record<string, string> = {
  strong: "bg-emerald-500",
  moderate: "bg-amber-500",
  emerging: "bg-orange-400",
  insufficient: "bg-zinc-400",
};

const levelLabel: Record<string, string> = {
  strong: "Strong",
  moderate: "Moderate",
  emerging: "Emerging",
  insufficient: "Insufficient",
};

const categories = Array.from(new Set(supplements.map((s) => s.category)));

function topEvidence(effects: typeof supplements[0]["effects"]) {
  const order = ["strong", "moderate", "emerging", "insufficient"];
  return [...effects].sort((a, b) => order.indexOf(a.level) - order.indexOf(b.level))[0];
}

export default function SupplementsGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const filtered = supplements.filter((s) => {
    const matchesQuery =
      !query ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = !category || s.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search supplements..."
          className="flex-1 px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-zinc-400 text-center py-12">
          No supplements found for &ldquo;{query}&rdquo;
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => {
            const top = topEvidence(s.effects);
            const totalStudies = s.effects.reduce((sum, e) => sum + e.studies, 0);
            return (
              <Link
                key={s.id}
                href={`/supplements/${s.slug}`}
                className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    {s.category}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full text-white ${levelColor[top.level]}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    {levelLabel[top.level]}
                  </span>
                </div>
                <h2 className="font-serif text-lg font-semibold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {s.name}
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed mb-4 flex-1 line-clamp-2">
                  {s.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-zinc-400 pt-3 border-t border-zinc-100">
                  <span>{totalStudies}+ studies</span>
                  <span>{s.effects.length} outcomes</span>
                  <span>{s.dosing.standard}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
