"use client";
import { Mic } from "lucide-react";

interface Props {
  isRecording: boolean;
  onToggle: () => void;
}

export default function AudioInput({ isRecording, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={isRecording ? "Stop recording" : "Record voice note"}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all active:scale-95 ${
        isRecording
          ? "border-red-400/60 bg-red-500/20 text-red-200 shadow-[0_0_24px_rgba(248,113,113,0.35)]"
          : "border-base-500 bg-base-900 text-gray-300 hover:border-accent-400 hover:text-white"
      }`}
    >
      <Mic size={16} />
    </button>
  );
}
