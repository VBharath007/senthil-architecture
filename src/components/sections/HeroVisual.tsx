"use client";

import React from "react";
import { PixelMorphExperience, PixelMorphProps } from "@/components/3d/PixelMorphExperience";

export function HeroVisual(props: Partial<PixelMorphProps>) {
  return (
    <div className="relative w-full h-full">
      <PixelMorphExperience
        scrollProgress={props.scrollProgress ?? 0}
        isDark={props.isDark}
        onStageChange={props.onStageChange}
        className={props.className}
      />
    </div>
  );
}
