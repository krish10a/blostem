"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ProspectCSVUpload({ onProspectAdded }: { onProspectAdded?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/prospects/upload/", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        alert(data.message || "CSV Uploaded successfully!");
        setFile(null);
        if (onProspectAdded) onProspectAdded();
      } else {
        alert("Error uploading CSV.");
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
        <CardTitle>Bulk CSV Intake</CardTitle>
        <CardDescription>Upload a CSV file containing target accounts. Columns should include: company_name, website, industry, size.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="csv_upload">Select CSV File</Label>
            <Input 
              id="csv_upload" 
              type="file" 
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={!file || loading} variant="secondary" className="w-full">
          {loading ? "Processing..." : "Upload CSV"}
        </Button>
      </CardFooter>
    </Card>
  );
}
