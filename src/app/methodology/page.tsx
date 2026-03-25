import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Research Process — How We Evaluate Supplements",
  description:
    "Learn how Supplement Guide analyzes scientific evidence. Our transparent methodology covers study selection, evidence grading, and how we translate complex research into clear guidance.",
};

const steps = [
  {
    number: "01",
    title: "Literature Search",
    description:
      "We search PubMed, Cochrane Library, and major journals for randomized controlled trials, systematic reviews, and meta-analyses on each supplement.",
    detail: "We prioritize human clinical trials over animal or in-vitro studies. Observational data is noted but weighted lower.",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconColor: "text-blue-500",
  },
  {
    number: "02",
    title: "Study Quality Assessment",
    description:
      "Each study is evaluated for sample size, methodology, funding source, and potential bias. Industry-funded studies are flagged and weighed accordingly.",
    detail: "We look for double-blind, placebo-controlled designs with adequate sample sizes (n > 30 for most outcomes).",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    iconColor: "text-purple-500",
  },
  {
    number: "03",
    title: "Evidence Synthesis",
    description:
      "We combine findings across multiple studies to form a complete picture. A single study — no matter how impressive — is never the whole story.",
    detail: "Meta-analyses and systematic reviews carry the most weight, followed by large RCTs, then smaller trials.",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    iconColor: "text-emerald-500",
  },
  {
    number: "04",
    title: "Plain Language Translation",
    description:
      "Complex statistical findings are translated into clear, actionable guidance. We tell you what the evidence supports, what it doesn't, and where uncertainty remains.",
    detail: "Every claim links back to its source. We never overstate results or hide limitations.",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconColor: "text-amber-500",
  },
  {
    number: "05",
    title: "Ongoing Updates",
    description:
      "Science evolves. We monitor new publications and update our content when significant new evidence emerges. Every article shows its last update date.",
    detail: "Major updates are noted in the article. We don't silently change conclusions.",
    color: "bg-rose-50 border-rose-200 text-rose-700",
    iconColor: "text-rose-500",
  },
];

const principles = [
  {
    title: "No Affiliate Influence",
    description: "Our evaluations are never influenced by product sales or affiliate relationships. We assess the compound, not the brand.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Transparency Over Authority",
    description: "We show our reasoning, not just our conclusions. If the evidence is mixed, we say so. If we're uncertain, we say that too.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Science for Everyone",
    description: "Other sites write for scientists. We write for people who want to make informed decisions about their health without needing a PhD.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Limitations Disclosed",
    description: "Supplements are not medicine. We clearly state when evidence is preliminary, when studies have limitations, and when you should talk to a doctor.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
];

const evidenceLevels = [
  {
    level: "Strong",
    color: "bg-emerald-500",
    textColor: "text-emerald-700",
    bgColor: "bg-emerald-50",
    description: "Multiple large RCTs or meta-analyses with consistent results",
    example: "Creatine for strength, Vitamin D for bone health in deficient populations",
  },
  {
    level: "Moderate",
    color: "bg-amber-500",
    textColor: "text-amber-700",
    bgColor: "bg-amber-50",
    description: "Some RCTs with positive results, but more research needed",
    example: "Ashwagandha for cortisol reduction, Omega-3 for depression (EPA-predominant)",
  },
  {
    level: "Emerging",
    color: "bg-orange-500",
    textColor: "text-orange-700",
    bgColor: "bg-orange-50",
    description: "Preliminary evidence from small trials or animal studies",
    example: "NMN for longevity, Magnesium L-Threonate for cognitive function",
  },
  {
    level: "Insufficient",
    color: "bg-zinc-400",
    textColor: "text-zinc-600",
    bgColor: "bg-zinc-50",
    description: "Not enough quality evidence to draw conclusions",
    example: "Many social media supplement trends without clinical backing",
  },
];

export default function MethodologyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-gray-900">Our Research Process</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-6">
            How We Evaluate Supplements
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed max-w-2xl">
            Every article on this site follows a structured research process.
            We believe you deserve to know not just <em>what</em> we conclude,
            but <em>how</em> we get there.
          </p>
        </div>
      </section>

      {/* How we're different */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="font-serif text-2xl font-semibold text-zinc-900 mb-3">
            What Makes Us Different
          </h2>
          <p className="text-zinc-500 mb-10 leading-relaxed">
            Most supplement sites exist to sell you something. We exist to help you
            understand what science actually says — in language you can use.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="border border-zinc-200 rounded-xl p-6 hover:border-zinc-300 transition-colors"
              >
                <div className="text-emerald-600 mb-3">{principle.icon}</div>
                <h3 className="font-semibold text-zinc-900 mb-2">{principle.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Process Steps */}
      <section className="py-16 md:py-20 bg-white border-y border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="font-serif text-2xl font-semibold text-zinc-900 mb-10">
            Our 5-Step Process
          </h2>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                <div className={`border rounded-xl p-6 ${step.color}`}>
                  <div className="flex items-start gap-4">
                    <span className={`text-2xl font-bold ${step.iconColor} opacity-60 shrink-0`}>
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-semibold text-zinc-900 text-lg mb-2">{step.title}</h3>
                      <p className="text-zinc-600 leading-relaxed mb-2">{step.description}</p>
                      <p className="text-sm text-zinc-500 italic">{step.detail}</p>
                    </div>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-1">
                    <svg className="w-5 h-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Levels */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="font-serif text-2xl font-semibold text-zinc-900 mb-3">
            How We Grade Evidence
          </h2>
          <p className="text-zinc-500 mb-10 leading-relaxed">
            Not all evidence is equal. We use a four-tier system to help you
            understand how confident science is about each claim.
          </p>

          <div className="space-y-4">
            {evidenceLevels.map((level) => (
              <div key={level.level} className={`${level.bgColor} rounded-xl p-5 border border-transparent`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${level.color}`} />
                  <h3 className={`font-semibold ${level.textColor}`}>{level.level}</h3>
                </div>
                <p className="text-sm text-zinc-600 mb-1">{level.description}</p>
                <p className="text-xs text-zinc-400">Examples: {level.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-2xl font-semibold text-zinc-900 mb-4">
            Ready to Read the Evidence?
          </h2>
          <p className="text-zinc-500 mb-8">
            Every article follows this process. Start exploring.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/blog"
              className="bg-zinc-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-zinc-800 transition-all"
            >
              Browse Articles
            </Link>
            <Link
              href="/about"
              className="border border-zinc-200 text-zinc-700 px-6 py-3 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-all"
            >
              Meet the Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
