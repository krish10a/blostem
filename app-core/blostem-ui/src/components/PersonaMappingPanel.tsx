"use client";

import { useState } from "react";
import { AlertCircle, RefreshCw, Users } from "lucide-react";
import { MotionButton, MotionCard, MotionGroup } from "@/components/motion/BlostemMotion";
import { fetchWithAuth } from "@/lib/api";

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
  founder: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  ceo: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  product: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  partnerships: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  bizdev: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  growth: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  compliance: "bg-red-500/15 text-red-400 border-red-500/25",
  risk: "bg-red-500/15 text-red-400 border-red-500/25",
  engineering: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
  tech: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
};

function getRoleColor(role: string): string {
  const key = Object.keys(ROLE_COLORS).find((entry) => role.toLowerCase().includes(entry));
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
      const res = await fetchWithAuth(`/prospects/${prospect.id}/map-personas`, {
        method: "POST",
      });

      if (res.ok) {
        const updatedProspect = (await res.json()) as Prospect;
        onPersonasGenerated?.(updatedProspect);
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
    <MotionCard className="mouse-glow haptic-hover w-full rounded-xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm" delay={0.05}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <Users className="h-5 w-5 shrink-0 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Stakeholder Persona Mapping</h3>
          {personas.length > 0 && (
            <span className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
              {personas.length} Personas
            </span>
          )}
        </div>

        {personas.length > 0 && (
          <MotionButton>
            <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition-all hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Regenerate
            </button>
          </MotionButton>
        )}
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {personas.length === 0 ? (
        <div className="space-y-4">
          <p className="text-xs text-zinc-500">
            Identify 5 key decision-makers and map their pain points, objections, and pitch angles for{" "}
            <span className="font-medium text-zinc-300">{prospect?.company_name}</span>.
          </p>
          <MotionButton>
            <button
            onClick={handleGenerate}
            disabled={loading || !prospect?.signals}
            className="haptic-hover flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-500 disabled:opacity-50"
          >
            <Users className={`h-4 w-4 ${loading ? "animate-pulse" : ""}`} />
            {loading
              ? "Mapping Personas..."
              : prospect?.signals
                ? "Identify Key Stakeholders"
                : "Generate Signals First"}
            </button>
          </MotionButton>
        </div>
      ) : (
        <MotionGroup className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          {personas.map((persona, idx) => (
            <MotionCard
              key={idx}
              className="haptic-hover space-y-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/[0.07]"
              delay={idx * 0.05}
            >
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold leading-snug text-white">{persona.persona_name}</p>
                <span
                  className={`inline-flex max-w-full self-start whitespace-normal break-words rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${getRoleColor(persona.role)}`}
                >
                  {persona.role}
                </span>
              </div>

              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Pain Points
                </p>
                <p className="text-xs leading-relaxed text-zinc-300">{persona.pain_points}</p>
              </div>

              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Likely Objections
                </p>
                <p className="text-xs leading-relaxed text-zinc-400">{persona.objections}</p>
              </div>

              <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                  Best Pitch Angle
                </p>
                <p className="text-xs font-medium leading-relaxed text-emerald-200">
                  {persona.pitch_angle}
                </p>
              </div>

              <div className="flex flex-col gap-1 border-t border-white/10 pt-2 text-[11px] sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <span className="min-w-0 text-zinc-500">
                  Tone: <span className="font-semibold text-zinc-200">{persona.message_tone}</span>
                </span>
                <span className="min-w-0 text-zinc-500">
                  CTA:{" "}
                  <span className="font-semibold text-zinc-200">
                    {persona.call_to_action_style}
                  </span>
                </span>
              </div>
            </MotionCard>
          ))}
        </MotionGroup>
      )}
    </MotionCard>
  );
}
