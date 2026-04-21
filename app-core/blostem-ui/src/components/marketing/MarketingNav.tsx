"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6">
      <motion.nav
        className="glass-nav mx-auto max-w-screen-2xl rounded-[28px] px-4 py-3 sm:px-5 lg:px-6"
        initial={reduceMotion ? undefined : { opacity: 0, y: -22, scale: 0.985 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={reduceMotion ? undefined : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-8">
            <motion.div whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}>
              <Link
              href="/"
              className="group flex items-center gap-3 text-slate-100 transition-colors hover:text-white"
            >
              <motion.span
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary shadow-[0_0_20px_rgba(177,197,255,0.24)] transition-transform duration-500"
                animate={reduceMotion ? undefined : { rotate: [0, 5, -4, 0], y: [0, -4, 0] }}
                transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={reduceMotion ? undefined : { rotate: 10, scale: 1.08 }}
              >
                <MaterialIcon name="dataset" className="text-on-primary text-[20px]" fill />
              </motion.span>
              <span className="font-headline text-gradient text-lg font-black tracking-tight sm:text-xl">
                Blostem AI
              </span>
              </Link>
            </motion.div>

            <div className="hidden items-center gap-2 md:flex">
              {ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    active === item.key
                      ? "glass-button text-primary"
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
              className="hover-pulse rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-950 shadow-[0_18px_40px_rgba(255,255,255,0.12)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(255,255,255,0.18)]"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="glass-button inline-flex h-11 w-11 items-center justify-center rounded-2xl text-slate-200 transition-colors hover:bg-white/10 md:hidden"
            aria-label="Toggle navigation"
          >
            <MaterialIcon name={open ? "close" : "menu"} className="text-[20px]" />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="mt-4 md:hidden"
              initial={reduceMotion ? undefined : { opacity: 0, height: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1, height: "auto" }}
              exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
              transition={reduceMotion ? undefined : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="min-h-0">
                <motion.div
                  className="glass-panel space-y-2 rounded-3xl p-3"
                  initial={reduceMotion ? undefined : "hidden"}
                  animate={reduceMotion ? undefined : "visible"}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06 } },
                  }}
                >
              {ITEMS.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                      active === item.key
                        ? "glass-button text-primary"
                        : "text-slate-300 hover:bg-white/6 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <Link
                href="/login"
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/6 hover:text-white"
              >
                Sign In
                </Link>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <Link
                href="/dashboard"
                className="block rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold text-slate-950"
              >
                Get Started
                </Link>
              </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
