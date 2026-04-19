"use client";

import { useState } from 'react';
import { Mail, Share2, Sparkles, Building2, Send, Copy, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';

interface OutreachMessage {
  channel: string;
  subject: string;
  body: string;
}

interface PersonaOutreach {
  persona_name: string;
  messages: OutreachMessage[];
}

interface OutreachGenerationOutput {
  outreach_payload: PersonaOutreach[];
}

interface Prospect {
  id: number;
  company_name: string;
  industry: string;
  signals?: string;
  persona_map?: string;
  messages?: string; // Contains OutreachGenerationOutput JSON
  outreach_status?: string; // null | "DRAFTED" | "APPROVED"
}

interface OutreachGenerationPanelProps {
  prospect: Prospect;
  onUpdate: () => void;
}

export default function OutreachGenerationPanel({ prospect, onUpdate }: OutreachGenerationPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activePersonaTab, setActivePersonaTab] = useState<number>(0);
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null);

  const hasOutreach = !!prospect.messages;
  const isApproved = prospect.outreach_status === "APPROVED";
  const isDrafted = prospect.outreach_status === "DRAFTED";
  
  let outreachPayload: PersonaOutreach[] = [];
  if (hasOutreach) {
    try {
      const parsed = JSON.parse(prospect.messages!);
      outreachPayload = parsed.outreach_payload || [];
    } catch (e) {
      console.error("Failed to parse messages:", e);
    }
  }

  const handleGenerateOutreach = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const resp = await fetch(`http://127.0.0.1:8000/prospects/${prospect.id}/generate-outreach`, {
        method: 'POST',
      });
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.detail || 'Failed to generate outreach');
      }
      onUpdate();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApprove = async (approve: boolean) => {
    setIsApproving(true);
    setError(null);
    try {
      const resp = await fetch(`http://127.0.0.1:8000/prospects/${prospect.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approve }),
      });
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.detail || 'Failed to update approval status');
      }
      onUpdate();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsApproving(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(key);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  if (!prospect.persona_map) {
    return (
      <div className="mt-8 rounded-xl border border-white/10 bg-black/20 p-8 backdrop-blur-md">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-white/5 p-3">
            <Mail className="h-6 w-6 text-white/40" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-white">Outreach Generation Locked</h3>
          <p className="max-w-md text-sm text-zinc-400">
            You must map personas for {prospect.company_name} before generating personalized outreach sequences.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-xl border border-white/10 bg-linear-to-b from-black/40 to-black/20 p-6 backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="flex items-center text-xl font-bold text-white">
            <Send className="mr-2 h-5 w-5 text-indigo-400" />
            Hyper-Personalized Outreach
            {/* Status badge */}
            {isApproved && (
              <span className="ml-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
                <CheckCircle2 className="h-3 w-3" /> Approved
              </span>
            )}
            {isDrafted && !isApproved && (
              <span className="ml-3 inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/30">
                Draft
              </span>
            )}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            AI-crafted sales sequences tailored to exact persona pain points for {prospect.company_name}.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Approve / Un-approve button */}
          {hasOutreach && (
            isApproved ? (
              <button
                onClick={() => handleApprove(false)}
                disabled={isApproving}
                className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 transition-all hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 disabled:opacity-50"
                title="Un-approve this sequence"
              >
                <RotateCcw className="h-4 w-4" />
                {isApproving ? 'Updating...' : 'Revoke Approval'}
              </button>
            ) : (
              <button
                onClick={() => handleApprove(true)}
                disabled={isApproving}
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-emerald-500 disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" />
                {isApproving ? 'Approving...' : 'Approve Sequence'}
              </button>
            )
          )}

          {/* Generate / Refresh button */}
          {!hasOutreach ? (
            <button
              onClick={handleGenerateOutreach}
              disabled={isGenerating}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-500 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Drafting Sequences...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Draft Personalized Outreach
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleGenerateOutreach}
              disabled={isGenerating}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 disabled:opacity-50"
              title={isApproved ? "Re-generating will reset Approved status to Draft" : ""}
            >
              {isGenerating ? <Sparkles className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Refresh Sequences
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-sm text-red-400 flex items-start gap-3">
           <AlertCircle className="h-5 w-5 shrink-0" />
           <p>{error}</p>
        </div>
      )}

      {/* Approval notice */}
      {isApproved && (
        <div className="mb-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-sm text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          This sequence is approved and will be included in the next Export (.xlsx).
        </div>
      )}

      {hasOutreach && outreachPayload.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Tabs Column */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Stakeholders</h3>
            {outreachPayload.map((persona, idx) => (
              <button
                key={idx}
                onClick={() => setActivePersonaTab(idx)}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all ${
                  activePersonaTab === idx
                    ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300'
                    : 'border-white/5 bg-black/20 text-zinc-400 hover:border-white/10 hover:bg-white/5'
                }`}
              >
                <Building2 className={`h-4 w-4 ${activePersonaTab === idx ? 'text-indigo-400' : 'text-zinc-500'}`} />
                <span className="text-sm font-medium">{persona.persona_name}</span>
              </button>
            ))}
          </div>

          {/* Editor Column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            {outreachPayload[activePersonaTab].messages.map((msg, msgIdx) => {
              const isLinkedIn = msg.channel.toLowerCase().includes('linkedin');
              const copyKey = `${activePersonaTab}-${msgIdx}`;
              return (
                <div key={msgIdx} className="rounded-lg border border-white/10 bg-black/40 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
                    <span className="flex items-center gap-2 text-sm font-medium text-white">
                      {isLinkedIn ? <Share2 className="h-4 w-4 text-[#0A66C2]" /> : <Mail className="h-4 w-4 text-zinc-400" />}
                      {msg.channel}
                    </span>
                    <button 
                      onClick={() => copyToClipboard(msg.body, copyKey)}
                      className="text-zinc-500 hover:text-white transition-colors"
                      title="Copy body to clipboard"
                    >
                      {copiedIdx === copyKey ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  <div className="p-4">
                    {!isLinkedIn && msg.subject && msg.subject !== "N/A" && (
                      <div className="mb-4 space-y-1">
                        <label className="text-xs font-medium text-zinc-500">Subject</label>
                        <div className="rounded-md border border-white/5 bg-black/20 px-3 py-2 text-sm text-white">
                          {msg.subject}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-zinc-500">Body</label>
                      <div className="rounded-md border border-white/5 bg-black/20 px-3 py-3 text-sm text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed">
                        {msg.body}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
