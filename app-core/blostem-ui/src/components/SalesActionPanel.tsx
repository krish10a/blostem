import { MotionCard, MotionGroup } from "@/components/motion/BlostemMotion";
import { 
  Zap, 
  TrendingUp, 
  UsersRound, 
  AlertCircle, 
  Clock, 
  ArrowRightCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  "Contact Now":     { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]", icon: <Zap className="h-4 w-4" /> },
  "Nurture":         { color: "text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]",         icon: <TrendingUp className="h-4 w-4" /> },
  "Escalate to Rep": { color: "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]",       icon: <UsersRound className="h-4 w-4" /> },
  "Rework Message":  { color: "text-orange-400 bg-orange-500/10 border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]",    icon: <AlertCircle className="h-4 w-4" /> },
  "Deprioritize":    { color: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",          icon: <Clock className="h-4 w-4" /> },
};

export default function SalesActionPanel({ prospect }: Props) {
  const hasScore = prospect.priority_score !== null && prospect.priority_score !== undefined;

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
    <MotionCard className="glass-panel mouse-glow mt-8 w-full rounded-[32px] p-8" delay={0.1} hover={false}>
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
            <ArrowRightCircle className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-black tracking-tight text-white uppercase">Sales Action Recommendation</h3>
            <p className="mt-1 text-xs font-medium text-slate-400 tracking-wide">
              Strategic execution path determined for <span className="font-bold text-white">{prospect?.company_name}</span>.
            </p>
          </div>
        </div>
      </div>

      {!hasScore ? (
        <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-white/10 rounded-[24px] bg-white/[0.01]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-white/5 opacity-30">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Awaiting AI Scoring</p>
          <p className="mt-2 text-xs text-slate-600">Score this prospect first to unlock strategic action recommendations.</p>
        </div>
      ) : actionDetail && cfg ? (
        <MotionGroup className="space-y-8">
          {/* Main Action Banner */}
          <div className="flex flex-wrap items-center gap-4">
            <div className={cn(
              "inline-flex items-center gap-3 rounded-2xl border px-6 py-3 text-sm font-black uppercase tracking-widest transition-all",
              cfg.color
            )}>
              {cfg.icon}
              {actionDetail.action}
            </div>
            
            <div className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
              actionDetail.priority_label === "High" ? "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]" :
              actionDetail.priority_label === "Medium" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
              "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
            )}>
              <span className={cn(
                "h-1.5 w-1.5 rounded-full",
                actionDetail.priority_label === "High" ? "bg-red-400 animate-pulse shadow-[0_0_8px_#f87171]" :
                actionDetail.priority_label === "Medium" ? "bg-amber-400" : "bg-zinc-400"
              )} />
              {actionDetail.priority_label} Priority
            </div>
          </div>

          {/* Detail Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]">
              <p className="mb-3 font-headline text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Strategic Reasoning</p>
              <p className="text-xs font-medium leading-relaxed text-slate-300">
                {actionDetail.reason}
              </p>
              <div className="absolute left-0 top-0 h-full w-[2px] bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="group relative overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]">
              <p className="mb-3 font-headline text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Suggested Owner</p>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <UsersRound className="h-4 w-4 text-indigo-400" />
                </div>
                <p className="font-headline text-sm font-black tracking-tight text-white uppercase">{actionDetail.suggested_owner}</p>
              </div>
              <div className="absolute left-0 top-0 h-full w-[2px] bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="group relative overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]">
              <p className="mb-3 font-headline text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Suggested Timing</p>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <Clock className="h-4 w-4 text-amber-400" />
                </div>
                <p className="font-headline text-sm font-black tracking-tight text-slate-200 uppercase">{actionDetail.suggested_timing}</p>
              </div>
              <div className="absolute left-0 top-0 h-full w-[2px] bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </MotionGroup>
      ) : (
         <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm font-medium text-slate-500 italic">Recommendation analysis complete. Action mapping required.</p>
         </div>
      )}
    </MotionCard>
  );
}

