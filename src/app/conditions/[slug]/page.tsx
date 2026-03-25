import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import conditions from "@/data/conditions.json";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = conditions.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: `Best Supplements for ${c.name} — Evidence Review`,
    description: `Evidence-based supplement guide for ${c.name}. ${c.supplements.length} supplements reviewed against peer-reviewed research. Ranked by clinical evidence strength.`,
    alternates: { canonical: `/conditions/${slug}` },
  };
}

const evidenceColor: Record<string, { bg: string; text: string; ring: string; dot: string }> = {
  strong: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200", dot: "bg-emerald-500" },
  moderate: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200", dot: "bg-amber-500" },
  limited: { bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200", dot: "bg-red-400" },
  emerging: { bg: "bg-orange-50", text: "text-orange-700", ring: "ring-orange-200", dot: "bg-orange-400" },
};

export default async function ConditionDetailPage({ params }: Props) {
  const { slug } = await params;
  const condition = conditions.find((c) => c.slug === slug);
  if (!condition) notFound();

  const strongCount = condition.supplements.filter((s) => s.evidence === "strong").length;
  const moderateCount = condition.supplements.filter((s) => s.evidence === "moderate").length;

  // Sort: strong first, then moderate, then limited/emerging
  const evidenceOrder: Record<string, number> = { strong: 0, moderate: 1, emerging: 2, limited: 3 };
  const sorted = [...condition.supplements].sort(
    (a, b) => (evidenceOrder[a.evidence] ?? 4) - (evidenceOrder[b.evidence] ?? 4)
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <nav className="mb-5 text-sm text-zinc-400">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/conditions" className="hover:text-emerald-600">Conditions</Link>
            <span className="mx-1.5">/</span>
            <span className="text-zinc-900">{condition.name}</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl">{condition.icon}</span>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
                Best Supplements for {condition.name}
              </h1>
              <p className="text-zinc-500 mt-2">{condition.description}</p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-zinc-50 rounded-lg px-4 py-3 flex-1 min-w-[140px]">
              <div className="text-2xl font-bold text-zinc-900">{condition.supplements.length}</div>
              <div className="text-xs text-zinc-500">Supplements Reviewed</div>
            </div>
            <div className="bg-emerald-50 rounded-lg px-4 py-3 flex-1 min-w-[140px]">
              <div className="text-2xl font-bold text-emerald-700">{strongCount}</div>
              <div className="text-xs text-emerald-600">Strong Evidence</div>
            </div>
            <div className="bg-amber-50 rounded-lg px-4 py-3 flex-1 min-w-[140px]">
              <div className="text-2xl font-bold text-amber-700">{moderateCount}</div>
              <div className="text-xs text-amber-600">Moderate Evidence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 space-y-6">

        {/* Intro */}
        <div className="prose prose-zinc max-w-none mb-8">
          <p className="text-base text-zinc-600 leading-relaxed">{condition.intro}</p>
        </div>

        {/* Supplement cards */}
        {sorted.map((supp, i) => {
          const colors = evidenceColor[supp.evidence] ?? evidenceColor.limited;
          return (
            <div
              key={i}
              className={`bg-white border border-zinc-200 rounded-xl overflow-hidden ring-1 ${colors.ring}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${colors.dot} shrink-0`} />
                    <h3 className="font-semibold text-zinc-900">{supp.name}</h3>
                  </div>
                  <span className="text-xs text-zinc-400 ml-5">{supp.dose}</span>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ml-4 ${colors.bg} ${colors.text}`}>
                  {supp.evidence.charAt(0).toUpperCase() + supp.evidence.slice(1)} Evidence
                </span>
              </div>

              {/* Body */}
              <div className="px-5 py-4 space-y-3">
                {/* Evidence summary */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      What the research says
                    </span>
                    {supp.studyCount > 0 && (
                      <span className="text-xs text-zinc-400">({supp.studyCount}+ studies)</span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">{supp.summary}</p>
                </div>

                {/* Concern */}
                {supp.concern && (
                  <div className="bg-zinc-50 rounded-lg px-4 py-3">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
                      ⚠️ Our Take
                    </span>
                    <p className="text-sm text-zinc-600 leading-relaxed">{supp.concern}</p>
                  </div>
                )}

                {/* Citation */}
                {supp.doi && (
                  <div className="pt-2 border-t border-zinc-50">
                    <span className="text-xs text-zinc-400">Source: </span>
                    <a
                      href={`https://doi.org/${supp.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-600 hover:underline"
                    >
                      DOI: {supp.doi}
                    </a>
                    {supp.pmid && (
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${supp.pmid}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-400 hover:text-zinc-600 ml-2"
                      >
                        PMID: {supp.pmid}
                      </a>
                    )}
                  </div>
                )}

                {/* Links to supplement pages */}
                {supp.supplementSlugs && supp.supplementSlugs.length > 0 && (
                  <div className="pt-2 flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-zinc-400">Full evidence profile:</span>
                    {supp.supplementSlugs.map((s) => (
                      <Link
                        key={s}
                        href={`/supplements/${s}`}
                        className="text-xs text-emerald-600 hover:underline font-medium"
                      >
                        View {s.replace(/-/g, " ")} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Evidence methodology */}
        <div className="mt-8 bg-zinc-50 border border-zinc-200 rounded-xl p-6">
          <h3 className="font-semibold text-zinc-900 text-sm mb-2">How We Rate Evidence</h3>
          <div className="space-y-2 text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
              <span><strong>Strong</strong> — Multiple meta-analyses or large RCTs with consistent results</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
              <span><strong>Moderate</strong> — At least one RCT or meta-analysis with promising but limited data</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-400 shrink-0" />
              <span><strong>Emerging</strong> — Small trials or mechanistic data with insufficient replication</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 shrink-0" />
              <span><strong>Limited</strong> — Mostly animal studies, case reports, or failed human trials</span>
            </div>
          </div>
        </div>

        {/* Related conditions */}
        <div>
          <h3 className="font-semibold text-zinc-700 text-sm mb-3">Browse other conditions</h3>
          <div className="flex flex-wrap gap-2">
            {conditions
              .filter((c) => c.slug !== condition.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/conditions/${c.slug}`}
                  className="text-xs text-zinc-500 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  {c.icon} {c.name}
                </Link>
              ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-zinc-100 pt-6">
          <p className="text-xs text-zinc-400 leading-relaxed">
            This analysis is based on peer-reviewed research retrieved from PubMed and the Cochrane Library.
            This is educational content, not medical advice. Always consult a healthcare provider before
            starting any supplement regimen, especially if you have a diagnosed condition or take medications.
          </p>
        </div>
      </div>
    </>
  );
}
