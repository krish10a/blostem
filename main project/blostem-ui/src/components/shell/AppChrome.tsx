"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/shell/AppSidebar";
import { AppTopBar } from "@/components/shell/AppTopBar";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setSidebarOpen(false), 0);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="relative z-10 min-h-screen">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="relative min-h-screen lg:pl-[19rem]">
        <div className="px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6 lg:pt-5">
          <AppTopBar onMenuToggle={() => setSidebarOpen((open) => !open)} />
        </div>

        <main className="px-3 pb-8 pt-4 sm:px-4 sm:pb-10 lg:px-6 lg:pt-6 xl:px-8">
          <div className="mx-auto max-w-[1560px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
