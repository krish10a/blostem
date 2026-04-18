"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ProspectIntakeForm({ onProspectAdded }: { onProspectAdded?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    website: "",
    industry: "",
    size: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/prospects/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Prospect added successfully!");
        setFormData({ company_name: "", website: "", industry: "", size: "" });
        if (onProspectAdded) onProspectAdded();
      } else {
        alert("Error adding prospect.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manual Prospect Intake</CardTitle>
        <CardDescription>Add a new enterprise prospect to the pipeline.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name *</Label>
            <Input 
              id="company_name" 
              placeholder="e.g. Acme Corp" 
              required 
              value={formData.company_name}
              onChange={(e) => setFormData({...formData, company_name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input 
              id="website" 
              placeholder="e.g. acme.com" 
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input 
                id="industry" 
                placeholder="e.g. Fintech" 
                value={formData.industry}
                onChange={(e) => setFormData({...formData, industry: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input 
                id="size" 
                placeholder="e.g. 500-1000" 
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Adding..." : "Add Prospect"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
