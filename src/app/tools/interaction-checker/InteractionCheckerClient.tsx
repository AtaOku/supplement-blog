"use client";

import { useState } from "react";
import Link from "next/link";
import supplementsData from "@/data/supplements.json";
import interactionsData from "@/data/interactions.json";

const typeConfig: Record<string, { emoji: string; label: string; color: string; bg: string }> = {
  synergy: { emoji: "🟢", label: "Synergy", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  caution: { emoji: "🟡", label: "Caution", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  avoid: { emoji: "🔴", label: "Avoid", color: "text-red-700", bg: "bg-red-50 border-red-200" },
  timing: { emoji: "🔵", label: "Timing", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
};

export default function InteractionCheckerClient() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 10 ? [...prev, id] : prev
    );
  }

  const found = interactionsData.filter(
    (i) => i.pair.every((p) => selected.includes(p))
  );

  const synergies = found.filter((i) => i.type === "synergy");
  const cautions = found.filter((i) => i.type === "caution");
  const avoids = found.filter((i) => i.type === "avoid");
  const timings = found.filter((i) => i.type === "timing");

  return (
    <>
      {/* Header */}
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <nav className="mb-5 text-sm text-zinc-400">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-zinc-900">Interaction Checker</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
            Supplement Interaction Checker
          </h1>
          <p className="text-base text-zinc-500 leading-relaxed max-w-xl">
            Select the supplements in your stack to check for synergies,
            cautions, and timing conflicts. Select 2–10 supplements.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 space-y-10">
        {/* Supplement Picker */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Select Your Supplements ({selected.length}/10)
          </h2>
          <div className="flex flex-wrap gap-2">
            {supplementsData.map((s) => {
              const active = selected.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    active
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* Results */}
        {selected.length >= 2 && (
          <section className="space-y-6">
            <h2 className="font-serif text-2xl font-semibold text-zinc-900">
              Results — {found.length} interaction{found.length !== 1 ? "s" : ""} found
            </h2>

            {found.length === 0 && (
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 text-center">
                <p className="text-zinc-500">No known interactions between your selected supplements.</p>
                <p className="text-xs text-zinc-400 mt-2">This doesn&apos;t mean interactions don&apos;t exist — only that none are documented in our database.</p>
              </div>
            )}

            {avoids.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-3">⚠ Avoid Combinations</h3>
                {avoids.map((inter, i) => (
                  <InteractionCard key={i} inter={inter} />
                ))}
              </div>
            )}

            {cautions.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">Cautions</h3>
                <div className="space-y-2">
                  {cautions.map((inter, i) => (
                    <InteractionCard key={i} inter={inter} />
                  ))}
                </div>
              </div>
            )}

            {timings.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Timing Notes</h3>
                <div className="space-y-2">
                  {timings.map((inter, i) => (
                    <InteractionCard key={i} inter={inter} />
                  ))}
                </div>
              </div>
            )}

            {synergies.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">Synergies</h3>
                <div className="space-y-2">
                  {synergies.map((inter, i) => (
                    <InteractionCard key={i} inter={inter} />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {selected.length < 2 && selected.length > 0 && (
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 text-center">
            <p className="text-zinc-500">Select at least 2 supplements to check interactions.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="border-t border-zinc-100 pt-6">
          <p className="text-xs text-zinc-400 leading-relaxed">
            This tool provides general information based on published research and is not medical advice.
            Always consult a healthcare professional before starting new supplements, especially if you
            take medications or have health conditions. Our database covers common interactions but may
            not be exhaustive.
          </p>
        </div>
      </div>
    </>
  );
}

function InteractionCard({ inter }: { inter: typeof interactionsData[0] }) {
  const cfg = typeConfig[inter.type] || typeConfig.caution;
  const names = inter.pair.map((id) => {
    const s = supplementsData.find((x) => x.id === id);
    return s?.name || id;
  });

  return (
    <div className={`border rounded-xl p-4 ${cfg.bg}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <span>{cfg.emoji}</span>
        <span className="text-sm font-semibold text-zinc-900">{names.join(" + ")}</span>
        <span className={`text-xs font-medium ml-auto ${cfg.color}`}>{cfg.label}</span>
      </div>
      <p className="text-sm text-zinc-600">{inter.description}</p>
      <p className="text-xs text-zinc-400 mt-1.5">Source: {inter.source}</p>
    </div>
  );
}
