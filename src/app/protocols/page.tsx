import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Famous Supplement Protocols — Scientific Analysis",
  description:
    "Independent scientific analysis of popular supplement protocols by Bryan Johnson, Andrew Huberman, Peter Attia, and more. Evidence ratings for every supplement.",
};

const protocols = [
  {
    slug: "bryan-johnson-blueprint",
    name: "Bryan Johnson",
    protocol: "Blueprint Protocol",
    tag: "Longevity",
    tagColor: "text-purple-600 bg-purple-50",
    supplementCount: 30,
    monthlyEstimate: "$1,500+",
    description:
      "The tech entrepreneur spending $2M/year to reverse aging. We analyze every supplement in his stack against peer-reviewed research.",
    verdict: "High evidence core, experimental edges",
    image: "🧬",
  },
  {
    slug: "andrew-huberman-stack",
    name: "Andrew Huberman",
    protocol: "Daily Supplement Stack",
    tag: "Cognitive Performance",
    tagColor: "text-blue-600 bg-blue-50",
    supplementCount: 15,
    monthlyEstimate: "$200–400",
    description:
      "Stanford neuroscientist's supplement protocol for focus, sleep, and hormonal health. Evidence breakdown for each recommendation.",
    verdict: "Strong evidence, practical doses",
    image: "🧠",
  },
  {
    slug: "peter-attia-longevity",
    name: "Peter Attia",
    protocol: "Longevity Toolkit",
    tag: "Healthspan",
    tagColor: "text-emerald-600 bg-emerald-50",
    supplementCount: 10,
    monthlyEstimate: "$150–250",
    description:
      "The physician behind 'Outlive' takes a conservative, evidence-first approach. We analyze his minimal but targeted supplement selection.",
    verdict: "Conservative, high-confidence picks",
    image: "🏥",
  },
];

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
          {protocols.map((p) => (
            <Link
              key={p.slug}
              href={`/protocols/${p.slug}`}
              className="group block bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-300 transition-colors"
            >
              <div className="flex gap-5">
                <div className="text-4xl shrink-0 mt-1">{p.image}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${p.tagColor}`}>
                      {p.tag}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {p.supplementCount} supplements · {p.monthlyEstimate}/mo
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors mb-1">
                    {p.name}&apos;s {p.protocol}
                  </h2>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-3">
                    {p.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
                      Verdict: {p.verdict}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-zinc-50 border border-zinc-200 rounded-xl p-6 text-center">
          <p className="text-sm text-zinc-500 mb-2">Want us to analyze a protocol?</p>
          <p className="text-xs text-zinc-400">
            Email us at hello@supplementstack.space with the protocol details.
          </p>
        </div>
      </div>
    </>
  );
}
