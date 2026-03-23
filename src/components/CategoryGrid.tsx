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

const categoryIcons: Record<string, Icon> = {
  mitokondri: Atom,
  longevity: Timer,
  protein: Lightning,
  kreatin: Fire,
  vitamin: Heartbeat,
  "pre-workout": Pill,
  "amino-asit": Dna,
  saglik: ShieldCheck,
};

interface Category {
  slug: string;
  name: string;
  description?: string;
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {categories.map((cat, i) => {
        const IconComponent = categoryIcons[cat.slug] || Atom;
        const isFeatured = i < 2;
        return (
          <FadeIn key={cat.slug} delay={i * 0.04} className={isFeatured ? "md:col-span-2" : ""}>
            <Link
              href={`/category/${cat.slug}`}
              className={`block rounded-2xl border border-zinc-200/80 bg-white hover:border-emerald-300 transition-all group ${isFeatured ? "p-7" : "p-5"}`}
            >
              <IconComponent
                size={isFeatured ? 32 : 24}
                weight="duotone"
                className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform"
              />
              <h3 className={`font-semibold text-zinc-900 mb-1 ${isFeatured ? "text-base" : "text-sm"}`}>{cat.name}</h3>
              <p className={`text-zinc-400 leading-relaxed ${isFeatured ? "text-sm" : "text-xs"}`}>{cat.description}</p>
            </Link>
          </FadeIn>
        );
      })}
    </div>
  );
}
