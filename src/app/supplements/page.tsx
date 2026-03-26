import type { Metadata } from "next";
import supplements from "@/data/supplements.json";
import SupplementsGrid from "./SupplementsGrid";

export const metadata: Metadata = {
  title: "Supplement Database — Evidence-Based Profiles",
  description:
    "Browse our database of supplements with evidence grades, dosing guidance, safety profiles, and interaction data. Every claim backed by clinical research.",
};

export default function SupplementsPage() {
  return (
    <>
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
            Supplement Database
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed">
            Evidence profiles for {supplements.length} supplements. Each entry includes
            clinical evidence grades, dosing guidance, safety data, and known interactions.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <SupplementsGrid />
        </div>
      </section>
    </>
  );
}
