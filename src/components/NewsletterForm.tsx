"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-8 md:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex items-center gap-3 text-emerald-600"
          >
            <CheckCircle size={24} weight="fill" />
            <span className="font-medium">Basariyla kaydoldunuz</span>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-lg font-semibold text-zinc-900 mb-1 tracking-tight">
              Bultenimize katil
            </h3>
            <p className="text-sm text-zinc-500 mb-5">
              Haftalik supplement tavsiyeleri ve yeni icerikler.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                required
                className="flex-1 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-800 active:scale-[0.98] transition-all"
              >
                <PaperPlaneTilt size={16} weight="fill" />
                Kaydol
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
