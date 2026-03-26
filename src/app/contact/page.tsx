import type { Metadata } from "next";
import ContactFormClient from "./ContactFormClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Supplement Stack team. Send editorial questions, corrections, or partnership enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-2xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-base text-zinc-500 leading-relaxed max-w-lg">
            Have a question, correction, or partnership enquiry? We read every message.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-10">
        <ContactFormClient />

        <div className="mt-10 bg-zinc-50 border border-zinc-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-zinc-700 mb-3">Common reasons to reach out</h2>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li>Factual corrections or updated research</li>
            <li>Requests for new supplement or condition guides</li>
            <li>Editorial or partnership enquiries</li>
            <li>Bug reports or site feedback</li>
          </ul>
        </div>
      </div>
    </>
  );
}
