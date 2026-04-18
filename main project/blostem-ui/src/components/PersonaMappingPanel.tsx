"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  prospect: any; // We'll type this properly later
  onPersonasGenerated?: (prospect: any) => void;
};

export default function PersonaMappingPanel({ prospect, onPersonasGenerated }: Props) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prospect?.id) return;
    setLoading(true);

    try {
      const res = await fetch(`http://127.0.0.1:8000/prospects/${prospect.id}/map-personas`, {
        method: "POST"
      });
      if (res.ok) {
        const updatedProspect = await res.json();
        alert("Personas mapped successfully!");
        if (onPersonasGenerated) onPersonasGenerated(updatedProspect);
      } else {
        const data = await res.json();
        alert(`Error: ${data.detail || 'Failed to map personas'}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  const parsedMapping = prospect?.persona_map ? JSON.parse(prospect.persona_map) : null;
  const personas = parsedMapping?.personas || [];

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>Stakeholder Persona Mapping</CardTitle>
        <CardDescription>
          Identify key decision-makers and generate role-specific pitch angles.
        </CardDescription>
      </CardHeader>
      
      {!parsedMapping ? (
        <CardContent className="flex flex-col items-center justify-center p-8 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 text-center mb-6 max-w-sm">
            Map out 3-5 key personas directly relevant to the extracted signals for {prospect?.company_name || 'this account'}.
          </p>
          <Button onClick={handleGenerate} disabled={loading || !prospect.signals} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white">
            {loading ? "Mapping Personas..." : prospect.signals ? "Identify Key Stakeholders" : "Generate Signals First"}
          </Button>
        </CardContent>
      ) : (
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personas.map((persona: any, idx: number) => (
              <div key={idx} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-950/50 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">{persona.persona_name}</h4>
                  <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded dark:bg-indigo-900/40 dark:text-indigo-400">
                    {persona.role}
                  </span>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div>
                    <h5 className="text-[11px] font-bold uppercase text-zinc-400">Pain Points</h5>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1">{persona.pain_points}</p>
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold uppercase text-zinc-400">Likely Objections</h5>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1">{persona.objections}</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900 p-2 rounded border border-zinc-100 dark:border-zinc-800">
                    <h5 className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-500">Best Pitch Angle</h5>
                    <p className="text-xs text-zinc-800 dark:text-zinc-200 font-medium mt-1">{persona.pitch_angle}</p>
                  </div>
                  <div className="flex justify-between border-t border-zinc-100 dark:border-zinc-800 pt-2 text-[11px]">
                    <span className="text-zinc-500">Tone: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{persona.message_tone}</span></span>
                    <span className="text-zinc-500">CTA: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{persona.call_to_action_style}</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button variant="outline" className="w-full" onClick={handleGenerate} disabled={loading}>
              {loading ? "Regenerating..." : "Regenerate Personas"}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
