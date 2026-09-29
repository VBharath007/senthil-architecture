"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  width?: "fit-content" | "100%";
}

export function Reveal({ children, delay = 0, className = "", width = "fit-content" }: RevealProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div style={{ position: "relative", width, overflow: "hidden" }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: prefersReducedMotion ? 0 : 0, y: prefersReducedMotion ? 0 : 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
