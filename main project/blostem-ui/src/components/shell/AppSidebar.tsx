"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { MaterialIcon } from "./MaterialIcon";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: string };

const CORE: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/analytics", label: "Analytics", icon: "insights" },
  { href: "/pipeline", label: "Pipeline", icon: "account_tree" },
  { href: "/export", label: "Reports", icon: "description" },
  { href: "/billing", label: "Settings", icon: "settings" },
];

const SECONDARY: NavItem[] = [
  { href: "/features", label: "Playbook", icon: "library_books" },
  { href: "/pricing", label: "Plans", icon: "workspace_premium" },
];

export function AppSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-[#060e20]/70 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        animate={reduceMotion ? undefined : { opacity: isOpen ? 1 : 0 }}
        transition={reduceMotion ? undefined : { duration: 0.28 }}
      />

      <motion.nav
        className={cn(
          "glass-nav fixed inset-y-3 left-3 z-50 flex w-[18.75rem] flex-col overflow-hidden rounded-[28px] p-4 transition-transform duration-300 lg:inset-y-4 lg:left-4",
          isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)] lg:translate-x-0"
        )}
        initial={reduceMotion ? undefined : { opacity: 0, x: -28, scale: 0.98 }}
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                x: 0,
                scale: 1,
              }
        }
        transition={reduceMotion ? undefined : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-6 flex items-start justify-between gap-3 px-2 pt-1">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary shadow-[0_0_25px_rgba(177,197,255,0.28)]">
              <MaterialIcon name="dataset" className="text-on-primary text-[20px]" fill />
            </div>
            <div className="leading-tight">
              <div className="font-headline text-lg font-extrabold tracking-tight text-white">
                Blostem AI
              </div>
              <div className="font-label text-xs uppercase tracking-[0.24em] text-slate-400">
                Command Layer
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="glass-lift mb-5 rounded-2xl border border-white/8 bg-gradient-to-br from-primary/12 via-white/4 to-secondary/8 px-4 py-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_10px_#4edea3]" />
            <span className="font-label text-[10px] uppercase tracking-[0.24em] text-slate-300">
              Live Sync
            </span>
          </div>
          <div className="font-headline text-xl font-bold text-white">94 high-intent accounts</div>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            Pipeline signals, outreach, and approvals in one operating surface.
          </p>
        </div>

        <div className="thin-scrollbar flex-1 overflow-y-auto px-1 pb-2">
          <div className="mb-3 px-2">
            <div className="font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Workspace
            </div>
          </div>

          <div className="space-y-1 px-2">
            {CORE.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group haptic-hover glass-lift flex min-h-[3rem] items-center gap-3 rounded-2xl px-3 py-3 font-label text-sm tracking-wide transition-all",
                    isActive
                      ? "border border-primary/25 bg-gradient-to-r from-primary/14 via-primary/8 to-transparent font-semibold text-primary shadow-[inset_4px_0_0_0_#2E5BFF]"
                      : "border border-transparent text-slate-400 hover:border-white/6 hover:bg-white/6 hover:text-slate-100"
                  )}
                >
                  <MaterialIcon
                    name={item.icon}
                    className={cn(
                      "shrink-0 text-[20px]",
                      isActive ? "text-primary" : "text-on-surface-variant group-hover:text-slate-100"
                    )}
                    fill={isActive}
                  />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {isActive && <span className="h-2 w-2 shrink-0 rounded-full bg-secondary" />}
                </Link>
              );
            })}
          </div>

          <div className="mb-3 px-2 pt-5">
            <div className="font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Shortcuts
            </div>
          </div>

          <div className="space-y-1 px-2">
            {SECONDARY.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group glass-lift flex min-h-[2.75rem] items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-white/8 text-slate-100"
                      : "text-slate-500 hover:bg-white/6 hover:text-slate-200"
                  )}
                >
                  <MaterialIcon name={item.icon} className="shrink-0 text-[18px]" />
                  <span className="min-w-0 font-label tracking-wide">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 space-y-3 px-2 pt-4">
            <button className="btn-pipeline w-full rounded-2xl bg-gradient-to-r from-primary to-primary-container px-4 py-3 font-label text-sm font-semibold text-on-primary transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20">
              <span className="inline-flex items-center justify-center gap-2">
                <MaterialIcon name="rocket_launch" className="text-sm" />
                Upgrade Workspace
              </span>
            </button>

            <div className="glass-lift rounded-2xl border border-white/8 bg-white/4 p-3">
              <div className="mb-2 font-label text-[10px] uppercase tracking-[0.24em] text-slate-500">
                Health
              </div>
              <div className="flex items-center justify-between gap-3 text-sm text-slate-300">
                <span className="min-w-0">System status</span>
                <span className="inline-flex shrink-0 items-center gap-1 text-secondary">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  Stable
                </span>
              </div>
            </div>

            <Link
              href="/billing"
              onClick={onClose}
              className="glass-lift flex items-center gap-3 rounded-2xl px-3 py-2 text-slate-500 transition-colors hover:bg-white/6 hover:text-slate-200"
            >
              <MaterialIcon name="settings" className="shrink-0 text-[18px]" />
              <span className="font-label text-xs tracking-wide">Settings</span>
            </Link>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
