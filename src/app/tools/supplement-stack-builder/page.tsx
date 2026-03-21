import type { Metadata } from "next";
import StackBuilderClient from "./StackBuilderClient";

export const metadata: Metadata = {
  title: "Free Supplement Stack Builder — Find Your Perfect Stack",
  description:
    "Answer 2 quick questions and get a science-backed supplement stack tailored to your goal and experience level. Free tool, no email required.",
  openGraph: {
    title: "Free Supplement Stack Builder",
    description:
      "Get a personalized supplement stack in 30 seconds. Science-backed recommendations for energy, longevity, muscle, or general health.",
  },
};

export default function StackBuilderPage() {
  return (
    <main className="min-h-[100dvh] bg-zinc-50">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="mb-12">
          <p className="text-sm font-medium text-emerald-600 mb-3 tracking-wide">Free Tool</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none text-zinc-900 mb-4">
            Supplement Stack Builder
          </h1>
          <p className="text-base text-zinc-500 leading-relaxed max-w-[55ch]">
            Answer 2 questions. Get a science-backed supplement stack tailored to
            your goal and experience level — no email required.
          </p>
        </div>
        <StackBuilderClient />
      </div>
    </main>
  );
}
