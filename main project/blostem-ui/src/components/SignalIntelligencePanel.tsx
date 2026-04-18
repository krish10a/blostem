"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Props = {
  prospect: any; // We'll type this properly later, using any for MVP
  onSignalsGenerated?: (prospect: any) => void;
};

export default function SignalIntelligencePanel({ prospect, onSignalsGenerated }: Props) {
  const [loading, setLoading] = useState(false);
  const [manualContext, setManualContext] = useState("");

  const handleGenerate = async () => {
    if (!prospect?.id) return;
    setLoading(true);

    try {
      const res = await fetch(`http://127.0.0.1:8000/prospects/${prospect.id}/generate-signals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manual_context: manualContext })
      });
      if (res.ok) {
        const updatedProspect = await res.json();
        alert("Signals generated successfully!");
        if (onSignalsGenerated) onSignalsGenerated(updatedProspect);
      } else {
        const data = await res.json();
        alert(`Error: ${data.detail || 'Failed to generate signals'}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  const parsedSignals = prospect?.signals ? JSON.parse(prospect.signals) : null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Signal Intelligence</CardTitle>
        <CardDescription>
          Extract business intent, tags, and summary for {prospect?.company_name || ' selected account'} using Gemini 2.0.
        </CardDescription>
      </CardHeader>
      
      {!parsedSignals ? (
        <>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="manualContext">Raw Notes / News / Context</Label>
              <textarea 
                id="manualContext" 
                className="w-full min-h-[100px] flex rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
                placeholder="E.g. Recently raised $20M Series B, looking to expand payments team in UK." 
                value={manualContext}
                onChange={(e) => setManualContext(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerate} disabled={loading || !prospect} className="w-full">
              {loading ? "Generating Signals (Gemini)..." : "Extract Signals"}
            </Button>
          </CardFooter>
        </>
      ) : (
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase text-zinc-500">Signal Summary</h4>
            <p className="text-sm text-zinc-800 dark:text-zinc-200">{parsedSignals.signal_summary}</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase text-zinc-500">Reason Tags</h4>
            <div className="flex flex-wrap gap-2">
              {parsedSignals.reason_tags.map((tag: string, i: number) => (
                 <span key={i} className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-50">
                   {tag}
                 </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase text-zinc-500">Raw Notes / Bullet Points</h4>
            <pre className="text-xs text-zinc-600 bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 p-4 rounded-md overflow-auto whitespace-pre-wrap">
              {parsedSignals.raw_notes}
            </pre>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            {!prospect.priority_score ? (
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={async () => {
                setLoading(true);
                try {
                  const res = await fetch(`http://127.0.0.1:8000/prospects/${prospect.id}/score`, {
                    method: "POST"
                  });
                  if (res.ok) {
                    const updatedProspect = await res.json();
                    if (onSignalsGenerated) onSignalsGenerated(updatedProspect);
                  } else {
                    alert("Failed to compute score.");
                  }
                } catch (e) {
                  alert("Failed to connect to backend for scoring.");
                } finally {
                  setLoading(false);
                }
              }} disabled={loading}>
                {loading ? "Calculating Score..." : "Calculate AI Lead Score"}
              </Button>
            ) : (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md">
                 <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Algorithm Decision</h4>
                 <p className="text-sm text-blue-900 dark:text-blue-200 whitespace-pre-wrap">{prospect.score_explanation}</p>
                 <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold text-blue-800 dark:text-blue-300">
                   <div>Intent: {prospect.intent_score}</div>
                   <div>Fit: {prospect.fit_score}</div>
                 </div>
              </div>
            )}
            <Button variant="outline" className="w-full" onClick={handleGenerate} disabled={loading}>
              {loading ? "Regenerating..." : "Regenerate Signals"}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
