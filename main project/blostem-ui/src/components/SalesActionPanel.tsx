"use client";

import {
  Zap, Clock, TrendingUp, UsersRound, ArrowRightCircle,
  AlertCircle
} from "lucide-react";

interface NextAction {
  action: string;
  reason: string;
  suggested_owner: string;
  suggested_timing: string;
  priority_label: string;
}

interface Props {
  prospect: {
    id: number;
    company_name: string;
    priority_score?: number | null;
    next_action?: string | null;
  };
}

const ACTION_CONFIG: Record<string, { color: string; icon: React.ReactNode }> = {
  "Contact Now":     { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30", icon: <Zap className="h-4 w-4" /> },
  "Nurture":         { color: "text-blue-400 bg-blue-500/10 border-blue-500/30",         icon: <TrendingUp className="h-4 w-4" /> },
  "Escalate to Rep": { color: "text-amber-400 bg-amber-500/10 border-amber-500/30",       icon: <UsersRound className="h-4 w-4" /> },
  "Rework Message":  { color: "text-orange-400 bg-orange-500/10 border-orange-500/30",    icon: <AlertCircle className="h-4 w-4" /> },
  "Deprioritize":    { color: "text-zinc-400 bg-zinc-500/10 border-zinc-500/30",          icon: <Clock className="h-4 w-4" /> },
};

export default function SalesActionPanel({ prospect }: Props) {

  const hasScore = prospect.priority_score !== null && prospect.priority_score !== undefined;

  // Parse stored next_action JSON
  let actionDetail: NextAction | null = null;
  if (prospect.next_action) {
    try {
      actionDetail = JSON.parse(prospect.next_action);
    } catch {
      actionDetail = null;
    }
  }



  const cfg = actionDetail ? ACTION_CONFIG[actionDetail.action] : null;

  return (
    <div className="mouse-glow reveal haptic-hover animate-fade-in-up delay-100 mt-4 rounded-xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <ArrowRightCircle className="h-5 w-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Sales Action Recommendation</h3>
        </div>
      </div>

      {!hasScore && (
        <p className="text-xs text-zinc-500">Score this prospect first to unlock action recommendations.</p>
      )}

      {actionDetail && cfg && (
        <div className="space-y-3">
          {/* Main action badge */}
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-bold ${cfg.color}`}>
            {cfg.icon}
            {actionDetail.action}
            <span className={`ml-1 text-xs font-medium px-1.5 py-0.5 rounded-full ${
              actionDetail.priority_label === "High" ? "bg-red-500/20 text-red-300" :
              actionDetail.priority_label === "Medium" ? "bg-amber-500/20 text-amber-300" :
              "bg-zinc-500/20 text-zinc-300"
            }`}>{actionDetail.priority_label} Priority</span>
          </div>

          {/* Detail grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg bg-white/5 border border-white/10 p-3">
              <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Reasoning</p>
              <p className="text-xs text-zinc-300 leading-relaxed">{actionDetail.reason}</p>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-3">
              <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Suggested Owner</p>
              <p className="text-sm font-bold text-white">{actionDetail.suggested_owner}</p>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-3">
              <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Suggested Timing</p>
              <p className="text-xs text-zinc-300">{actionDetail.suggested_timing}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
