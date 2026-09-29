"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { COMPANY } from "@/data/site";
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export function ContactCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 sm:py-28 bg-[#f8faf9] dark:bg-[#020504] transition-colors duration-500"
    >
      <Container className="relative z-10">
        <FadeIn className="liquid-glass-card rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="liquid-sheen-sweep" />
          <div className="liquid-glass-bevel" />
          <div className="relative z-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Heading & Value Prop (7 cols) */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-brand-800 dark:border-brand-500/30 dark:bg-brand-950/60 dark:text-brand-300">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                Start Your Project
              </div>
              
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl xl:text-5xl font-normal tracking-tight text-ink-950 dark:text-white leading-[1.15]">
                Let&apos;s build architecture that
                <br className="hidden sm:inline" />{" "}
                <span className="italic font-serif font-light text-nature-700 dark:text-nature-400">
                  stands the test of time.
                </span>
              </h2>
              
              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-ink-700/85 dark:text-white/75 font-normal">
                Share your site dimensions, requirements, or vision. Ar. Senthil and our senior engineering team will review your project and prepare a tailored design roadmap.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={`mailto:${COMPANY.email}`} variant="primary">
                  Email Studio
                </Button>
                <Button href={`tel:${COMPANY.phone}`} variant="outline" icon="none">
                  Call {COMPANY.phone}
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-brand-800 dark:text-brand-400">
                <Clock className="h-4 w-4" />
                <span>Response guaranteed within 2 business days</span>
              </div>
            </div>

            {/* Right Column: Studio Contact Details Bento (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="rounded-sm border border-ink-900/10 dark:border-white/10 bg-white/75 dark:bg-white/[0.04] p-6 sm:p-7 backdrop-blur-md shadow-sm">
                <h3 className="font-serif text-lg font-semibold text-ink-950 dark:text-white mb-4">
                  Studio Headquarters
                </h3>
                
                <div className="space-y-4 text-xs sm:text-sm text-ink-700/85 dark:text-white/75">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-nature-600 dark:text-nature-400 mt-0.5" />
                    <span className="whitespace-pre-line leading-relaxed">{COMPANY.address}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-nature-600 dark:text-nature-400" />
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="font-medium text-ink-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-nature-600 dark:text-nature-400" />
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="font-medium text-ink-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors truncate"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-ink-900/10 dark:border-white/10 flex items-center justify-between text-xs font-mono text-ink-500 dark:text-white/60">
                  <span>Madurai, Tamil Nadu</span>
                  <span className="text-nature-700 dark:text-nature-400 font-semibold">
                    Practice Est. 2005
                  </span>
                </div>
              </div>
            </div>

          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
