"use client";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { Message } from "@/lib/types";

export default function MessageBubble({ message }: { message: Message }) {
  const isAI = message.role === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-start gap-3 ${isAI ? "" : "flex-row-reverse"}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isAI ? "bg-accent-600/20 text-accent-400" : "bg-mint-500/20 text-mint-400"
        }`}
      >
        {isAI ? <Bot size={16} /> : <User size={16} />}
      </div>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isAI
            ? "rounded-tl-sm bg-base-700 text-gray-200"
            : "rounded-tr-sm bg-accent-600 text-white"
        }`}
      >
        <p>{message.content}</p>
        <span className="mt-1 block text-[10px] opacity-50">{message.timestamp}</span>
      </div>
    </motion.div>
  );
}