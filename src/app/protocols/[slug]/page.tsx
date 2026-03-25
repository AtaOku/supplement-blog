import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import protocols from "@/data/protocols.json";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return protocols.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = protocols.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name}'s ${p.protocol} — Scientific Analysis`,
    description: `Independent evidence analysis of ${p.name}'s supplement protocol. ${p.supplements.length} supplements reviewed against peer-reviewed research.`,
    alternates: { canonical: `/protocols/${slug}` },
  };
}

const evidenceColor: Record<string, { bg: string; text: string; ring: string }> = {
  strong: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" },
  moderate: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" },
  limited: { bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200" },
};

export default async function ProtocolDetailPage({ params }: Props) {
  const { slug } = await params;
  const protocol = protocols.find((p) => p.slug === slug);
  if (!protocol) notFound();

  const strongCount = protocol.supplements.filter((s) => s.evidence === "strong").length;
  const moderateCount = protocol.supplements.filter((s) => s.evidence === "moderate").length;
  const totalStudies = protocol.supplements.reduce((acc, s) => acc + s.studyCount, 0);

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <nav className="mb-5 text-sm text-zinc-400">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/protocols" className="hover:text-emerald-600">Protocols</Link>
            <span className="mx-1.5">/</span>
            <span className="text-zinc-900">{protocol.name}</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl">{protocol.image}</span>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
                {protocol.name}&apos;s {protocol.protocol}
              </h1>
              <p className="text-zinc-500 mt-2">{protocol.description}</p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-zinc-50 rounded-lg px-4 py-3 flex-1 min-w-[140px]">
              <div className="text-2xl font-bold text-zinc-900">{protocol.supplements.length}</div>
              <div className="text-xs text-zinc-500">Supplements Analyzed</div>
            </div>
            <div className="bg-emerald-50 rounded-lg px-4 py-3 flex-1 min-w-[140px]">
              <div className="text-2xl font-bold text-emerald-700">{strongCount}</div>
              <div className="text-xs text-emerald-600">Strong Evidence</div>
            </div>
            <div className="bg-amber-50 rounded-lg px-4 py-3 flex-1 min-w-[140px]">
              <div className="text-2xl font-bold text-amber-700">{moderateCount}</div>
              <div className="text-xs text-amber-600">Moderate Evidence</div>
            </div>
            <div className="bg-zinc-50 rounded-lg px-4 py-3 flex-1 min-w-[140px]">
              <div className="text-2xl font-bold text-zinc-900">{totalStudies.toLocaleString()}+</div>
              <div className="text-xs text-zinc-500">Studies Referenced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 space-y-6">
        <div className="prose prose-zinc max-w-none mb-8">
          <p className="text-base text-zinc-600 leading-relaxed">{protocol.intro}</p>
        </div>

        {/* Supplement cards */}
        {protocol.supplements.map((supp, i) => {
          const colors = evidenceColor[supp.evidence] || evidenceColor.limited;
          return (
            <div
              key={i}
              className={`bg-white border border-zinc-200 rounded-xl overflow-hidden ring-1 ${colors.ring}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
                <div>
                  <h3 className="font-semibold text-zinc-900">{supp.name}</h3>
                  <span className="text-xs text-zinc-400">{supp.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-zinc-700">{supp.dose}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                    {supp.evidenceLabel} Evidence
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 py-4 space-y-3">
                {/* Evidence summary */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      What the research says
                    </span>
                    <span className="text-xs text-zinc-400">({supp.studyCount}+ studies)</span>
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
                      PubMed DOI: {supp.doi}
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
              </div>
            </div>
          );
        })}

        {/* Methodology note */}
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
              <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
              <span><strong>Limited</strong> — Mostly animal studies, mechanistic data, or insufficient human trials</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-zinc-100 pt-6">
          <p className="text-xs text-zinc-400 leading-relaxed">
            This analysis is based on peer-reviewed research retrieved from PubMed and the Cochrane Library.
            We are not affiliated with {protocol.name}. This is educational content, not medical advice.
            Always consult a healthcare provider before starting any supplement regimen.
          </p>
        </div>
      </div>
    </>
  );
}
