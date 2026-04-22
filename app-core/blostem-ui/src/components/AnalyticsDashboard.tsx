"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MotionCard, MotionGroup, MotionSection } from "@/components/motion/BlostemMotion";
import { fetchWithAuth } from "@/lib/api";

interface AnalyticsSummary {
  total_prospects: number;
  prospects_scored: number;
  prospects_with_personas: number;
  prospects_with_outreach: number;
  approved_count: number;
  high_priority_count: number;
  avg_priority_score: number;
  avg_confidence: number;
  avg_intent: number;
  approval_rate: number;
  compliance_flagged_count: number;
  best_persona: string;
  top_prospects: Array<{
    id: number;
    company_name: string;
    priority_score: number;
    fit_score: number;
    intent_score: number;
    confidence_score: number;
    next_action: string | null;
    outreach_status: string | null;
    persona_map: string | null;
  }>;
}

type StatKey =
  | "total_prospects"
  | "approval_rate"
  | "compliance_flagged_count"
  | "best_persona"
  | "avg_intent"
  | "avg_priority_score";

const STAT_CARDS: Array<{
  key: StatKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  suffix?: string;
}> = [
  { key: "total_prospects", label: "Total Accounts", icon: Users, accent: "text-primary" },
  { key: "approval_rate", label: "Approval Rate", icon: CheckCircle2, accent: "text-secondary", suffix: "%" },
  {
    key: "compliance_flagged_count",
    label: "Compliance Flags",
    icon: AlertCircle,
    accent: "text-error",
  },
  { key: "best_persona", label: "Best Persona", icon: Target, accent: "text-chart-3" },
  { key: "avg_intent", label: "Avg Intent", icon: Zap, accent: "text-chart-2", suffix: "/100" },
  {
    key: "avg_priority_score",
    label: "Avg Priority",
    icon: TrendingUp,
    accent: "text-chart-4",
    suffix: "/100",
  },
];

function formatStatValue(
  value: AnalyticsSummary[StatKey],
  suffix?: string
) {
  if (typeof value === "number") {
    return `${value.toFixed(1).replace(".0", "")}${suffix ?? ""}`;
  }
  return value || "N/A";
}

function getPersonaLabel(raw: string | null) {
  try {
    const parsed = JSON.parse(raw || "{}");
    const persona = parsed.personas?.[0]?.role || parsed.personas?.[0]?.name;
    return persona || "N/A";
  } catch {
    return "N/A";
  }
}

