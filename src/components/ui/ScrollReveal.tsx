"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export function ScrollReveal({ children, className = "" }: ScrollRevealProps) { return <div className={className}>{children}</div>; }

export function AdvancedParallax({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const y = useTransform(springScroll, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(springScroll, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, opacity }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
