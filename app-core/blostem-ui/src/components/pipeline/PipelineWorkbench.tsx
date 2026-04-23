"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "sonner";
import {
  BarChart2,
  Loader2,
  RefreshCw,
  Sparkles,
  Table,
  Trash2,
  Zap,
  Target,
  Building2,
  Users,
  ChevronRight,
  Plus,
  LayoutGrid,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import PipelineIntakePanel from "@/components/PipelineIntakePanel";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import CompliancePanel from "@/components/CompliancePanel";
import OutreachGenerationPanel from "@/components/OutreachGenerationPanel";
import PersonaMappingPanel from "@/components/PersonaMappingPanel";
import SalesActionPanel from "@/components/SalesActionPanel";
import SequenceTimeline from "@/components/SequenceTimeline";
import SignalIntelligencePanel from "@/components/SignalIntelligencePanel";
import { DashboardSkeleton } from "@/components/LoadingSkeleton";
import { MotionButton, MotionCard, MotionGroup, MotionSection } from "@/components/motion/BlostemMotion";
import { fetchWithAuth } from "@/lib/api";
import { cn } from "@/lib/utils";

type Prospect = {
  id: number;
  company_name: string;
  website?: string;
  industry?: string;
  size?: string;
  signals?: string;
  fit_score?: number | null;
  intent_score?: number | null;
  priority_score?: number | null;
  confidence_score?: number | null;
  score_explanation?: string | null;
  persona_map?: string;
  messages?: string;
  compliance_status?: string;
  next_action?: string;
  sequence_plan?: string;
  outreach_status?: string;
};

function normalizeProspect(p: Prospect): Prospect {
  return {
    ...p,
    website: p.website ?? undefined,
    industry: p.industry ?? undefined,
    size: p.size ?? undefined,
    signals: (p.signals as string | null | undefined) ?? undefined,
    score_explanation: p.score_explanation ?? undefined,
    persona_map: (p.persona_map as string | null | undefined) ?? undefined,
    messages: (p.messages as string | null | undefined) ?? undefined,
    compliance_status: (p.compliance_status as string | null | undefined) ?? undefined,
    next_action: (p.next_action as string | null | undefined) ?? undefined,
    sequence_plan: (p.sequence_plan as string | null | undefined) ?? undefined,
    outreach_status: (p.outreach_status as string | null | undefined) ?? undefined,
  };
}

function parseComplianceStatus(raw?: string | null): string | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw);
    return obj.overall_status || null;
  } catch {
    return raw;
  }
}

function parsePrimaryPersona(raw?: string | null): string | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw);
    const personas = obj.personas || [];
    if (personas.length > 0) return personas[0].role || personas[0].name || null;
  } catch {
    // ignore
  }
  return null;
}

function getStatusColor(status?: string | null): string {
  if (status === "FLAGGED") return "bg-red-500/15 text-red-400 border-red-500/20";
  if (status === "NEEDS_REVISION") return "bg-amber-500/15 text-amber-400 border-amber-500/20";
  if (status === "APPROVED") return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
  return "bg-white/5 text-slate-500 border-white/10";
}

const SAMPLE_PROSPECTS: Prospect[] = [
  {
    id: -1,
    company_name: "Vertex Infrastructure",
    website: "https://vertex-infra.io",
    industry: "Energy & Grid",
    size: "500-1000",
    priority_score: 94,
    fit_score: 88,
    intent_score: 96,
    confidence_score: 92,
    signals: JSON.stringify({
      growth_signals: ["Series C Expansion", "New Data Center Build"],
      tech_stack: ["Kubernetes", "Terraform", "NVIDIA H100"],
      pain_points: ["Latency in edge inference", "High ingress costs"]
    }),
    persona_map: JSON.stringify({
      personas: [
        { role: "VP Engineering", name: "Alex Chen", priority: "High" },
        { role: "Head of Infrastructure", name: "Sarah Miller", priority: "Medium" }
      ]
    }),
    messages: JSON.stringify({
      email: "Hi Alex,\n\nI noticed Vertex is scaling its edge inference layer. Most firms at your stage struggle with H100 utilization ratios. Blostem's sovereign orchestration could reduce your ingress overhead by 40%.\n\nWould a technical deep dive next Tuesday help?",
      linkedin: "Alex - impressive work on the Series C. Vertex is clearly leading in the Energy/Grid sector. Let's connect on edge efficiency."
    }),
    compliance_status: JSON.stringify({
      overall_status: "APPROVED",
      safe_to_send: true,
      issues: [],
      compliance_summary: "Sequence adheres to enterprise safety protocols and brand voice guidelines."
    })
  },
  {
    id: -2,
    company_name: "CloudScale Logic",
    website: "https://cloudscale.ai",
    industry: "SaaS",
    size: "100-250",
    priority_score: 78,
    fit_score: 72,
    intent_score: 85,
    confidence_score: 80,
    signals: JSON.stringify({
      growth_signals: ["Hiring VP Sales", "Market expansion to EMEA"],
      tech_stack: ["React", "Go", "AWS"],
      pain_points: ["Manual prospect scoring", "Fragmented outreach"]
    })
  }
];

