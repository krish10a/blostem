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
  Target,
  RefreshCw,
  Zap
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
  status?: string;
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
    <div className="flex h-full flex-col overflow-hidden bg-black/10 border-r border-white/5">
      {/* 1. Intake Protocol & 2. Mass Ingestion Tabs */}
      <div className="flex border-b border-white/5 bg-white/[0.03] shrink-0">
        <button
          onClick={() => setActiveSection("manual")}
          className={cn(
            "flex-1 py-5 text-[9px] font-black uppercase tracking-[0.2em] transition-all",
            activeSection === "manual" ? "bg-white/5 text-primary border-b-2 border-primary" : "text-slate-500 hover:text-slate-300"
          )}
        >
          Intake Protocol
        </button>
        <button
          onClick={() => setActiveSection("mass")}
          className={cn(
            "flex-1 py-5 text-[9px] font-black uppercase tracking-[0.2em] transition-all",
            activeSection === "mass" ? "bg-white/5 text-secondary border-b-2 border-secondary" : "text-slate-500 hover:text-slate-300"
          )}
        >
          Mass Ingestion
        </button>
      </div>

      {/* Tools Area - High Density */}
      <div className="p-5 border-b border-white/5 bg-white/[0.01] shrink-0">
        {activeSection === "manual" ? (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <ProspectIntakeForm onProspectAdded={onRefresh} />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300 space-y-4">
            <ProspectCSVUpload onProspectAdded={onRefresh} />
            
            {/* 3. Demo CSV Button & Seeding */}
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={seedData}
                disabled={isSeeding}
                className="flex items-center justify-center gap-3 rounded-xl border border-dashed border-primary/40 bg-primary/10 py-4 text-[10px] font-black uppercase tracking-widest text-primary transition-all hover:bg-primary/20 disabled:opacity-50"
              >
                {isSeeding ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {isSeeding ? "Initializing Stream..." : "Seed Sample Stream"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Prospects Queue / List */}
      <div className="flex flex-1 flex-col overflow-hidden bg-black/5">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <Target className="h-4 w-4 text-slate-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Prospect Queue</span>
            <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-bold text-slate-500">{prospects.length}</span>
          </div>
          
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
             <button
              onClick={() => setListMode("cards")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                listMode === "cards" ? "bg-primary text-white shadow-lg" : "text-slate-600 hover:text-slate-400"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setListMode("table")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                listMode === "table" ? "bg-primary text-white shadow-lg" : "text-slate-600 hover:text-slate-400"
              )}
            >
              <ListIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Selection Actions Overlay */}
        {selectedIds.size > 0 && (
          <div className="flex items-center justify-between bg-primary/20 px-5 py-3 backdrop-blur-md border-b border-primary/20 animate-in slide-in-from-top duration-300 shrink-0">
            <span className="text-[9px] font-black uppercase tracking-widest text-primary">
              {selectedIds.size} Selected
            </span>
            <button
              onClick={onBatchDelete}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white transition-all hover:bg-red-600"
            >
              <Trash2 className="h-3 w-3" />
              Purge
            </button>
          </div>
        )}

        <div className="relative border-b border-white/5 bg-white/[0.01] px-5 py-3 shrink-0">
          <Search className="absolute left-8 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-600" />
          <input
            type="text"
            placeholder="FILTER QUEUE..."
            className="w-full rounded-lg bg-white/5 py-2 pl-9 pr-4 text-[10px] font-bold tracking-widest text-white placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>

        <div className="flex-1 overflow-y-auto thin-scrollbar px-3 py-4">
          {prospects.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center opacity-30">
              <RefreshCw className="mb-2 h-6 w-6" />
              <p className="text-[10px] font-black uppercase tracking-widest">Queue Empty</p>
            </div>
          ) : (
            <div className="space-y-2 pb-10">
              {prospects.map((p) => {
                const isSelected = selectedProspectId === p.id;
                const isChecked = selectedIds.has(p.id);

                return (
                  <div
                    key={p.id}
                    onClick={() => onSelect(p)}
                    className={cn(
                      "group relative cursor-pointer overflow-hidden rounded-xl border transition-all duration-300",
                      isSelected 
                        ? "border-primary/40 bg-primary/10 shadow-lg shadow-primary/5" 
                        : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                    )}
                  >
                    {/* Status Indicator Bar */}
                    <div className={cn(
                      "absolute left-0 top-0 h-full w-1 transition-all",
                      isSelected ? "bg-primary" : "bg-transparent group-hover:bg-white/10"
                    )} />
                    
                    <div className="flex items-center justify-between gap-3 p-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => onToggleSelect(p.id, e)}
                            className="h-3.5 w-3.5 rounded border-white/10 bg-white/5 text-primary focus:ring-0 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <h4 className={cn(
                            "truncate text-xs font-bold transition-colors",
                            isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
                          )}>
                            {p.company_name}
                          </h4>
                        </div>
                        <p className="mt-1 pl-5 truncate text-[9px] font-medium text-slate-500 uppercase tracking-tighter">
                          {p.industry || "General Vertical"} • {p.size || "SME"}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-black text-white">{p.priority_score?.toFixed(0) || "0"}</span>
                          <Zap className={cn("h-3 w-3", (p.priority_score || 0) > 80 ? "text-secondary" : "text-slate-600")} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "rounded-md border px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest",
                            p.status === "APPROVED" ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5" : "border-white/10 text-slate-500"
                          )}>
                            {p.status || "IDLE"}
                          </span>
                          <button
                            onClick={(e) => onDelete(p.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-600 hover:text-red-500 transition-all"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
