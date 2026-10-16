"use client";
import { Localized } from "@/providers/LanguageProvider";


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
      title: "25+ Years Practice",
      desc: "Proven Architectural Heritage",
      tag: "EST. 2002",
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
      className="relative z-10 border-y border-ink-900/10 py-8 sm:py-10 overflow-hidden bg-transparent transition-colors duration-500"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-6">
          {credentials.map((cred, i) => {
            const Icon = cred.icon;
            const isGreen = i % 2 !== 0; // index 0 & 2 Red, index 1 & 3 Green
            return (
              <FadeIn
                key={cred.title}
                delay={i * 0.07}
                className={`liquid-glass-card rounded-2xl group flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3.5 sm:p-4 cursor-default h-full transition-all duration-300 ${
                  isGreen ? "border-nature-500/20" : "border-brand-500/20"
                }`}
              >
                <div className="liquid-sheen-sweep" />
                <div className="liquid-glass-bevel" />
                {/* Icon Pod */}
                <div
                  className={`relative z-10 flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 border ${
                    isGreen
                      ? "bg-nature-500/10 border-nature-500/25 text-nature-700 dark:text-nature-400 group-hover:bg-nature-600 group-hover:text-white"
                      : "bg-brand-500/10 border-brand-500/25 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                {/* Card Text Content */}
                <div className="relative z-10 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-md border ${
                      isGreen
                        ? "text-nature-700 dark:text-nature-300 bg-nature-500/10 border-nature-500/20"
                        : "text-brand-700 dark:text-brand-300 bg-brand-500/10 border-brand-500/20"
                    }`}>
                      <Localized>{cred.tag}</Localized>
                    </span>
                    {cred.highlight && (
                      <Sparkles className={`w-2.5 h-2.5 ${isGreen ? "text-nature-600" : "text-brand-600"}`} />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold tracking-tight text-ink-950 dark:text-white transition-colors line-clamp-2 leading-snug group-hover:text-ink-700">
                    <Localized>{cred.title}</Localized>
                  </h4>
                  <p className="text-[10px] sm:text-xs text-ink-700/80 dark:text-white/65 line-clamp-2 leading-snug mt-0.5">
                    <Localized>{cred.desc}</Localized>
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
