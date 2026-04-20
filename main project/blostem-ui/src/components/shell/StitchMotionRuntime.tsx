"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function StitchMotionRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(".mouse-glow");
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--x", `${x}px`);
        target.style.setProperty("--y", `${y}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (revealNodes.length === 0) return;

    if (reduceMotion) {
      revealNodes.forEach((node) => node.classList.add("active"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
