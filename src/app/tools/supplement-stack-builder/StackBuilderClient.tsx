"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lightning,
  Timer,
  Trophy,
  Heart,
  ArrowRight,
  CheckCircle,
  Copy,
  Check,
} from "@phosphor-icons/react";

type Goal = "energy" | "longevity" | "muscle" | "health";
type Level = "beginner" | "intermediate" | "advanced";

interface SupplementItem {
  name: string;
  dose: string;
  note: string;
  link: string;
  priority: "essential" | "recommended" | "advanced";
}

const goals: { id: Goal; label: string; description: string; icon: React.ElementType }[] = [
  {
    id: "energy",
    label: "Energy & Focus",
    description: "Boost mental clarity and sustained energy",
    icon: Lightning,
  },
  {
    id: "longevity",
    label: "Longevity & Anti-Aging",
    description: "Support healthspan and cellular repair",
    icon: Timer,
  },
  {
    id: "muscle",
    label: "Muscle & Performance",
    description: "Build strength and optimize recovery",
    icon: Trophy,
  },
  {
    id: "health",
    label: "General Health",
    description: "Evidence-based daily wellness foundation",
    icon: Heart,
  },
];

const levels: { id: Level; label: string; description: string }[] = [
  {
    id: "beginner",
    label: "Beginner",
    description: "New to supplementation, start simple",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    description: "Taking a few basics, ready to optimize",
  },
  {
    id: "advanced",
    label: "Advanced",
    description: "Experienced, want the full protocol",
  },
];

