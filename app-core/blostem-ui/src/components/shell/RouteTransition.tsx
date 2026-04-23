"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={pathname}
        className="route-crossfade will-change-transform transform-gpu"
        initial={reduceMotion ? undefined : { opacity: 0, y: 20, scale: 0.99 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.995 }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }
        }
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
