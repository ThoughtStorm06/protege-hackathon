"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, AlertTriangle, Zap, ThumbsUp, ScrollText } from "lucide-react";
import { Directive } from "@/lib/types";

const config = {
  hint: { icon: Lightbulb, color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  correction: { icon: AlertTriangle, color: "text-red-400 bg-red-400/10 border-red-400/20" },
  challenge: { icon: Zap, color: "text-accent-400 bg-accent-400/10 border-accent-400/20" },
  praise: { icon: ThumbsUp, color: "text-mint-400 bg-mint-400/10 border-mint-400/20" },
};

export default function DirectiveLog({ directives }: { directives: Directive[] }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-base-600 bg-base-800/50 p-5">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-300">
        <ScrollText size={16} className="text-accent-400" /> Directive Log
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {directives.map((d) => {
            const { icon: Icon, color } = config[d.type];
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className={`rounded-xl border px-3 py-2 text-xs ${color}`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-semibold capitalize">
                    <Icon size={12} /> {d.type}
                  </span>
                  <span className="opacity-60">{d.timestamp}</span>
                </div>
                <p className="text-gray-300">{d.content}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}