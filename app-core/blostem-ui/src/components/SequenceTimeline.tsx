"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Share2, 
  Clock, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Lock, 
  Phone, 
  FileText,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { MotionCard, MotionGroup, MotionSection } from "@/components/motion/BlostemMotion";
import { cn } from "@/lib/utils";

interface SequenceStep {
  day: number;
  channel: string;
  subject?: string;
  body: string;
}

interface SequencePlan {
  persona_name: string;
  steps: SequenceStep[];
}

interface SequenceTimelineProps {
  planJson: string;
  companyName: string;
}

const SequenceTimeline: React.FC<SequenceTimelineProps> = ({ planJson, companyName }) => {
  const [sentLog, setSentLog] = useState<Record<string, string>>({});

  const handleSend = (pIdx: number, sIdx: number) => {
    const key = `${pIdx}-${sIdx}`;
    const dateStr = new Date().toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric'
    });
    setSentLog(prev => ({ ...prev, [key]: dateStr }));
  };

  const handleUndo = (pIdx: number, sIdx: number) => {
    setSentLog(prev => {
      const newLog = { ...prev };
      delete newLog[`${pIdx}-${sIdx}`];
      for (let i = sIdx + 1; i < 20; i++) {
        if (newLog[`${pIdx}-${i}`]) {
          delete newLog[`${pIdx}-${i}`];
        } else {
          break;
        }
      }
      return newLog;
    });
  };

  let plans: SequencePlan[] = [];
  try {
    const parsed = JSON.parse(planJson);
    plans = parsed.sequence_payload || [];
  } catch {
    return (
      <MotionCard className="glass-panel rounded-[24px] p-12 text-center" hover={false}>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
          <Calendar className="h-6 w-6 text-slate-500" />
        </div>
        <p className="text-sm font-medium text-slate-400">Unable to load sequence timeline. Please regenerate outreach.</p>
      </MotionCard>
    );
  }

  if (plans.length === 0) {
    return (
      <MotionCard className="glass-panel rounded-[24px] p-12 text-center" hover={false}>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
          <Calendar className="h-6 w-6 text-slate-500" />
        </div>
        <p className="text-sm font-medium text-slate-400">No sequence plan available yet.</p>
      </MotionCard>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-8 py-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <Calendar className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="font-headline text-lg font-black tracking-tight text-white uppercase italic">Strategic Orchestration</h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Target Entity</span>
              <ChevronRight className="h-3 w-3 text-slate-700" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/80">{companyName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="thin-scrollbar-x w-full overflow-x-auto pb-8 pt-2">
        <div className="flex gap-8 w-max min-w-full">
          {plans.map((plan, pIdx) => (
            <div key={pIdx} className="w-[360px] shrink-0 space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 shadow-[0_0_15px_rgba(59,130,246,0.05)]">
                  <Sparkles className="h-3 w-3 text-blue-400" />
                  <span className="truncate text-[10px] font-black uppercase tracking-[0.15em] text-blue-300">
                    {plan.persona_name}
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent"></div>
              </div>

              <div className="relative border-l-2 border-white/5 pl-8 space-y-10">
                <MotionGroup className="space-y-10">
                  {(plan.steps || []).map((step, sIdx) => {
                    const key = `${pIdx}-${sIdx}`;
                    const sentDate = sentLog[key];
                    const isUnlocked = sIdx === 0 || !!sentLog[`${pIdx}-${sIdx - 1}`];

                    return (
                      <div key={sIdx} className="relative">
                        {/* Timeline Connector Dot */}
                        <div className={cn(
                          "absolute -left-[41px] top-4 h-5 w-5 rounded-full border-2 transition-all duration-500",
                          sentDate 
                            ? "bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-110" 
                            : isUnlocked
                              ? "bg-slate-900 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                              : "bg-slate-950 border-white/10"
                        )} />

                        <MotionCard 
                          className={cn(
                            "glass-panel relative overflow-hidden rounded-[24px] border transition-all duration-500",
                            sentDate 
                              ? "border-emerald-500/20 bg-emerald-500/[0.03]" 
                              : isUnlocked
                                ? "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                                : "border-white/5 bg-white/[0.01] opacity-40 grayscale pointer-events-none"
                          )}
                          delay={sIdx * 0.05}
                          hover={isUnlocked && !sentDate}
                        >
                          <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-3">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3.5 w-3.5 text-slate-500" />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Day {step.day}</span>
                            </div>
                            <div className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                              {step.channel}
                            </div>
                          </div>

                          <div className="p-6 space-y-4">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors",
                                sentDate 
                                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                                  : "bg-primary/10 border-primary/20 text-primary"
                              )}>
                                {(() => {
                                  const c = step.channel.toLowerCase();
                                  if (c.includes("linkedin")) return <Share2 className="h-5 w-5" />;
                                  if (c.includes("call") || c.includes("phone")) return <Phone className="h-5 w-5" />;
                                  if (c.includes("note") || c.includes("internal")) return <FileText className="h-5 w-5" />;
                                  return <Mail className="h-5 w-5" />;
                                })()}
                              </div>
                              <h4 className="font-headline text-sm font-black tracking-tight text-white line-clamp-1">
                                {step.subject || "Engagement Bridge"}
                              </h4>
                            </div>

                            <p className="text-xs font-medium leading-relaxed text-slate-400 line-clamp-3">
                              &quot;{step.body}&quot;
                            </p>

                            <div className="pt-4">
                              {sentDate ? (
                                <button
                                  onClick={() => handleUndo(pIdx, sIdx)}
                                  className="group flex w-full items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-emerald-400 transition-all hover:bg-emerald-500/20"
                                >
                                  <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    {sentDate}
                                  </div>
                                  <span className="opacity-0 transition-opacity group-hover:opacity-100 italic">Undo</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleSend(pIdx, sIdx)}
                                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-on-primary shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px] hover:shadow-primary/30"
                                >
                                  <Send className="h-3.5 w-3.5" />
                                  Execute Touchpoint
                                </button>
                              )}
                            </div>
                          </div>
                          
                          {sentDate && (
                            <div className="absolute right-[-20px] top-[-20px] h-16 w-16 rotate-12 rounded-full bg-emerald-500/5 blur-xl" />
                          )}
                        </MotionCard>
                      </div>
                    );
                  })}
                </MotionGroup>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SequenceTimeline;
