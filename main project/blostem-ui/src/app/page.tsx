"use client";

import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import ProspectIntakeForm from "@/components/ProspectIntakeForm";
import ProspectCSVUpload from "@/components/ProspectCSVUpload";
import SignalIntelligencePanel from "@/components/SignalIntelligencePanel";
import PersonaMappingPanel from "@/components/PersonaMappingPanel";
import OutreachGenerationPanel from "@/components/OutreachGenerationPanel";
import CompliancePanel from "@/components/CompliancePanel";
import SalesActionPanel from "@/components/SalesActionPanel";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, BarChart2, List, RefreshCw } from "lucide-react";
import SequenceTimeline from "@/components/SequenceTimeline";
import { DashboardSkeleton } from "@/components/LoadingSkeleton";

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
  score_explanation?: string;
  persona_map?: string;
  messages?: string;
  compliance_status?: string;
  next_action?: string;
  sequence_plan?: string;
  outreach_status?: string;
  created_at: string;
  updated_at: string;
};

function ScoreBar({ value, max = 100, color = "bg-indigo-500" }: { value?: number | null; max?: number; color?: string }) {
  if (value === null || value === undefined) return null;
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function getScoreColor(score?: number | null): string {
  if (!score) return "bg-zinc-400";
  if (score >= 70) return "bg-emerald-500";
  if (score >= 45) return "bg-amber-500";
  return "bg-red-500";
}

function getStatusColor(status?: string | null): string {
  if (status === "FLAGGED") return "bg-red-500/20 text-red-300 ring-red-500/30";
  if (status === "NEEDS_REVISION") return "bg-amber-500/20 text-amber-300 ring-amber-500/30";
  if (status === "APPROVED") return "bg-emerald-500/20 text-emerald-300 ring-emerald-500/30";
  return "";
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

function parseNextAction(raw?: string | null): string | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw);
    return obj.action || null;
  } catch {
    return raw;
  }
}

