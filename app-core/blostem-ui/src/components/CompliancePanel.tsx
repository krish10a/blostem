"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, ShieldX, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { MotionCard, MotionGroup } from "@/components/motion/BlostemMotion";
import { cn } from "@/lib/utils";

interface ComplianceIssue {
  issue_type: string;
  description: string;
  offending_text: string;
  suggestion: string;
}

interface ComplianceDetail {
  overall_status: "APPROVED" | "NEEDS_REVISION" | "FLAGGED";
  safe_to_send: boolean;
  issues: ComplianceIssue[];
  compliance_summary: string;
}

interface Props {
  prospect: {
    id: number;
    company_name: string;
    messages?: string;
    compliance_status?: string; // JSON string
  };
}

export default function CompliancePanel({ prospect }: Props) {
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  const hasOutreach = !!prospect.messages;

  // Parse stored compliance JSON
  let complianceDetail: ComplianceDetail | null = null;
  if (prospect.compliance_status) {
    try {
      complianceDetail = JSON.parse(prospect.compliance_status);
    } catch {
      // fallback: treat raw string as status
      const raw = prospect.compliance_status;
      const status: ComplianceDetail["overall_status"] =
        raw === "APPROVED" || raw === "NEEDS_REVISION" || raw === "FLAGGED"
          ? raw
          : "NEEDS_REVISION";
      complianceDetail = {
        overall_status: status,
        safe_to_send: status === "APPROVED",
        issues: [],
        compliance_summary: typeof raw === "string" ? raw : "Compliance status unavailable.",
      };
    }
  }

  const statusConfig = {
    APPROVED: {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
      label: "Safe to Send",
      badgeClass: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]"
    },
    NEEDS_REVISION: {
      icon: <ShieldAlert className="h-6 w-6 text-amber-400" />,
      label: "Needs Revision",
      badgeClass: "bg-amber-500/15 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
      glow: "shadow-[0_0_30px_rgba(245,158,11,0.15)]"
    },
    FLAGGED: {
      icon: <ShieldX className="h-6 w-6 text-red-400" />,
      label: "Restricted",
      badgeClass: "bg-red-500/15 border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
      glow: "shadow-[0_0_30px_rgba(239,68,68,0.15)]"
    },
  };

  return (
    <MotionCard className="glass-panel mouse-glow mt-8 w-full rounded-[32px] p-8" delay={0.15} hover={false}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <Lock className="h-6 w-6 text-slate-400" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-black tracking-tight text-white">Compliance & Brand Alignment</h3>
            {complianceDetail && (
              <span
                className={cn(
                  "mt-1.5 inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-[9px] font-black uppercase tracking-widest",
                  statusConfig[complianceDetail.overall_status]?.badgeClass || ""
                )}
              >
                <span className="h-1 w-1 rounded-full bg-current" />
                {statusConfig[complianceDetail.overall_status]?.label}
              </span>
            )}
          </div>
        </div>

        {complianceDetail && (
           <div className={cn(
             "hidden items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-3 transition-all duration-500 sm:flex",
             complianceDetail.safe_to_send ? "border-emerald-500/10" : "border-red-500/10"
           )}>
             <div className="text-right">
               <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Security Score</p>
               <p className={cn(
                 "font-headline text-lg font-black tracking-tight",
                 complianceDetail.safe_to_send ? "text-emerald-400" : "text-red-400"
               )}>
                 {complianceDetail.safe_to_send ? "Verified" : "Action Required"}
               </p>
             </div>
             <div className={cn(
               "flex h-10 w-10 items-center justify-center rounded-xl",
               complianceDetail.safe_to_send ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
             )}>
               {statusConfig[complianceDetail.overall_status]?.icon}
             </div>
           </div>
        )}
      </div>

      {!hasOutreach && (
        <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.01] p-6 text-sm font-medium text-slate-500">
          <AlertCircle className="h-5 w-5 opacity-40" />
          Generate sequences to activate AI compliance scanning.
        </div>
      )}

      {complianceDetail && (
        <div className="space-y-6">
          {/* Summary Box */}
          <div className="relative overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.03] p-8 shadow-inner">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-1/2 translate-y--1/2 rounded-full bg-primary/5 blur-3xl" />
            <p className="relative text-sm font-medium leading-relaxed text-slate-300">
              {complianceDetail.compliance_summary}
            </p>
            <div className="mt-6 flex items-center gap-6 border-t border-white/6 pt-6">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  complianceDetail.safe_to_send ? "bg-emerald-400 shadow-[0_0_8px_#4ade80]" : "bg-red-400 shadow-[0_0_8px_#f87171]"
                )} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status Protocol</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_#b1c5ff]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{complianceDetail.issues.length} Potential Issues</span>
              </div>
            </div>
          </div>

          {/* Issues Accordion */}
          {complianceDetail.issues.length > 0 && (
            <div className="space-y-3">
              <h4 className="pl-2 font-headline text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Flagged Analysis</h4>
              <MotionGroup className="space-y-3">
                {complianceDetail.issues.map((issue, i) => (
                  <MotionCard
                    key={i}
                    className="overflow-hidden rounded-[20px] border border-red-500/10 bg-red-500/[0.02] transition-all hover:bg-red-500/[0.04]"
                    delay={i * 0.05}
                  >
                    <button
                      className="flex w-full items-center justify-between px-6 py-4 text-left"
                      onClick={() => setExpandedIssue(expandedIssue === i ? null : i)}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                          <ShieldAlert className="h-4 w-4 text-red-400" />
                        </div>
                        <div className="min-w-0">
                          <span className="block font-headline text-xs font-black tracking-tight text-red-300">{issue.issue_type}</span>
                          <span className="block truncate text-[10px] font-mono text-slate-500 opacity-80">
                            &quot;{issue.offending_text}&quot;
                          </span>
                        </div>
                      </div>
                      {expandedIssue === i ? (
                        <ChevronUp className="h-4 w-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-500" />
                      )}
                    </button>
                    {expandedIssue === i && (
                      <div className="border-t border-red-500/10 bg-red-500/[0.02] px-6 py-6 space-y-6">
                        <div>
                          <p className="mb-2 font-headline text-[9px] font-black uppercase tracking-widest text-slate-500">Analysis</p>
                          <p className="text-xs font-medium leading-relaxed text-slate-400">{issue.description}</p>
                        </div>
                        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 shadow-inner">
                          <div className="mb-2 flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                            <p className="font-headline text-[9px] font-black uppercase tracking-widest text-emerald-400">Resolution Suggestion</p>
                          </div>
                          <p className="text-xs font-bold leading-relaxed text-emerald-300/90">{issue.suggestion}</p>
                        </div>
                      </div>
                    )}
                  </MotionCard>
                ))}
              </MotionGroup>
            </div>
          )}

          {complianceDetail.issues.length === 0 && (
            <div className="flex items-center gap-4 rounded-[24px] border border-emerald-500/15 bg-emerald-500/5 p-6 shadow-inner transition-all hover:bg-emerald-500/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-headline text-sm font-black tracking-tight text-emerald-400">Zero Flags Detected</p>
                <p className="text-[11px] font-medium text-emerald-400/60 uppercase tracking-widest">Protocol adherence verified</p>
              </div>
            </div>
          )}
        </div>
      )}
    </MotionCard>
  );
}
