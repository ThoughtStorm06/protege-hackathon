"use client";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { LearningMetric } from "@/lib/types";

export default function MetricsRadarChart({ data }: { data: LearningMetric[] }) {
  return (
    <div className="h-80 w-full rounded-2xl border border-base-600 bg-base-800/50 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="#262a3b" />
          <PolarAngleAxis dataKey="label" tick={{ fill: "#d1d5db", fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#6b7280", fontSize: 10 }} />
          <Radar
            name="Understanding"
            dataKey="score"
            stroke="#22d3ee"
            fill="#8b5cf6"
            fillOpacity={0.28}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
