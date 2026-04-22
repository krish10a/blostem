import Link from "next/link";
import { FloatingOrb, MotionButton, MotionCard, MotionGroup, MotionItem, MotionSection } from "@/components/motion/BlostemMotion";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MaterialIcon } from "@/components/shell/MaterialIcon";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0b1326]">
        <div className="bg-mesh absolute inset-0 opacity-45" />
        <FloatingOrb className="absolute left-[-10%] top-[-10%] h-[34rem] w-[34rem] rounded-full bg-primary/12 blur-[140px]" duration={24} />
        <FloatingOrb className="absolute right-[-6%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-secondary/10 blur-[120px]" duration={30} delay={0.35} />
      </div>

      <MarketingNav active="pricing" />

      <main className="mx-auto w-full max-w-screen-2xl px-6 pb-24 pt-[7.5rem] lg:pt-32">
        <MotionGroup className="mx-auto mb-20 max-w-4xl text-center">
          <MotionItem className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-surface-container-low/55 px-4 py-2 text-xs uppercase tracking-[0.26em] text-primary">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            Plans shaped for operators, teams, and sovereign deployments
          </MotionItem>
          <MotionItem className="mb-6 font-headline text-5xl font-extrabold tracking-tight text-on-surface md:text-6xl">
            Pricing for{" "}
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              clean execution
            </span>
          </MotionItem>
          <MotionItem className="mx-auto max-w-2xl text-xl text-on-surface-variant">
            Same stitched visual system, different levels of power. Choose the command surface that fits
            your team and governance needs.
          </MotionItem>
          <MotionItem className="mt-10 inline-flex items-center rounded-full border border-outline-variant/15 bg-surface-container-low p-1 transition-colors hover:border-outline-variant/30">
            <button className="rounded-full bg-surface-container-highest px-6 py-2 text-sm font-semibold text-on-surface shadow-sm transition-transform hover:scale-105">
              Monthly
            </button>
            <button className="px-6 py-2 text-sm font-medium text-on-surface-variant transition-all hover:text-on-surface">
              Annually{" "}
              <span className="ml-1 rounded-full bg-secondary-container/20 px-2 py-0.5 text-xs text-secondary">
                -20%
              </span>
            </button>
          </MotionItem>
        </MotionGroup>

        <MotionGroup className="relative mb-24 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <MotionCard className="glass-panel card-hover haptic-hover flex flex-col rounded-[30px] p-8">
            <div className="mb-8">
              <h3 className="mb-2 font-headline text-2xl font-bold text-on-surface">Starter</h3>
              <p className="h-10 text-sm text-on-surface-variant">Essential tools for individual operators.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-headline text-4xl font-extrabold text-on-surface">$0</span>
                <span className="text-sm text-on-surface-variant">/mo</span>
              </div>
            </div>
            <ul className="mb-8 flex-grow space-y-4">
              <li className="flex items-start gap-3">
                <MaterialIcon name="check" className="text-primary text-[20px]" />
                <span className="text-sm text-on-surface-variant">Basic operational dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <MaterialIcon name="check" className="text-primary text-[20px]" />
                <span className="text-sm text-on-surface-variant">Up to 3 active projects</span>
              </li>
              <li className="flex items-start gap-3">
                <MaterialIcon name="check" className="text-primary text-[20px]" />
                <span className="text-sm text-on-surface-variant">Community support</span>
              </li>
            </ul>
            <button className="w-full rounded-full border border-outline-variant py-3 text-sm font-medium text-on-surface transition-all duration-300 hover:border-outline hover:bg-surface-container-highest">
              Get Started
            </button>
          </MotionCard>

          <MotionCard className="glow-border card-hover haptic-hover z-10 flex flex-col rounded-[30px] border border-transparent bg-surface-container bg-clip-padding p-8 shadow-[0_20px_40px_rgba(17,101,231,0.15)] lg:-translate-y-4" delay={0.08}>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <span className="rounded-full bg-gradient-to-r from-primary to-primary-container px-3 py-1 text-xs font-bold uppercase tracking-widest text-on-primary shadow-lg">
                Recommended
              </span>
            </div>
            <div className="mb-8">
              <h3 className="mb-2 font-headline text-2xl font-bold text-on-surface">Command Pro</h3>
              <p className="h-10 text-sm text-on-surface-variant">Advanced telemetry and limitless operational scope.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-headline text-4xl font-extrabold text-on-surface">$49</span>
                <span className="text-sm text-on-surface-variant">/mo</span>
              </div>
            </div>
            <ul className="mb-8 flex-grow space-y-4">
              {[
                "Unlimited projects and pipelines",
                "Real-time data synchronization",
                "Advanced asymmetric routing",
                "Priority 24/7 support",
              ].map((feature) => (
                <li key={feature} className="group flex items-start gap-3">
                  <MaterialIcon
                    name="check"
                    className="text-primary text-[20px] transition-transform group-hover:scale-110"
                  />
                  <span className="text-sm font-medium text-on-surface">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full rounded-full bg-gradient-to-r from-primary to-primary-container py-3 text-sm font-bold text-on-primary transition-all duration-300 hover:-translate-y-1 hover:opacity-90 hover:shadow-[0_0_30px_rgba(177,197,255,0.4)]">
              Upgrade to Pro
            </button>
          </MotionCard>

          <MotionCard className="glass-panel card-hover haptic-hover flex flex-col rounded-[30px] p-8" delay={0.16}>
            <div className="mb-8">
              <h3 className="mb-2 font-headline text-2xl font-bold text-on-surface">Sovereign</h3>
              <p className="h-10 text-sm text-on-surface-variant">Custom architecture for global deployments.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-headline text-4xl font-extrabold text-on-surface">Custom</span>
              </div>
            </div>
            <ul className="mb-8 flex-grow space-y-4">
              {[
                "Dedicated cluster and infrastructure",
                "SSO and SAML integration",
                "Custom security policies",
                "Dedicated success manager",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <MaterialIcon name="check" className="text-primary text-[20px]" />
                  <span className="text-sm text-on-surface-variant">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full rounded-full border border-outline-variant py-3 text-sm font-medium text-on-surface transition-all duration-300 hover:border-outline hover:bg-surface-container-highest">
              Contact Sales
            </button>
          </MotionCard>
        </MotionGroup>

        <MotionSection className="mx-auto max-w-6xl" delay={0.18}>
          <h2 className="mb-10 text-center font-headline text-3xl font-bold text-on-surface">
            Architectural Comparison
          </h2>
          <div className="overflow-hidden rounded-[30px] border border-outline-variant/15 bg-surface-container-lowest shadow-2xl transition-all duration-500 hover:border-outline-variant/30 hover:shadow-primary/5">
            <div className="grid grid-cols-4 border-b border-outline-variant/15 bg-surface-container-low p-6">
              <div className="col-span-1 text-sm font-headline font-semibold uppercase tracking-wider text-on-surface-variant">
                Features
              </div>
              <div className="col-span-1 text-center text-sm font-headline font-semibold text-on-surface">
                Starter
              </div>
              <div className="col-span-1 text-center text-sm font-headline font-bold text-primary">
                Command Pro
              </div>
              <div className="col-span-1 text-center text-sm font-headline font-semibold text-on-surface">
                Sovereign
              </div>
            </div>

            <div className="border-b border-outline-variant/10 bg-surface-container/30 px-6 py-3">
              <h4 className="text-sm font-medium text-on-surface">Core Telemetry</h4>
            </div>
            <div className="group grid cursor-default grid-cols-4 border-b border-outline-variant/10 p-6 transition-colors duration-300 hover:bg-surface-container-highest/40">
              <div className="col-span-1 flex items-center text-sm text-on-surface-variant transition-colors group-hover:text-on-surface">
                Data Retention
              </div>
              <div className="col-span-1 flex items-center justify-center text-sm text-on-surface-variant">
                7 Days
              </div>
              <div className="col-span-1 flex items-center justify-center text-sm font-medium text-on-surface transition-colors group-hover:text-primary">
                1 Year
              </div>
              <div className="col-span-1 flex items-center justify-center text-sm text-on-surface-variant">
                Unlimited
              </div>
            </div>
            <div className="group grid cursor-default grid-cols-4 border-b border-outline-variant/10 p-6 transition-colors duration-300 hover:bg-surface-container-highest/40">
              <div className="col-span-1 flex items-center text-sm text-on-surface-variant transition-colors group-hover:text-on-surface">
                API Rate Limit
              </div>
              <div className="col-span-1 flex items-center justify-center text-sm text-on-surface-variant">
                100 / min
              </div>
              <div className="col-span-1 flex items-center justify-center text-sm font-medium text-on-surface transition-colors group-hover:text-primary">
                10,000 / min
              </div>
              <div className="col-span-1 flex items-center justify-center text-sm text-on-surface-variant">
                Custom
              </div>
            </div>

            <div className="border-b border-outline-variant/10 bg-surface-container/30 px-6 py-3">
              <h4 className="text-sm font-medium text-on-surface">Security</h4>
            </div>
            <div className="group grid cursor-default grid-cols-4 border-b border-outline-variant/10 p-6 transition-colors duration-300 hover:bg-surface-container-highest/40">
              <div className="col-span-1 flex items-center text-sm text-on-surface-variant transition-colors group-hover:text-on-surface">
                End-to-End Encryption
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <MaterialIcon name="remove" className="text-outline-variant text-[20px]" />
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <MaterialIcon name="check" className="text-primary text-[20px] transition-transform group-hover:scale-110" />
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <MaterialIcon name="check" className="text-on-surface text-[20px]" />
              </div>
            </div>
            <div className="group grid cursor-default grid-cols-4 p-6 transition-colors duration-300 hover:bg-surface-container-highest/40">
              <div className="col-span-1 flex items-center text-sm text-on-surface-variant transition-colors group-hover:text-on-surface">
                Audit Logs
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <MaterialIcon name="remove" className="text-outline-variant text-[20px]" />
              </div>
              <div className="col-span-1 flex items-center justify-center text-sm font-medium text-on-surface transition-colors group-hover:text-primary">
                30 Days
              </div>
              <div className="col-span-1 flex items-center justify-center text-sm text-on-surface-variant">
                Unlimited
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection className="mt-24 rounded-[32px] border border-white/8 bg-white/[0.03] px-6 py-10 text-center backdrop-blur-xl sm:px-10" delay={0.22}>
          <div className="font-label text-[10px] uppercase tracking-[0.28em] text-primary">Deployment</div>
          <h2 className="mt-3 font-headline text-4xl font-bold text-white">Need custom rollout?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
            Sovereign plan covers private infrastructure, custom security policy, and workflow shaping for
            your exact operating model.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <MotionButton>
              <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-container px-7 py-4 text-sm font-semibold text-on-primary"
            >
              Talk to Sales
            </Link>
            </MotionButton>
            <MotionButton delay={0.08}>
              <Link
              href="/features"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
            >
              Review Features
            </Link>
            </MotionButton>
          </div>
        </MotionSection>
      </main>

      <MarketingFooter />
    </div>
  );
}
