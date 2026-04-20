"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "./MaterialIcon";

const TITLES: Record<
  string,
  { eyebrow: string; title: string; description: string }
> = {
  "/dashboard": {
    eyebrow: "Overview",
    title: "Intelligence Dashboard",
    description: "Monitor scoring, approvals, and live execution velocity.",
  },
  "/analytics": {
    eyebrow: "Insights",
    title: "Executive Analytics",
    description: "Read conversion movement, best personas, and account momentum.",
  },
  "/pipeline": {
    eyebrow: "Execution",
    title: "Pipeline Workbench",
    description: "Manage intake, run enrichment, and ship outreach in one flow.",
  },
  "/export": {
    eyebrow: "Deliverables",
    title: "Export Center",
    description: "Move validated intelligence into downstream systems.",
  },
  "/billing": {
    eyebrow: "Workspace",
    title: "Settings and Billing",
    description: "Control access, preferences, and plan limits.",
  },
};

export function AppTopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const pathname = usePathname();
  const content = TITLES[pathname] ?? {
    eyebrow: "Workspace",
    title: "Sovereign Command",
    description: "Operate Blostem AI from a unified command surface.",
  };

  return (
    <header className="sticky top-3 z-30 rounded-[26px] border border-white/8 bg-[#0b1326]/72 px-4 py-4 shadow-[0_20px_50px_rgba(6,14,32,0.4)] backdrop-blur-2xl sm:px-5 lg:top-4 lg:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onMenuToggle}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-slate-200 transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Open navigation"
          >
            <MaterialIcon name="menu" className="text-[20px]" />
          </button>

          <div className="min-w-0">
            <p className="font-label mb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary sm:text-xs">
              {content.eyebrow}
            </p>
            <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface sm:text-[2rem]">
              {content.title}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
              {content.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1 sm:min-w-[16rem] xl:min-w-[20rem]">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MaterialIcon name="search" className="text-outline text-sm" />
            </span>
            <input
              className="w-full rounded-2xl border border-outline-variant/15 bg-surface-container-low/50 py-2.5 pl-9 pr-4 text-sm text-on-surface placeholder:text-outline transition-all hover:bg-surface-container-low/80 focus:border-primary focus:ring-2 focus:ring-surface-tint/20"
              placeholder="Search accounts, personas, or exports..."
              type="text"
            />
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Link
              href="/features"
              className="hidden rounded-2xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 sm:inline-flex sm:items-center sm:gap-2"
            >
              <MaterialIcon name="auto_stories" className="text-[18px]" />
              View Flow
            </Link>

            <button className="haptic-hover flex h-11 w-11 items-center justify-center rounded-2xl border border-outline-variant/15 bg-surface-container-low/50 transition-colors hover:bg-surface-container-high">
              <MaterialIcon name="notifications" className="text-on-surface text-lg" />
            </button>

            <div className="hidden items-center gap-2 rounded-2xl border border-white/8 bg-white/5 px-3 py-2 sm:flex">
              <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_10px_#4edea3]" />
              <span className="font-label text-xs uppercase tracking-[0.2em] text-slate-300">
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