const stacks: Record<Goal, Record<Level, SupplementItem[]>> = {
  energy: {
    beginner: [
      {
        name: "Magnesium Glycinate",
        dose: "300–400 mg at night",
        note: "Improves sleep quality, which is the #1 energy lever",
        link: "/supplements/vitamin-d3",
        priority: "essential",
      },
      {
        name: "Vitamin B12",
        dose: "1,000 mcg/day (methylcobalamin)",
        note: "Energy metabolism and nervous system function",
        link: "/supplements/vitamin-d3",
        priority: "essential",
      },
      {
        name: "Vitamin D3 + K2",
        dose: "2,000–4,000 IU D3/day with food",
        note: "Fatigue, mood, and immune — most people are deficient",
        link: "/supplements/vitamin-d3",
        priority: "essential",
      },
    ],
    intermediate: [
      {
        name: "CoQ10 (Ubiquinol form)",
        dose: "100–200 mg/day with fat",
        note: "Mitochondrial ATP production — the cellular battery",
        link: "/supplements/coq10",
        priority: "essential",
      },
      {
        name: "ALCAR (Acetyl-L-Carnitine)",
        dose: "500–1,000 mg on empty stomach",
        note: "Transports fatty acids into mitochondria for fuel",
        link: "/supplements",
        priority: "essential",
      },
      {
        name: "Magnesium L-Threonate",
        dose: "145 mg elemental Mg, twice daily",
        note: "Crosses blood-brain barrier; cognitive energy specifically",
        link: "/supplements/vitamin-d3",
        priority: "recommended",
      },
      {
        name: "Vitamin D3 + K2",
        dose: "4,000 IU D3/day",
        note: "Foundational — test your levels if possible",
        link: "/supplements/vitamin-d3",
        priority: "recommended",
      },
    ],
    advanced: [
      {
        name: "NMN (Nicotinamide Mononucleotide)",
        dose: "250–500 mg in the morning",
        note: "Direct NAD+ precursor — powers 500+ cellular reactions",
        link: "/supplements/nmn",
        priority: "essential",
      },
      {
        name: "CoQ10 (Ubiquinol)",
        dose: "200–300 mg/day with fat",
        note: "Electron transport chain cofactor; stacks with NMN",
        link: "/supplements/coq10",
        priority: "essential",
      },
      {
        name: "ALCAR",
        dose: "1,000 mg/day fasted",
        note: "Mitochondrial substrate + focus",
        link: "/supplements",
        priority: "essential",
      },
      {
        name: "PQQ",
        dose: "10–20 mg/day",
        note: "Triggers mitochondrial biogenesis (creates new mitochondria)",
        link: "/supplements/coq10",
        priority: "recommended",
      },
      {
        name: "Alpha Lipoic Acid (R-ALA)",
        dose: "300 mg/day with food",
        note: "Recycles other antioxidants; energy cofactor",
        link: "/supplements",
        priority: "advanced",
      },
    ],
  },
  longevity: {
    beginner: [
      {
        name: "Omega-3 (EPA/DHA)",
        dose: "2–3 g/day EPA+DHA combined",
        note: "Reduces chronic inflammation — the root of aging",
        link: "/supplements",
        priority: "essential",
      },
      {
        name: "Vitamin D3 + K2",
        dose: "4,000 IU D3 + 100 mcg K2/day",
        note: "Immune regulation, bone, and cardiovascular health",
        link: "/supplements/vitamin-d3",
        priority: "essential",
      },
      {
        name: "Magnesium Glycinate",
        dose: "400 mg at night",
        note: "Over 300 enzymatic reactions; sleep quality critical for repair",
        link: "/supplements/vitamin-d3",
        priority: "essential",
      },
    ],
    intermediate: [
      {
        name: "NMN or NR",
        dose: "250–500 mg/day in the morning",
        note: "NAD+ declines 50% by age 50 — direct replenishment",
        link: "/supplements/nmn",
        priority: "essential",
      },
      {
        name: "Resveratrol",
        dose: "250–500 mg/day with fat",
        note: "Sirtuin activator; must be taken with fat to absorb",
        link: "/conditions/longevity",
        priority: "essential",
      },
      {
        name: "CoQ10 (Ubiquinol)",
        dose: "100–200 mg/day with fat",
        note: "Mitochondrial protection; declines with age",
        link: "/supplements/coq10",
        priority: "essential",
      },
      {
        name: "Omega-3",
        dose: "2–3 g EPA+DHA/day",
        note: "Anti-inflammatory foundation",
        link: "/supplements",
        priority: "recommended",
      },
    ],
    advanced: [
      {
        name: "NMN",
        dose: "500 mg/day (morning, sublingual if possible)",
        note: "Supports DNA repair, circadian rhythm, and mitochondria",
        link: "/supplements/nmn",
        priority: "essential",
      },
      {
        name: "Taurine",
        dose: "2–3 g/day",
        note: "2023 Science study: taurine loss drives aging in mammals",
        link: "/supplements/taurine",
        priority: "essential",
      },
      {
        name: "Resveratrol + Quercetin",
        dose: "500 mg resveratrol + 500 mg quercetin with fat",
        note: "Senolytic stack: clears damaged cells that accelerate aging",
        link: "/conditions/longevity",
        priority: "essential",
      },
      {
        name: "CoQ10 (Ubiquinol)",
        dose: "200–400 mg/day",
        note: "Electron transport chain protection",
        link: "/supplements/coq10",
        priority: "recommended",
      },
      {
        name: "Spermidine",
        dose: "1–5 mg/day",
        note: "Induces autophagy — cellular garbage collection",
        link: "/conditions/longevity",
        priority: "advanced",
      },
    ],
  },
  muscle: {
    beginner: [
      {
        name: "Creatine Monohydrate",
        dose: "5 g/day (no loading needed)",
        note: "Most-studied ergogenic ever. Works for 80% of people.",
        link: "/supplements/creatine",
        priority: "essential",
      },
      {
        name: "Whey Protein",
        dose: "20–30 g post-workout",
        note: "Complete amino acid profile; fastest-digesting protein",
        link: "/supplements/whey-protein",
        priority: "essential",
      },
      {
        name: "Vitamin D3",
        dose: "2,000–4,000 IU/day",
        note: "Testosterone production and muscle fiber function",
        link: "/supplements/vitamin-d3",
        priority: "recommended",
      },
    ],
    intermediate: [
      {
        name: "Creatine Monohydrate",
        dose: "5 g/day consistently",
        note: "Non-negotiable foundation for any muscle-building stack",
        link: "/supplements/creatine",
        priority: "essential",
      },
      {
        name: "Whey + Casein Protein",
        dose: "Whey post-workout; casein before bed",
        note: "Whey for fast MPS, casein for overnight muscle repair",
        link: "/supplements/whey-protein",
        priority: "essential",
      },
      {
        name: "Beta-Alanine",
        dose: "3.2 g/day (split doses to reduce tingling)",
        note: "Raises muscle carnosine; delays fatigue on sets 8–15+ reps",
        link: "/supplements",
        priority: "recommended",
      },
      {
        name: "Magnesium Glycinate",
        dose: "300–400 mg at night",
        note: "Sleep quality = muscle growth; also reduces cortisol",
        link: "/supplements/vitamin-d3",
        priority: "recommended",
      },
    ],
    advanced: [
      {
        name: "Creatine Monohydrate",
        dose: "5 g/day",
        note: "The foundation that never changes",
        link: "/supplements/creatine",
        priority: "essential",
      },
      {
        name: "EAA (Essential Amino Acids)",
        dose: "10–20 g intra-workout",
        note: "All 9 EAAs for maximal MPS signaling during training",
        link: "/supplements",
        priority: "essential",
      },
      {
        name: "Beta-Alanine",
        dose: "3.2–6.4 g/day",
        note: "Carnosine buffering for high-volume training",
        link: "/supplements",
        priority: "recommended",
      },
      {
        name: "Ashwagandha KSM-66",
        dose: "600 mg/day with food",
        note: "Reduces cortisol, supports testosterone, improves recovery",
        link: "/supplements",
        priority: "recommended",
      },
      {
        name: "Zinc + Magnesium (ZMA)",
        dose: "As directed, on empty stomach before bed",
        note: "Hormonal optimization; most athletes are zinc-deficient",
        link: "/supplements/vitamin-d3",
        priority: "advanced",
      },
    ],
  },
  health: {
    beginner: [
      {
        name: "Vitamin D3 + K2",
        dose: "2,000–4,000 IU D3 + 100 mcg K2/day",
        note: "40–70% of people are deficient; affects immunity, mood, sleep",
        link: "/supplements/vitamin-d3",
        priority: "essential",
      },
      {
        name: "Omega-3 (EPA/DHA)",
        dose: "1–2 g EPA+DHA/day",
        note: "Brain, heart, joints, and inflammation — the universal foundation",
        link: "/supplements",
        priority: "essential",
      },
      {
        name: "Magnesium Glycinate",
        dose: "300–400 mg at night",
        note: "Most impactful single supplement for modern life: sleep + stress",
        link: "/supplements/vitamin-d3",
        priority: "essential",
      },
    ],
    intermediate: [
      {
        name: "Vitamin D3 + K2",
        dose: "4,000 IU D3/day",
        note: "Test your 25-OH-D levels; aim for 50–80 ng/mL",
        link: "/supplements/vitamin-d3",
        priority: "essential",
      },
      {
        name: "Omega-3",
        dose: "2–3 g EPA+DHA/day",
        note: "Higher dose for meaningful anti-inflammatory effect",
        link: "/supplements",
        priority: "essential",
      },
      {
        name: "Magnesium L-Threonate",
        dose: "145 mg elemental, twice daily",
        note: "Crosses blood-brain barrier; cognitive and sleep benefits",
        link: "/supplements/vitamin-d3",
        priority: "essential",
      },
      {
        name: "Probiotic (multi-strain)",
        dose: "10–50 billion CFU/day",
        note: "Gut health affects immunity, mood, inflammation — it all connects",
        link: "/supplements",
        priority: "recommended",
      },
    ],
    advanced: [
      {
        name: "Vitamin D3 + K2",
        dose: "5,000 IU D3/day (with annual blood test)",
        note: "Optimized immune and hormone function",
        link: "/supplements/vitamin-d3",
        priority: "essential",
      },
      {
        name: "Omega-3",
        dose: "3–4 g EPA+DHA/day",
        note: "High-dose anti-inflammatory protocol",
        link: "/supplements",
        priority: "essential",
      },
      {
        name: "Magnesium L-Threonate",
        dose: "145 mg 3x/day",
        note: "Full neurological optimization",
        link: "/supplements/vitamin-d3",
        priority: "essential",
      },
      {
        name: "Lion's Mane Mushroom",
        dose: "500–1,000 mg/day",
        note: "Nerve Growth Factor — brain health and neuroplasticity",
        link: "/supplements",
        priority: "recommended",
      },
      {
        name: "Berberine",
        dose: "500 mg 2–3x/day with meals",
        note: "Metabolic health, blood sugar regulation, gut microbiome",
        link: "/supplements",
        priority: "advanced",
      },
    ],
  },
};

