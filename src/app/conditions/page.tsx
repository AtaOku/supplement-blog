import Link from "next/link";
import type { Metadata } from "next";
import conditions from "@/data/conditions.json";

export const metadata: Metadata = {
  title: "Supplements by Health Condition — Evidence-Based Guide",
  description:
    "Find the right supplements for your health goals. Evidence-rated supplement guides for ADHD, chronic fatigue, anxiety, sleep, depression, athletic performance, cardiovascular health, and longevity.",
};

const tagColors: Record<string, string> = {
  blue: "text-blue-600 bg-blue-50",
  amber: "text-amber-600 bg-amber-50",
  purple: "text-purple-600 bg-purple-50",
  emerald: "text-emerald-600 bg-emerald-50",
  red: "text-red-600 bg-red-50",
  orange: "text-orange-600 bg-orange-50",
};

const evidenceLevelCount = (c: (typeof conditions)[0]) => {
  const strong = c.supplements.filter((s) => s.evidence === "strong").length;
  const total = c.supplements.length;
  return { strong, total };
};

export default function ConditionsPage() {
  return (
    <>
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Evidence-Based
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
            Supplements by Condition
          </h1>
          <p className="text-base text-zinc-500 leading-relaxed max-w-xl">
            Not all supplements work for all goals. We map the clinical evidence to specific health
            conditions — so you can find what&apos;s actually studied for your needs.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {conditions.map((c) => {
            const { strong, total } = evidenceLevelCount(c);
            return (
              <Link
                key={c.slug}
                href={`/conditions/${c.slug}`}
                className="group block bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0 mt-0.5">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tagColors[c.tagColor] ?? "text-zinc-600 bg-zinc-100"}`}
                      >
                        {c.tag}
                      </span>
                    </div>
                    <h2 className="font-serif text-lg font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors mb-1">
                      {c.name}
                    </h2>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-3 line-clamp-2">
                      {c.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        {strong} strong evidence
                      </span>
                      <span className="text-zinc-400">{total} supplements reviewed</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 bg-zinc-50 border border-zinc-200 rounded-xl p-6 text-center">
          <p className="text-sm text-zinc-500 mb-2">Missing a condition?</p>
          <p className="text-xs text-zinc-400">
            <a href="/contact" className="text-emerald-600 hover:underline">Send us a request</a> — we add new condition guides based on reader feedback.
          </p>
        </div>
      </div>
    </>
  );
}
