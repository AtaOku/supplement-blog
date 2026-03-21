"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with newsletter service (Resend, Mailchimp, etc.)
    console.log("Newsletter signup:", email);
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="bg-green-50 rounded-xl p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Supplement Rehberi Bultenine Katil
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Haftalik supplement tavsiyeleri, indirim firsatlari ve yeni iceriklerden haberdar ol.
      </p>

      {status === "success" ? (
        <p className="text-green-600 font-medium">Basariyla kaydoldunuz!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta adresiniz"
            required
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            Kaydol
          </button>
        </form>
      )}
    </div>
  );
}
