import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import supplementsData from "@/data/supplements.json";
import interactionsData from "@/data/interactions.json";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return supplementsData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = supplementsData.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.name} — Evidence Profile, Dosing & Safety`,
    description: s.description,
    alternates: { canonical: `/supplements/${slug}` },
  };
}

const levelConfig: Record<string, { color: string; bg: string; label: string }> = {
  strong: { color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", label: "Strong Evidence" },
  moderate: { color: "text-amber-700", bg: "bg-amber-50 border-amber-200", label: "Moderate Evidence" },
  emerging: { color: "text-orange-700", bg: "bg-orange-50 border-orange-200", label: "Emerging Evidence" },
  limited: { color: "text-red-700", bg: "bg-red-50 border-red-200", label: "Limited Evidence" },
  insufficient: { color: "text-zinc-600", bg: "bg-zinc-50 border-zinc-200", label: "Insufficient Evidence" },
};

const dotColor: Record<string, string> = {
  strong: "bg-emerald-500",
  moderate: "bg-amber-500",
  emerging: "bg-orange-400",
  limited: "bg-red-400",
  insufficient: "bg-zinc-400",
};

export default async function SupplementPage({ params }: Props) {
  const { slug } = await params;
  const s = supplementsData.find((x) => x.slug === slug);
  if (!s) notFound();

  const interactions = interactionsData.filter((i) => i.pair.includes(s.id));
  const totalStudies = s.effects.reduce((sum, e) => sum + e.studies, 0);
  const totalParticipants = s.effects.reduce((sum, e) => sum + e.participants, 0);

  const typeIcon: Record<string, string> = {
    synergy: "🟢",
    caution: "🟡",
    avoid: "🔴",
    timing: "🔵",
  };

  return (
    <>
      {/* Header */}
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <nav className="mb-5 text-sm text-zinc-400">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/supplements" className="hover:text-emerald-600">Supplements</Link>
            <span className="mx-1.5">/</span>
            <span className="text-zinc-900">{s.name}</span>
          </nav>

          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{s.category}</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mt-1 mb-4">
            {s.name}
          </h1>
          <p className="text-base text-zinc-500 leading-relaxed max-w-2xl mb-6">{s.description}</p>

          {/* Research Snapshot */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5">
              <span className="text-zinc-400 text-xs block">Studies Referenced</span>
              <span className="text-zinc-900 font-semibold text-lg">{totalStudies}+</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5">
              <span className="text-zinc-400 text-xs block">Total Participants</span>
              <span className="text-zinc-900 font-semibold text-lg">{totalParticipants.toLocaleString()}+</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5">
              <span className="text-zinc-400 text-xs block">Outcomes Evaluated</span>
              <span className="text-zinc-900 font-semibold text-lg">{s.effects.length}</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5">
              <span className="text-zinc-400 text-xs block">Known Interactions</span>
              <span className="text-zinc-900 font-semibold text-lg">{interactions.length}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 space-y-12">

        {/* Evidence by Outcome */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-zinc-900 mb-6">Evidence by Outcome</h2>
          <div className="space-y-3">
            {s.effects.map((e) => {
              const cfg = levelConfig[e.level] ?? levelConfig.insufficient;
              return (
                <div key={e.area} className={`border rounded-xl p-5 ${cfg.bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-3 h-3 rounded-full ${dotColor[e.level] ?? dotColor.insufficient}`} />
                      <h3 className="font-semibold text-zinc-900">{e.area}</h3>
                    </div>
                    <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  <p className="text-sm text-zinc-600 mb-2">{e.effectSize}</p>
                  <div className="flex gap-4 text-xs text-zinc-400">
                    {e.studies > 0 && <span>{e.studies} studies</span>}
                    {e.participants > 0 && <span>{e.participants.toLocaleString()} participants</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Dosing */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-zinc-900 mb-6">Dosing Guide</h2>
          <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Standard Dose</span>
                <p className="text-lg font-semibold text-zinc-900 mt-0.5">{s.dosing.standard}</p>
              </div>
              {s.dosing.perKg && (
                <div>
                  <span className="text-xs text-zinc-400 uppercase tracking-wider">Per kg Body Weight</span>
                  <p className="text-lg font-semibold text-zinc-900 mt-0.5">{s.dosing.perKg} mg/kg</p>
                </div>
              )}
            </div>
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-wider">Timing</span>
              <p className="text-sm text-zinc-600 mt-0.5">{s.dosing.timing}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${s.dosing.withFood ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"}`}>
                {s.dosing.withFood ? "Take with food" : "Can take on empty stomach"}
              </span>
            </div>
            {s.dosing.notes && (
              <p className="text-sm text-zinc-500 italic border-t border-zinc-100 pt-3">{s.dosing.notes}</p>
            )}
          </div>
        </section>

        {/* Safety */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-zinc-900 mb-6">Safety Profile</h2>
          <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 uppercase tracking-wider">Overall Safety:</span>
              <span className="text-sm font-semibold text-zinc-900">{s.safety.rating}</span>
            </div>

            {s.safety.sideEffects.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-zinc-700 mb-2">Possible Side Effects</h3>
                <ul className="space-y-1">
                  {s.safety.sideEffects.map((se) => (
                    <li key={se} className="text-sm text-zinc-500 flex items-start gap-2">
                      <span className="text-amber-500 mt-1 shrink-0">•</span> {se}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {s.safety.contraindications.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-zinc-700 mb-2">Contraindications</h3>
                <ul className="space-y-1">
                  {s.safety.contraindications.map((c) => (
                    <li key={c} className="text-sm text-zinc-500 flex items-start gap-2">
                      <span className="text-red-500 mt-1 shrink-0">⚠</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t border-zinc-100 pt-3">
              <span className="text-xs text-zinc-400">Upper Limit: </span>
              <span className="text-sm text-zinc-600">{s.safety.upperLimit}</span>
            </div>
          </div>
        </section>

        {/* Interactions */}
        {interactions.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl font-semibold text-zinc-900 mb-6">Known Interactions</h2>
            <div className="space-y-3">
              {interactions.map((inter, i) => {
                const otherId = inter.pair.find((p) => p !== s.id) || "";
                const other = supplementsData.find((x) => x.id === otherId);
                return (
                  <div key={i} className="bg-white border border-zinc-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">{typeIcon[inter.type] || "⚪"}</span>
                      <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">{inter.type}</span>
                      {other && (
                        <Link href={`/supplements/${other.slug}`} className="text-sm font-semibold text-emerald-600 hover:underline ml-1">
                          + {other.name}
                        </Link>
                      )}
                    </div>
                    <p className="text-sm text-zinc-600">{inter.description}</p>
                    <p className="text-xs text-zinc-400 mt-2">Source: {inter.source}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Related Articles */}
        {s.relatedArticles.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl font-semibold text-zinc-900 mb-4">Related Articles</h2>
            <div className="flex flex-wrap gap-2">
              {s.relatedArticles.map((slug) => (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors"
                >
                  {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="border-t border-zinc-100 pt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/tools/interaction-checker" className="bg-zinc-900 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-zinc-800 transition-all text-center">
            Check Interactions
          </Link>
          <Link href="/tools/dosage-calculator" className="border border-zinc-200 text-zinc-700 px-5 py-3 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-all text-center">
            Calculate Your Dose
          </Link>
          <Link href="/supplements" className="border border-zinc-200 text-zinc-700 px-5 py-3 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-all text-center">
            ← All Supplements
          </Link>
        </div>
      </div>
    </>
  );
}
