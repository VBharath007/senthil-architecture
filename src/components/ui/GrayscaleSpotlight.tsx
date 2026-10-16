"use client";

import { useEffect, useRef } from "react";

export function GrayscaleSpotlight() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (overlayRef.current) {
            const x = e.clientX;
            const y = e.clientY;
            // The circle dictates the colored area (transparent mask = no grayscale)
            const mask = `radial-gradient(circle 350px at ${x}px ${y}px, transparent 15%, black 65%)`;
            overlayRef.current.style.webkitMaskImage = mask;
            overlayRef.current.style.maskImage = mask;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        if (overlayRef.current) {
          const mask = `linear-gradient(black, black)`;
          overlayRef.current.style.webkitMaskImage = mask;
          overlayRef.current.style.maskImage = mask;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        backdropFilter: "grayscale(100%)",
        WebkitBackdropFilter: "grayscale(100%)",
        maskImage: "linear-gradient(black, black)",
        WebkitMaskImage: "linear-gradient(black, black)",
      }}
    />
  );
}
