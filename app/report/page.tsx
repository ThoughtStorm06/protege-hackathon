"use client";
import { useRouter } from "next/navigation";
import { BarChart3, Clock, Home, MessageSquare, RotateCcw, ShieldCheck, Sparkles, Target } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import MetricsRadarChart from "@/components/report/MetricsRadarChart";
import ReportCard from "@/components/report/ReportCard";
import StatsCard from "@/components/report/StatsCard";
import UnderstandingSummary from "@/components/report/UnderstandingSummary";
import { learningMetrics, sessionStats } from "@/lib/mockData";

export default function ReportPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-base-900">
      <Navbar />
      <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <ReportCard stats={sessionStats} />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
          <StatsCard icon={Clock} label="Duration" value={sessionStats.duration} />
          <StatsCard icon={MessageSquare} label="Exchanges" value={sessionStats.messagesExchanged} />
          <StatsCard icon={BarChart3} label="Concepts Covered" value={sessionStats.conceptsCovered} />
          <StatsCard icon={Target} label="Coverage" value={`${sessionStats.coverageScore}%`} accent="text-cyan-300" />
          <StatsCard icon={Sparkles} label="Clarity" value={`${sessionStats.clarityScore}%`} accent="text-mint-300" />
          <StatsCard
            icon={ShieldCheck}
            label="Confidence"
            value={`${sessionStats.confidenceScore}%`}
            accent="text-amber-300"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_0.95fr]">
          <UnderstandingSummary />
          <MetricsRadarChart data={learningMetrics} />
        </div>

        <div className="rounded-2xl border border-base-600 bg-base-800/50 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-medium text-gray-300">Metric Breakdown</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {learningMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-base-600 bg-base-900/50 p-4">
                <div className="mb-2 flex justify-between text-xs text-gray-400">
                  <span>{metric.label}</span>
                  <span>{metric.score}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-base-600">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-500 to-mint-400"
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => router.push("/session")}
            className="flex items-center gap-2 rounded-xl border border-base-500 px-5 py-2.5 text-sm text-gray-300 transition-colors hover:border-accent-500 hover:text-white"
          >
            <RotateCcw size={16} /> New Session
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
          >
            <Home size={16} /> Home
          </button>
        </div>
      </div>
    </main>
  );
}
