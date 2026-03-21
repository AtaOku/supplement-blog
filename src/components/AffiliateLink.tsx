"use client";

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
    // Track affiliate click
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
      className={`inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors ${className}`}
      onClick={handleClick}
    >
      {children}
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </a>
  );
}
