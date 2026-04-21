"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="route-crossfade will-change-transform"
        initial={reduceMotion ? undefined : { opacity: 0, y: 26, scale: 0.985, filter: "blur(10px)" }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.992, filter: "blur(8px)" }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
