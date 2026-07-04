"use client";
import { BarChart3, Clock, MessageSquare, ShieldCheck, Sparkles, Target } from "lucide-react";

interface Props {
  coverage: number;
  clarity: number;
  confidence: number;
  concepts: number;
  messagesCount: number;
  elapsed: string;
}

export default function ProgressPanel({
  coverage,
  clarity,
  confidence,
  concepts,
  messagesCount,
  elapsed,
}: Props) {
  const metrics = [
    { icon: Target, label: "Coverage", value: coverage, accent: "from-accent-500 to-cyan-400" },
    { icon: Sparkles, label: "Clarity", value: clarity, accent: "from-mint-400 to-emerald-500" },
    { icon: ShieldCheck, label: "Confidence", value: confidence, accent: "from-amber-300 to-rose-500" },
  ];

  const stats = [
    { icon: Clock, label: "Elapsed", value: elapsed },
    { icon: MessageSquare, label: "Exchanges", value: messagesCount },
    { icon: BarChart3, label: "Concepts", value: concepts },
  ];

  return (
    <div className="rounded-2xl border border-base-600 bg-base-800/50 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-300">
        <Target size={16} className="text-accent-400" /> Live Understanding
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-medium text-gray-300">
                <metric.icon size={14} className="text-accent-300" />
                {metric.label}
              </span>
              <span className="text-sm font-semibold text-white">{metric.value}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-base-600">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${metric.accent} transition-all duration-700`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-base-600/70 bg-base-700/50 p-3 text-center">
            <stat.icon size={14} className="mx-auto mb-1 text-accent-400" />
            <div className="text-sm font-semibold text-white">{stat.value}</div>
            <div className="text-[10px] text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
