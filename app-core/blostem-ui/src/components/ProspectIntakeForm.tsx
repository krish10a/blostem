"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Plus } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";
import { MotionGroup } from "./motion/BlostemMotion";

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
      const res = await fetchWithAuth("/prospects/", {
        method: "POST",
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
    <div className="space-y-4">
      {error && (
        <div className="flex items-start gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-[10px] text-red-400 animate-in fade-in zoom-in duration-200">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <MotionGroup className="grid gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="company_name" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Company Name *</Label>
            <Input
              id="company_name"
              placeholder="e.g. Acme Corp"
              required
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="bg-white/4 border-white/5 text-white placeholder:text-slate-700 text-xs h-10 rounded-xl focus:border-primary/50 focus:ring-0 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="website" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Website</Label>
            <Input
              id="website"
              placeholder="acme.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="bg-white/4 border-white/5 text-white placeholder:text-slate-700 text-xs h-10 rounded-xl focus:border-primary/50 focus:ring-0 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="industry" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Industry</Label>
              <Input
                id="industry"
                placeholder="Fintech"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="bg-white/4 border-white/5 text-white placeholder:text-slate-700 text-xs h-10 rounded-xl focus:border-primary/50 focus:ring-0 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="size" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Size</Label>
              <Input
                id="size"
                placeholder="500-1000"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="bg-white/4 border-white/5 text-white placeholder:text-slate-700 text-xs h-10 rounded-xl focus:border-primary/50 focus:ring-0 transition-all"
              />
            </div>
          </div>
        </MotionGroup>

        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-primary hover:bg-primary/90 text-white h-11 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        >
          {loading ? "Injecting..." : (
            <>
              <Plus className="h-3.5 w-3.5 mr-2" />
              Incorporate Prospect
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
