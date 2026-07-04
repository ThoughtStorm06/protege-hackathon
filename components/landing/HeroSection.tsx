"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-grid px-6 pb-12 pt-12 text-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-600/10 via-transparent to-base-900" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto flex max-w-2xl flex-col items-center"
      >
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-xs font-medium text-accent-400">
          <Sparkles size={14} /> Learn by Teaching
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Understand anything by{" "}
          <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            teaching your AI Protege
          </span>
        </h1>
        <p className="mt-5 max-w-lg text-base text-gray-400">
          Pick a topic. Explain it in your own words. Your Protege asks questions,
          challenges gaps, and turns your explanation into actionable feedback.
        </p>
      </motion.div>
    </section>
  );
}
