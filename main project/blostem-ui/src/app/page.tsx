"use client";

import { useEffect, useState } from "react";
import ProspectIntakeForm from "@/components/ProspectIntakeForm";
import ProspectCSVUpload from "@/components/ProspectCSVUpload";
import SignalIntelligencePanel from "@/components/SignalIntelligencePanel";
import PersonaMappingPanel from "@/components/PersonaMappingPanel";
import OutreachGenerationPanel from "@/components/OutreachGenerationPanel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  const [prospects, setProspects] = useState<any[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<any | null>(null);

  const fetchProspects = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/prospects/");
      if (res.ok) {
        let data = await res.json();
        // Rank-order leads by priority score (descending)
        data = data.sort((a: any, b: any) => (b.priority_score || 0) - (a.priority_score || 0));
        setProspects(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProspects();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950 p-8">
      <header className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Blostem AI Marketing Automation
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Enterprise Prospect Intake &amp; Signal Intelligence
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <a
              href="http://127.0.0.1:8000/prospects/export"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 border border-emerald-600 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-900/50 transition font-medium"
              title="Downloads blostem_export.xlsx with approved accounts and sequences"
            >
              ⬇ Export Approved (.xlsx)
            </a>
            <button onClick={fetchProspects} className="text-sm px-4 py-2 border border-zinc-200 rounded-md bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 transition">
              Refresh Data
            </button>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl">
        {/* LEFT COLUMN: Data Ingestion */}
        <div className="flex flex-col gap-6 lg:col-span-1 border-r border-zinc-200 dark:border-zinc-800 pr-8">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Ingest Single Prospect
            </h2>
            <ProspectIntakeForm onProspectAdded={fetchProspects} />
          </section>

          <section className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Bulk CSV Ingestion
            </h2>
            <ProspectCSVUpload onProspectAdded={fetchProspects} />
          </section>
        </div>

        {/* MIDDLE/RIGHT COLUMN: Prospects & Signals */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <section>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
              Prospect Pipeline Database
            </h2>
            
            {prospects.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 text-center text-zinc-500 shadow-sm">
                No prospects ingested yet. Add a company to begin signal extraction.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prospects.map((p) => (
                  <Card 
                    key={p.id} 
                    className={`cursor-pointer transition-all hover:border-zinc-400 dark:hover:border-zinc-600 ${
                      selectedProspect?.id === p.id ? "ring-2 ring-zinc-950 dark:ring-zinc-300" : ""
                    }`}
                    onClick={() => setSelectedProspect(p)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{p.company_name}</CardTitle>
                        <div className="flex gap-2 items-center flex-wrap">
                          {p.outreach_status === "APPROVED" && (
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20" title="Sequence Approved">
                              ✓ Approved
                            </span>
                          )}
                          {p.priority_score !== null && (
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-600/20 shadow-sm" title="Priority Score">
                              ★ {p.priority_score}/100
                            </span>
                          )}
                          {!p.priority_score && p.signals && (
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              Signals Ready
                            </span>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-zinc-500 mb-1">{p.industry} | {p.size}</p>
                      {p.score_explanation && (
                         <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded border border-zinc-100 dark:border-zinc-800 line-clamp-2">
                           <span className="font-semibold">AI Note:</span> {p.score_explanation.split('\\n')[0]}
                         </div>
                      )}
                      {p.fit_score !== null && (
                         <div className="mt-2 flex gap-4 text-xs font-medium text-zinc-500">
                           <span>Fit: {p.fit_score}</span>
                           <span>Intent: {p.intent_score}</span>
                           <span title="Confidence based on signals">Conf: {p.confidence_score}%</span>
                         </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* SIGNAL INTELLIGENCE PANEL */}
          <section className="mt-4">
            {selectedProspect ? (
              <SignalIntelligencePanel 
                prospect={selectedProspect} 
                key={selectedProspect.id} 
                onSignalsGenerated={(updated) => {
                  setSelectedProspect(updated);
                  fetchProspects();
                }} 
              />
            ) : (
              <div className="border border-dashed border-zinc-300 dark:border-zinc-800 rounded-lg p-12 text-center text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50">
                Select a prospect from the pipeline to process AI intelligence.
              </div>
            )}
          </section>

          {/* PERSONA MAPPING PANEL */}
          <section className="mt-4 mb-12">
            {selectedProspect && (
              <PersonaMappingPanel 
                prospect={selectedProspect} 
                key={`persona-${selectedProspect.id}`} 
                onPersonasGenerated={(updated) => {
                  setSelectedProspect(updated);
                  fetchProspects();
                }}
              />
            )}
            
            {selectedProspect && (
              <OutreachGenerationPanel
                prospect={selectedProspect}
                onUpdate={() => {
                  fetchProspects();
                  // Re-fetch the selected prospect for UI refresh
                  const refresh = async () => {
                    try {
                      const res = await fetch(`http://127.0.0.1:8000/prospects/`);
                      if (res.ok) {
                        const data = await res.json();
                        const updatedSelected = data.find((p: any) => p.id === selectedProspect.id);
                        if (updatedSelected) {
                          setSelectedProspect(updatedSelected);
                        }
                      }
                    } catch (e) {}
                  };
                  refresh();
                }}
              />
            )}
          </section>

        </div>
      </main>
    </div>
  );
}
