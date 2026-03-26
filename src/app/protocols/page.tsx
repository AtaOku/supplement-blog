import Link from "next/link";
import type { Metadata } from "next";
import protocols from "@/data/protocols.json";

export const metadata: Metadata = {
  title: "Famous Supplement Protocols — Scientific Analysis",
  description:
    "Independent scientific analysis of popular supplement protocols by Bryan Johnson, Andrew Huberman, Peter Attia, and more. Evidence ratings for every supplement.",
};

const tagColors: Record<string, string> = {
  purple: "text-purple-600 bg-purple-50",
  blue: "text-blue-600 bg-blue-50",
  emerald: "text-emerald-600 bg-emerald-50",
};

export default function ProtocolsPage() {
  return (
    <>
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
              Independent Analysis
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
            Famous Supplement Protocols
          </h1>
          <p className="text-base text-zinc-500 leading-relaxed max-w-xl">
            We take popular supplement protocols from health influencers and run every
            item through peer-reviewed research. No hype — just evidence ratings.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <div className="space-y-4">
          {protocols.map((p) => {
            const strongCount = p.supplements.filter((s) => s.evidence === "strong").length;
            const totalStudies = p.supplements.reduce((acc, s) => acc + s.studyCount, 0);
            return (
              <Link
                key={p.slug}
                href={`/protocols/${p.slug}`}
                className="group block bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-300 transition-colors"
              >
                <div className="flex gap-5">
                  <div className="text-4xl shrink-0 mt-1">{p.image}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tagColors[p.tagColor] || "text-zinc-600 bg-zinc-100"}`}>
                        {p.tag}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {p.supplements.length} supplements · {p.monthlyEstimate}/mo
                      </span>
                    </div>
                    <h2 className="font-serif text-xl font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors mb-1">
                      {p.name}&apos;s {p.protocol}
                    </h2>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-3">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        {strongCount} strong evidence
                      </span>
                      <span className="text-xs text-zinc-400">
                        {totalStudies.toLocaleString()}+ studies cited
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 bg-zinc-50 border border-zinc-200 rounded-xl p-6 text-center">
          <p className="text-sm text-zinc-500 mb-2">Want us to analyze a protocol?</p>
          <p className="text-xs text-zinc-400">
            <a href="/contact" className="text-emerald-600 hover:underline">Send us the details</a> and we&apos;ll run the evidence analysis.
          </p>
        </div>
      </div>
    </>
  );
}