export default function PipelineWorkbench() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const params = useSearchParams();
  const urlId = params.get("id");
  const [activeTab, setActiveTab] = useState<"pipeline" | "analytics">("pipeline");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [prospectListMode, setProspectListMode] = useState<"cards" | "table">("cards");
  const router = useRouter();

  const selectProspect = (p: Prospect | null) => {
    setSelectedProspect(p);
    if (p) {
      router.push(`/pipeline?id=${p.id}`, { scroll: false });
    } else {
      router.push('/pipeline', { scroll: false });
    }
  };

  const sidebarRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef<number>(0);

  const fetchProspects = async (showRefreshing = true) => {
    if (showRefreshing) setIsRefreshing(true);
    try {
      const res = await fetchWithAuth("/prospects/");
      if (res.ok) {
        let data: Prospect[] = await res.json();
        data = data.map(normalizeProspect);
        data = data.sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0));
        console.log("Prospects fetched:", data.length);
        setProspects(data);
        // Notify other components (like sidebar) that prospects were updated
        window.dispatchEvent(new CustomEvent('prospects-updated'));
        if (selectedProspect) {
          const updated = data.find((p) => p.id === selectedProspect.id);
          if (updated) setSelectedProspect(updated);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      // Only toast error if it's not a generic connection issue during first load
      if (showRefreshing) toast.error("Failed to reach backend. Using cached intelligence.");
      
      // Fallback to sample data if database is empty or unreachable
      if (prospects.length === 0) {
        setProspects(SAMPLE_PROSPECTS);
      }
    } finally {
      setIsRefreshing(false);
      setProspects(prev => prev.length === 0 ? SAMPLE_PROSPECTS : prev);
    }
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void fetchProspects(false);
    }, 0);
    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync selection with URL
  useEffect(() => {
    if (urlId && prospects.length > 0) {
      const p = prospects.find(p => p.id.toString() === urlId);
      if (p) setSelectedProspect(p);
    }
  }, [urlId, prospects]);

  useEffect(() => {
    if (sidebarRef.current) sidebarRef.current.scrollTop = scrollPosRef.current;
  }, [prospects]);

  const handleProspectUpdate = () => fetchProspects(false);

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this prospect and all its data?")) return;
    setDeletingId(id);
    try {
      const res = await fetchWithAuth(`/prospects/${id}`, { method: "DELETE" });
      if (res.ok || res.status === 204) {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        toast.success("Prospect deleted.");
        if (selectedProspect?.id === id) setSelectedProspect(null);
        void fetchProspects();
      } else {
        toast.error("Failed to delete prospect.");
      }
    } catch {
      toast.error("Failed to connect to backend.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleBatchDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} selected prospects?`)) return;
    setIsRefreshing(true);
    try {
      const res = await fetchWithAuth("/prospects/batch-delete", {
        method: "POST",
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });
      if (!res.ok) throw new Error("Batch delete failed");
      setSelectedIds(new Set());
      toast.success("Batch delete complete.");
      void fetchProspects();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Batch delete failed");
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleSelect = (id: number, e: React.MouseEvent | React.ChangeEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleRunFullPipeline = async () => {
    if (!selectedProspect) return;
    setPipelineRunning(true);

    const steps = [
      {
        label: "Market Intelligence",
        url: "generate-signals",
        body: { manual_context: "" },
        skip: !!selectedProspect.signals && !!selectedProspect.persona_map,
      },
      {
        label: "Sequence Generation",
        url: "generate-outreach",
        body: null,
        skip: !!selectedProspect.messages,
      },
    ] as const;

    let current = { ...selectedProspect };
    for (const step of steps) {
      if (step.skip) continue;
      setPipelineStep(step.label);
      try {
        const res = await fetchWithAuth(`/prospects/${current.id}/${step.url}`, {
          method: "POST",
          ...(step.body ? { body: JSON.stringify(step.body) } : {}),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({ detail: "Unknown error" }));
          toast.error(`Pipeline stopped at "${step.label}": ${err.detail || "Request failed"}`);
          break;
        }
        current = normalizeProspect(await res.json());
        setSelectedProspect(current);
      } catch {
        toast.error(`Pipeline stopped: network error at "${step.label}"`);
        break;
      }
    }

    await fetchProspects();
    setPipelineRunning(false);
    setPipelineStep(null);
    toast.success("Full pipeline complete.");
  };

  return (
    <div className="relative min-h-screen bg-[#050810] text-slate-200 selection:bg-primary/30">
      <Toaster richColors position="top-right" />
      
      {/* Cinematic Background Elements */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="bg-mesh absolute inset-0 opacity-[0.03]" />
        <div className="animate-mesh absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="animate-mesh-slow absolute top-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <MotionCard className="glass-panel relative flex-1 overflow-hidden rounded-[24px] p-6 sm:p-8" hover={false}>
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap className="h-40 w-40 text-primary" />
            </div>
            <div className="relative z-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="font-mono-ui text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                  Operational Layer
                </span>
                <div className="h-1 w-1 rounded-full bg-slate-700" />
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {prospects.length} Active Accounts
                </span>
              </div>
              <h2 className="font-headline text-gradient text-5xl font-black tracking-tighter sm:text-6xl">
                Pipeline Workbench
              </h2>
              <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-400">
                Orchestrate high-fidelity outreach with cinematic precision. Add prospects, 
                extract market intelligence, and automate multi-channel generation in real-time.
              </p>
            </div>
          </MotionCard>

          <MotionSection className="flex flex-wrap items-center gap-4" delay={0.08}>
            <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-[#0b1326]/60 p-1.5 backdrop-blur-2xl">
              <button
                onClick={() => setActiveTab("pipeline")}
                className={cn(
                  "haptic-hover flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-[0.15em] transition-all",
                  activeTab === "pipeline"
                    ? "bg-primary text-on-primary shadow-xl shadow-primary/20"
                    : "text-slate-500 hover:text-slate-200"
                )}
              >
                <Zap className="h-3.5 w-3.5" />
                Pipeline
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={cn(
                  "haptic-hover flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-[0.15em] transition-all",
                  activeTab === "analytics"
                    ? "bg-primary text-on-primary shadow-xl shadow-primary/20"
                    : "text-slate-500 hover:text-slate-200"
                )}
              >
                <BarChart2 className="h-3.5 w-3.5" />
                Analytics
              </button>
            </div>

            <button
              onClick={() => fetchProspects()}
              disabled={isRefreshing}
              className="glass-button haptic-hover flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 disabled:opacity-50"
            >
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
              Sync
            </button>
          </MotionSection>
        </div>

        {activeTab === "analytics" ? (
          <div className="mx-auto max-w-[1600px] px-6 lg:px-12 animate-fade-up">
            <AnalyticsDashboard />
          </div>
        ) : (
          <div className="flex w-full overflow-hidden border-t border-white/5 bg-slate-950">
            {isRefreshing && prospects.length === 0 ? (
              <div className="mx-auto w-full px-6 py-12 lg:px-12">
                <DashboardSkeleton />
              </div>
            ) : (
              <div className="flex w-full h-[calc(100vh-100px)] overflow-hidden">
                {/* Left Column: Stationary sidebar (Grounded) */}
                <div className="w-[420px] flex-shrink-0 flex flex-col border-r border-white/5 bg-black/20">
                  <PipelineIntakePanel
                    prospects={prospects}
                    selectedProspectId={selectedProspect?.id}
                    onSelect={selectProspect}
                    onRefresh={() => fetchProspects(false)}
                    selectedIds={selectedIds}
                    onToggleSelect={toggleSelect}
                    onDelete={handleDelete}
                    onBatchDelete={handleBatchDelete}
                    listMode={prospectListMode}
                    setListMode={setProspectListMode}
                  />
                </div>

                {/* Right Column: Processing Surface (Grounded) */}
                <div className="flex-1 flex flex-col overflow-hidden bg-slate-900/10">
                  {selectedProspect ? (
                    <div className="flex h-full flex-col overflow-hidden">
                      {/* Fixed Sub-Header */}
                      <div className="border-b border-white/5 bg-white/[0.02] p-8">
                        <div className="flex flex-wrap items-start justify-between gap-6">
                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex items-center gap-3">
                              <span className="flex items-center gap-2 rounded-lg bg-primary/10 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-primary border border-primary/20">
                                <span className="h-1 w-1 animate-pulse rounded-full bg-primary" />
                                Live Context
                              </span>
                              <span className="text-[10px] font-bold text-slate-500">{selectedProspect.website || "No URL"}</span>
                            </div>
                            <h2 className="font-headline text-4xl font-black tracking-tight text-white">
                              {selectedProspect.company_name}
                            </h2>
                          </div>
                          <div className="flex items-center gap-4">
                             <button 
                              onClick={handleRunFullPipeline}
                              disabled={pipelineRunning}
                              className="group flex items-center gap-3 rounded-xl bg-primary px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-primary/80 disabled:opacity-50 shadow-lg shadow-primary/20"
                            >
                              {pipelineRunning ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                              {pipelineRunning ? "Processing..." : "Run Engine"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Scrollable Flow */}
                      <div className="flex-1 overflow-y-auto p-8 thin-scrollbar space-y-10">
                         {pipelineRunning && (
                            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/5 p-8 shadow-[0_0_40px_rgba(177,197,255,0.1)]">
                              <div className="absolute right-0 top-0 h-48 w-48 -mr-12 -mt-12 rounded-full bg-primary/10 blur-3xl animate-pulse" />
                              <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="relative flex h-10 w-10 items-center justify-center">
                                    <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                                    <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-[0_0_15px_rgba(177,197,255,0.5)]">
                                      <Zap className="h-3.5 w-3.5 text-on-primary" />
                                    </div>
                                  </div>
                                  <div>
                                    <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                                      AI Core Active
                                    </span>
                                    <span className="block font-headline text-lg font-bold text-white">
                                      {pipelineStep || "Initializing..."}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="block font-mono text-[10px] font-bold text-primary/60 uppercase tracking-widest">Processing Intelligence</span>
                                  <span className="block font-mono text-xs text-primary">LAYER_0{pipelineStep === "Market Intelligence" ? "1" : "2"}_ALPHA</span>
                                </div>
                              </div>
                              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                                <div className="animate-progress-infinite absolute inset-0 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                                <div 
                                  className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_10px_#b1c5ff]" 
                                  style={{ width: pipelineStep === "Market Intelligence" ? "45%" : "85%" }}
                                />
                              </div>
                              <div className="mt-4 flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-500">
                                <span>Signal Extraction</span>
                                <span>Persona Synthesis</span>
                                <span>Outreach Generation</span>
                              </div>
                            </div>
                          )}

                        <SignalIntelligencePanel
                          prospect={selectedProspect}
                          key={`signals-${selectedProspect.id}`}
                          onSignalsGenerated={() => {
                            void fetchProspects(false);
                            toast.success("Intelligence stream extracted.");
                          }}
                        />

                        {selectedProspect.signals && (
                          <PersonaMappingPanel
                            prospect={selectedProspect}
                            key={`persona-${selectedProspect.id}`}
                            onPersonasGenerated={() => {
                              void fetchProspects(false);
                              toast.success("Personas mapped.");
                            }}
                          />
                        )}

                        {selectedProspect.persona_map && (
                          <OutreachGenerationPanel
                            key={`outreach-${selectedProspect.id}`}
                            prospect={selectedProspect}
                            onUpdate={handleProspectUpdate}
                          />
                        )}

                        {selectedProspect.messages && (
                          <CompliancePanel
                            key={`compliance-${selectedProspect.id}`}
                            prospect={selectedProspect}
                          />
                        )}

                        {selectedProspect.sequence_plan && (
                          <SequenceTimeline
                            planJson={selectedProspect.sequence_plan}
                            companyName={selectedProspect.company_name}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center opacity-40">
                        <Building2 className="mx-auto mb-6 h-16 w-16 text-slate-700" />
                        <h3 className="font-headline text-2xl font-bold text-white">Select Account</h3>
                        <p className="mt-2 text-sm text-slate-500">Queue is idle. Pick a prospect to begin enrichment.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
