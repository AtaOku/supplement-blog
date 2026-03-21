"use client";

import type { ReactNode } from "react";

export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div
      className={`animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export function HoverLift({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`transition-transform duration-200 hover:-translate-y-0.5 ${className}`}>
      {children}
    </div>
  );
}
