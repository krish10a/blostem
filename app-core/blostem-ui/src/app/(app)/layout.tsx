"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppMeshBackground } from "@/components/shell/AppMeshBackground";
import { AppChrome } from "@/components/shell/AppChrome";
import { RouteTransition } from "@/components/shell/RouteTransition";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPipeline = pathname?.includes("/pipeline");

  return (
    <div className="min-h-screen bg-background text-on-surface relative overflow-x-hidden">
      <AppMeshBackground />
      <AppChrome>
        <div className="min-h-screen">
          {isPipeline ? (
            <RouteTransition>{children}</RouteTransition>
          ) : (
            <div className="rounded-[28px] border border-white/6 bg-surface/35 p-3 shadow-[0_30px_80px_rgba(6,14,32,0.45)] backdrop-blur-xl sm:p-4 lg:p-5">
              <RouteTransition>{children}</RouteTransition>
            </div>
          )}
        </div>
      </AppChrome>
    </div>
  );
}
