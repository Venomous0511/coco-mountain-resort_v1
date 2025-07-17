"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className,
  variants,
  threshold = 1,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={
        variants || {
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.4 },
          },
        }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
