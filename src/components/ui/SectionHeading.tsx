"use client";

import { Localized, useLanguage } from "@/providers/LanguageProvider";
import { FadeIn } from "@/components/motion/FadeIn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  variant?: "brand" | "nature";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  variant = "brand",
}: SectionHeadingProps) {
  const { language } = useLanguage();
  const isTamil = language === "ta";
  const isNature = variant === "nature";

  return (
    <FadeIn
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <div className={`flex items-center gap-2 mb-3.5 ${align === "center" ? "justify-center" : ""}`}>
        <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wider uppercase border ${
          isNature
            ? "border-nature-500/25 bg-nature-500/10 text-nature-700 dark:text-nature-300"
            : "border-brand-500/25 bg-brand-500/10 text-brand-700 dark:text-brand-300"
        }`}>
          <span className={`h-2 w-2 rounded-full animate-pulse ${
            isNature ? "bg-nature-500" : "bg-brand-500"
          }`} />
          <Localized>{eyebrow}</Localized>
        </span>
      </div>
      <h2
        className={`tracking-tight text-ink-900 dark:text-white ${isTamil
            ? "font-serif text-[20px] sm:text-[22px] lg:text-[24px] leading-[1.35] font-medium"
            : "text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.14]"
          }`}
      >
        <Localized>{title}</Localized>
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-700/80 dark:text-white/70">
          <Localized>{description}</Localized>
        </p>
      )}
    </FadeIn>
  );
}