export default function Home() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [activeTab, setActiveTab] = useState<"pipeline" | "analytics">("pipeline");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchProspects = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/prospects/");
      if (res.ok) {
        let data: Prospect[] = await res.json();
        data = data.sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0));
        setProspects(data);
        // Keep selectedProspect in sync
        if (selectedProspect) {
          const updated = data.find((p) => p.id === selectedProspect.id);
          if (updated) setSelectedProspect(updated);
        }
      }
    } catch (e) {
      toast.error("Failed to reach backend. Is the server running?");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProspects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this prospect and all its data?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`http://127.0.0.1:8000/prospects/${id}`, { method: "DELETE" });
      if (res.ok || res.status === 204) {
        toast.success("Prospect deleted.");
        if (selectedProspect?.id === id) setSelectedProspect(null);
        fetchProspects();
      } else {
        toast.error("Failed to delete prospect.");
      }
    } catch {
      toast.error("Failed to connect to backend.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleProspectUpdate = async () => {
    await fetchProspects();
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="flex flex-col min-h-screen bg-zinc-950 font-sans text-white">
        {/* ── HEADER ──────────────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl px-6 py-4 overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute top-[-50px] left-[10%] w-[300px] h-[100px] bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute top-[-50px] right-[10%] w-[300px] h-[100px] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-screen-2xl mx-auto flex justify-between items-center gap-4 flex-wrap relative z-10">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="text-2xl">🌿</span>
                <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Blostem AI</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold mt-0.5">
                Fintech Growth Intelligence
              </p>
            </div>

            <div className="flex gap-2 items-center flex-wrap">
              {/* Tab switcher */}
              <div className="flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
                <button
                  onClick={() => setActiveTab("pipeline")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    activeTab === "pipeline"
                      ? "bg-white text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <List className="h-3.5 w-3.5" /> Pipeline
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    activeTab === "analytics"
                      ? "bg-white text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <BarChart2 className="h-3.5 w-3.5" /> Analytics
                </button>
              </div>

              <button
                onClick={fetchProspects}
                disabled={isRefreshing}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-white/10 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>
              <a
                href="http://127.0.0.1:8000/prospects/export-all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-2 border border-blue-500/50 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition font-medium"
              >
                ⬇ Export All
              </a>
              <a
                href="http://127.0.0.1:8000/prospects/export"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-2 border border-emerald-500/50 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition font-medium"
              >
                ✅ Export Approved
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-screen-2xl mx-auto w-full px-6 py-8">

          {/* ── ANALYTICS TAB ─────────────────────────────────────────────────── */}
          {activeTab === "analytics" && (
            <section>
              <h2 className="text-lg font-semibold text-white mb-6">Pipeline Analytics</h2>
              <AnalyticsDashboard />
            </section>
          )}

          {/* ── PIPELINE TAB ──────────────────────────────────────────────────── */}
          {activeTab === "pipeline" && (
            isRefreshing && prospects.length === 0 ? (
              <DashboardSkeleton />
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-8">
              {/* LEFT: Intake + Pipeline List */}
              <div className="flex flex-col gap-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-5">
                  <div>
                    <h2 className="text-sm font-semibold text-white mb-3">Add Prospect</h2>
                    <ProspectIntakeForm
                      onProspectAdded={() => {
                        fetchProspects();
                        toast.success("Prospect added to pipeline.");
                      }}
                    />
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <h2 className="text-sm font-semibold text-white mb-3">Bulk CSV Upload</h2>
                    <ProspectCSVUpload
                      onProspectAdded={() => {
                        fetchProspects();
                        toast.success("CSV uploaded successfully.");
                      }}
                    />
                  </div>
                </div>

                {/* Pipeline cards */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-white">
                      Prospect Pipeline
                      {prospects.length > 0 && (
                        <span className="ml-2 text-xs text-zinc-500">({prospects.length} accounts)</span>
                      )}
                    </h2>
                  </div>

                  {prospects.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-zinc-500 text-sm">
                      No prospects yet. Add a company above to begin.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {prospects.map((p) => {
                        const complianceStatus = parseComplianceStatus(p.compliance_status);
                        const nextAction = parseNextAction(p.next_action);
                        const isSelected = selectedProspect?.id === p.id;

                        return (
                          <div
                            key={p.id}
                            onClick={() => setSelectedProspect(p)}
                            className={`group relative cursor-pointer rounded-xl border p-4 transition-all ${
                              isSelected
                                ? "border-indigo-500/60 bg-indigo-500/10"
                                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">{p.company_name}</p>
                                <p className="text-xs text-zinc-500 mt-0.5">{p.industry || "—"}{p.size ? ` · ${p.size}` : ""}</p>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {p.outreach_status === "APPROVED" && (
                                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 rounded-full px-1.5 py-0.5 border border-emerald-500/20">
                                    ✓ Approved
                                  </span>
                                )}
                                {complianceStatus && (
                                  <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 ring-1 ${getStatusColor(complianceStatus)}`}>
                                    {complianceStatus === "APPROVED" ? "✓ Compliant" :
                                     complianceStatus === "FLAGGED" ? "⚠ Flagged" : "⚠ Revise"}
                                  </span>
                                )}
                                <button
                                  onClick={(e) => handleDelete(p.id, e)}
                                  disabled={deletingId === p.id}
                                  className="opacity-0 group-hover:opacity-100 rounded-md p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                  title="Delete prospect"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>

                            {p.priority_score !== null && p.priority_score !== undefined && (
                              <div className="mt-3 space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-zinc-500">Priority</span>
                                  <span className="text-[11px] font-bold text-white">{p.priority_score}/100</span>
                                </div>
                                <ScoreBar value={p.priority_score} color={getScoreColor(p.priority_score)} />
                                <div className="flex gap-3 text-[10px] text-zinc-500 mt-1">
                                  <span>Fit: <span className="text-zinc-300">{p.fit_score}</span></span>
                                  <span>Intent: <span className="text-zinc-300">{p.intent_score}</span></span>
                                  <span>Conf: <span className="text-zinc-300">{p.confidence_score}%</span></span>
                                </div>
                              </div>
                            )}

                            {nextAction && (
                              <div className="mt-2 text-[10px] text-indigo-400 font-medium">
                                → {nextAction}
                              </div>
                            )}

                            {!p.priority_score && p.signals && (
                              <span className="mt-2 inline-block text-[10px] text-green-400 bg-green-500/10 rounded-full px-1.5 py-0.5 border border-green-500/20">
                                Signals Ready
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT: Detail / AI Panels */}
              <div className="flex flex-col gap-6 pb-16 min-w-0 overflow-hidden">
                {!selectedProspect ? (
                  <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-white/10 text-zinc-500 text-sm">
                    Select a prospect to begin AI processing.
                  </div>
                ) : (
                  <>
                    {/* Prospect header */}
                    <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-bold text-white">{selectedProspect.company_name}</h2>
                          <p className="text-sm text-zinc-400 mt-0.5">
                            {selectedProspect.industry || "Unknown Industry"}
                            {selectedProspect.size ? ` · ${selectedProspect.size}` : ""}
                            {selectedProspect.website ? ` · ${selectedProspect.website}` : ""}
                          </p>
                        </div>
                        {selectedProspect.priority_score !== null && selectedProspect.priority_score !== undefined && (
                          <div className="text-right shrink-0">
                            <p className="text-2xl font-bold" style={{
                              color: selectedProspect.priority_score >= 70 ? "#34d399" :
                                     selectedProspect.priority_score >= 45 ? "#fbbf24" : "#f87171"
                            }}>
                              {selectedProspect.priority_score}
                              <span className="text-sm text-zinc-500">/100</span>
                            </p>
                            <p className="text-[10px] text-zinc-500">Priority Score</p>
                          </div>
                        )}
                      </div>

                      {/* Pipeline stage indicator */}
                      <div className="mt-4 flex items-center gap-1 overflow-x-auto">
                        {[
                          { key: "signals",     label: "Signals",    done: !!selectedProspect.signals },
                          { key: "score",       label: "Scored",     done: selectedProspect.priority_score != null },
                          { key: "persona",     label: "Personas",   done: !!selectedProspect.persona_map },
                          { key: "outreach",    label: "Outreach",   done: !!selectedProspect.messages },
                          { key: "compliance",  label: "Compliance", done: !!selectedProspect.compliance_status },
                          { key: "action",      label: "Action",     done: !!selectedProspect.next_action },
                          { key: "approved",    label: "Approved",   done: selectedProspect.outreach_status === "APPROVED" },
                        ].map((step, i, arr) => (
                          <div key={step.key} className="flex items-center gap-1 shrink-0">
                            <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                              step.done
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-white/5 text-zinc-500"
                            }`}>
                              {step.done ? "✓" : "○"} {step.label}
                            </div>
                            {i < arr.length - 1 && <span className="text-zinc-700">→</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Module 8: Sales Action Recommendation (Now at the top) */}
                    {selectedProspect.next_action && (
                      <SalesActionPanel
                        key={`action-${selectedProspect.id}`}
                        prospect={selectedProspect}
                        onUpdate={handleProspectUpdate}
                      />
                    )}

                    {/* Module 2: Signal Intelligence */}
                    <SignalIntelligencePanel
                      prospect={selectedProspect}
                      key={selectedProspect.id}
                      onSignalsGenerated={(updated) => {
                        setSelectedProspect(updated);
                        fetchProspects();
                        toast.success("Signals generated successfully.");
                      }}
                    />

                    {/* Module 4: Persona Mapping */}
                    {selectedProspect.signals && (
                      <PersonaMappingPanel
                        prospect={selectedProspect}
                        key={`persona-${selectedProspect.id}`}
                        onPersonasGenerated={(updated) => {
                          setSelectedProspect(updated);
                          fetchProspects();
                          toast.success("Personas mapped successfully.");
                        }}
                      />
                    )}

                    {/* Module 5: Outreach Generation */}
                    {selectedProspect.persona_map && (
                      <OutreachGenerationPanel
                        key={`outreach-${selectedProspect.id}`}
                        prospect={selectedProspect}
                        onUpdate={handleProspectUpdate}
                      />
                    )}


                    {/* Module 7: Sequence Builder */}
                    {selectedProspect.sequence_plan && (
                      <div className="mt-8 pt-8 border-t border-white/10 w-full min-w-0 overflow-hidden">
                        <SequenceTimeline 
                          planJson={selectedProspect.sequence_plan} 
                          companyName={selectedProspect.company_name} 
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
              </div>
            )
          )}
        </main>
      </div>
    </>
  );
}
