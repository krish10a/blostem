import Link from "next/link";
import {
  FloatingOrb,
  MotionButton,
  MotionCard,
  MotionGroup,
  MotionItem,
  MotionSection,
} from "@/components/motion/BlostemMotion";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MaterialIcon } from "@/components/shell/MaterialIcon";

export default function HomePage() {
  const workflow = [
    {
      step: "01",
      title: "Capture",
      copy: "Pull fragmented account signals from forms, uploads, and public surface activity.",
    },
    {
      step: "02",
      title: "Score",
      copy: "Rank fit, intent, and confidence so operators act on the right accounts first.",
    },
    {
      step: "03",
      title: "Personalize",
      copy: "Map personas, shape outreach angles, and keep reasoning visible for review.",
    },
    {
      step: "04",
      title: "Approve",
      copy: "Run compliance checks, sequence next actions, and export only validated output.",
    },
  ];

  const metrics = [
    { value: "4.2M", label: "signals indexed per hour" },
    { value: "94", label: "average high-intent priority score" },
    { value: "99.9%", label: "pipeline uptime target" },
  ];

  return (
    <div className="relative overflow-x-hidden bg-background text-on-surface">
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0b1326]">
        <div className="bg-mesh absolute inset-0 opacity-50" />
        <FloatingOrb className="absolute -left-[12%] top-[-12%] h-[42rem] w-[42rem] rounded-full bg-primary/14 blur-[130px]" duration={24} />
        <FloatingOrb className="absolute right-[-8%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-secondary/10 blur-[120px]" duration={30} delay={0.25} />
        <FloatingOrb className="absolute bottom-[-16%] left-[28%] h-[34rem] w-[34rem] rounded-full bg-primary-container/14 blur-[150px]" duration={28} delay={0.6} />
      </div>

      <MarketingNav />

      <main className="pt-28 pb-24 lg:pt-32">
        <section className="mx-auto grid max-w-screen-2xl items-center gap-12 px-6 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-20 xl:gap-16">
          <MotionGroup className="relative z-10 space-y-8">
            <MotionItem className="glass-button inline-flex items-center space-x-2 rounded-full px-3 py-1.5 text-xs font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_#4edea3]" />
              <span>Stitched motion system now powering every touchpoint</span>
            </MotionItem>
            <MotionItem className="font-headline text-5xl font-extrabold leading-[0.96] tracking-tight md:text-6xl xl:text-7xl">
              <span className="text-gradient">Prospect intelligence,</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent">
                placed with intent.
              </span>
            </MotionItem>
            <MotionItem className="max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
              Blostem AI turns raw account signals into ranked pipeline action. No more broken placement,
              floating panels, or disconnected flows. Just one calm control surface from intake to export.
            </MotionItem>

            <div className="flex flex-col gap-4 sm:flex-row">
              <MotionButton delay={0.12}>
                <Link
                href="/pipeline"
                className="hover-pulse inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-950 shadow-[0_18px_44px_rgba(255,255,255,0.12)]"
              >
                Open Pipeline
                <MaterialIcon name="arrow_forward" className="text-[18px]" />
              </Link>
              </MotionButton>
              <MotionButton delay={0.18}>
                <Link
                href="/features"
                className="glass-button inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
              >
                Explore System
                <MaterialIcon name="stacked_line_chart" className="text-[18px]" />
              </Link>
              </MotionButton>
            </div>

            <MotionSection className="grid gap-4 sm:grid-cols-3" delay={0.18}>
              {metrics.map((metric, index) => (
                <MotionCard key={metric.label} delay={index * 0.06} className="glass-panel glass-lift rounded-[24px] px-5 py-4">
                  <div className="font-headline text-3xl font-bold text-white">{metric.value}</div>
                  <div className="mt-1 text-sm leading-relaxed text-slate-400">{metric.label}</div>
                </MotionCard>
              ))}
            </MotionSection>
          </MotionGroup>

          <MotionSection className="relative" delay={0.14}>
            <div className="absolute inset-0 rounded-[34px] bg-gradient-to-br from-primary/12 via-white/4 to-secondary/10 blur-2xl" />
            <div className="glass-panel relative overflow-hidden rounded-[34px] border border-white/10 p-5 shadow-[0_40px_120px_rgba(6,14,32,0.75)] sm:p-7">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono-ui text-[10px] uppercase tracking-[0.28em] text-primary">
                    Live Signal Intelligence
                  </p>
                  <h2 className="text-gradient mt-2 font-headline text-2xl font-bold sm:text-3xl">
                    One layout, one motion language
                  </h2>
                </div>
                <div className="glass-button rounded-full px-3 py-1 text-xs font-semibold text-secondary">
                  4.2M events/hour
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <MotionCard className="mouse-glow glass-lift rounded-[26px] border border-white/8 bg-white/[0.03] p-5" delay={0.05}>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="font-label text-[10px] uppercase tracking-[0.24em] text-slate-500">
                      Queue Quality
                    </div>
                    <MaterialIcon name="query_stats" className="shrink-0 text-primary text-[18px]" />
                  </div>
                  <div className="mb-4 font-headline text-4xl font-bold text-white">94</div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-container-highest/60">
                    <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-primary to-secondary" />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    {["Fit", "Intent", "Confidence"].map((label, index) => (
                      <div key={label} className="rounded-2xl bg-surface-container-low/60 px-3 py-2">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                          {label}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-slate-100">
                          {index === 0 ? "91" : index === 1 ? "97" : "88"}
                        </div>
                      </div>
                    ))}
                  </div>
                </MotionCard>

                <MotionCard className="mouse-glow glass-lift rounded-[26px] border border-white/8 bg-white/[0.03] p-5" delay={0.11}>
                  <div className="mb-5 flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/14 text-primary">
                      <MaterialIcon name="shield_locked" className="text-[20px]" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-headline text-lg font-bold text-white">Compliance Lock</div>
                      <div className="text-sm leading-relaxed text-slate-500">
                        Rules applied before export
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {["Suppression lists synced", "Cadence guardrails active", "Approval-only export mode"].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl bg-surface-container-low/60 px-4 py-3 text-sm leading-relaxed text-slate-300"
                        >
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                          <span>{item}</span>
                        </div>
                      )
                    )}
                  </div>
                </MotionCard>

                <MotionCard className="glass-lift space-y-4 rounded-[28px] border border-white/8 bg-[#060e20]/55 p-5 md:col-span-2 xl:col-span-1" delay={0.16}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-label text-[10px] uppercase tracking-[0.24em] text-slate-500">
                        Current Run
                      </div>
                      <div className="mt-1 font-headline text-xl font-bold text-white">
                        Pipeline Sequence
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary/12 px-3 py-1 text-xs font-semibold text-secondary">
                      <span className="h-2 w-2 rounded-full bg-secondary" />
                      Active
                    </span>
                  </div>

                  {[
                    ["Signals extracted", "2 min ago"],
                    ["Scoring completed", "1 min ago"],
                    ["Persona map generated", "now"],
                  ].map(([title, stamp]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3"
                    >
                      <div className="min-w-0 pr-3">
                        <div className="text-sm font-medium text-slate-100">{title}</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                          {stamp}
                        </div>
                      </div>
                      <MaterialIcon name="arrow_outward" className="text-primary text-[18px]" />
                    </div>
                  ))}
                </MotionCard>
              </div>
            </div>
          </MotionSection>
        </section>

        <section className="border-y border-white/6 bg-[#060e20]/55 py-12 backdrop-blur-xl">
          <MotionGroup className="mx-auto grid max-w-screen-2xl gap-6 px-6 md:grid-cols-4">
            {workflow.map((item, index) => (
              <MotionCard
                key={item.step}
                className="glass-lift rounded-[24px] border border-white/6 bg-white/[0.03] p-5"
                delay={0.08 + index * 0.05}
              >
                <div className="font-mono text-sm text-primary">{item.step}</div>
                <h3 className="mt-3 font-headline text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.copy}</p>
              </MotionCard>
            ))}
          </MotionGroup>
        </section>

        <section className="mx-auto max-w-screen-2xl px-6 py-24">
          <MotionSection className="mb-10 max-w-2xl">
            <p className="font-label text-[10px] uppercase tracking-[0.28em] text-primary">
              Architecture
            </p>
            <h2 className="mt-3 font-headline text-4xl font-bold tracking-tight text-white">
              Reference-quality sections, adapted for your product
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              Best elements from stitched landing, dashboard, billing, and pipeline references now speak
              one visual language instead of competing with each other.
            </p>
          </MotionSection>

          <MotionGroup className="grid gap-6 lg:grid-cols-3">
            <MotionCard className="mouse-glow glass-lift glass-panel rounded-[30px] p-7 lg:col-span-2">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <MaterialIcon name="radar" className="text-[22px]" />
                </div>
                <div>
                  <div className="font-label text-[10px] uppercase tracking-[0.24em] text-primary">
                    Signal Layer
                  </div>
                  <div className="font-headline text-2xl font-bold text-white">
                    Ranking, reasoning, and review without clutter
                  </div>
                </div>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
                KPI panels, progress rails, and compliance status now align on one spacing system. Motion
                reveals support hierarchy instead of distracting from it.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {["Account fit", "Persona match", "Sequence readiness"].map((item, index) => (
                  <div key={item} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                      {item}
                    </div>
                    <div className="mt-3 font-headline text-3xl font-bold text-white">
                      {index === 0 ? "91" : index === 1 ? "86" : "73"}
                    </div>
                  </div>
                ))}
              </div>
            </MotionCard>

            <MotionCard className="mouse-glow glass-lift glass-panel rounded-[30px] p-7" delay={0.08}>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/12 text-secondary">
                  <MaterialIcon name="auto_awesome" className="text-[22px]" />
                </div>
                <div className="font-headline text-2xl font-bold text-white">Motion system</div>
              </div>
              <div className="space-y-3">
                {[
                  "Reveal-on-scroll for content blocks",
                  "Route crossfade between workspace pages",
                  "Reduced-motion safe fallbacks",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </MotionCard>
          </MotionGroup>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-10 text-center">
          <MotionSection className="glass-panel glass-lift rounded-[32px] px-6 py-10 sm:px-10 sm:py-12">
            <p className="font-mono-ui text-[10px] uppercase tracking-[0.28em] text-primary">
              Ready to Operate
            </p>
            <h2 className="text-gradient mt-3 font-headline text-4xl font-bold tracking-tight sm:text-5xl">
              Move from raw prospects to governed execution
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
              Open the workbench, test the new responsive shell, and run the full stitched flow across
              dashboard, pipeline, analytics, billing, and export.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="hover-pulse inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-950"
              >
                Launch Dashboard
              </Link>
              <Link
                href="/pricing"
                className="glass-button inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
              >
                View Plans
              </Link>
            </div>
          </MotionSection>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
