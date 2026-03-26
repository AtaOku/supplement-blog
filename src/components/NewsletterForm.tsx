"use client";

import { useState } from "react";
import { PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-8 md:p-10">
      {status === "success" ? (
        <div className="flex items-center gap-3 text-emerald-600 animate-fade-in">
          <CheckCircle size={24} weight="fill" />
          <span className="font-medium">You&apos;re on the list. We&apos;ll be in touch.</span>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 mb-1 tracking-tight">
            Stay up to date
          </h3>
          <p className="text-sm text-zinc-500 mb-5">
            New research reviews and supplement guides — straight to your inbox. No spam.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-800 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <PaperPlaneTilt size={16} weight="fill" />
              {status === "submitting" ? "..." : "Subscribe"}
            </button>
          </form>
          {status === "error" && (
            <p className="text-sm text-red-500 mt-2">Something went wrong. Please try again.</p>
          )}
        </div>
      )}
    </div>
  );
}
