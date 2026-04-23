"use client";

import { useState } from "react";
import { AlertCircle, RefreshCw, Users, Shield, Target, Zap } from "lucide-react";
import { MotionButton, MotionCard, MotionGroup } from "@/components/motion/BlostemMotion";
import { fetchWithAuth } from "@/lib/api";
import { cn } from "@/lib/utils";

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
  founder: "bg-violet-500/15 text-violet-400 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]",
  ceo: "bg-violet-500/15 text-violet-400 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]",
  product: "bg-blue-500/15 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
  partnerships: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
  bizdev: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
  growth: "bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
  compliance: "bg-red-500/15 text-red-400 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
  risk: "bg-red-500/15 text-red-400 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
  engineering: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]",
  tech: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]",
};

function getRoleColor(role: string): string {
  const key = Object.keys(ROLE_COLORS).find((entry) => role.toLowerCase().includes(entry));
  return key ? ROLE_COLORS[key] : "bg-primary/15 text-primary border-primary/30 shadow-[0_0_15px_rgba(177,197,255,0.1)]";
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
    <MotionCard className="glass-panel mouse-glow w-full rounded-[32px] p-8" delay={0.05} hover={false}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-secondary/20 bg-secondary/10 shadow-[0_0_20px_rgba(78,222,163,0.15)]">
            <Users className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-headline text-lg font-black tracking-tight text-white uppercase">Stakeholder Persona Mapping</h3>
              {personas.length > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary">
                  <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_8px_#b1c5ff]" />
                  {personas.length} Active Personas
                </span>
              )}
            </div>
            <p className="mt-1 text-xs font-medium text-slate-400 tracking-wide">
              Strategic profiling of key decision makers for <span className="font-bold text-white">{prospect?.company_name}</span>.
            </p>
          </div>
        </div>

        {personas.length > 0 && (
          <MotionButton>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="glass-button haptic-hover flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
              Refresh Mapping
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

      {personas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 opacity-40">
            <Target className="h-8 w-8 text-white" />
          </div>
          <p className="mb-8 max-w-sm text-sm font-medium leading-relaxed text-slate-400">
            Identify the primary decision-makers and map their unique pain points, 
            strategic objections, and optimal pitch angles.
          </p>
          <button
            onClick={handleGenerate}
            disabled={loading || !prospect?.signals}
            className="btn-pipeline haptic-hover flex min-w-[240px] items-center justify-center gap-3 rounded-[20px] bg-primary px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-on-primary shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
          >
            <Zap className={cn("h-4 w-4", loading && "animate-pulse")} />
            {loading
              ? "Profiling Stakeholders..."
              : prospect?.signals
                ? "Identify Key Personas"
                : "Signals Required First"}
          </button>
        </div>
      ) : (
        <MotionGroup className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {personas.map((persona, idx) => (
            <MotionCard
              key={idx}
              className="group relative overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.02] p-7 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              delay={idx * 0.08}
            >
              {/* Background Glow */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-[80px] transition-all group-hover:bg-primary/10" />

              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="mb-2 truncate font-headline text-lg font-black tracking-tight text-white">
                    {persona.persona_name}
                  </h4>
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-wider shadow-sm",
                      getRoleColor(persona.role)
                    )}
                  >
                    {persona.role}
                  </span>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-inner group-hover:border-white/20 transition-colors">
                  <Shield className="h-5 w-5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="mb-2.5 flex items-center gap-2">
                    <Target className="h-3 w-3 text-primary/60" />
                    <p className="font-headline text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Core Pain Points</p>
                  </div>
                  <p className="text-xs font-medium leading-relaxed text-slate-300 line-clamp-3">
                    {persona.pain_points}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-secondary/20 bg-secondary/[0.03] p-5 shadow-inner transition-all group-hover:bg-secondary/[0.06]">
                  <div className="mb-2.5 flex items-center gap-2">
                    <Zap className="h-3 w-3 text-secondary" />
                    <p className="font-headline text-[9px] font-black uppercase tracking-[0.2em] text-secondary">Strategic Pitch Angle</p>
                  </div>
                  <p className="text-xs font-bold leading-relaxed text-secondary/90">
                    {persona.pitch_angle}
                  </p>
                  {/* Accent Line */}
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-secondary/30" />
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/6 pt-5">
                <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 border border-white/5">
                  <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_8px_#b1c5ff]" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    {persona.message_tone}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 border border-white/5">
                  <span className="h-1 w-1 rounded-full bg-secondary shadow-[0_0_8px_#4adea3]" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    {persona.call_to_action_style}
                  </span>
                </div>
              </div>
            </MotionCard>
          ))}
        </MotionGroup>
      )}
    </MotionCard>
  );
}

