"use client";

import { useState } from "react";
import { Zap, AlertCircle, RefreshCw, ChevronRight } from "lucide-react";

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
      const res = await fetch(`http://127.0.0.1:8000/prospects/${prospect.id}/generate-signals`, {
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
      const res = await fetch(`http://127.0.0.1:8000/prospects/${prospect.id}/score`, {
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
    <div className="mouse-glow reveal haptic-hover animate-fade-in-up rounded-xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">AI Signal Intelligence</h3>
          {parsedSignals && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
              ✓ Signals Ready
            </span>
          )}
        </div>
        {parsedSignals && (
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Regenerate
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {!parsedSignals ? (
        /* ── No Signals State ────────────────────────────────────── */
        <div className="space-y-4">
          <p className="text-xs text-zinc-500">
            Extract business signals from public data and AI inference for{" "}
            <span className="text-zinc-300 font-medium">{prospect?.company_name}</span>.
          </p>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">
              Raw Notes / News / Context{" "}
              <span className="text-zinc-600">(optional)</span>
            </label>
            <textarea
              className="w-full min-h-[80px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none"
              placeholder="e.g. Recently raised $20M Series B, expanding payments team in UK…"
              value={manualContext}
              onChange={(e) => setManualContext(e.target.value)}
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !prospect}
            className="btn-pipeline haptic-hover w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2 transition-all disabled:opacity-50"
          >
            <Zap className={`h-4 w-4 ${loading ? "animate-pulse" : ""}`} />
            {loading ? "Extracting Signals via Gemini…" : "Extract Market Signals"}
          </button>
        </div>
      ) : (
        /* ── Signals Populated State ─────────────────────────────── */
        <div className="space-y-5">
          {/* Signal Summary */}
          <div className="rounded-lg bg-white/5 border border-white/10 p-4 space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-2">Signal Summary</p>
            <p className="text-sm text-zinc-200 leading-relaxed">{parsedSignals.signal_summary}</p>
          </div>

          {/* Reason Tags */}
          {(parsedSignals.reason_tags?.length ?? 0) > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Reason Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {(parsedSignals.reason_tags ?? []).map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-medium text-indigo-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Raw Notes */}
          {parsedSignals.raw_notes && (
            <div className="space-y-2">
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Raw Notes</p>
              <pre className="text-xs text-zinc-400 bg-white/5 border border-white/10 rounded-lg p-3 overflow-auto whitespace-pre-wrap leading-relaxed">
                {parsedSignals.raw_notes}
              </pre>
            </div>
          )}

          {/* Score Section */}
          <div className="border-t border-white/10 pt-4">
            {!prospect.priority_score ? (
              <button
                className="btn-pipeline haptic-hover w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2 transition-all disabled:opacity-50"
                onClick={handleScore}
                disabled={loading}
              >
                <ChevronRight className={`h-4 w-4 ${loading ? "animate-pulse" : ""}`} />
                {loading ? "Calculating Score…" : "Calculate AI Lead Score"}
              </button>
            ) : (
              <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4 space-y-3">
                <p className="text-[10px] uppercase font-bold tracking-wider text-blue-400">Score Justification</p>
                <p className="text-xs text-blue-200 leading-relaxed whitespace-pre-wrap">
                  {prospect.score_explanation}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="rounded-md bg-white/5 border border-white/5 px-3 py-2">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Fit Score</p>
                    <p className="text-sm font-bold text-white mt-0.5">{prospect.fit_score}<span className="text-zinc-500 text-xs">/100</span></p>
                  </div>
                  <div className="rounded-md bg-white/5 border border-white/5 px-3 py-2">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Intent Score</p>
                    <p className="text-sm font-bold text-white mt-0.5">{prospect.intent_score}<span className="text-zinc-500 text-xs">/100</span></p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
