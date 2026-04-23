"use client";

import { ReactNode } from "react";
import * as m from "motion/react-m";
import { useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease,
    },
  },
};

type MotionBlockProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  once?: boolean;
};

export function MotionSection({
  children,
  className,
  delay = 0,
  amount = 0.18,
  once = true,
}: MotionBlockProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn("will-change-transform transform-gpu", className)}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={reduceMotion ? undefined : { once, amount }}
      variants={reduceMotion ? undefined : fadeUpItem}
      transition={reduceMotion ? undefined : { delay }}
    >
      {children}
    </m.div>
  );
}

export function MotionGroup({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn("will-change-transform transform-gpu", className)}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={reduceMotion ? undefined : { once: true, amount: 0.12 }}
      variants={reduceMotion ? undefined : staggerContainer}
      transition={reduceMotion ? undefined : { delayChildren: delay }}
    >
      {children}
    </m.div>
  );
}

export function MotionItem({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn("will-change-transform transform-gpu", className)}
      variants={reduceMotion ? undefined : fadeUpItem}
      transition={reduceMotion ? undefined : { delay }}
    >
      {children}
    </m.div>
  );
}

export function MotionCard({
  children,
  className,
  delay = 0,
  hover = true,
}: MotionBlockProps & { hover?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn("transform-gpu will-change-transform", className)}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={reduceMotion ? undefined : { once: true, amount: 0.12 }}
      variants={reduceMotion ? undefined : fadeUpItem}
      transition={reduceMotion ? undefined : { delay }}
      whileHover={
        reduceMotion || !hover
          ? undefined
          : {
              y: -8,
              scale: 1.01,
              transition: { duration: 0.25, ease },
            }
      }
      whileTap={reduceMotion || !hover ? undefined : { scale: 0.995 }}
    >
      {children}
    </m.div>
  );
}

export function MotionButton({
  children,
  className,
  delay = 0,
}: MotionBlockProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn("will-change-transform transform-gpu", className)}
      initial={reduceMotion ? undefined : { opacity: 0, y: 15 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.5, delay, ease }}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      {children}
    </m.div>
  );
}

export function FloatingOrb({
  className,
  duration = 18,
  delay = 0,
}: {
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn("transform-gpu will-change-transform", className)}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 26, -18, 0],
              y: [0, -32, 22, 0],
              scale: [1, 1.05, 0.98, 1],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }
      }
    />
  );
}
