"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/shell/MaterialIcon";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/features", label: "Product", key: "product" },
  { href: "/pricing", label: "Pricing", key: "pricing" },
  { href: "/export", label: "Resources", key: "resources" },
] as const;

export function MarketingNav({
  active,
}: {
  active?: "product" | "pricing" | "resources";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6">
      <nav className="mx-auto max-w-screen-2xl rounded-[26px] border border-white/8 bg-[#0b1326]/72 px-4 py-3 shadow-[0_20px_50px_rgba(6,14,32,0.4)] backdrop-blur-2xl sm:px-5 lg:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-8">
            <Link
              href="/"
              className="flex items-center gap-3 text-slate-100 transition-colors hover:text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary shadow-[0_0_20px_rgba(177,197,255,0.24)]">
                <MaterialIcon name="dataset" className="text-on-primary text-[20px]" fill />
              </span>
              <span className="font-headline text-lg font-black tracking-tight sm:text-xl">
                Blostem AI
              </span>
            </Link>

            <div className="hidden items-center gap-2 md:flex">
              {ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    active === item.key
                      ? "bg-primary/14 text-primary"
                      : "text-slate-400 hover:bg-white/6 hover:text-slate-100"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/6 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full bg-gradient-to-r from-primary to-primary-container px-5 py-2.5 text-sm font-semibold text-on-primary shadow-[0_12px_28px_rgba(17,101,231,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(17,101,231,0.35)]"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-slate-200 transition-colors hover:bg-white/10 md:hidden"
            aria-label="Toggle navigation"
          >
            <MaterialIcon name={open ? "close" : "menu"} className="text-[20px]" />
          </button>
        </div>

        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,margin-top,opacity] duration-300 md:hidden",
            open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="min-h-0">
            <div className="space-y-2 rounded-3xl border border-white/8 bg-white/[0.03] p-3">
              {ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                    active === item.key
                      ? "bg-primary/14 text-primary"
                      : "text-slate-300 hover:bg-white/6 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/6 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className="block rounded-2xl bg-gradient-to-r from-primary to-primary-container px-4 py-3 text-center text-sm font-semibold text-on-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
