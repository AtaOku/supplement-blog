"use client";

import { useState } from "react";
import { PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";

export default function ContactFormClient() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl p-8 text-center animate-fade-in">
        <CheckCircle size={40} weight="fill" className="text-emerald-600 mx-auto mb-3" />
        <h2 className="text-lg font-semibold text-zinc-900 mb-1">Message sent</h2>
        <p className="text-sm text-zinc-500">We&apos;ll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1.5">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
          className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
          className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
          rows={5}
          maxLength={5000}
          className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all resize-none"
          placeholder="Your question, correction, or feedback..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-800 active:scale-[0.98] transition-all disabled:opacity-50"
      >
        <PaperPlaneTilt size={16} weight="fill" />
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
