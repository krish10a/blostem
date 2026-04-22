import Link from "next/link";
import { FloatingOrb, MotionButton, MotionCard, MotionGroup, MotionItem, MotionSection } from "@/components/motion/BlostemMotion";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MaterialIcon } from "@/components/shell/MaterialIcon";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface relative overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="bg-mesh absolute inset-0 opacity-35" />
        <FloatingOrb className="absolute left-[-8%] top-[-10%] h-[36rem] w-[36rem] rounded-full bg-primary/14 blur-[140px]" duration={24} />
        <FloatingOrb className="absolute right-[-10%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-secondary/10 blur-[120px]" duration={28} delay={0.3} />
      </div>
      <MarketingNav active="product" />
      <main className="pt-24 pb-32">
        <header className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:py-32">
          <MotionGroup className="lg:col-span-7 space-y-8">
            <MotionItem className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-low px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                The Blostem Pipeline
              </span>
            </MotionItem>
            <MotionItem className="font-headline text-5xl font-extrabold leading-tight tracking-tight lg:text-7xl">
              Intelligence
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                Orchestrated.
              </span>
            </MotionItem>
            <MotionItem className="max-w-2xl text-xl leading-relaxed text-on-surface-variant">
              A rigorous operational system transforming unstructured data into precise outreach.
              Not just features, but a contiguous flow of automated strategy.
            </MotionItem>
            <div className="flex items-center gap-4 pt-4">
              <MotionButton>
                <Link
                href="/pipeline"
                className="rounded-md bg-gradient-to-r from-primary to-primary-container px-8 py-3 font-semibold text-on-primary shadow-[0_10px_20px_rgba(17,101,231,0.2)] hover:shadow-[0_15px_30px_rgba(17,101,231,0.4)] hover:-translate-y-1 transition-all"
              >
                Deploy Pipeline
              </Link>
              </MotionButton>
              <MotionButton delay={0.08}>
                <Link
                href="/"
                className="rounded-md border border-outline-variant/30 px-8 py-3 font-medium text-primary hover:bg-surface-container-low hover:border-primary/50 transition-all"
              >
                View Architecture
              </Link>
              </MotionButton>
            </div>
          </MotionGroup>
          <MotionSection className="lg:col-span-5 relative" delay={0.14}>
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-[100px]" />
            <div className="relative rounded-xl border border-outline-variant/15 bg-surface-container p-6 shadow-[0_30px_60px_rgba(6,14,32,0.8)]">
              <div className="mouse-glow rounded-lg border border-outline-variant/10 bg-surface-container-lowest/60 p-6">
                <div className="flex items-center justify-between">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                    Live
                  </span>
                  <span className="font-mono text-xs text-secondary">VERIFIED</span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {["Signals", "Scoring", "Outreach"].map((x) => (
                    <div
                      key={x}
                      className="rounded-md border border-outline-variant/15 bg-surface-container-low p-3 text-center"
                    >
                      <div className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                        {x}
                      </div>
                      <div className="mt-2 font-headline text-2xl font-bold text-primary">
                        {x === "Signals" ? "14K" : x === "Scoring" ? "94" : "7.8K"}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-on-surface-variant">
                  <MaterialIcon name="shield_locked" className="text-error text-[18px]" />
                  Immutable Governance enabled
                </div>
              </div>
            </div>
          </MotionSection>
        </header>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <MotionGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <MotionCard className="mouse-glow haptic-hover lg:col-span-2 rounded-xl bg-surface-container-low p-8 border border-outline-variant/10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 shadow-[0_0_15px_rgba(177,197,255,0.1)]">
                  <MaterialIcon name="radar" className="text-primary" />
                </div>
                <div>
                  <div className="font-headline text-lg font-bold text-primary">01 / Signals</div>
                  <div className="font-headline text-3xl font-bold text-on-surface">
                    Signal Acquisition Engine
                  </div>
                </div>
              </div>
              <p className="max-w-xl text-sm text-on-surface-variant leading-relaxed">
                Continuous monitoring of digital exhaust. Ingest billions of data points across public registries,
                social sentiment, and disclosures to detect intent before it manifests.
              </p>
            </MotionCard>

            <MotionCard className="mouse-glow haptic-hover rounded-xl bg-surface-container-low p-8 border border-outline-variant/10" delay={0.06}>
              <div className="font-headline text-lg font-bold text-primary">02 / Scoring</div>
              <h2 className="mt-2 font-headline text-2xl font-bold text-on-surface">
                Propensity Matrix
              </h2>
              <p className="mt-4 text-sm text-on-surface-variant">
                Dynamic scoring based on historical conversion vectors and real-time behavioral shifts.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-md bg-surface-container-lowest p-3">
                  <span className="text-xs uppercase text-on-surface-variant">Conversion Probability</span>
                  <span className="text-sm font-bold text-secondary">94.2%</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-surface-container-lowest p-3">
                  <span className="text-xs uppercase text-on-surface-variant">Velocity Score</span>
                  <span className="text-sm font-bold text-primary">High</span>
                </div>
              </div>
            </MotionCard>

            <MotionCard className="mouse-glow haptic-hover rounded-xl bg-surface-container-low p-8 border border-outline-variant/10" delay={0.12}>
              <div className="font-headline text-lg font-bold text-primary">03 / Personas</div>
              <h2 className="mt-2 font-headline text-2xl font-bold text-on-surface">
                Dynamic Identity Synthesis
              </h2>
              <p className="mt-4 text-sm text-on-surface-variant">
                Auto-generate psychographic profiles from sparse data and tailor messaging per decision-maker.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded bg-surface-container-highest px-2 py-1 text-xs text-on-surface-variant">
                  CFO / Risk Averse
                </span>
                <span className="rounded bg-surface-container-highest px-2 py-1 text-xs text-on-surface-variant">
                  VP Ops / Efficiency
                </span>
              </div>
            </MotionCard>

            <MotionCard className="mouse-glow haptic-hover md:col-span-2 rounded-xl border border-outline-variant/10 bg-gradient-to-br from-surface-container-low to-surface-container-highest p-8" delay={0.18}>
              <div className="grid gap-8 md:grid-cols-[1fr_280px] items-center">
                <div>
                  <div className="font-headline text-lg font-bold text-primary">04 / Outreach</div>
                  <h2 className="mt-2 font-headline text-3xl font-bold text-on-surface">
                    Autonomous Engagement Orchestration
                  </h2>
                  <p className="mt-4 text-sm text-on-surface-variant">
                    Multi-channel sequencing across email, LinkedIn, and ads with real-time cadence tuning.
                  </p>
                </div>
                <div className="rounded-lg border border-white/5 bg-surface-container-lowest p-4">
                  <div className="space-y-3">
                    <div className="h-2 w-full rounded bg-surface-variant" />
                    <div className="h-2 w-3/4 rounded bg-surface-variant" />
                    <div className="h-2 w-1/2 rounded bg-primary/40" />
                  </div>
                </div>
              </div>
            </MotionCard>

            <MotionCard className="mouse-glow haptic-hover md:col-span-2 rounded-xl bg-surface-container-low p-8 border-l-4 border-error/50" delay={0.24}>
              <div className="flex items-start gap-4">
                <MaterialIcon name="shield_locked" className="text-error/80 text-3xl" />
                <div>
                  <div className="text-error/80 font-headline text-sm font-bold uppercase tracking-wider">
                    05 / Compliance Protocol
                  </div>
                  <h3 className="mt-1 text-xl font-headline font-bold text-on-surface">
                    Immutable Governance
                  </h3>
                  <p className="mt-2 text-sm text-on-surface-variant">
                    Automated suppression lists, frequency capping, and GDPR/CCPA checks.
                  </p>
                </div>
              </div>
            </MotionCard>

            <MotionCard className="mouse-glow haptic-hover rounded-xl bg-surface-container-low p-8 border border-outline-variant/10" delay={0.3}>
              <div className="font-headline text-sm font-bold uppercase tracking-wider text-primary">
                06 / Analytics
              </div>
              <h3 className="mt-2 text-xl font-headline font-bold text-on-surface">
                Full-Cycle Attribution
              </h3>
              <p className="mt-2 text-sm text-on-surface-variant">
                Visibility from signal to close. Understand vectors driving pipeline velocity.
              </p>
            </MotionCard>
          </MotionGroup>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
