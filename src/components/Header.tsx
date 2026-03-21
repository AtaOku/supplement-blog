"use client";

import Link from "next/link";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { navigation } from "@/lib/config";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-zinc-50/80 backdrop-blur-xl border-b border-zinc-200/60">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold tracking-tight text-emerald-600">Supplement</span>
            <span className="text-lg font-light tracking-tight text-zinc-900">Guide</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 -mr-2 text-zinc-600 hover:text-zinc-900 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-zinc-200/60 bg-zinc-50/95 backdrop-blur-xl animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {[{ name: "Home", href: "/" }, ...navigation].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
