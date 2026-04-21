"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

export default function ProspectIntakeForm({ onProspectAdded }: { onProspectAdded?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company_name: "",
    website: "",
    industry: "",
    size: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company_name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/prospects/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ company_name: "", website: "", industry: "", size: "" });
        if (onProspectAdded) onProspectAdded();
      } else {
        const data = await res.json();
        setError(data.detail || "Error adding prospect.");
      }
    } catch {
      setError("Failed to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full border-white/10 bg-transparent shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-sm text-white">Manual Intake</CardTitle>
        <CardDescription className="text-xs text-zinc-500">Add a single enterprise prospect.</CardDescription>
      </CardHeader>
      {error && (
        <div className="flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 mb-3 text-xs text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-3 px-0">
          <div className="space-y-1.5">
            <Label htmlFor="company_name" className="text-xs text-zinc-400">Company Name *</Label>
            <Input
              id="company_name"
              placeholder="e.g. Acme Corp"
              required
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 text-sm h-8"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="website" className="text-xs text-zinc-400">Website</Label>
            <Input
              id="website"
              placeholder="acme.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 text-sm h-8"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="industry" className="text-xs text-zinc-400">Industry</Label>
              <Input
                id="industry"
                placeholder="Fintech"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 text-sm h-8"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="size" className="text-xs text-zinc-400">Team Size</Label>
              <Input
                id="size"
                placeholder="500-1000"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 text-sm h-8"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-0 pb-0">
          <Button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white h-8 text-xs">
            {loading ? "Adding..." : "Add Prospect"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
