import type { Metadata } from "next";
import Link from "next/link";
import { personJsonLd, organizationJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About SupplementStack — Our Mission, Methodology & Team",
  description:
    "SupplementStack is an independent, science-based supplement resource. Learn about our editorial process, review methodology, team credentials, and affiliate disclosure.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const personSchema = personJsonLd();
  const orgSchema = organizationJsonLd();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* JSON-LD: trusted static structured data for E-E-A-T signals */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
        About SupplementStack
      </h1>
      <p className="text-zinc-500 text-sm mb-10">
        Independent. Science-first. No hype.
      </p>

      <div className="prose prose-zinc max-w-none">

        {/* Mission */}
        <h2>Our Mission</h2>
        <p>
          The supplement industry is a YMYL (Your Money or Your Life) space. Misleading information
          about dosing, efficacy, and safety doesn&apos;t just waste money — it can cause real harm.
          SupplementStack exists to provide rigorously researched, evidence-graded content that helps
          readers make informed decisions about supplementation.
        </p>
        <p>
          We cover the full stack: performance, longevity, cognition, and metabolic health. Every
          guide and review is built around peer-reviewed research, not manufacturer claims.
        </p>

        {/* Team */}
        <h2>Who We Are</h2>

        <div className="not-prose bg-zinc-50 border border-zinc-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-zinc-200 flex items-center justify-center text-2xl shrink-0">
              👤
            </div>
            <div>
              <p className="font-semibold text-zinc-900 text-base mb-0.5">Ata Okuzcuoglu</p>
              <p className="text-sm text-zinc-500 mb-2">Founder &amp; Lead Writer</p>
              <p className="text-sm text-zinc-700">
                Sports science background with a focus on evidence-based nutrition and longevity
                biology. Has followed primary literature in exercise science and clinical nutrition
                for over 8 years. Particular interest in mitochondrial medicine, lifespan research,
                and the translation of molecular biology findings to practical supplementation
                protocols.
              </p>
              <p className="text-sm text-zinc-500 mt-2">
                Expertise: longevity supplements · performance nutrition · systematic review
                methodology
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Standards */}
        <h2>Editorial Process</h2>
        <p>
          Every piece of content on SupplementStack follows a structured editorial process:
        </p>
        <ol>
          <li>
            <strong>Primary literature first.</strong> We read original studies — RCTs, systematic
            reviews, and meta-analyses — not press releases or secondary summaries. We prioritise
            Cochrane reviews, high-powered RCTs, and human data over in vitro or animal studies.
          </li>
          <li>
            <strong>Evidence grading.</strong> We classify claims by evidence level: strong (multiple
            consistent RCTs or meta-analyses), moderate (limited or mixed RCTs), and preliminary
            (mechanistic or animal data). We state this clearly so readers can calibrate their
            confidence.
          </li>
          <li>
            <strong>Dose-specificity.</strong> We don&apos;t recommend a supplement without specifying
            the dose and form that the evidence supports. Vague recommendations like &quot;take magnesium&quot;
            are not useful — form, dose, and timing context are always included.
          </li>
          <li>
            <strong>Separation of editorial and commercial.</strong> Affiliate relationships are
            disclosed and never influence our editorial conclusions. A product we&apos;re affiliated
            with receives the same critical scrutiny as any other.
          </li>
          <li>
            <strong>Regular updates.</strong> Supplement science moves fast. Guides are reviewed and
            updated when meaningful new research is published. Publication dates and update dates are
            shown on all posts.
          </li>
        </ol>

        {/* Review Methodology */}
        <h2>How We Review Products</h2>
        <p>
          Our product reviews evaluate supplements across five criteria:
        </p>
        <ul>
          <li>
            <strong>Ingredient quality:</strong> Is the active ingredient the form supported by
            research (e.g., ubiquinol vs. ubiquinone, creatine monohydrate vs. alternatives)?
          </li>
          <li>
            <strong>Dose accuracy:</strong> Does the label dose match evidence-based effective doses?
            Do we have a COA or third-party test confirming the dose is actually in the product?
          </li>
          <li>
            <strong>Third-party testing:</strong> Is the product certified by Informed Sport, NSF
            Certified for Sport, or has an independent COA? This is non-negotiable for athletes and
            those on medication.
          </li>
          <li>
            <strong>Transparency:</strong> No proprietary blends. All ingredient amounts must be
            listed per serving.
          </li>
          <li>
            <strong>Value:</strong> Cost per effective dose compared to equivalent products.
          </li>
        </ul>

        {/* What We Cover */}
        <h2>What We Cover</h2>
        <p>
          SupplementStack focuses on four content pillars, each built as a topical cluster with
          interconnected guides and reviews:
        </p>
        <ul>
          <li>
            <strong>Performance &amp; Recovery</strong> —{" "}
            <Link href="/blog/creatine-guide">creatine</Link>,{" "}
            <Link href="/blog/protein-powder-guide">protein</Link>, taurine, beta-alanine
          </li>
          <li>
            <strong>Longevity &amp; Aging</strong> —{" "}
            <Link href="/blog/nad-nmn-guide">NAD+ / NMN</Link>,{" "}
            <Link href="/blog/taurine-longevity-science">taurine</Link>, senolytics, rapamycin context
          </li>
          <li>
            <strong>Mitochondrial Health</strong> —{" "}
            <Link href="/blog/mitochondrial-supplements-guide">CoQ10, ALCAR, ALA, PQQ</Link>,
            magnesium
          </li>
          <li>
            <strong>Cognition &amp; Neuroprotection</strong> —{" "}
            <Link href="/blog/acetyl-l-carnitine-guide">ALCAR</Link>, lion&apos;s mane, bacopa,
            choline
          </li>
        </ul>

        {/* Not Medical Advice */}
        <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-5 my-8">
          <p className="text-sm font-semibold text-amber-800 mb-1">⚕️ Medical Disclaimer</p>
          <p className="text-sm text-amber-700">
            Content on SupplementStack is for educational and informational purposes only. It does
            not constitute medical advice and should not replace consultation with a qualified
            healthcare professional. Supplement safety and efficacy can vary by individual health
            status, medication use, and other factors. Always consult your physician before starting
            a new supplement regimen, especially if you have a pre-existing condition or take
            prescription medication.
          </p>
        </div>

        {/* Affiliate Disclosure */}
        <h2 id="affiliate-disclosure">Affiliate Disclosure</h2>
        <p>
          SupplementStack participates in affiliate programs including Amazon Associates, iHerb, and
          DoNotAge. When you purchase a product through an affiliate link on this site, we earn a
          small commission at no additional cost to you.
        </p>
        <p>
          <strong>Affiliate relationships do not influence our editorial recommendations.</strong>{" "}
          We recommend products based on evidence quality, formulation standards, and third-party
          testing — not on commission rates. Products we have no affiliate relationship with are
          frequently recommended when they outperform affiliated alternatives.
        </p>
        <p>
          Affiliate revenue funds the operational costs of this site: hosting, research database
          access, and the time required to produce long-form, evidence-based content.
        </p>

        {/* Contact */}
        <h2>Contact</h2>
        <p>
          For editorial questions, corrections, or partnership enquiries:{" "}
          <a href="mailto:hello@supplementstack.space">hello@supplementstack.space</a>
        </p>
      </div>
    </div>
  );
}
