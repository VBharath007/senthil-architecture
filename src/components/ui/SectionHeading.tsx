import { FadeIn } from "@/components/motion/FadeIn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <FadeIn
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <div className={`flex items-center gap-2 mb-3.5 ${align === "center" ? "justify-center" : ""}`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-700 dark:text-brand-300">
          <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink-900 dark:text-white leading-[1.14]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-700/80 dark:text-white/70">
          {description}
        </p>
      )}
    </FadeIn>
  );
}

