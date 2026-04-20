"use client";

import { useState } from "react";
import { Users, AlertCircle, RefreshCw } from "lucide-react";

type Persona = {
  persona_name: string;
  role: string;
  pain_points: string;
  objections: string;
  pitch_angle: string;
  message_tone: string;
  call_to_action_style: string;
};

type PersonaMap = {
  personas?: Persona[];
};

type Prospect = {
  id: number;
  company_name?: string;
  signals?: string | null;
  persona_map?: string | null;
};

type Props = {
  prospect: Prospect;
  onPersonasGenerated?: (prospect: Prospect) => void;
};

const ROLE_COLORS: Record<string, string> = {
  "founder":      "bg-violet-500/15 text-violet-400 border-violet-500/25",
  "ceo":          "bg-violet-500/15 text-violet-400 border-violet-500/25",
  "product":      "bg-blue-500/15 text-blue-400 border-blue-500/25",
  "partnerships": "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "bizdev":       "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "growth":       "bg-amber-500/15 text-amber-400 border-amber-500/25",
  "compliance":   "bg-red-500/15 text-red-400 border-red-500/25",
  "risk":         "bg-red-500/15 text-red-400 border-red-500/25",
  "engineering":  "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
  "tech":         "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
};

function getRoleColor(role: string): string {
  const key = Object.keys(ROLE_COLORS).find((k) =>
    role.toLowerCase().includes(k)
  );
  return key ? ROLE_COLORS[key] : "bg-indigo-500/15 text-indigo-400 border-indigo-500/25";
}

export default function PersonaMappingPanel({ prospect, onPersonasGenerated }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prospect?.id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://127.0.0.1:8000/prospects/${prospect.id}/map-personas`, {
        method: "POST"
      });
      if (res.ok) {
        const updatedProspect = (await res.json()) as Prospect;
        if (onPersonasGenerated) onPersonasGenerated(updatedProspect);
      } else {
        const data = (await res.json()) as { detail?: string };
        setError(data.detail || "Failed to map personas");
      }
    } catch {
      setError("Failed to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  let parsedMapping: PersonaMap | null = null;
  try {
    parsedMapping = prospect?.persona_map ? (JSON.parse(prospect.persona_map) as PersonaMap) : null;
  } catch {
    parsedMapping = null;
  }
  const personas: Persona[] = parsedMapping?.personas || [];

  return (
    <div className="mouse-glow reveal haptic-hover animate-fade-in-up delay-50 rounded-xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Stakeholder Persona Mapping</h3>
          {personas.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
              ✓ {personas.length} Personas
            </span>
          )}
        </div>
        {personas.length > 0 && (
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

      {personas.length === 0 ? (
        /* ── Empty State ─────────────────────────────────────────── */
        <div className="space-y-4">
          <p className="text-xs text-zinc-500">
            Identify 5 key decision-makers and map their pain points, objections, and pitch angles for{" "}
            <span className="text-zinc-300 font-medium">{prospect?.company_name}</span>.
          </p>
          <button
            onClick={handleGenerate}
            disabled={loading || !prospect?.signals}
            className="haptic-hover w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2 transition-all disabled:opacity-50"
          >
            <Users className={`h-4 w-4 ${loading ? "animate-pulse" : ""}`} />
            {loading
              ? "Mapping Personas…"
              : prospect?.signals
              ? "Identify Key Stakeholders"
              : "Generate Signals First"}
          </button>
        </div>
      ) : (
        /* ── Personas Grid ───────────────────────────────────────── */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {personas.map((persona, idx) => (
            <div
              key={idx}
              className="haptic-hover rounded-lg border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-colors p-4 space-y-3"
            >
              {/* Persona header */}
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-white leading-snug">{persona.persona_name}</p>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${getRoleColor(persona.role)}`}
                >
                  {persona.role}
                </span>
              </div>

              {/* Pain points */}
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">Pain Points</p>
                <p className="text-xs text-zinc-300 leading-relaxed">{persona.pain_points}</p>
              </div>

              {/* Objections */}
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">Likely Objections</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{persona.objections}</p>
              </div>

              {/* Pitch angle */}
              <div className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-3 py-2">
                <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-500 mb-1">Best Pitch Angle</p>
                <p className="text-xs text-emerald-200 leading-relaxed font-medium">{persona.pitch_angle}</p>
              </div>

              {/* Tone + CTA row */}
              <div className="flex justify-between pt-1 border-t border-white/10 text-[11px]">
                <span className="text-zinc-500">
                  Tone:{" "}
                  <span className="font-semibold text-zinc-200">{persona.message_tone}</span>
                </span>
                <span className="text-zinc-500">
                  CTA:{" "}
                  <span className="font-semibold text-zinc-200">{persona.call_to_action_style}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
