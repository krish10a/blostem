"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

type Props = {
  prospect: any;
  onSignalsGenerated?: (prospect: any) => void;
};

export default function SignalIntelligencePanel({ prospect, onSignalsGenerated }: Props) {
  const [loading, setLoading] = useState(false);
  const [manualContext, setManualContext] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prospect?.id) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://127.0.0.1:8000/prospects/${prospect.id}/generate-signals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manual_context: manualContext })
      });
      if (res.ok) {
        const updatedProspect = await res.json();
        if (onSignalsGenerated) onSignalsGenerated(updatedProspect);
      } else {
        const data = await res.json();
        setError(data.detail || "Failed to generate signals");
      }
    } catch (err) {
      setError("Failed to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleScore = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://127.0.0.1:8000/prospects/${prospect.id}/score`, {
        method: "POST"
      });
      if (res.ok) {
        const updatedProspect = await res.json();
        if (onSignalsGenerated) onSignalsGenerated(updatedProspect);
      } else {
        const data = await res.json();
        setError(data.detail || "Failed to compute score.");
      }
    } catch {
      setError("Failed to connect to backend for scoring.");
    } finally {
      setLoading(false);
    }
  };

  let parsedSignals = null;
  try {
    parsedSignals = prospect?.signals ? JSON.parse(prospect.signals) : null;
  } catch {
    parsedSignals = null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Signal Intelligence</CardTitle>
        <CardDescription>
          Extract business intent, tags, and summary for {prospect?.company_name || "selected account"} using Gemini AI.
        </CardDescription>
      </CardHeader>

      {error && (
        <div className="mx-6 mb-2 flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-xs text-red-700 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {!parsedSignals ? (
        <>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="manualContext">Raw Notes / News / Context (optional)</Label>
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
              {parsedSignals.reason_tags?.map((tag: string, i: number) => (
                <span key={i} className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-50">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase text-zinc-500">Raw Notes</h4>
            <pre className="text-xs text-zinc-600 bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 p-4 rounded-md overflow-auto whitespace-pre-wrap">
              {parsedSignals.raw_notes}
            </pre>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            {!prospect.priority_score ? (
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleScore}
                disabled={loading}
              >
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
