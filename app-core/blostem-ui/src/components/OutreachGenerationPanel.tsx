"use client";

import { useState } from 'react';
import { Mail, Share2, Sparkles, Building2, Send, Copy, AlertCircle, CheckCircle2, RotateCcw, RefreshCw, Phone, MessageSquare, Zap } from 'lucide-react';
import { MotionCard, MotionGroup } from "@/components/motion/BlostemMotion";
import { fetchWithAuth } from "@/lib/api";
import { cn } from "@/lib/utils";

interface OutreachMessage {
  channel: string;
  subject: string;
  body: string;
}

interface PersonaOutreach {
  persona_name: string;
  messages: OutreachMessage[];
}

interface Prospect {
  id: number;
  company_name: string;
  industry?: string;
  signals?: string;
  persona_map?: string;
  messages?: string; // Contains OutreachGenerationOutput JSON
  sequence_plan?: string; // Module 7: Full timeline JSON
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
      const resp = await fetchWithAuth(`/prospects/${prospect.id}/generate-outreach`, {
        method: 'POST',
      });
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.detail || 'Failed to generate outreach');
      }
      onUpdate();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to generate outreach");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApprove = async (approve: boolean) => {
    setIsApproving(true);
    setError(null);
    try {
      const resp = await fetchWithAuth(`/prospects/${prospect.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approve }),
      });
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.detail || 'Failed to update approval status');
      }
      onUpdate();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update approval status");
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
      <MotionCard className="glass-panel mouse-glow mt-8 flex flex-col items-center justify-center rounded-[32px] p-12 text-center" delay={0.1}>
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <Mail className="h-8 w-8 text-white/20" />
        </div>
        <h3 className="font-headline text-xl font-black tracking-tight text-white">Outreach Generation Locked</h3>
        <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-slate-400">
          Stakeholder persona mapping is required for <span className="font-bold text-white">{prospect.company_name}</span> before generating sequences.
        </p>
      </MotionCard>
    );
  }

  return (
    <MotionCard className="glass-panel mouse-glow mt-8 w-full rounded-[32px] p-8" delay={0.1} hover={false}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-[0_0_20px_rgba(177,197,255,0.15)]">
            <Send className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-headline text-lg font-black tracking-tight text-white uppercase">Hyper-Personalized Outreach</h2>
              {isApproved && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-emerald-400">
                  <span className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#4ade80]" />
                  Approved
                </span>
              )}
            </div>
            <p className="mt-1 text-xs font-medium text-slate-400 tracking-wide">
              AI-crafted sales sequences tailored to exact persona pain points for <span className="font-bold text-white">{prospect.company_name}</span>.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {hasOutreach && (
            isApproved ? (
              <button
                onClick={() => handleApprove(false)}
                disabled={isApproving}
                className="glass-button haptic-hover flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-red-400 transition-all hover:bg-red-500/10 disabled:opacity-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Revoke Approval
              </button>
            ) : (
              <button
                onClick={() => handleApprove(true)}
                disabled={isApproving}
                className="haptic-hover flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-emerald-400 transition-all hover:bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)] disabled:opacity-50"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Approve Sequences
              </button>
            )
          )}

          {!hasOutreach ? (
            <button
              onClick={handleGenerateOutreach}
              disabled={isGenerating}
              className="btn-pipeline haptic-hover flex items-center gap-3 rounded-[20px] bg-primary px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-on-primary shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
            >
              <Sparkles className={cn("h-4 w-4", isGenerating && "animate-spin")} />
              {isGenerating ? "Drafting Sequences..." : "Draft Personalized Outreach"}
            </button>
          ) : (
            <button
              onClick={handleGenerateOutreach}
              disabled={isGenerating}
              className="glass-button haptic-hover flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all hover:bg-white/10 hover:text-white disabled:opacity-50"
              title={isApproved ? "Re-generating will reset Approved status to Draft" : ""}
            >
              <RefreshCw className={cn("h-3.5 w-3.5", isGenerating && "animate-spin")} />
              Refresh Sequences
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-400">
           <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
           <p>{error}</p>
        </div>
      )}

      {isApproved && (
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-[11px] font-bold uppercase tracking-widest text-emerald-400/80">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          Sequence locked and queued for export.
        </div>
      )}

      {hasOutreach && outreachPayload.length > 0 && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Tabs Column */}
          <div className="flex flex-col gap-3">
            <h3 className="mb-2 pl-2 font-headline text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Target Stakeholders</h3>
            {outreachPayload.map((persona, idx) => (
              <button
                key={idx}
                onClick={() => setActivePersonaTab(idx)}
                className={cn(
                  "haptic-hover group relative flex items-center gap-4 overflow-hidden rounded-[20px] border px-5 py-4 text-left transition-all duration-500",
                  activePersonaTab === idx
                    ? 'border-primary/40 bg-primary/10 text-white shadow-[0_10px_30px_rgba(177,197,255,0.05)]'
                    : 'border-white/5 bg-white/[0.02] text-slate-500 hover:border-white/15 hover:bg-white/[0.04]'
                )}
              >
                {activePersonaTab === idx && (
                  <div className="absolute inset-y-0 left-0 w-1 bg-primary shadow-[0_0_15px_#b1c5ff]" />
                )}
                <div className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-500",
                  activePersonaTab === idx ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-600 group-hover:text-slate-400'
                )}>
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="block truncate font-headline text-xs font-black tracking-tight">{persona.persona_name}</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest opacity-40">Active Sequence</span>
                </div>
              </button>
            ))}
          </div>

          {/* Editor Column */}
          <div className="lg:col-span-3">
            <MotionGroup className="flex flex-col gap-6">
              {outreachPayload[activePersonaTab]?.messages?.map((msg, msgIdx) => {
                const isLinkedIn = msg.channel.toLowerCase().includes('linkedin');
                const isCall = msg.channel.toLowerCase().includes('call') || msg.channel.toLowerCase().includes('phone');
                const copyKey = `${activePersonaTab}-${msgIdx}`;
                
                return (
                  <MotionCard 
                    key={msgIdx} 
                    className="relative overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.02] shadow-2xl transition-all hover:border-white/15 hover:bg-white/[0.03]"
                    delay={msgIdx * 0.05}
                  >
                    <div className="flex items-center justify-between border-b border-white/6 bg-white/[0.03] px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg",
                          isLinkedIn ? "bg-[#0A66C2]/10 text-[#0A66C2]" : isCall ? "bg-emerald-500/10 text-emerald-400" : "bg-primary/10 text-primary"
                        )}>
                          {isLinkedIn ? <Share2 className="h-4 w-4" /> : isCall ? <Phone className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                        </div>
                        <span className="font-headline text-[10px] font-black uppercase tracking-[0.2em] text-white">
                          {msg.channel}
                        </span>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(msg.body, copyKey)}
                        className="glass-button flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:text-white"
                      >
                        {copiedIdx === copyKey ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    
                    <div className="p-8">
                      {!isLinkedIn && msg.subject && msg.subject !== "N/A" && (
                        <div className="mb-8">
                          <div className="mb-3 flex items-center gap-2">
                            <MessageSquare className="h-3 w-3 text-primary/60" />
                            <label className="font-headline text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Subject Line</label>
                          </div>
                          <div className="rounded-2xl border border-white/5 bg-black/30 px-5 py-4 font-headline text-sm font-black tracking-tight text-white shadow-inner">
                            {msg.subject}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <div className="mb-3 flex items-center gap-2">
                          <Zap className="h-3 w-3 text-secondary/60" />
                          <label className="font-headline text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Message Content</label>
                        </div>
                        <div className="rounded-2xl border border-white/5 bg-black/30 px-6 py-6 text-[13px] font-medium leading-relaxed text-slate-300 shadow-inner whitespace-pre-wrap">
                          {msg.body}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="flex items-center justify-between border-t border-white/6 bg-white/[0.01] px-8 py-3">
                      <div className="flex items-center gap-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Tone: <span className="text-slate-400">Strategic Professional</span></span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Length: <span className="text-slate-400">~{msg.body.split(' ').length} words</span></span>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary/60">AI Optimized</span>
                    </div>
                  </MotionCard>
                );
              })}
            </MotionGroup>
          </div>
        </div>
      )}
    </MotionCard>
  );
}
