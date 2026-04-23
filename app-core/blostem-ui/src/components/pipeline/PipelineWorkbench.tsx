"use client";

import { useEffect, useRef, useState } from "react";
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
import ProspectCSVUpload from "@/components/ProspectCSVUpload";
import ProspectIntakeForm from "@/components/ProspectIntakeForm";
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

export default function PipelineWorkbench() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const searchParams = useSearchParams();
  const urlId = searchParams.get("id");
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
        setProspects(data);
        // Notify other components (like sidebar) that prospects were updated
        window.dispatchEvent(new CustomEvent('prospects-updated'));
        if (selectedProspect) {
          const updated = data.find((p) => p.id === selectedProspect.id);
          if (updated) setSelectedProspect(updated);
        }
      }
    } catch {
      toast.error("Failed to reach backend. Is the server running?");
    } finally {
      setIsRefreshing(false);
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
    <div className="relative min-h-screen">
      <Toaster richColors position="top-right" />
      
      {/* Cinematic Background Elements */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="bg-mesh absolute inset-0 opacity-[0.03]" />
        <div className="animate-mesh absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="animate-mesh-slow absolute top-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <MotionCard className="glass-panel relative flex-1 overflow-hidden rounded-[32px] p-8 sm:p-10" hover={false}>
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
          <div className="animate-fade-up">
            <AnalyticsDashboard />
          </div>
        ) : (
          <div className="animate-fade-up">
            {isRefreshing && prospects.length === 0 ? (
              <DashboardSkeleton />
            ) : (
              <div className="grid w-full gap-10 xl:grid-cols-[400px_1fr]">
                {/* Left Column: Intake & Queue */}
                <div className="flex flex-col gap-8 xl:sticky xl:top-8 xl:h-[calc(100vh-10rem)] xl:self-start">
                  <MotionCard className="glass-panel flex flex-col gap-8 rounded-[32px] p-8" hover={false}>
                    <div className="space-y-8">
                      <div>
                        <h3 className="mb-5 flex items-center gap-2 font-headline text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                          <Plus className="h-3.5 w-3.5" />
                          Intake Protocol
                        </h3>
                        <ProspectIntakeForm
                          onProspectAdded={() => {
                            void fetchProspects();
                            toast.success("Prospect injected into stream.");
                          }}
                        />
                      </div>

                      <div className="border-t border-white/8 pt-8">
                        <h3 className="mb-5 flex items-center gap-2 font-headline text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
                          <Table className="h-3.5 w-3.5" />
                          Mass Ingestion
                        </h3>
                        <ProspectCSVUpload
                          onProspectAdded={() => {
                            void fetchProspects();
                            toast.success("CSV stream verified.");
                          }}
                        />
                      </div>

                      <button
                        onClick={async () => {
                          if (!confirm("Seed 10 demo prospects?")) return;
                          await fetchWithAuth("/prospects/seed-sample-data", {
                            method: "POST",
                          });
                          void fetchProspects();
                        }}
                        className="glass-button haptic-hover group flex w-full items-center justify-center gap-3 rounded-2xl border border-dashed border-white/20 py-4 text-xs font-black uppercase tracking-widest text-slate-500 transition-all hover:border-primary/50 hover:text-primary"
                      >
                        <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
                        Initialize Demo Seed
                      </button>
                    </div>
                  </MotionCard>

                  <MotionCard className="glass-panel flex flex-1 flex-col overflow-hidden rounded-[32px]" delay={0.06} hover={false}>
                    <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-white/8 bg-[#0b1326]/60 p-6 backdrop-blur-2xl">
                      <div className="flex items-center gap-3">
                        <h3 className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-white">Execution Queue</h3>
                        <span className="flex h-5 items-center justify-center rounded-full bg-primary/20 px-2.5 text-[9px] font-black text-primary shadow-[0_0_20px_rgba(177,197,255,0.2)]">
                          {prospects.length}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 rounded-xl border border-white/8 bg-white/4 p-0.5">
                        <button
                          onClick={() => setProspectListMode("cards")}
                          className={cn(
                            "rounded-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] transition-all",
                            prospectListMode === "cards" ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                          )}
                        >
                          Grid
                        </button>
                        <button
                          onClick={() => setProspectListMode("table")}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] transition-all",
                            prospectListMode === "table" ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                          )}
                        >
                          <Table className="h-3 w-3" />
                          List
                        </button>
                      </div>
                    </div>

                    {selectedIds.size > 0 && (
                      <div className="flex items-center justify-between bg-primary/10 p-4 backdrop-blur-md">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                          {selectedIds.size} Marked
                        </span>
                        <button
                          onClick={handleBatchDelete}
                          className="haptic-hover flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-primary transition-all hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Purge
                        </button>
                      </div>
                    )}

                    <div className="thin-scrollbar flex-1 space-y-3 overflow-y-auto p-5" ref={sidebarRef}>
                      {prospects.length === 0 ? (
                        <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                            <Search className="h-8 w-8 text-slate-700" />
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                            Queue Empty
                          </p>
                        </div>
                      ) : prospectListMode === "table" ? (
                        <div className="space-y-1">
                          {prospects.map((p) => {
                            const isSelected = selectedProspect?.id === p.id;
                            return (
                              <div
                                key={p.id}
                                onClick={() => selectProspect(p)}
                                className={cn(
                                  "group flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3.5 transition-all",
                                  isSelected
                                    ? "border-primary/30 bg-primary/10"
                                    : "border-transparent hover:bg-white/5"
                                )}
                              >
                                <div className="min-w-0 flex-1">
                                  <div className="truncate font-headline text-sm font-black tracking-tight text-white">
                                    {p.company_name}
                                  </div>
                                  <div className="mt-1 flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                    {p.industry || "General"}
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className={cn(
                                    "font-mono text-xs font-black",
                                    (p.priority_score || 0) >= 80 ? "text-secondary" : "text-slate-500"
                                  )}>
                                    {(p.priority_score || 0).toFixed(0)}
                                  </span>
                                  <ChevronRight className={cn("h-4 w-4 transition-transform", isSelected ? "rotate-90 text-primary" : "text-slate-700")} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {prospects.map((p, index) => {
                            const status = parseComplianceStatus(p.compliance_status);
                            const isSelected = selectedProspect?.id === p.id;
                            const isChecked = selectedIds.has(p.id);
                            return (
                                <MotionCard
                                  key={p.id}
                                  className={cn(
                                    "group relative cursor-pointer overflow-hidden rounded-[24px] border transition-all duration-500",
                                    isSelected
                                      ? "ambient-shadow border-primary/40 bg-primary/10 ring-1 ring-primary/20"
                                      : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/5"
                                  )}
                                  delay={Math.min(index * 0.035, 0.21)}
                                >
                                  <div className="p-5" onClick={() => selectProspect(p)}>
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="min-w-0 flex-1">
                                        <div className="truncate font-headline text-lg font-black tracking-tighter text-white">
                                          {p.company_name}
                                        </div>
                                        <div className="mt-1.5 flex items-center gap-2 truncate text-[9px] font-black uppercase tracking-widest text-slate-500">
                                          <Target className="h-3 w-3 text-primary/60" />
                                          {parsePrimaryPersona(p.persona_map) ?? "Awaiting Profiling"}
                                        </div>
                                      </div>

                                      <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#0b1326]/60 px-3 py-1.5 backdrop-blur-md">
                                          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_#b1c5ff]" />
                                          <span className="font-mono text-xs font-black text-white">
                                            {(p.priority_score ?? 0).toFixed(0)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="mt-5 flex items-center justify-between border-t border-white/6 pt-4">
                                      <div className="flex items-center gap-3">
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={(e) => toggleSelect(p.id, e)}
                                          className="h-4 w-4 rounded border-white/10 bg-white/5 text-primary focus:ring-0 focus:ring-offset-0"
                                        />
                                        <span
                                          className={cn(
                                            "rounded-full border px-2.5 py-0.5 text-[8px] font-black uppercase tracking-widest",
                                            getStatusColor(status)
                                          )}
                                        >
                                          {status ?? "Queueing"}
                                        </span>
                                      </div>
                                      
                                      <button
                                        onClick={(e) => handleDelete(p.id, e)}
                                        disabled={deletingId === p.id}
                                        className="rounded-xl p-2 text-slate-600 transition-all hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </div>
                                  {isSelected && (
                                    <div className="absolute inset-y-0 left-0 w-1.5 bg-primary shadow-[4px_0_15px_rgba(177,197,255,0.4)]" />
                                  )}
                                </MotionCard>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </MotionCard>
                </div>

                {/* Right Column: Processing Surface */}
                <div className="min-w-0 pb-20">
                  {!selectedProspect ? (
                    <MotionCard 
                      className="glass-panel flex h-[600px] flex-col items-center justify-center rounded-[40px] border border-dashed border-white/10" 
                      hover={false}
                    >
                      <div className="mb-8 rounded-full bg-white/5 p-10">
                        <Sparkles className="h-16 w-16 text-slate-700" />
                      </div>
                      <h3 className="font-headline text-2xl font-black tracking-tight text-white">System Standby</h3>
                      <p className="mt-3 max-w-md text-center text-base font-medium text-slate-500">
                        Select a high-intent account from the queue to initialize the AI 
                        orchestration stream and multi-channel sequence engine.
                      </p>
                    </MotionCard>
                  ) : (
                    <MotionGroup className="flex flex-col gap-10">
                      {/* Detailed Header */}
                      <MotionCard className="mouse-glow glass-panel relative overflow-hidden rounded-[40px] p-8 sm:p-12" delay={0.1} hover={false}>
                        <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-[120px]" />
                        
                        <div className="flex flex-wrap items-start justify-between gap-10">
                          <div className="min-w-0 flex-1">
                            <div className="mb-4 flex items-center gap-3">
                              <span className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                                Active Sequence
                              </span>
                              {selectedProspect.website && (
                                <a 
                                  href={`https://${selectedProspect.website}`} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-xs font-bold text-slate-500 hover:text-primary transition-colors"
                                >
                                  {selectedProspect.website}
                                </a>
                              )}
                            </div>
                            <h2 className="font-headline text-5xl font-black tracking-tighter text-white sm:text-6xl">
                              {selectedProspect.company_name}
                            </h2>
                            <div className="mt-6 flex flex-wrap items-center gap-6">
                              <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                                <Building2 className="h-4 w-4 text-primary" />
                                {selectedProspect.industry || "Market Vertical Unspecified"}
                              </div>
                              {selectedProspect.size && (
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                                  <Users className="h-4 w-4 text-secondary" />
                                  {selectedProspect.size} Unit Capacity
                                </div>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={handleRunFullPipeline}
                            disabled={pipelineRunning}
                            className="haptic-hover group relative inline-flex h-20 items-center gap-4 rounded-[28px] bg-white px-10 text-sm font-black uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary hover:text-white disabled:opacity-50"
                          >
                            {pipelineRunning ? (
                              <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                              <Zap className="h-6 w-6 transition-transform group-hover:scale-110" />
                            )}
                            {pipelineRunning ? (pipelineStep ?? "Processing...") : "Start Automation"}
                            {!pipelineRunning && (
                              <div className="absolute inset-0 -z-10 rounded-[28px] bg-primary/20 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                            )}
                          </button>
                        </div>

                        {pipelineRunning && (
                          <div className="mt-12">
                            <div className="mb-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="h-2.5 w-2.5 animate-ping rounded-full bg-primary" />
                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white">
                                  {pipelineStep ?? "Syncing Context..."}
                                </span>
                              </div>
                              <span className="font-mono text-[10px] font-bold text-primary opacity-60">AI CORE ACTIVE</span>
                            </div>
                            <div className="h-3 w-full overflow-hidden rounded-full bg-white/5 border border-white/5">
                              <div className="animate-shimmer h-full w-[65%] rounded-full bg-gradient-to-r from-primary via-secondary to-primary shadow-[0_0_30px_rgba(17,101,231,0.6)]" />
                            </div>
                          </div>
                        )}
                      </MotionCard>

                      <div className="flex flex-col gap-10">
                        {selectedProspect.next_action && (
                          <SalesActionPanel
                            key={`action-${selectedProspect.id}`}
                            prospect={selectedProspect}
                          />
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
                              toast.success("Personas mapped to intelligence.");
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
                          <MotionSection className="mt-8 border-t border-white/8 pt-12" delay={0.12}>
                            <SequenceTimeline
                              planJson={selectedProspect.sequence_plan}
                              companyName={selectedProspect.company_name}
                            />
                          </MotionSection>
                        )}
                      </div>
                    </MotionGroup>
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
