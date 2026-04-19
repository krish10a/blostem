"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import {
  Users, Target, MessageSquare, CheckCircle2,
  TrendingUp, Star, Loader2
} from "lucide-react";

interface AnalyticsSummary {
  total_prospects: number;
  prospects_scored: number;
  prospects_with_personas: number;
  prospects_with_outreach: number;
  approved_count: number;
  high_priority_count: number;
  avg_priority_score: number;
  top_prospects: Array<{
    id: number;
    company_name: string;
    priority_score: number;
    next_action: string | null;
    outreach_status: string | null;
  }>;
}

const STAT_CARDS = [
  { key: "total_prospects",          label: "Total Prospects",    icon: Users,          color: "text-blue-400" },
  { key: "prospects_scored",         label: "Scored",             icon: Target,         color: "text-indigo-400" },
  { key: "prospects_with_outreach",  label: "Outreach Drafted",   icon: MessageSquare,  color: "text-violet-400" },
  { key: "approved_count",           label: "Approved",           icon: CheckCircle2,   color: "text-emerald-400" },
  { key: "high_priority_count",      label: "High Priority",      icon: Star,           color: "text-amber-400" },
  { key: "avg_priority_score",       label: "Avg Priority Score", icon: TrendingUp,     color: "text-pink-400", suffix: "/100" },
];

function getBarColor(score: number): string {
  if (score >= 70) return "#34d399"; // emerald
  if (score >= 50) return "#fbbf24"; // amber
  return "#f87171"; // red
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/prospects/analytics");
      if (!res.ok) throw new Error("Failed to fetch analytics");
      setData(await res.json());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAnalytics(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-400">
        {error || "No analytics data available."}
      </div>
    );
  }

  const chartData = data.top_prospects.map((p) => ({
    name: p.company_name.length > 16 ? p.company_name.slice(0, 14) + "…" : p.company_name,
    score: p.priority_score,
  }));

  return (
    <div className="space-y-6">
      {/* Stat cards row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {STAT_CARDS.map(({ key, label, icon: Icon, color, suffix }) => (
          <div
            key={key}
            className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm p-4 flex flex-col gap-1"
          >
            <Icon className={`h-4 w-4 ${color} mb-1`} />
            <p className={`text-2xl font-bold text-white`}>
              {key === "avg_priority_score"
                ? (data[key as keyof AnalyticsSummary] as number).toFixed(1)
                : (data[key as keyof AnalyticsSummary] as number)}
              {suffix && <span className="text-sm text-zinc-500">{suffix}</span>}
            </p>
            <p className="text-[11px] text-zinc-400">{label}</p>
          </div>
        ))}
      </div>

      {/* Top prospects chart */}
      {chartData.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm p-5">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-400" />
            Top Accounts by Priority Score
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                formatter={(val: number) => [`${val}/100`, "Priority Score"]}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Top 3 accounts table */}
      {data.top_prospects.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-400" /> Priority Leaderboard
            </h3>
          </div>
          <div className="divide-y divide-white/5">
            {data.top_prospects.map((p, i) => {
              let nextActionObj: any = null;
              try { if (p.next_action) nextActionObj = JSON.parse(p.next_action); } catch {}
              return (
                <div key={p.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-zinc-500 w-4">#{i + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{p.company_name}</p>
                      {nextActionObj && (
                        <p className="text-xs text-zinc-500">{nextActionObj.action}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {p.outreach_status === "APPROVED" && (
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                        ✓ Approved
                      </span>
                    )}
                    <div
                      className="text-sm font-bold"
                      style={{ color: getBarColor(p.priority_score) }}
                    >
                      {p.priority_score}/100
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
