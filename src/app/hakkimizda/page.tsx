import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Supplement Guide — our mission and methodology.",
  alternates: { canonical: "/hakkimizda" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-zinc-900 mb-6 tracking-tight">About</h1>

      <div className="prose">
        <p>
          Supplement Guide is an independent platform producing unbiased, science-based
          content about the supplement industry. Our goal is to help consumers make
          informed supplement choices.
        </p>

        <h2>Our Mission</h2>
        <p>
          The supplement market is full of misleading information and exaggerated marketing.
          We produce unbiased reviews and guides based on scientific research.
        </p>

        <h2>How We Work</h2>
        <ul>
          <li>We review each product in detail</li>
          <li>We reference scientific studies</li>
          <li>We use an unbiased rating system</li>
          <li>We consider reader feedback</li>
        </ul>

        <h2>Affiliate Disclosure</h2>
        <p>
          Some links on this site are affiliate links. When you purchase through these
          links, we may earn a commission. This does not affect the price you pay.
          All our reviews are unbiased and independent. Affiliate revenue is used to
          cover the operating costs of this site.
        </p>
      </div>
    </div>
  );
}
