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
  if (status === "FLAGGED") return "bg-error/15 text-error ring-error/30";
  if (status === "NEEDS_REVISION") return "bg-tertiary/15 text-tertiary ring-tertiary/30";
  if (status === "APPROVED") return "bg-secondary/15 text-secondary ring-secondary/30";
  return "bg-surface-container-highest/40 text-on-surface-variant ring-outline-variant/20";
}

export default function PipelineWorkbench() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [activeTab, setActiveTab] = useState<"pipeline" | "analytics">("pipeline");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [prospectListMode, setProspectListMode] = useState<"cards" | "table">("cards");

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
        label: "Extracting Signals",
        url: "generate-signals",
        body: { manual_context: "" },
        skip: !!selectedProspect.signals,
      },
      {
        label: "Calculating Score",
        url: "score",
        body: null,
        skip: selectedProspect.priority_score != null,
      },
      {
        label: "Mapping Personas",
        url: "map-personas",
        body: null,
        skip: !!selectedProspect.persona_map,
      },
      {
        label: "Generating Outreach",
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
    <>
      <Toaster richColors position="top-right" />

      <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <MotionCard className="glass-panel rounded-[28px] px-4 py-4 sm:px-5" hover={false}>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="font-label text-[10px] uppercase tracking-[0.24em] text-primary">
              Execution Surface
            </span>
            <span className="rounded-full border border-white/8 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              {prospects.length} accounts
            </span>
          </div>
          <h2 className="font-headline text-2xl font-bold text-white">Pipeline Workbench</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
            Add prospects, review queue quality, and run signal-to-outreach automation without losing
            layout context on smaller screens.
          </p>
        </MotionCard>

        <MotionSection className="flex flex-wrap items-center gap-3" delay={0.08}>
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-outline-variant/10 bg-surface-container-low/70 p-1.5">
            <button
              onClick={() => setActiveTab("pipeline")}
              className={
                activeTab === "pipeline"
                  ? "rounded-xl bg-surface-variant px-3 py-2 text-xs font-semibold text-primary"
                  : "rounded-xl px-3 py-2 text-xs font-medium text-on-surface-variant hover:text-on-surface"
              }
            >
              Pipeline
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={
                activeTab === "analytics"
                  ? "inline-flex items-center gap-1 rounded-xl bg-surface-variant px-3 py-2 text-xs font-semibold text-primary"
                  : "inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium text-on-surface-variant hover:text-on-surface"
              }
            >
              <BarChart2 className="h-3.5 w-3.5" />
              Analytics
            </button>
          </div>

          <button
            onClick={() => fetchProspects()}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 rounded-2xl border border-outline-variant/15 bg-surface-container-low/50 px-3.5 py-2 text-xs font-medium text-on-surface transition-all hover:bg-surface-container-high disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </MotionSection>
      </div>

      {activeTab === "analytics" ? (
        <div className="mt-8">
          <AnalyticsDashboard />
        </div>
      ) : (
        <div className="mt-8">
          {isRefreshing && prospects.length === 0 ? (
            <DashboardSkeleton />
          ) : (
            <div className="grid w-full max-w-[1600px] gap-6 xl:grid-cols-[minmax(360px,420px)_minmax(0,1fr)]">
              <div className="flex min-w-0 flex-col gap-4 xl:sticky xl:top-28 xl:self-start">
                <MotionCard className="glass-panel rounded-[28px] p-4 sm:p-5" hover={false}>
                  <div className="grid gap-5">
                    <div>
                      <h3 className="mb-3 font-headline text-sm font-semibold uppercase tracking-wider text-on-surface">
                        Add Prospect
                      </h3>
                      <ProspectIntakeForm
                        onProspectAdded={() => {
                          void fetchProspects();
                          toast.success("Prospect added to pipeline.");
                        }}
                      />
                    </div>

                    <div>
                      <h3 className="mb-3 font-headline text-sm font-semibold uppercase tracking-wider text-on-surface">
                        Bulk CSV Upload
                      </h3>
                      <ProspectCSVUpload
                        onProspectAdded={() => {
                          void fetchProspects();
                          toast.success("CSV uploaded successfully.");
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
                      className="haptic-hover flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-outline-variant/40 py-2.5 text-sm font-medium text-on-surface-variant transition-all hover:border-outline-variant hover:bg-surface-container hover:text-on-surface"
                    >
                      <Sparkles className="h-4 w-4" />
                      Seed Demo Data
                    </button>
                  </div>
                </MotionCard>

                <MotionCard className="glass-panel relative flex min-h-[360px] flex-1 flex-col overflow-hidden rounded-[28px]" delay={0.06} hover={false}>
                  <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/10 bg-surface-container-low/95 p-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline text-sm font-semibold text-on-surface">Active Queue</h3>
                      <span className="animate-soft-pulse rounded-full bg-surface-container-highest px-2 py-0.5 text-[10px] text-on-surface-variant">
                        {prospects.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 rounded-xl border border-outline-variant/10 bg-surface-container p-0.5">
                      <button
                        onClick={() => setProspectListMode("cards")}
                        className={
                          prospectListMode === "cards"
                            ? "rounded-lg bg-surface-variant px-2 py-1 text-primary shadow-sm text-xs"
                            : "rounded-lg px-2 py-1 text-on-surface-variant hover:text-on-surface text-xs"
                        }
                      >
                        Cards
                      </button>
                      <button
                        onClick={() => setProspectListMode("table")}
                        className={
                          prospectListMode === "table"
                            ? "inline-flex items-center gap-1 rounded-lg bg-surface-variant px-2 py-1 text-primary shadow-sm text-xs"
                            : "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-on-surface-variant hover:text-on-surface text-xs"
                        }
                      >
                        <Table className="h-3 w-3" />
                        Table
                      </button>
                    </div>
                  </div>

                  {selectedIds.size > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/20 bg-primary-container/70 p-3">
                      <div className="text-xs font-bold uppercase tracking-widest text-white">
                        {selectedIds.size} selected
                      </div>
                      <button
                        onClick={handleBatchDelete}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10px] font-black text-primary-container transition-all hover:bg-red-50 hover:text-red-600 active:scale-95"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete Selected
                      </button>
                    </div>
                  )}

                  <div className="thin-scrollbar flex-1 space-y-1 overflow-y-auto p-2" ref={sidebarRef}>
                    {prospects.length === 0 ? (
                      <div className="p-8 text-center text-sm text-on-surface-variant">
                        No prospects yet. Add a company above to begin.
                      </div>
                    ) : prospectListMode === "table" ? (
                      <table className="w-full text-left text-sm">
                        <thead className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                          <tr>
                            <th className="px-3 py-2">Account</th>
                            <th className="px-3 py-2 text-right">Priority</th>
                          </tr>
                        </thead>
                        <tbody>
                          {prospects.map((p) => {
                            const isSelected = selectedProspect?.id === p.id;
                            return (
                              <tr
                                key={p.id}
                                onClick={() => setSelectedProspect(p)}
                                className={
                                  isSelected
                                    ? "cursor-pointer bg-primary/10"
                                    : "cursor-pointer hover:bg-surface-container-highest/30"
                                }
                              >
                                <td className="px-3 py-2">
                                  <div className="max-w-[280px] truncate font-medium text-on-surface">
                                    {p.company_name}
                                  </div>
                                  <div className="max-w-[280px] truncate text-[10px] text-on-surface-variant">
                                    {p.industry || "N/A"}
                                  </div>
                                </td>
                                <td className="px-3 py-2 text-right font-mono text-on-surface">
                                  {(p.priority_score || 0).toFixed(0)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <div className="space-y-2">
                        {prospects.map((p, index) => {
                          const status = parseComplianceStatus(p.compliance_status);
                          const isSelected = selectedProspect?.id === p.id;
                          const isChecked = selectedIds.has(p.id);
                          return (
                              <MotionCard
                                key={p.id}
                                className={
                                  isSelected
                                    ? "ambient-shadow haptic-hover group cursor-pointer rounded-[22px] border border-primary/20 bg-surface-container-highest p-4"
                                    : "haptic-hover cursor-pointer rounded-[22px] border border-transparent bg-surface-container p-4 transition-all hover:border-outline-variant/20 hover:bg-surface-container-high"
                                }
                                delay={Math.min(index * 0.035, 0.21)}
                              >
                                <div onClick={() => setSelectedProspect(p)}>
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="truncate font-headline text-sm font-bold text-on-surface">
                                    {p.company_name}
                                  </div>
                                  <div className="mt-0.5 truncate text-xs text-on-surface-variant">
                                    {(parsePrimaryPersona(p.persona_map) ?? "N/A") +
                                      (p.industry ? ` - ${p.industry}` : "")}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="flex items-center gap-1 rounded border border-outline-variant/20 bg-secondary-container/20 px-1.5 py-0.5 text-[10px] font-bold text-secondary">
                                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                                    {(p.priority_score ?? 0).toFixed(0)}
                                  </span>
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${getStatusColor(status)}`}
                                  >
                                    {status ?? "UNCHECKED"}
                                  </span>
                                  <button
                                    onClick={(e) => handleDelete(p.id, e)}
                                    disabled={deletingId === p.id}
                                    className="rounded-full p-1 text-on-surface-variant transition-all hover:bg-error/10 hover:text-error disabled:opacity-50"
                                    title="Delete prospect"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>

                              <div className="mt-3 flex items-center justify-between">
                                <label className="inline-flex items-center gap-2 text-xs text-on-surface-variant">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => toggleSelect(p.id, e)}
                                  />
                                  Select
                                </label>
                              </div>
                                </div>
                              </MotionCard>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </MotionCard>
              </div>

              <div className="min-w-0 pb-8 xl:max-h-[calc(100vh-9rem)] xl:overflow-y-auto xl:pr-2">
                {!selectedProspect ? (
                  <MotionCard className="glass-panel flex h-64 items-center justify-center rounded-[28px] border border-dashed border-outline-variant/20 text-sm text-on-surface-variant" hover={false}>
                    Select a prospect to begin AI processing.
                  </MotionCard>
                ) : (
                  <MotionGroup className="flex flex-col gap-4">
                    <MotionCard className="glass-panel relative overflow-hidden rounded-[30px] p-6" delay={0.1} hover={false}>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface">
                            {selectedProspect.company_name}
                          </h2>
                          <p className="mt-1 text-sm text-on-surface-variant">
                            {selectedProspect.industry || "Unknown Industry"}
                            {selectedProspect.size ? ` - ${selectedProspect.size}` : ""}
                            {selectedProspect.website ? ` - ${selectedProspect.website}` : ""}
                          </p>
                        </div>

                        <MotionButton>
                          <button
                          onClick={handleRunFullPipeline}
                          disabled={pipelineRunning}
                          className="btn-pipeline inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-container px-4 py-2.5 text-sm font-semibold text-on-primary shadow-[0_0_15px_rgba(17,101,231,0.3)] disabled:opacity-60"
                          title="Sequentially run: Signals -> Score -> Personas -> Outreach"
                        >
                          {pipelineRunning ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Zap className="h-4 w-4" />
                          )}
                          {pipelineRunning ? (pipelineStep ?? "Running...") : "Run Full Pipeline"}
                        </button>
                        </MotionButton>
                      </div>

                      {pipelineRunning && (
                        <div className="mt-4">
                          <div className="mb-1 flex items-center justify-between text-[10px] text-on-surface-variant">
                            <span>{pipelineStep ?? "Initializing..."}</span>
                            <span className="animate-pulse text-primary">AI Processing</span>
                          </div>
                          <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-highest">
                            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary-container to-primary animate-pulse" />
                          </div>
                        </div>
                      )}
                    </MotionCard>

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
                        toast.success("Signals generated successfully.");
                      }}
                    />

                    {selectedProspect.signals && (
                      <PersonaMappingPanel
                        prospect={selectedProspect}
                        key={`persona-${selectedProspect.id}`}
                        onPersonasGenerated={() => {
                          void fetchProspects(false);
                          toast.success("Personas mapped successfully.");
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
                      <MotionSection className="mt-2 min-w-0 border-t border-outline-variant/10 pt-6" delay={0.12}>
                        <SequenceTimeline
                          planJson={selectedProspect.sequence_plan}
                          companyName={selectedProspect.company_name}
                        />
                      </MotionSection>
                    )}
                  </MotionGroup>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
