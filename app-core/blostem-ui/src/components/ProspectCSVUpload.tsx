"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

export default function ProspectCSVUpload({ onProspectAdded }: { onProspectAdded?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ added: number; skipped_rows: number } | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetchWithAuth("/prospects/upload/", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setResult({ added: data.added, skipped_rows: data.skipped_rows });
        setFile(null);
        if (onProspectAdded) onProspectAdded();
      } else {
        const data = await res.json();
        setError(data.detail || "Error uploading CSV.");
      }
    } catch {
      setError("Failed to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
        <p className="text-[10px] font-medium leading-relaxed text-slate-500">
          Bulk-ingest prospects via CSV. Required columns: <code className="text-secondary font-black">company_name</code>. 
          Optional: website, industry, size.
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-[10px] text-red-400 animate-in fade-in zoom-in duration-200">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </div>
      )}

      {result && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-[10px] text-emerald-400 animate-in fade-in zoom-in duration-200">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          <span>
            Successfully added {result.added} prospect(s).
            {result.skipped_rows > 0 && ` (${result.skipped_rows} skipped)`}
          </span>
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="csv_upload" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Source CSV</Label>
        <div className="relative">
          <Input
            id="csv_upload"
            type="file"
            accept=".csv"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setResult(null);
            }}
            className="bg-white/4 border-white/5 text-slate-300 text-xs h-12 rounded-xl file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-primary file:text-white hover:file:bg-primary/80 transition-all cursor-pointer"
          />
        </div>
      </div>

      <Button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full bg-secondary hover:bg-secondary/90 text-white h-11 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-secondary/20 transition-all active:scale-[0.98]"
      >
        {loading ? "Processing Stream..." : (
          <>
            <Upload className="h-3.5 w-3.5 mr-2" />
            Upload CSV
          </>
        )}
      </Button>
    </div>
  );
}
