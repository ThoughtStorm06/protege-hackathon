import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string | number;
  accent?: string;
}

export default function StatsCard({ icon: Icon, label, value, accent = "text-accent-400" }: Props) {
  return (
    <div className="rounded-2xl border border-base-600 bg-base-800/50 p-5 shadow-xl shadow-black/10 transition-all hover:-translate-y-0.5 hover:border-accent-500/40 hover:bg-base-700/50">
      <Icon size={18} className={accent} />
      <div className="mt-3 text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
