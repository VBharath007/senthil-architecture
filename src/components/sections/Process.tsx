"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { PROCESS } from "@/data/site";
import { Lightbulb, PenTool, MessageSquareQuote, Layers, Hammer, type LucideIcon } from "lucide-react";

const stepIcons: Record<string, LucideIcon> = {
  "01": Lightbulb,
  "02": PenTool,
  "03": MessageSquareQuote,
  "04": Layers,
  "05": Hammer,
};

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32 bg-ink-50/40 dark:bg-ink-950/60 transition-colors duration-500">
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Our Process"
          title="From Concept to Living Architecture"
          align="center"
          description="A structured 5-stage architectural workflow designed for precision, transparent communication, and flawless execution."
        />

        <div className="relative mt-16 sm:mt-20">
          {/* Subtle connection line on desktop */}
          <div className="pointer-events-none absolute top-14 left-10 right-10 hidden h-px bg-nature-500/20 lg:block dark:bg-nature-500/20" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((item, i) => {
              const Icon = stepIcons[item.step] ?? PenTool;
              return (
                <FadeIn
                  key={item.step}
                  delay={i * 0.08}
                  className="liquid-glass-card rounded-3xl group flex flex-col justify-between p-6 sm:p-7 cursor-default"
                >
                  <div className="liquid-sheen-sweep" />
                  <div className="liquid-glass-bevel" />
                  <div>
                    {/* Step Header: Step Number & Icon */}
                    <div className="relative z-10 flex items-center justify-between mb-6">
                      <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-white/85 dark:bg-white/10 text-sm font-mono font-bold text-nature-700 dark:text-nature-300 border border-nature-500/25 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:bg-nature-500 group-hover:text-white group-hover:border-nature-500">
                        {item.step}
                      </span>
                      <span className="p-2 rounded-sm bg-ink-900/[0.03] dark:bg-white/5 text-ink-500 dark:text-white/40 group-hover:text-nature-600 dark:group-hover:text-nature-400 transition-colors">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="relative z-10 font-serif text-xl sm:text-2xl font-normal text-ink-950 dark:text-white group-hover:text-nature-700 dark:group-hover:text-nature-400 transition-colors">
                      {item.title}
                    </h3>

                    {/* Step Description */}
                    <p className="relative z-10 mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-700/80 dark:text-white/65">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="relative z-10 mt-6 pt-3.5 border-t border-dashed border-ink-900/10 dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-ink-500 dark:text-white/40">
                    <span>STAGE {item.step}</span>
                    <span className="text-nature-600 dark:text-nature-400 font-semibold">WORKFLOW</span>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
