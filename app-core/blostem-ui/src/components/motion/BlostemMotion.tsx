"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
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
  hidden: { opacity: 0, y: 28, scale: 0.985, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
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
    <motion.div
      className={className}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={reduceMotion ? undefined : { once, amount }}
      variants={reduceMotion ? undefined : fadeUpItem}
      transition={reduceMotion ? undefined : { delay }}
    >
      {children}
    </motion.div>
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
    <motion.div
      className={className}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={reduceMotion ? undefined : { once: true, amount: 0.12 }}
      variants={reduceMotion ? undefined : staggerContainer}
      transition={reduceMotion ? undefined : { delayChildren: delay }}
    >
      {children}
    </motion.div>
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
    <motion.div
      className={className}
      variants={reduceMotion ? undefined : fadeUpItem}
      transition={reduceMotion ? undefined : { delay }}
    >
      {children}
    </motion.div>
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
    <motion.div
      className={cn("transform-gpu", className)}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={reduceMotion ? undefined : { once: true, amount: 0.12 }}
      variants={reduceMotion ? undefined : fadeUpItem}
      transition={reduceMotion ? undefined : { delay }}
      whileHover={
        reduceMotion || !hover
          ? undefined
          : {
              y: -10,
              scale: 1.012,
              transition: { duration: 0.28, ease },
            }
      }
      whileTap={reduceMotion || !hover ? undefined : { scale: 0.992 }}
    >
      {children}
    </motion.div>
  );
}

export function MotionButton({
  children,
  className,
  delay = 0,
}: MotionBlockProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.65, delay, ease }}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.div>
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
    <motion.div
      className={className}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 26, -18, 0],
              y: [0, -32, 22, 0],
              scale: [1, 1.08, 0.96, 1],
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
