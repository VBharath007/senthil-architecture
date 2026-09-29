"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ImageReveal({ children, className = "", delay = 0 }: ImageRevealProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={prefersReducedMotion ? { opacity: 0 } : { clipPath: "inset(20% 10% 20% 10%)", scale: 1.1 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
