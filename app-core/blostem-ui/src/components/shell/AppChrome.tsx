"use client";

import { ReactNode, Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { AppSidebar } from "@/components/shell/AppSidebar";
import { AppTopBar } from "@/components/shell/AppTopBar";
import { cn } from "@/lib/utils";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setSidebarOpen(false), 0);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  const isPipeline = pathname?.includes("/pipeline");

  return (
    <motion.div
      className="relative z-10 min-h-screen"
      initial={reduceMotion ? undefined : { opacity: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1 }}
      transition={reduceMotion ? undefined : { duration: 0.45 }}
    >
      <Suspense fallback={null}>
        <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </Suspense>

      <div className="relative min-h-screen lg:pl-[20.25rem]">
        <div className={cn("px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6 lg:pt-5", isPipeline && "lg:px-0 lg:pt-0")}>
          <AppTopBar onMenuToggle={() => setSidebarOpen((open) => !open)} />
        </div>

        <main className={cn(
          "px-3 pb-8 pt-4 sm:px-4 sm:pb-10 lg:px-6 lg:pt-6 xl:px-8",
          isPipeline && "px-0 pb-0 pt-0 sm:px-0 sm:pb-0 lg:px-0 lg:pt-0 xl:px-0"
        )}>
          <div className={cn("mx-auto max-w-[1560px]", isPipeline && "max-w-none")}>{children}</div>
        </main>
      </div>
    </motion.div>
  );
}
