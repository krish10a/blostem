"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MotionCard, MotionGroup } from "@/components/motion/BlostemMotion";
import { MaterialIcon } from "@/components/shell/MaterialIcon";

type Summary = {
  total_prospects: number;
  high_priority_count: number;
  approved_count: number;
  compliance_flagged_count: number;
  avg_confidence: number;
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/prospects/analytics");
        if (!res.ok) return;
        const json = (await res.json()) as Summary;
        if (!cancelled) setSummary(json);
      } catch {
        // ignore: dashboard can render without backend
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const kpis = [
    { label: "Total Accounts", value: summary?.total_prospects ?? "—", icon: "corporate_fare" },
    { label: "High Priority", value: summary?.high_priority_count ?? "—", icon: "priority_high" },
    { label: "Approved", value: summary?.approved_count ?? "—", icon: "check_circle" },
    { label: "Flagged", value: summary?.compliance_flagged_count ?? "—", icon: "flag" },
    {
      label: "Avg Confidence",
      value:
        typeof summary?.avg_confidence === "number"
          ? `${summary.avg_confidence.toFixed(0)}%`
          : "—",
      icon: "radar",
      accent: true,
    },
  ];

  return (
    <div className="space-y-8">
      <MotionGroup className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {kpis.map((k, idx) => (
          <MotionCard
            key={k.label}
            className={
              k.accent
                ? "mouse-glow haptic-hover relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-surface-container to-surface-container-high p-5 shadow-[0_4px_20px_rgba(177,197,255,0.05)]"
                : "mouse-glow haptic-hover glass-card rounded-xl p-5"
            }
            delay={(idx + 1) * 0.05}
          >
            {k.accent && (
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
            )}
            <div className="relative z-10 mb-4 flex items-start justify-between">
              <p className="font-label text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                {k.label}
              </p>
              <MaterialIcon
                name={k.icon}
                className={k.accent ? "text-primary text-sm" : "text-outline text-sm"}
                fill={k.label === "Approved"}
              />
            </div>
            <div className="relative z-10">
              <div className={k.accent ? "text-primary-fixed" : "text-on-surface"}>
                <span className="kpi-value font-headline text-3xl font-bold">{k.value}</span>
              </div>
            </div>
          </MotionCard>
        ))}
      </MotionGroup>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <MotionCard className="mouse-glow haptic-hover lg:col-span-2 rounded-xl border border-outline-variant/15 bg-surface-container-low/80 p-6 backdrop-blur-md" delay={0.12}>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-headline text-lg font-bold text-on-surface">
              Processing Funnel
            </h3>
            <Link
              href="/analytics"
              className="flex items-center gap-1 text-xs text-primary hover:text-primary-fixed transition-colors"
            >
              View Deep Dive <MaterialIcon name="arrow_forward" className="text-xs" />
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { name: "Intake", pct: 100 },
              { name: "Scoring", pct: 85 },
              { name: "Persona", pct: 72 },
              { name: "Outreach", pct: 55 },
              { name: "Approval", pct: 45 },
            ].map((s) => (
              <div key={s.name} className="flex items-center">
                <div className="w-28 pr-4 text-right font-label text-sm text-on-surface-variant">
                  {s.name}
                </div>
                <div className="flex-1 overflow-hidden rounded-r bg-surface-container-highest/50 h-8">
                  <div
                    className="animate-funnel flex h-full items-center border-l-2 border-primary/50 bg-surface-variant px-3"
                    style={{ width: `${s.pct}%` }}
                  >
                    <span className="font-label text-xs text-on-surface">{s.pct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MotionCard>

        <MotionCard className="mouse-glow haptic-hover rounded-xl border border-outline-variant/10 bg-surface-container-lowest/80 p-6 backdrop-blur-md" delay={0.18}>
          <h3 className="font-headline text-lg font-bold text-on-surface mb-6">
            Live Operations
          </h3>
          <div className="space-y-6">
            {[
              {
                icon: "check",
                title: "Batch Approved",
                detail: "Accounts processed automatically.",
                badgeClass: "bg-secondary-container/20",
              },
              {
                icon: "psychology",
                title: "Model Retraining Triggered",
                detail: "Drift detected in sector signals.",
                badgeClass: "bg-surface-container-highest/60",
              },
              {
                icon: "warning",
                title: "Anomaly Flagged",
                detail: "Manual review recommended.",
                badgeClass: "bg-error-container/30",
              },
            ].map((t, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${t.badgeClass} ring-4 ring-background`}
                >
                  <MaterialIcon name={t.icon} className="text-[12px] text-on-surface" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-label text-sm font-medium text-on-surface">{t.title}</div>
                  <div className="font-label text-xs text-outline mt-0.5">{t.detail}</div>
                </div>
                <div className="font-label text-xs text-surface-variant whitespace-nowrap">now</div>
              </div>
            ))}
          </div>
        </MotionCard>
      </div>
    </div>
  );
}
