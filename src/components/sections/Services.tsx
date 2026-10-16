
import { Localized } from "@/providers/LanguageProvider";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "./ServiceCard";
import { SERVICES } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-transparent py-24 sm:py-32">
      {/* Subtle architectural ambient background glow */}
      {/* Ambient backgrounds removed */}
      {/* Ambient backgrounds removed */}

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Our Services"
          title="What We Build, Start to Finish"
          align="center"
          variant="nature"
          description="We turn ideas into real spaces. Every design is carefully planned, functional and tailored to your lifestyle. From homes to offices, every detail matters in creating elegant, timeless spaces."
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
          <FadeIn delay={SERVICES.length * 0.03} className="h-full">
            <a
              href="/contact"
              className="liquid-glass-card rounded-[28px] group flex h-full flex-col justify-between p-6 sm:p-7 relative"
            >
              <div className="liquid-sheen-sweep" />
              <div className="liquid-glass-bevel" />
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-5 border-b border-white/70 dark:border-white/10">
                  <span className="font-mono text-xs font-bold tracking-widest text-ink-600 dark:text-ink-400"><Localized>
                    05 / BESPOKE
                  </Localized></span>
                  <span className="liquid-glass-icon flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300">
                    <Sparkles className="h-4 w-4" strokeWidth={1.85} />
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-ink-950 mt-5 transition-colors group-hover:text-ink-700 dark:text-white dark:group-hover:text-ink-300"><Localized>
                  Turnkey Consultation
                </Localized></h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-700/85 dark:text-white/70"><Localized>
                  Have a custom or multi-disciplinary project? We offer bespoke architectural and build packages tailored to your exact site requirements.
                </Localized></p>
              </div>

              {/* Minimalist Action Link */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/70 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-ink-500 dark:text-white/50">
                <span className="tracking-wider uppercase group-hover:text-ink-800 dark:group-hover:text-white/80 transition-colors"><Localized>
                  Discuss Your Project
                </Localized></span>
                <ArrowUpRight className="h-3.5 w-3.5 text-ink-400 transition-all duration-300 group-hover:text-ink-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-white/50 dark:group-hover:text-white" />
              </div>
            </a>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
