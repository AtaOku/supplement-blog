"use client";

import { useState } from "react";
import Link from "next/link";
import supplementsData from "@/data/supplements.json";

export default function DosageCalculatorClient() {
  const [selectedId, setSelectedId] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");

  const supplement = supplementsData.find((s) => s.id === selectedId);
  const weightKg = unit === "kg" ? Number(weight) : Number(weight) * 0.4536;
  const hasInput = supplement && weightKg > 0;

  function calcDose() {
    if (!supplement || weightKg <= 0) return null;
    const d = supplement.dosing;
    const perKgDose = d.perKg ? Math.round(weightKg * d.perKg * 1000) / 1000 : null;
    return { standard: d.standard, perKg: perKgDose, timing: d.timing, withFood: d.withFood, notes: d.notes };
  }

  const result = hasInput ? calcDose() : null;

  return (
    <>
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <nav className="mb-5 text-sm text-zinc-400">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-zinc-900">Dosage Calculator</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
            Dosage Calculator
          </h1>
          <p className="text-base text-zinc-500 leading-relaxed max-w-xl">
            Select a supplement and enter your weight for personalized dosing guidance
            based on clinical research.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 space-y-8">
        {/* Inputs */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Supplement</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-900 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            >
              <option value="">Select a supplement...</option>
              {supplementsData.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Body Weight</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === "kg" ? "70" : "154"}
                min={0}
                className="flex-1 border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <div className="flex rounded-lg border border-zinc-200 overflow-hidden">
                <button
                  onClick={() => setUnit("kg")}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${unit === "kg" ? "bg-zinc-900 text-white" : "bg-white text-zinc-600 hover:bg-zinc-50"}`}
                >
                  kg
                </button>
                <button
                  onClick={() => setUnit("lbs")}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${unit === "lbs" ? "bg-zinc-900 text-white" : "bg-white text-zinc-600 hover:bg-zinc-50"}`}
                >
                  lbs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        {result && supplement && (
          <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-5">
            <h2 className="font-serif text-xl font-semibold text-zinc-900">
              Your {supplement.name} Dosing
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <span className="text-xs text-emerald-600 uppercase tracking-wider font-medium">Standard Dose</span>
                <p className="text-2xl font-bold text-emerald-800 mt-1">{result.standard}</p>
              </div>
              {result.perKg && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <span className="text-xs text-blue-600 uppercase tracking-wider font-medium">Weight-Based ({weightKg.toFixed(0)}kg)</span>
                  <p className="text-2xl font-bold text-blue-800 mt-1">{result.perKg}g/day</p>
                </div>
              )}
            </div>

            {/* Loading dose for creatine */}
            {supplement.id === "creatine" && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <span className="text-xs text-purple-600 uppercase tracking-wider font-medium">Optional Loading Phase</span>
                <p className="text-lg font-bold text-purple-800 mt-1">
                  {Math.round(weightKg * 0.3)}g/day for 5-7 days
                </p>
                <p className="text-xs text-purple-600 mt-1">Split into 4 servings of {Math.round(weightKg * 0.3 / 4)}g throughout the day</p>
              </div>
            )}

            {/* Caffeine performance dose */}
            {supplement.id === "caffeine" && result.perKg && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <span className="text-xs text-orange-600 uppercase tracking-wider font-medium">Performance Dose (3-6 mg/kg)</span>
                <p className="text-lg font-bold text-orange-800 mt-1">
                  {Math.round(weightKg * 3)}–{Math.round(weightKg * 6)}mg
                </p>
                <p className="text-xs text-orange-600 mt-1">30-60 minutes before exercise. Start low if caffeine-sensitive.</p>
              </div>
            )}

            {/* Protein per serving */}
            {supplement.id === "protein-whey" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <span className="text-xs text-green-600 uppercase tracking-wider font-medium">Per-Serving Target</span>
                <p className="text-lg font-bold text-green-800 mt-1">
                  {Math.round(weightKg * 0.4)}g per meal/serving
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Daily target: {Math.round(weightKg * 1.6)}–{Math.round(weightKg * 2.2)}g total protein (1.6-2.2g/kg)
                </p>
              </div>
            )}

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Timing:</span>
                <span className="text-zinc-700">{result.timing}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${result.withFood ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"}`}>
                  {result.withFood ? "✓ Take with food" : "Can take on empty stomach"}
                </span>
              </div>
            </div>

            {result.notes && (
              <p className="text-sm text-zinc-500 italic border-t border-zinc-100 pt-4">{result.notes}</p>
            )}

            <div className="flex gap-2 pt-2">
              <Link
                href={`/supplements/${supplement.slug}`}
                className="text-sm text-emerald-600 hover:underline"
              >
                View full {supplement.name} evidence profile →
              </Link>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="border-t border-zinc-100 pt-6">
          <p className="text-xs text-zinc-400 leading-relaxed">
            Dosing recommendations are based on published clinical research and general guidelines.
            Individual needs vary. Consult a healthcare professional before starting any supplement,
            especially if you take medications or have health conditions.
          </p>
        </div>
      </div>
    </>
  );
}
