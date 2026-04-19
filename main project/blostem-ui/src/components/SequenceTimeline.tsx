"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Mail, Share2, Clock, Calendar, Send, CheckCircle2, Lock } from "lucide-react";

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
      // Delete this step
      delete newLog[`${pIdx}-${sIdx}`];
      // Cascading delete for subsequent sent steps to maintain consistency
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
  } catch (e) {
    return (
      <div className="p-8 text-center border-2 border-dashed border-white/10 rounded-xl">
        <p className="text-zinc-400">Unable to load sequence timeline. Please regenerate outreach.</p>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="p-8 text-center border-2 border-dashed border-white/10 rounded-xl">
        <p className="text-zinc-400">No sequence plan available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4 w-full min-w-0">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-400" />
          Outreach Sequence Timeline
        </h2>
        <p className="text-zinc-400">
          Personalized multi-touch strategy for <span className="text-blue-300 font-medium">{companyName}</span>
        </p>
      </div>

      <div className="w-full overflow-x-auto pb-6 pt-2" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="flex gap-6 w-max min-w-full">
        {plans.map((plan, pIdx) => (
          <div key={pIdx} className="w-[320px] shrink-0 space-y-5">
            <div className="flex items-center gap-3">
              <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                {plan.persona_name}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent"></div>
            </div>

            <div className="relative pl-6 border-l-2 border-zinc-800 space-y-8">
              {(plan.steps || []).map((step, sIdx) => {
                const key = `${pIdx}-${sIdx}`;
                const sentDate = sentLog[key];
                const isUnlocked = sIdx === 0 || !!sentLog[`${pIdx}-${sIdx - 1}`];

                return (
                  <div key={sIdx} className="relative">
                    {/* Dot */}
                    <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-all ${
                      sentDate 
                        ? 'bg-emerald-500 border-emerald-400 shadow-emerald-500/50' 
                        : isUnlocked
                          ? 'bg-zinc-900 border-blue-400 shadow-blue-500/50'
                          : 'bg-zinc-900 border-zinc-700 shadow-none'
                    }`}></div>
                    
                    <Card className={`transition-all overflow-hidden border ${
                      sentDate 
                        ? 'bg-emerald-500/5 border-emerald-500/20' 
                        : isUnlocked
                          ? 'bg-zinc-900/50 border-white/5 hover:border-white/10'
                          : 'bg-zinc-950/30 border-white/5 opacity-50 grayscale-[50%]'
                    }`}>
                      <CardHeader className="py-3 px-4 bg-white/5 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                          <Clock className="w-4 h-4 text-zinc-500" />
                          Day {step.day}
                        </div>
                        <div className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter text-zinc-400">
                          {step.channel}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className={`flex items-center gap-2 ${sentDate ? 'text-emerald-300' : isUnlocked ? 'text-blue-300' : 'text-zinc-500'}`}>
                          {step.channel.toLowerCase() === 'linkedin' ? (
                            <Share2 className="w-4 h-4 shrink-0" />
                          ) : (
                            <Mail className="w-4 h-4 shrink-0" />
                          )}
                          <span className="font-semibold text-sm truncate">
                            {step.subject || "No Subject"}
                          </span>
                        </div>
                        <p className={`text-xs leading-relaxed line-clamp-3 whitespace-pre-wrap italic ${
                          isUnlocked ? 'text-zinc-400' : 'text-zinc-600'
                        }`}>
                          "{step.body}"
                        </p>

                        <div className="pt-2 border-t border-white/5">
                          {sentDate ? (
                            <button
                              onClick={() => handleUndo(pIdx, sIdx)}
                              className="group flex items-center justify-between w-full text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-md border border-emerald-500/20 transition-all cursor-pointer"
                              title="Click to Undo"
                            >
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Sent on {sentDate}
                              </div>
                              <span className="opacity-0 group-hover:opacity-100 text-emerald-500 transition-opacity">
                                Undo
                              </span>
                            </button>
                          ) : isUnlocked ? (
                            <button
                              onClick={() => handleSend(pIdx, sIdx)}
                              className="flex items-center justify-center gap-2 w-full py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors"
                            >
                              <Send className="w-3.5 h-3.5" />
                              Send Now
                            </button>
                          ) : (
                            <button
                              disabled
                              className="flex items-center justify-center gap-2 w-full py-1.5 text-xs font-medium text-zinc-500 bg-zinc-800/30 rounded-md cursor-not-allowed border border-white/5"
                            >
                              <Lock className="w-3.5 h-3.5" />
                              Locked
                            </button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default SequenceTimeline;

