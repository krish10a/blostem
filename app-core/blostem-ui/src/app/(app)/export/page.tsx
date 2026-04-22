import { MotionButton, MotionCard, MotionGroup, MotionSection } from "@/components/motion/BlostemMotion";
import { MaterialIcon } from "@/components/shell/MaterialIcon";
import { fetchWithAuth } from "@/lib/api";
import { useState } from "react";

function ExportCard(props: {
  icon: string;
  ext: string;
  title: string;
  desc: string;
  whyTitle: string;
  why: string;
  endpoint: string;
  filename: string;
  primary?: boolean;
  disabled?: boolean;
}) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetchWithAuth(props.endpoint);
      if (!res.ok) throw new Error("Download failed");
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = props.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
      alert("Failed to download file. Please check if you are logged in.");
    } finally {
      setDownloading(false);
    }
  };
  return (
    <MotionCard className="mouse-glow haptic-hover group relative flex flex-col overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-low/60 p-8 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-500 hover:border-outline-variant/30 hover:bg-surface-container/80">
      <div className="absolute top-0 right-0 h-48 w-48 -mr-20 -mt-20 rounded-full bg-primary/10 blur-3xl transition-colors duration-700 group-hover:bg-primary/20" />

      <div className="relative z-10 mb-6 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/5 bg-surface-container-highest/80 shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
          <MaterialIcon name={props.icon} className="text-3xl text-secondary" />
        </div>
        <span className="rounded-full border border-white/5 bg-surface/50 px-3 py-1 text-xs font-semibold tracking-wider text-outline backdrop-blur-md">
          {props.ext}
        </span>
      </div>

      <h3 className="relative z-10 mb-2 font-headline text-2xl font-bold text-white">
        {props.title}
      </h3>
      <p className="relative z-10 mb-6 flex-1 text-sm text-slate-400">{props.desc}</p>

      <div className="relative z-10 mb-8 rounded-lg border border-white/5 bg-surface-container-lowest/50 p-4 backdrop-blur-md">
        <div className="mb-2 flex items-center gap-2">
          <MaterialIcon name="info" className="text-primary text-[18px]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {props.whyTitle}
          </span>
        </div>
        <p className="text-sm text-slate-300">{props.why}</p>
      </div>

      {props.disabled ? (
        <div className="relative z-10 mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface-variant/30 py-3 font-label font-medium text-white/60">
          <MaterialIcon name="schedule" className="text-[20px]" />
          Coming soon
        </div>
      ) : (
        <MotionButton>
          <button
          onClick={handleDownload}
          disabled={downloading}
          className={
            props.primary
              ? "relative z-10 mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-container py-3 font-label font-semibold text-white shadow-[0_8px_24px_rgba(17,101,231,0.3)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(17,101,231,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              : "relative z-10 mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface-variant/80 py-3 font-label font-medium text-white transition-all duration-300 hover:bg-surface-bright hover:shadow-lg hover:shadow-black/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          }
        >
          <MaterialIcon name={downloading ? "autorenew" : "download"} className={`text-[20px] ${downloading ? "animate-spin" : ""}`} />
          {downloading ? "Preparing..." : "Download"}
        </button>
        </MotionButton>
      )}
    </MotionCard>
  );
}

export default function ExportPage() {
  return (
    <div className="space-y-12">
      <MotionSection>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-outline-variant/20 bg-surface-container-low/50 px-3 py-1 shadow-lg shadow-black/20 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
          <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant">
            Blostem AI Synthesis Complete
          </span>
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-on-surface to-outline drop-shadow-sm lg:text-5xl">
          Export Center
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-outline">
          Select a format below to extract your insights into your operational workflows.
        </p>
      </MotionSection>

      <MotionGroup className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ExportCard
          icon="table_chart"
          ext=".XLSX"
          title="Complete Dataset"
          desc="Export the entire unedited dataset, including all raw fields, preliminary flags, and unverified entries."
          whyTitle="Why it matters"
          why="Crucial for deep compliance audits and historical record-keeping. Contains full data lineage before human intervention."
          endpoint="/prospects/export-all"
          filename="blostem_full_export.xlsx"
        />
        <ExportCard
          icon="verified"
          ext=".XLSX"
          title="Approved Entries"
          desc="A sanitized export containing only records that have passed validation rules or received manual approval."
          whyTitle="Why it matters"
          why="The standard format for importing into downstream systems. Ensures only clean, verified data enters your workflow."
          endpoint="/prospects/export"
          filename="blostem_approved_export.xlsx"
          primary
        />
        <ExportCard
          icon="data_object"
          ext=".JSON"
          title="Developer Payload"
          desc="Structured JSON representation maintaining hierarchical relationships and metadata tags."
          whyTitle="Why it matters"
          why="Ideal for direct API ingestion, custom scripts, or migrating complex relational models without flattening."
          endpoint="/prospects/export-json"
          filename="blostem_pipeline_export.json"
        />
        <ExportCard
          icon="format_list_bulleted"
          ext=".CSV"
          title="Flattened Matrix (CSV)"
          desc="A universally compatible comma-separated file representing the core dataset in a flat structure."
          whyTitle="Why it matters"
          why="Maximum compatibility with legacy systems and quick lightweight reviews."
          endpoint="#"
          filename=""
          disabled
        />
      </MotionGroup>
    </div>
  );
}
