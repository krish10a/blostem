"use client";

import { useState } from "react";
import { 
  Plus, 
  Table, 
  Download, 
  Sparkles, 
  LayoutGrid, 
  List as ListIcon,
  Search,
  Trash2,
  ChevronRight,
  Target
} from "lucide-react";
import { toast } from "sonner";
import ProspectIntakeForm from "./ProspectIntakeForm";
import ProspectCSVUpload from "./ProspectCSVUpload";
import { MotionCard } from "./motion/BlostemMotion";
import { cn } from "@/lib/utils";
import { fetchWithAuth } from "@/lib/api";

type Prospect = {
  id: number;
  company_name: string;
  website?: string;
  industry?: string;
  size?: string;
  priority_score?: number | null;
  compliance_status?: string;
  persona_map?: string;
};

interface PipelineIntakePanelProps {
  prospects: Prospect[];
  selectedProspectId?: number;
  onSelect: (p: Prospect) => void;
  onRefresh: () => void;
  selectedIds: Set<number>;
  onToggleSelect: (id: number, e: any) => void;
  onDelete: (id: number, e: any) => void;
  onBatchDelete: () => void;
  listMode: "cards" | "table";
  setListMode: (mode: "cards" | "table") => void;
}

export default function PipelineIntakePanel({
  prospects,
  selectedProspectId,
  onSelect,
  onRefresh,
  selectedIds,
  onToggleSelect,
  onDelete,
  onBatchDelete,
  listMode,
  setListMode
}: PipelineIntakePanelProps) {
  const [activeSection, setActiveSection] = useState<"manual" | "mass">("manual");
  const [isSeeding, setIsSeeding] = useState(false);

  const downloadTemplate = async () => {
    try {
      const res = await fetchWithAuth("/prospects/download-sample-csv");
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "blostem_template.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast.success("Template downloaded.");
      } else {
        throw new Error("Failed to download template.");
      }
    } catch (err) {
      toast.error("Template download failed. Check backend connection.");
    }
  };

  const seedData = async () => {
    if (!confirm("Seed 10 demo prospects for pipeline testing?")) return;
    setIsSeeding(true);
    try {
      const res = await fetchWithAuth("/prospects/seed-sample-data", {
        method: "POST",
      });
      if (res.ok) {
        onRefresh();
        toast.success("Demo stream initialized successfully.");
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to seed demo data.");
      }
    } catch (err: any) {
      toast.error(err.message || "Backend connection error during seeding.");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#0b1326]/20 backdrop-blur-xl border-r border-white/5">
      {/* 1. Intake Protocol & 2. Mass Ingestion Tabs */}
      <div className="flex border-b border-white/5 bg-white/[0.02]">
        <button
          onClick={() => setActiveSection("manual")}
          className={cn(
            "flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
            activeSection === "manual" ? "bg-white/5 text-primary border-b-2 border-primary" : "text-slate-500 hover:text-slate-300"
          )}
        >
          Intake Protocol
        </button>
        <button
          onClick={() => setActiveSection("mass")}
          className={cn(
            "flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
            activeSection === "mass" ? "bg-white/5 text-secondary border-b-2 border-secondary" : "text-slate-500 hover:text-slate-300"
          )}
        >
          Mass Ingestion
        </button>
      </div>

      {/* Tools Area */}
      <div className="p-6 border-b border-white/5">
        {activeSection === "manual" ? (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <ProspectIntakeForm onProspectAdded={onRefresh} />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300 space-y-4">
            <ProspectCSVUpload onProspectAdded={onRefresh} />
            
            {/* 3. Demo CSV Button & Seeding */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={downloadTemplate}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-[9px] font-black uppercase tracking-widest text-slate-400 transition-all hover:bg-white/10 hover:text-white"
              >
                <Download className="h-3 w-3" />
                Demo CSV
              </button>
              <button
                onClick={seedData}
                disabled={isSeeding}
                className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/30 bg-primary/5 py-3 text-[9px] font-black uppercase tracking-widest text-primary/70 transition-all hover:bg-primary/10 hover:text-primary disabled:opacity-50"
              >
                {isSeeding ? <Sparkles className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                {isSeeding ? "Seeding..." : "Seed Stream"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Prospects Queue Header */}
      <div className="flex items-center justify-between px-6 py-5 bg-white/[0.03] border-b border-white/5">
        <div className="flex items-center gap-3">
          <h3 className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-white">Execution Queue</h3>
          <span className="flex h-5 items-center justify-center rounded-full bg-primary/20 px-2.5 text-[9px] font-black text-primary">
            {prospects.length}
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-white/8 bg-white/4 p-0.5">
          <button
            onClick={() => setListMode("cards")}
            className={cn(
              "rounded-lg p-1.5 transition-all",
              listMode === "cards" ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setListMode("table")}
            className={cn(
              "rounded-lg p-1.5 transition-all",
              listMode === "table" ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
            )}
          >
            <ListIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Selection Actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between bg-primary/15 px-6 py-3 backdrop-blur-md border-b border-primary/20 animate-in slide-in-from-top duration-300">
          <span className="text-[9px] font-black uppercase tracking-widest text-primary">
            {selectedIds.size} Selected for Action
          </span>
          <button
            onClick={onBatchDelete}
            className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-white transition-all hover:bg-red-600 shadow-lg shadow-red-500/20"
          >
            <Trash2 className="h-3 w-3" />
            Purge Selected
          </button>
        </div>
      )}

      {/* Long Queue List */}
      <div className="thin-scrollbar flex-1 overflow-y-auto p-4 space-y-3">
        {prospects.length === 0 ? (
          <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
              <Search className="h-8 w-8 text-slate-800" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
              Queue Empty
            </p>
            <p className="mt-2 text-[9px] font-medium text-slate-700">
              Initialize stream via protocol tabs
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 pb-20">
            {prospects.map((p) => {
              const isSelected = selectedProspectId === p.id;
              const isChecked = selectedIds.has(p.id);
              
              if (listMode === "table") {
                return (
                  <div
                    key={p.id}
                    onClick={() => onSelect(p)}
                    className={cn(
                      "group flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3.5 transition-all",
                      isSelected
                        ? "border-primary/40 bg-primary/10"
                        : "border-transparent bg-white/[0.01] hover:bg-white/5 hover:border-white/10"
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-headline text-xs font-black tracking-tight text-white">
                        {p.company_name}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[8px] font-bold text-slate-500 uppercase tracking-[0.15em]">
                        {p.industry || "General"}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <span className={cn(
                          "font-mono text-[10px] font-black",
                          (p.priority_score || 0) >= 80 ? "text-secondary" : "text-slate-500"
                        )}>
                          {(p.priority_score || 0).toFixed(0)}
                        </span>
                      </div>
                      <ChevronRight className={cn("h-4 w-4 transition-transform", isSelected ? "rotate-90 text-primary" : "text-slate-800")} />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={p.id}
                  onClick={() => onSelect(p)}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-[24px] border p-5 transition-all duration-500",
                    isSelected
                      ? "ambient-shadow border-primary/50 bg-primary/10 ring-1 ring-primary/20"
                      : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/5"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-headline text-lg font-black tracking-tighter text-white">
                        {p.company_name}
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
                        <Target className="h-3 w-3 text-primary/60" />
                        {p.industry || "Market Vertical"}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex h-7 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#0b1326]/80 text-xs font-black text-white shadow-xl">
                        {(p.priority_score ?? 0).toFixed(0)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => onToggleSelect(p.id, e)}
                        className="h-4 w-4 rounded border-white/10 bg-white/5 text-primary focus:ring-0 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className={cn(
                        "rounded-full border px-2.5 py-0.5 text-[8px] font-black uppercase tracking-widest",
                        p.compliance_status ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/5" : "border-slate-500/30 text-slate-500 bg-white/5"
                      )}>
                        {p.compliance_status ? "Signal Extracted" : "Queueing"}
                      </span>
                    </div>
                    <button
                      onClick={(e) => onDelete(p.id, e)}
                      className="rounded-xl p-2 text-slate-600 transition-all hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {isSelected && (
                    <div className="absolute inset-y-0 left-0 w-1.5 bg-primary shadow-[4px_0_15px_rgba(177,197,255,0.4)]" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