function getNextActionLabel(raw: string | null) {
  try {
    const parsed = JSON.parse(raw || "{}");
    return parsed.action || "N/A";
  } catch {
    return raw || "N/A";
  }
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth("/prospects/analytics");
      if (!res.ok) throw new Error("Failed to fetch analytics");
      const json = (await res.json()) as AnalyticsSummary;
      setData(json);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void fetchAnalytics(false);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="glass-panel flex h-[360px] items-center justify-center rounded-[30px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="glass-panel rounded-[30px] border border-error/25 p-8 text-center">
        <AlertCircle className="mx-auto mb-3 h-8 w-8 text-error" />
        <p className="font-medium text-error">{error || "Failed to load pipeline intelligence."}</p>
        <button
          onClick={() => fetchAnalytics()}
          className="mt-4 rounded-full border border-error/30 bg-error/10 px-4 py-2 text-xs font-semibold text-error transition-colors hover:bg-error/15"
        >
          Try Again
        </button>
      </div>
    );
  }

  const chartData = data.top_prospects.map((prospect) => ({
    name:
      prospect.company_name.length > 16
        ? `${prospect.company_name.slice(0, 14)}...`
        : prospect.company_name,
    score: prospect.priority_score,
  }));

  const funnelData = [
    { name: "Intake", value: data.total_prospects, color: "#b1c5ff", inset: 0 },
    { name: "Scored", value: data.prospects_scored, color: "#7ea3ff", inset: 4 },
    { name: "Personas", value: data.prospects_with_personas, color: "#7dddb8", inset: 8 },
    { name: "Outreach", value: data.prospects_with_outreach, color: "#5cb4ff", inset: 12 },
    { name: "Approved", value: data.approved_count, color: "#4edea3", inset: 16 },
  ];

  return (
    <div className="space-y-6">
      <MotionGroup className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {STAT_CARDS.map(({ key, label, icon: Icon, accent, suffix }, index) => (
          <MotionCard
            key={key}
            className="mouse-glow glass-panel rounded-[26px] p-4"
            delay={index * 0.05}
          >
            <div className="mb-3 flex items-center justify-between">
              <Icon className={`h-4 w-4 ${accent}`} />
              <span className="font-label text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Live
              </span>
            </div>
            <div className="kpi-value font-headline text-2xl font-bold text-white">
              {formatStatValue(data[key], suffix)}
            </div>
            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
          </MotionCard>
        ))}
      </MotionGroup>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <MotionCard className="mouse-glow glass-panel rounded-[30px] p-6">
          <div className="mb-8 flex items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white">
              <TrendingUp className="h-4 w-4 text-secondary" />
              Conversion Pipeline
            </h3>
            <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Live Intelligence
            </span>
          </div>

          <div className="space-y-5">
            {funnelData.map((step) => {
              const maxVal = data.total_prospects || 1;
              const pct = (step.value / maxVal) * 100;
              return (
                <div key={step.name}>
                  <div className="mb-2 flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.22em]">
                    <span className="text-slate-500">{step.name}</span>
                    <span className="font-mono text-slate-300">{step.value} accounts</span>
                  </div>
                  <div
                    className="h-3 overflow-hidden rounded-full bg-surface-container-highest/50"
                    style={{ marginLeft: `${step.inset}%`, marginRight: `${step.inset}%` }}
                  >
                    <div
                      className="animate-funnel h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundImage: `linear-gradient(90deg, ${step.color}55 0%, ${step.color} 100%)`,
                        boxShadow: `0 0 18px ${step.color}33`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </MotionCard>

        <MotionCard className="mouse-glow glass-panel rounded-[30px] p-6" delay={0.08}>
          <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white">
            <Star className="h-4 w-4 text-chart-3" />
            Top Priority Accounts
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fill: "#8e90a2", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#8e90a2", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#131b2e",
                  border: "1px solid rgba(67,70,86,0.35)",
                  borderRadius: "16px",
                  padding: "12px",
                  color: "#dae2fd",
                }}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                formatter={(val: unknown) => [`${val ?? 0} / 100`, "Priority Score"]}
              />
              <Bar dataKey="score" radius={[10, 10, 0, 0]} barSize={34}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#4edea3" : index === 1 ? "#b1c5ff" : "#5cb4ff"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </MotionCard>
      </div>

      <MotionSection className="mouse-glow glass-panel overflow-hidden rounded-[30px]" delay={0.14}>
        <div className="flex items-center justify-between border-b border-white/6 bg-white/[0.03] px-6 py-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-white">
              Priority Leaderboard
            </h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Top accounts by combined fit and intent score
            </p>
          </div>
          <Zap className="h-4 w-4 text-primary" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-white/[0.03] text-[10px] uppercase tracking-[0.22em] text-slate-500">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Account Intelligence</th>
                <th className="px-6 py-4">Primary Persona</th>
                <th className="px-6 py-4">Sales Action</th>
                <th className="px-6 py-4 text-right">Pipeline Status</th>
                <th className="px-6 py-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6">
              {data.top_prospects.map((prospect, index) => (
                <tr key={prospect.id} className="transition-colors hover:bg-white/[0.03]">
                  <td className="px-6 py-5 font-mono text-slate-500">0{index + 1}</td>
                  <td className="px-6 py-5">
                    <div className="font-headline text-lg font-bold text-white">
                      {prospect.company_name}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                      <span>FIT {prospect.fit_score}</span>
                      <span>INT {prospect.intent_score}</span>
                      <span>CONF {prospect.confidence_score || 0}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      <Target className="h-3 w-3" />
                      {getPersonaLabel(prospect.persona_map)}
                    </span>
                  </td>
                  <td className="max-w-xs px-6 py-5 text-sm text-slate-400">
                    <span className="line-clamp-2">{getNextActionLabel(prospect.next_action)}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                        prospect.outreach_status === "APPROVED"
                          ? "border-secondary/20 bg-secondary/10 text-secondary"
                          : "border-chart-3/20 bg-chart-3/10 text-chart-3"
                      }`}
                    >
                      {prospect.outreach_status || "PENDING"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span
                      className={`font-headline text-lg font-bold ${
                        (prospect.priority_score || 0) >= 80 ? "text-secondary" : "text-chart-3"
                      }`}
                    >
                      {(prospect.priority_score || 0).toFixed(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MotionSection>
    </div>
  );
}
