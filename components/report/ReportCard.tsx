import { Award, Sparkles } from "lucide-react";
import { SessionStats } from "@/lib/types";

export default function ReportCard({ stats }: { stats: SessionStats }) {
  const score = Math.round((stats.coverageScore + stats.clarityScore + stats.confidenceScore) / 3);
  const grade = score >= 85 ? "A" : score >= 70 ? "B" : score >= 50 ? "C" : "D";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent-500/30 bg-gradient-to-br from-accent-600/20 via-base-800 to-base-900 p-8 shadow-2xl shadow-black/20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-300/70 to-transparent" />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/10 px-3 py-1 text-xs text-accent-300">
            <Award size={14} /> Session Complete
          </span>
          <h2 className="text-2xl font-bold text-white">{stats.topic}</h2>
          <p className="mt-1 max-w-xl text-sm text-gray-400">
            You taught your Protege for {stats.duration} across {stats.messagesExchanged} exchanges.
            The report focuses on coverage, clarity, and confidence.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-base-600 bg-base-900/70 px-4 py-3">
            <p className="flex items-center gap-1.5 text-xs text-gray-500">
              <Sparkles size={12} /> Report score
            </p>
            <p className="mt-1 text-2xl font-bold text-white">{score}%</p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-base-900 text-3xl font-bold text-accent-300 shadow-glow">
            {grade}
          </div>
        </div>
      </div>
    </div>
  );
}
