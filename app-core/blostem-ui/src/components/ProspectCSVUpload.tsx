"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/prospects/upload/`, {
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
    <Card className="w-full border-white/10 bg-transparent shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-sm text-white">Bulk CSV Upload</CardTitle>
        <CardDescription className="text-xs text-zinc-500">
          Columns: <code className="text-zinc-400">company_name</code>, website, industry, size
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {error && (
          <div className="flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 mb-3 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            {error}
          </div>
        )}
        {result && (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 mb-3 text-xs text-emerald-400">
            ✓ Added {result.added} prospect(s).
            {result.skipped_rows > 0 && ` Skipped ${result.skipped_rows} row(s) with no company name.`}
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="csv_upload" className="text-xs text-zinc-400">Select CSV File</Label>
          <Input
            id="csv_upload"
            type="file"
            accept=".csv"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setResult(null);
            }}
            className="bg-white/5 border-white/10 text-zinc-300 text-xs h-8 file:text-zinc-400 file:bg-transparent file:border-0"
          />
        </div>
      </CardContent>
      <CardFooter className="px-0 pb-0">
        <Button
          onClick={handleUpload}
          disabled={!file || loading}
          variant="secondary"
          className="w-full bg-white/10 hover:bg-white/20 text-white border-white/10 h-8 text-xs"
        >
          {loading ? "Processing..." : "Upload CSV"}
        </Button>
      </CardFooter>
    </Card>
  );
}
