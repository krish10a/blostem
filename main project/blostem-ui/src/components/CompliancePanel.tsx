"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, ShieldX, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

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
      icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
      label: "Approved — Safe to Send",
      badgeClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    },
    NEEDS_REVISION: {
      icon: <ShieldAlert className="h-5 w-5 text-amber-400" />,
      label: "Needs Revision",
      badgeClass: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    },
    FLAGGED: {
      icon: <ShieldX className="h-5 w-5 text-red-400" />,
      label: "Flagged — Do Not Send",
      badgeClass: "bg-red-500/10 border-red-500/30 text-red-400",
    },
  };

  return (
    <div className="mouse-glow reveal haptic-hover animate-fade-in-up delay-150 mt-6 rounded-xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Compliance & Safety Check</h3>
          {complianceDetail && (
            <span
              className={`ml-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                statusConfig[complianceDetail.overall_status]?.badgeClass || ""
              }`}
            >
              {statusConfig[complianceDetail.overall_status]?.icon}
              {statusConfig[complianceDetail.overall_status]?.label}
            </span>
          )}
        </div>
      </div>

      {!hasOutreach && (
        <p className="text-xs text-zinc-500">Generate outreach sequences first to enable compliance checking.</p>
      )}

      {complianceDetail && (
        <div className="space-y-3">
          {/* Summary */}
          <div className="rounded-lg bg-white/5 border border-white/10 p-3">
            <p className="text-xs text-zinc-300">{complianceDetail.compliance_summary}</p>
            <div className="mt-2 flex items-center gap-2 text-xs">
              {complianceDetail.safe_to_send ? (
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Safe to send
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-400">
                  <AlertCircle className="h-3.5 w-3.5" /> Not safe to send without revision
                </span>
              )}
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">{complianceDetail.issues.length} issue(s) found</span>
            </div>
          </div>

          {/* Issues list */}
          {complianceDetail.issues.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-zinc-500 tracking-wider">Flagged Issues</h4>
              {complianceDetail.issues.map((issue, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-red-500/20 bg-red-500/5 overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 text-left"
                    onClick={() => setExpandedIssue(expandedIssue === i ? null : i)}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-3.5 w-3.5 text-red-400 shrink-0" />
                      <span className="text-xs font-semibold text-red-300">{issue.issue_type}</span>
                      <span className="text-xs text-zinc-500 font-mono truncate max-w-[180px]">
                        &quot;{issue.offending_text}&quot;
                      </span>
                    </div>
                    {expandedIssue === i ? (
                      <ChevronUp className="h-3.5 w-3.5 text-zinc-500" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
                    )}
                  </button>
                  {expandedIssue === i && (
                    <div className="px-3 pb-3 space-y-1.5 border-t border-red-500/10">
                      <p className="text-xs text-zinc-400 mt-2">{issue.description}</p>
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-emerald-300">{issue.suggestion}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {complianceDetail.issues.length === 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              No compliance issues detected. Messages are professional and regulation-safe.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
