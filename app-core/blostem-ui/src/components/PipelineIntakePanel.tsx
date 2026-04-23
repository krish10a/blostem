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
      }
    } catch (err) {
      toast.error("Failed to download template.");
    }
  };

  const seedData = async () => {
    if (!confirm("Seed 10 demo prospects?")) return;
    try {
      const res = await fetchWithAuth("/prospects/seed-sample-data", {
        method: "POST",
      });
      if (res.ok) {
        onRefresh();
        toast.success("Demo stream initialized.");
      }
    } catch (err) {
      toast.error("Failed to seed data.");
    }
  };

  return (
    <MotionCard className="glass-panel flex flex-col overflow-hidden rounded-[32px] border border-white/5 bg-[#0b1326]/40 backdrop-blur-3xl lg:h-full" hover={false}>
      {/* Header Tabs */}
      <div className="flex border-b border-white/5">
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

      <div className="p-6">
        {activeSection === "manual" ? (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <ProspectIntakeForm onProspectAdded={onRefresh} />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300">
            <ProspectCSVUpload onProspectAdded={onRefresh} />
            <div className="mt-4 flex gap-2">
              <button
                onClick={downloadTemplate}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-[9px] font-black uppercase tracking-widest text-slate-400 transition-all hover:bg-white/10 hover:text-white"
              >
                <Download className="h-3 w-3" />
                Demo CSV
              </button>
              <button
                onClick={seedData}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-primary/30 bg-primary/5 py-2.5 text-[9px] font-black uppercase tracking-widest text-primary/70 transition-all hover:bg-primary/10 hover:text-primary"
              >
                <Sparkles className="h-3 w-3" />
                Seed Stream
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Execution Queue Header */}
      <div className="flex flex-col border-t border-white/8 bg-white/[0.02]">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <h3 className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-white">Prospects Queue</h3>
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

        {selectedIds.size > 0 && (
          <div className="flex items-center justify-between bg-primary/10 px-6 py-3 backdrop-blur-md">
            <span className="text-[9px] font-black uppercase tracking-widest text-primary">
              {selectedIds.size} Selected
            </span>
            <button
              onClick={onBatchDelete}
              className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-white transition-all hover:bg-red-600"
            >
              <Trash2 className="h-3 w-3" />
              Purge
            </button>
          </div>
        )}
      </div>

      {/* Queue List */}
      <div className="thin-scrollbar flex-1 overflow-y-auto p-4 pt-0">
        {prospects.length === 0 ? (
          <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
              <Search className="h-6 w-6 text-slate-700" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
              No prospects found
            </p>
          </div>
        ) : (
          <div className="space-y-2 py-4">
            {prospects.map((p) => {
              const isSelected = selectedProspectId === p.id;
              const isChecked = selectedIds.has(p.id);
              
              if (listMode === "table") {
                return (
                  <div
                    key={p.id}
                    onClick={() => onSelect(p)}
                    className={cn(
                      "group flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-all",
                      isSelected
                        ? "border-primary/30 bg-primary/10"
                        : "border-transparent hover:bg-white/5"
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-headline text-xs font-black tracking-tight text-white">
                        {p.company_name}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                        {p.industry || "General"}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "font-mono text-[10px] font-black",
                        (p.priority_score || 0) >= 80 ? "text-secondary" : "text-slate-500"
                      )}>
                        {(p.priority_score || 0).toFixed(0)}
                      </span>
                      <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", isSelected ? "rotate-90 text-primary" : "text-slate-700")} />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={p.id}
                  onClick={() => onSelect(p)}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-2xl border p-4 transition-all duration-300",
                    isSelected
                      ? "border-primary/40 bg-primary/10 ring-1 ring-primary/20"
                      : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-headline text-sm font-black tracking-tight text-white">
                        {p.company_name}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                        <Target className="h-2.5 w-2.5 text-primary/60" />
                        {p.industry || "General Market"}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex h-6 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0b1326]/60 text-[10px] font-black text-white">
                        {(p.priority_score ?? 0).toFixed(0)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => onToggleSelect(p.id, e)}
                        className="h-3.5 w-3.5 rounded border-white/10 bg-white/5 text-primary focus:ring-0"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">
                        {p.compliance_status ? "Analyzed" : "Pending"}
                      </span>
                    </div>
                    <button
                      onClick={(e) => onDelete(p.id, e)}
                      className="rounded-lg p-1.5 text-slate-600 transition-all hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {isSelected && (
                    <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MotionCard>
  );
}
