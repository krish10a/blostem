import { MotionCard, MotionGroup, MotionItem, MotionSection } from "@/components/motion/BlostemMotion";

export function MarketingFooter() {
  const links = ["Privacy", "Terms", "Security", "Status"];

  return (
    <footer className="border-t border-white/6 bg-[#060e20]/70 py-12 backdrop-blur-xl">
      <MotionGroup className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between">
        <MotionItem className="space-y-2">
          <div className="font-headline text-gradient text-lg font-bold tracking-tight">
            Blostem AI
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-500">
            Prospect intelligence, scoring, outreach, and governance on one cinematic control surface.
          </p>
        </MotionItem>

        <MotionSection className="flex flex-wrap items-center gap-3" delay={0.08}>
          {links.map((label, index) => (
            <MotionCard key={label} delay={index * 0.04} hover={false}>
              <a
              key={label}
              className="glass-button rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 transition-colors hover:border-white/14 hover:text-slate-300"
              href="#"
            >
              {label}
              </a>
            </MotionCard>
          ))}
        </MotionSection>

        <MotionItem className="font-mono-ui text-xs uppercase tracking-[0.24em] text-slate-600">
          Copyright 2026 Blostem AI
        </MotionItem>
      </MotionGroup>
    </footer>
  );
}
