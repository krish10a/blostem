"use client";

import { useState } from "react";
import { Zap, AlertCircle, RefreshCw, ChevronRight } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";
import { cn } from "@/lib/utils";
import { MotionCard, MotionButton, MotionGroup, MotionItem } from "@/components/motion/BlostemMotion";

type SignalsPayload = {
  signal_summary?: string;
  reason_tags?: string[];
  raw_notes?: string;
};

type Prospect = {
  id: number;
  company_name: string;
  signals?: string | null;
  priority_score?: number | null;
  score_explanation?: string | null;
  fit_score?: number | null;
  intent_score?: number | null;
  created_at?: string;
  updated_at?: string;
};

type Props = {
  prospect: Prospect;
  onSignalsGenerated?: (prospect: Prospect) => void;
};

export default function SignalIntelligencePanel({ prospect, onSignalsGenerated }: Props) {
  const [loading, setLoading] = useState(false);
  const [manualContext, setManualContext] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prospect?.id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth(`/prospects/${prospect.id}/generate-signals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manual_context: manualContext })
      });
      if (res.ok) {
        const updatedProspect = (await res.json()) as Prospect;
        if (onSignalsGenerated) onSignalsGenerated(updatedProspect);
      } else {
        const data = (await res.json()) as { detail?: string };
        setError(data.detail || "Failed to generate signals");
      }
    } catch {
      setError("Failed to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleScore = async () => {
    if (!prospect?.id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth(`/prospects/${prospect.id}/score`, {
        method: "POST"
      });
      if (res.ok) {
        const updatedProspect = (await res.json()) as Prospect;
        if (onSignalsGenerated) onSignalsGenerated(updatedProspect);
      } else {
        const data = (await res.json()) as { detail?: string };
        setError(data.detail || "Failed to compute score.");
      }
    } catch {
      setError("Failed to connect to backend for scoring.");
    } finally {
      setLoading(false);
    }
  };

  let parsedSignals: SignalsPayload | null = null;
  try {
    parsedSignals = prospect?.signals ? (JSON.parse(prospect.signals) as SignalsPayload) : null;
  } catch {
    parsedSignals = null;
  }

  return (
    <MotionCard className="glass-panel mouse-glow relative overflow-hidden rounded-[32px] p-8" hover={false} delay={0.05}>
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-[0_0_20px_rgba(177,197,255,0.15)]">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-headline text-lg font-black tracking-tight text-white uppercase">AI Signal Intelligence</h3>
              {parsedSignals && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/20 bg-secondary/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-secondary">
                  <span className="h-1 w-1 rounded-full bg-secondary shadow-[0_0_8px_#4adea3]" />
                  Signals Active
                </span>
              )}
            </div>
            <p className="mt-1 text-xs font-medium text-slate-400 tracking-wide">
              Proprietary market signals synthesized for <span className="font-bold text-white">{prospect?.company_name}</span>.
            </p>
          </div>
        </div>

        {parsedSignals && (
          <MotionButton>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="glass-button haptic-hover flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
              Regenerate
            </button>
          </MotionButton>
        )}
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-400">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      {!parsedSignals ? (
        <div className="space-y-8">
          <p className="max-w-xl text-sm font-medium leading-relaxed text-slate-400">
            Extract business signals and market intelligence using real-time public data. 
            Add custom context to sharpen the AI analysis.
          </p>
          <div className="space-y-3">
            <label className="font-headline text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Additional Context <span className="opacity-40">(Optional)</span>
            </label>
            <textarea
              className="min-h-[120px] w-full rounded-2xl border border-white/8 bg-black/20 px-5 py-4 text-sm font-medium text-white placeholder:text-slate-600 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all resize-none shadow-inner"
              placeholder="Enter funding news, recent hires, or specific pain points..."
              value={manualContext}
              onChange={(e) => setManualContext(e.target.value)}
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !prospect}
            className="btn-pipeline haptic-hover flex w-full items-center justify-center gap-3 rounded-[20px] bg-primary px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-on-primary shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
          >
            <Zap className={cn("h-4 w-4", loading && "animate-pulse")} />
            {loading ? "Synthesizing Intelligence..." : "Synthesize Market Signals"}
          </button>
        </div>
      ) : (
        <MotionGroup className="space-y-8">
          {/* Executive Summary */}
          <MotionItem className="space-y-3">
            <p className="font-headline text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Executive Summary</p>
            <div className="relative overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.02] p-7 shadow-inner transition-all hover:bg-white/[0.04]">
              <p className="relative z-10 text-[15px] font-medium leading-relaxed text-slate-200">
                {parsedSignals.signal_summary}
              </p>
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-[80px]" />
            </div>
          </MotionItem>

          {/* Tags */}
          {(parsedSignals.reason_tags?.length ?? 0) > 0 && (
            <MotionItem className="space-y-4">
              <p className="font-headline text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Strategic Intent Indicators</p>
              <div className="flex flex-wrap gap-2.5">
                {parsedSignals.reason_tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-xl border border-primary/20 bg-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-primary shadow-[0_0_20px_rgba(177,197,255,0.05)] transition-transform hover:scale-105"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-primary" />
                    {tag}
                  </span>
                ))}
              </div>
            </MotionItem>
          )}

          {/* Raw Notes */}
          {parsedSignals.raw_notes && (
            <MotionItem className="space-y-3">
              <p className="font-headline text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Source Intelligence & Evidence</p>
              <div className="relative group">
                <pre className="thin-scrollbar max-h-48 overflow-auto whitespace-pre-wrap rounded-2xl border border-white/8 bg-black/40 p-5 font-mono-ui text-[11px] leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                  {parsedSignals.raw_notes}
                </pre>
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
            </MotionItem>
          )}

          {/* Lead Scoring Section */}
          <MotionItem className="border-t border-white/8 pt-8">
            {!prospect.priority_score ? (
              <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-white/[0.01] p-10 text-center">
                 <p className="mb-6 text-sm font-medium text-slate-500">Calculate AI priority score based on signal strength and ideal customer profile fit.</p>
                 <button
                    className="btn-pipeline haptic-hover flex min-w-[280px] items-center justify-center gap-3 rounded-[20px] bg-secondary px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-on-secondary shadow-xl shadow-secondary/20 transition-all disabled:opacity-50"
                    onClick={handleScore}
                    disabled={loading}
                  >
                    <ChevronRight className={cn("h-4 w-4", loading && "animate-pulse")} />
                    {loading ? "Calculating Lead Score..." : "Generate AI Lead Score"}
                  </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <p className="mb-4 font-headline text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Prioritization Matrix</p>
                    <div className="flex items-center gap-6">
                       <div className="relative flex h-20 w-20 items-center justify-center">
                          <svg className="absolute inset-0 h-full w-full rotate-[-90deg]">
                             <circle cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-white/5" />
                             <circle 
                                cx="40" 
                                cy="40" 
                                r="36" 
                                fill="transparent" 
                                stroke="currentColor" 
                                strokeWidth="6" 
                                strokeDasharray={226.2}
                                strokeDashoffset={226.2 - (226.2 * (prospect.priority_score ?? 0)) / 100}
                                className="text-secondary shadow-[0_0_15px_#4adea3] transition-all duration-1000" 
                                strokeLinecap="round"
                             />
                          </svg>
                          <span className="font-mono-ui text-2xl font-black text-white">{(prospect.priority_score ?? 0).toFixed(0)}</span>
                       </div>
                       <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Priority Score</span>
                          <h4 className="font-headline text-xl font-black tracking-tight text-white">High Potential Lead</h4>
                       </div>
                    </div>
                  </div>
                  
                  <div className="grid w-full grid-cols-2 gap-4 lg:w-auto lg:min-w-[400px]">
                    <div className="rounded-2xl border border-white/8 bg-white/4 p-4 transition-all hover:bg-white/[0.06]">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Ideal Fit</p>
                        <span className="font-mono-ui text-xs font-black text-white">{prospect.fit_score}/100</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5 shadow-inner">
                        <div 
                          className="h-full bg-primary shadow-[0_0_10px_rgba(177,197,255,0.4)] transition-all duration-1000" 
                          style={{ width: `${prospect.fit_score}%` }} 
                        />
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/4 p-4 transition-all hover:bg-white/[0.06]">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Intent Signal</p>
                        <span className="font-mono-ui text-xs font-black text-white">{prospect.intent_score}/100</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5 shadow-inner">
                        <div 
                          className="h-full bg-secondary shadow-[0_0_10px_rgba(78,222,163,0.4)] transition-all duration-1000" 
                          style={{ width: `${prospect.intent_score}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[28px] border border-secondary/20 bg-secondary/[0.03] p-7 shadow-inner">
                   <div className="relative z-10">
                     <p className="mb-3 font-headline text-[9px] font-black uppercase tracking-[0.2em] text-secondary">AI Strategic Justification</p>
                     <p className="text-[14px] font-medium leading-relaxed text-slate-200">
                       {prospect.score_explanation}
                     </p>
                   </div>
                   <div className="absolute left-0 top-0 h-full w-1 bg-secondary/30" />
                   <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-secondary/5 blur-[60px]" />
                </div>
              </div>
            )}
          </MotionItem>
        </MotionGroup>
      )}
    </MotionCard>
  );
}

