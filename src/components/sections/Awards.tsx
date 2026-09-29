"use client";

import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { Trophy, Award, Landmark, ShieldCheck, Sparkles } from "lucide-react";

export function Awards() {
  const credentials = [
    {
      icon: Trophy,
      title: "Best Architect Award",
      desc: "Excellence in Design & Build",
      highlight: true,
      tag: "HONOR",
    },
    {
      icon: Award,
      title: "19+ Years Practice",
      desc: "Proven Architectural Heritage",
      tag: "EST. 2005",
    },
    {
      icon: Landmark,
      title: "IIA Centre Treasurer",
      desc: "Indian Institute of Architects",
      tag: "LEADERSHIP",
    },
    {
      icon: ShieldCheck,
      title: "COA Certified",
      desc: "Council of Architecture Member",
      tag: "STATUTORY",
    },
  ];

  return (
    <section
      id="awards"
      className="relative z-10 border-y border-ink-900/10 py-8 sm:py-10 dark:border-white/10 overflow-hidden bg-ink-50 dark:bg-ink-950 transition-colors duration-500"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-6">
          {credentials.map((cred, i) => {
            const Icon = cred.icon;
            return (
              <FadeIn
                key={cred.title}
                delay={i * 0.07}
                className="liquid-glass-card rounded-2xl group flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3.5 sm:p-4 cursor-default"
              >
                <div className="liquid-sheen-sweep" />
                <div className="liquid-glass-bevel" />
                {/* Icon Pod */}
                <div
                  className={`relative z-10 flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-sm transition-all duration-300 shadow-sm ${
                    cred.highlight
                      ? "bg-brand-50 text-brand-600 border border-brand-200 dark:bg-brand-900/30 dark:border-brand-800 dark:text-brand-400 group-hover:scale-105"
                      : "bg-white/80 dark:bg-white/10 text-nature-700 dark:text-nature-300 border border-nature-500/25 backdrop-blur-md group-hover:scale-105 group-hover:bg-nature-500 group-hover:text-white group-hover:border-nature-500"
                  }`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                {/* Card Text Content */}
                <div className="relative z-10 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold ${cred.highlight ? 'text-brand-600 dark:text-brand-400' : 'text-nature-700 dark:text-nature-400'}`}>
                      {cred.tag}
                    </span>
                    {cred.highlight && (
                      <Sparkles className="w-2.5 h-2.5 text-brand-500" />
                    )}
                  </div>
                  <h4 className={`text-xs sm:text-sm font-semibold tracking-tight text-ink-950 dark:text-white transition-colors truncate ${cred.highlight ? 'group-hover:text-brand-700 dark:group-hover:text-brand-400' : 'group-hover:text-nature-700 dark:group-hover:text-nature-400'}`}>
                    {cred.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-ink-700/80 dark:text-white/65 line-clamp-1">
                    {cred.desc}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
