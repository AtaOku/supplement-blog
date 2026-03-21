"use client";

import { ArrowSquareOut } from "@phosphor-icons/react";

interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
  productName?: string;
  className?: string;
}

export default function AffiliateLink({
  href,
  children,
  productName,
  className = "",
}: AffiliateLinkProps) {
  const handleClick = () => {
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as Record<string, Function>).gtag("event", "affiliate_click", {
        event_category: "affiliate",
        event_label: productName || href,
        transport_type: "beacon",
      });
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className={`inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 ${className}`}
      onClick={handleClick}
    >
      {children}
      <ArrowSquareOut size={16} weight="bold" />
    </a>
  );
}
