import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Supplement Tools — Interaction Checker, Protocol Builder & More",
  description:
    "Free evidence-based supplement tools: interaction checker, dosage calculator, protocol builder, and stack builder. No signup required.",
};

const tools = [
  {
    slug: "/tools/interaction-checker",
    name: "Interaction Checker",
    description: "Check for interactions between supplements, medications, and nutrients.",
    icon: "⚡",
    status: "Live",
  },
  {
    slug: "/tools/protocol-builder",
    name: "Protocol Builder",
    description: "Build a personalized daily supplement schedule with optimal timing and cycling.",
    icon: "📋",
    status: "Live",
  },
  {
    slug: "/tools/dosage-calculator",
    name: "Dosage Calculator",
    description: "Find evidence-based dosages adjusted for your body weight and goals.",
    icon: "⚖️",
    status: "Live",
  },
  {
    slug: "/tools/supplement-stack-builder",
    name: "Stack Builder",
    description: "Build a supplement stack for your specific goal — longevity, performance, or recovery.",
    icon: "🏗️",
    status: "Live",
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
            Free Supplement Tools
          </h1>
          <p className="text-base text-zinc-500 leading-relaxed max-w-xl">
            Evidence-based tools to help you make better supplement decisions.
            No signup, no paywall — just useful utilities.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.slug}
              className="group bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-300 transition-colors"
            >
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h2 className="font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors mb-1.5">
                {tool.name}
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
