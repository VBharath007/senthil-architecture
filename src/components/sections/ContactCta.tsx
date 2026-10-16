"use client";
import { Localized, useLanguage } from "@/providers/LanguageProvider";


import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { COMPANY } from "@/data/site";
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export function ContactCta() {
  const { language } = useLanguage();
  const isTamil = language === "ta";

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-transparent transition-colors duration-500"
    >
      <Container className="relative z-10 px-3 sm:px-6 lg:px-10">
        <FadeIn className="liquid-glass-card rounded-3xl p-5 sm:p-10 lg:p-16">
          <div className="liquid-sheen-sweep" />
          <div className="liquid-glass-bevel" />
          <div className="relative z-10 grid gap-8 lg:gap-12 lg:grid-cols-12 lg:items-center">

            {/* Left Column: Heading & Value Prop (7 cols) */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-ink-900/5 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-ink-900 dark:border-white/15 dark:bg-white/10 dark:text-white">
                <ShieldCheck className="h-3.5 w-3.5 text-ink-700 dark:text-white shrink-0" /><Localized>
                Start Your Project
              </Localized></div>

              <h2 className={`mt-4 font-serif font-normal tracking-tight text-ink-950 dark:text-white ${
                isTamil
                  ? "text-xl sm:text-3xl xl:text-4xl leading-[1.35]"
                  : "text-2xl sm:text-4xl xl:text-5xl leading-[1.18]"
              }`}><Localized>
                Let&apos;s build architecture that
                </Localized><br className="hidden sm:inline" /><Localized>{" "}</Localized>
                <span className="italic font-serif font-light text-ink-950 dark:text-white"><Localized>
                  stands the test of time.
                </Localized></span>
              </h2>

              <p className="mt-3 sm:mt-4 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-ink-700/85 dark:text-white/75 font-normal"><Localized>
                Share your site dimensions, requirements, or vision. Ar. Senthil and our senior engineering team will review your project and prepare a tailored design roadmap.
              </Localized></p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={`mailto:${COMPANY.email}`} variant="primary"><Localized>
                  Email Studio
                </Localized></Button>
                <Button href={`tel:${COMPANY.phone}`} variant="outline" icon="none"><Localized>
                  Call </Localized><Localized>{COMPANY.phone}</Localized>
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-ink-600 dark:text-ink-400">
                <Clock className="h-4 w-4" />
                <span><Localized>Response guaranteed within 2 business days</Localized></span>
              </div>
            </div>

            {/* Right Column: Studio Contact Details Bento (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="liquid-glass-card rounded-2xl p-6 sm:p-7 relative overflow-hidden group shadow-md">
                <div className="liquid-sheen-sweep" />
                <div className="liquid-glass-bevel" />
                <div className="relative z-10">
                  <h3 className="font-serif text-lg font-semibold text-ink-950 dark:text-white mb-4"><Localized>
                    Studio Headquarters
                  </Localized></h3>

                  <div className="space-y-4 text-xs sm:text-sm text-ink-700/85 dark:text-white/75">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 shrink-0 text-ink-700 dark:text-ink-300 mt-0.5" />
                      <span className="whitespace-pre-line leading-relaxed"><Localized>{COMPANY.address}</Localized></span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 shrink-0 text-ink-700 dark:text-ink-300" />
                      <a
                        href={`tel:${COMPANY.phone}`}
                        className="font-medium text-ink-900 dark:text-white hover:text-ink-600 dark:hover:text-ink-300 transition-colors"
                      >
                        <Localized>{COMPANY.phone}</Localized>
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 shrink-0 text-ink-700 dark:text-ink-300" />
                      <a
                        href={`mailto:${COMPANY.email}`}
                        className="font-medium text-ink-900 dark:text-white hover:text-ink-600 dark:hover:text-ink-300 transition-colors truncate"
                      >
                        <Localized>{COMPANY.email}</Localized>
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-dashed border-ink-900/10 dark:border-white/10 flex items-center justify-between text-xs font-mono text-ink-500 dark:text-white/60">
                    <span><Localized>Madurai, Tamil Nadu</Localized></span>
                    <span className="text-ink-950 dark:text-white font-semibold"><Localized>
                      Practice Est. 2002
                    </Localized></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
