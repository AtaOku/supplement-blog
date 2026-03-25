import type { Metadata } from "next";
import Link from "next/link";
import supplements from "@/data/supplements.json";

export const metadata: Metadata = {
  title: "Supplement Database — Evidence-Based Profiles",
  description:
    "Browse our database of supplements with evidence grades, dosing guidance, safety profiles, and interaction data. Every claim backed by clinical research.",
};

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

function topEvidence(effects: typeof supplements[0]["effects"]) {
  const order = ["strong", "moderate", "emerging", "insufficient"];
  return [...effects].sort((a, b) => order.indexOf(a.level) - order.indexOf(b.level))[0];
}

export default function SupplementsPage() {
  return (
    <>
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
            Supplement Database
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed">
            Evidence profiles for {supplements.length} supplements. Each entry includes
            clinical evidence grades, dosing guidance, safety data, and known interactions.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supplements.map((s) => {
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
        </div>
      </section>
    </>
  );
}
