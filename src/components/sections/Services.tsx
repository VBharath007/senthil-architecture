import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "./ServiceCard";
import { SERVICES } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 dark:bg-ink-950 sm:py-32">
      {/* Subtle architectural ambient background glow */}
      {/* Ambient backgrounds removed */}
      {/* Ambient backgrounds removed */}

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Our Services"
          title="What We Build, Start to Finish"
          align="center"
          description="From first sketch to final walkthrough, each service is managed in-house by our seasoned team so your vision is executed without compromise."
        />
        
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={i + 1}
              delay={i * 0.03}
            />
          ))}

          {/* 12th Card: Turnkey Consultation Minimalist Highlight Card */}
          <FadeIn delay={SERVICES.length * 0.03}>
            <a
              href="#contact"
              className="liquid-glass-card rounded-3xl group flex h-full flex-col justify-between p-6 sm:p-7 relative"
            >
              <div className="liquid-sheen-sweep" />
              <div className="liquid-glass-bevel" />
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-5 border-b border-ink-900/10 dark:border-white/10">
                  <span className="font-mono text-xs font-bold tracking-widest text-nature-700 dark:text-nature-400">
                    04 / BESPOKE
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/80 dark:bg-white/10 text-nature-700 dark:text-nature-300 border border-nature-500/25 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:bg-nature-500 group-hover:text-white group-hover:border-nature-500">
                    <Sparkles className="h-4 w-4" strokeWidth={1.85} />
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-normal tracking-tight text-ink-950 mt-5 transition-colors group-hover:text-nature-700 dark:text-white dark:group-hover:text-nature-400">
                  Turnkey Consultation
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-700/80 dark:text-white/65">
                  Have a custom or multi-disciplinary project? We offer bespoke architectural and build packages tailored to your exact site requirements.
                </p>
              </div>

              {/* Minimalist Action Link */}
              <div className="relative z-10 mt-6 pt-3.5 border-t border-dashed border-ink-900/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-ink-500 dark:text-white/40">
                <span className="tracking-wider uppercase group-hover:text-ink-800 dark:group-hover:text-white/70 transition-colors">
                  Discuss Your Project
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-ink-400 transition-all duration-300 group-hover:text-nature-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-white/40 dark:group-hover:text-nature-400" />
              </div>
            </a>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