const priorityLabel: Record<SupplementItem["priority"], string> = {
  essential: "Essential",
  recommended: "Recommended",
  advanced: "Advanced",
};

const priorityColor: Record<SupplementItem["priority"], string> = {
  essential: "text-emerald-700 bg-emerald-50",
  recommended: "text-blue-700 bg-blue-50",
  advanced: "text-violet-700 bg-violet-50",
};

export default function StackBuilderClient() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [copied, setCopied] = useState(false);

  const result = goal && level ? stacks[goal][level] : null;
  const goalData = goals.find((g) => g.id === goal);
  const levelData = levels.find((l) => l.id === level);

  const handleCopy = () => {
    if (!result || !goalData || !levelData) return;
    const text = [
      `My ${goalData.label} supplement stack (${levelData.label} level):`,
      "",
      ...result.map((s, i) => `${i + 1}. ${s.name} — ${s.dose}\n   ${s.note}`),
      "",
      `Built with the free Supplement Stack Builder: https://supplementstack.space/tools/supplement-stack-builder`,
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const reset = () => {
    setStep(1);
    setGoal(null);
    setLevel(null);
  };

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                step >= s
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-100 text-zinc-400"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`h-px w-8 transition-colors ${
                  step > s ? "bg-emerald-600" : "bg-zinc-200"
                }`}
              />
            )}
          </div>
        ))}
        <span className="ml-3 text-sm text-zinc-400">
          {step === 1 && "Select your goal"}
          {step === 2 && "Select experience level"}
          {step === 3 && "Your personalized stack"}
        </span>
      </div>

      {/* Step 1: Goal */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold text-zinc-900 mb-6 tracking-tight">
            What is your primary goal?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {goals.map(({ id, label, description, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setGoal(id);
                  setStep(2);
                }}
                className="text-left p-5 rounded-2xl border border-zinc-200/80 bg-white hover:border-emerald-300 active:scale-[0.98] transition-all group"
              >
                <Icon
                  size={24}
                  weight="duotone"
                  className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform"
                />
                <div className="font-semibold text-zinc-900 text-sm mb-1">{label}</div>
                <div className="text-xs text-zinc-400 leading-relaxed">{description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Level */}
      {step === 2 && (
        <div className="animate-fade-in">
          <button
            onClick={() => setStep(1)}
            className="text-sm text-zinc-400 hover:text-zinc-600 mb-6 transition-colors"
          >
            ← Back
          </button>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2 tracking-tight">
            What is your experience level?
          </h2>
          <p className="text-sm text-zinc-400 mb-6">
            Goal: <span className="text-zinc-700 font-medium">{goalData?.label}</span>
          </p>
          <div className="flex flex-col gap-3">
            {levels.map(({ id, label, description }) => (
              <button
                key={id}
                onClick={() => {
                  setLevel(id);
                  setStep(3);
                }}
                className="text-left p-5 rounded-2xl border border-zinc-200/80 bg-white hover:border-emerald-300 active:scale-[0.98] transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-semibold text-zinc-900 text-sm mb-0.5">{label}</div>
                  <div className="text-xs text-zinc-400">{description}</div>
                </div>
                <ArrowRight
                  size={18}
                  className="text-zinc-300 group-hover:text-emerald-500 transition-colors flex-shrink-0"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && result && goalData && levelData && (
        <div className="animate-fade-in">
          <button
            onClick={() => setStep(2)}
            className="text-sm text-zinc-400 hover:text-zinc-600 mb-6 transition-colors"
          >
            ← Back
          </button>

          <div className="flex items-start justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">
                Your {goalData.label} Stack
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                {levelData.label} level · {result.length} supplements
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 border border-zinc-200 px-3 py-2 rounded-lg hover:border-zinc-300 active:scale-[0.98] transition-all flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy stack
                </>
              )}
            </button>
          </div>

          <div className="space-y-3 mb-10">
            {result.map((item, i) => (
              <div
                key={item.name}
                className="p-5 rounded-2xl border border-zinc-200/80 bg-white"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-semibold text-zinc-300 w-5">{i + 1}</span>
                    <Link
                      href={item.link}
                      className="font-semibold text-zinc-900 hover:text-emerald-600 transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${priorityColor[item.priority]}`}
                  >
                    {priorityLabel[item.priority]}
                  </span>
                </div>
                <div className="ml-7">
                  <p className="text-xs font-medium text-zinc-500 mb-1">{item.dose}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-xl bg-zinc-100 mb-8">
            <p className="text-xs text-zinc-500 leading-relaxed">
              <span className="font-medium text-zinc-600">Note:</span> These recommendations are
              for informational purposes only. Consult a healthcare provider before starting any
              supplement protocol, especially if you take medications or have health conditions.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/blog"
              className="flex-1 text-center bg-zinc-900 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-zinc-800 active:scale-[0.98] transition-all"
            >
              Read the research behind each supplement
            </Link>
            <button
              onClick={reset}
              className="flex-1 text-center border border-zinc-200 text-zinc-700 px-5 py-3 rounded-xl text-sm font-medium hover:bg-zinc-50 active:scale-[0.98] transition-all"
            >
              Build another stack
            </button>
          </div>

          {/* Social share prompt */}
          <div className="mt-8 p-5 rounded-2xl border border-emerald-100 bg-emerald-50/50">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} weight="fill" className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-zinc-900 mb-1">
                  Found this useful? Share it.
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Post your stack on Reddit (r/Supplements, r/nootropics, r/longevity) or share
                  the link with friends. The tool is free forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
