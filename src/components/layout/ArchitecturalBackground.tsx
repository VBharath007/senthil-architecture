"use client";

import React from "react";

export function ArchitecturalBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      style={{ transform: "translateZ(0)" }}
    >
      {/* 1. Authentic weathered paper-concrete texture extracted directly from reference */}
      <div
        className="absolute inset-0 bg-[#ebebeb] bg-[url('/images/weathered-paper-texture.webp')] bg-repeat bg-[length:1200px_auto] opacity-[0.98]"
        style={{ imageRendering: "auto" }}
      />

      {/* 2. Soft cloudy organic light variations matching reference screenshot */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_25%,rgba(255,255,255,0.45)_0%,rgba(0,0,0,0.035)_100%)] mix-blend-multiply"
      />


      {/* 4. Fine architectural drafting coordinate grid lines (very subtle) */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-40"
      />
    </div>
  );
}
