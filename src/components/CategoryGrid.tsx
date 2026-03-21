"use client";

import Link from "next/link";
import {
  Lightning,
  Heartbeat,
  Pill,
  Fire,
  Dna,
  ShieldCheck,
  Timer,
  Atom,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { FadeIn } from "@/components/MotionWrapper";

const categories: { name: string; slug: string; icon: Icon; description: string }[] = [
  { name: "Mitochondria", slug: "mitokondri", icon: Atom, description: "CoQ10, NAD+, PQQ, taurine" },
  { name: "Longevity", slug: "longevity", icon: Timer, description: "NMN, resveratrol, anti-aging" },
  { name: "Protein", slug: "protein", icon: Lightning, description: "Whey, casein, vegan protein" },
  { name: "Creatine", slug: "kreatin", icon: Fire, description: "Performance and strength" },
  { name: "Vitamins", slug: "vitamin", icon: Heartbeat, description: "D3, B12, multivitamin" },
  { name: "Pre-Workout", slug: "pre-workout", icon: Pill, description: "Pre-training supplements" },
  { name: "Amino Acids", slug: "amino-asit", icon: Dna, description: "BCAA, EAA, glutamine" },
  { name: "Health", slug: "saglik", icon: ShieldCheck, description: "Omega-3, probiotics, minerals" },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {categories.map((cat, i) => {
        const Icon = cat.icon;
        return (
          <FadeIn key={cat.slug} delay={i * 0.04}>
            <Link
              href={`/kategori/${cat.slug}`}
              className="block p-5 rounded-2xl border border-zinc-200/80 bg-white hover:border-emerald-300 transition-all group"
            >
              <Icon
                size={24}
                weight="duotone"
                className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform"
              />
              <h3 className="font-semibold text-zinc-900 text-sm mb-1">{cat.name}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{cat.description}</p>
            </Link>
          </FadeIn>
        );
      })}
    </div>
  );
}
