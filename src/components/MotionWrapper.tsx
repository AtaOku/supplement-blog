"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Make visible immediately if already in viewport or after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000 + 50);

    const el = ref.current;
    if (!el) return () => clearTimeout(timer);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
          clearTimeout(timer);
        }
      },
      { threshold: 0.05, rootMargin: "50px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
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
