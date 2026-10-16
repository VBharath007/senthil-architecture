"use client";
import { Localized } from "@/providers/LanguageProvider";

import React, { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TESTIMONIALS } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";

export function HomeTestimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Automatically advance to next client review every 5 seconds (pauses when hovered/touched)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const testimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 lg:py-32 bg-transparent relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Header */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="mb-4 inline-block text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-ink-600 font-bold"><Localized>
                CLIENT STORIES
              </Localized></span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.25rem] xl:text-[2.5rem] font-normal leading-[1.25] text-ink-950 dark:text-white mb-6">
                <Localized>Clients & Their Spaces.</Localized>
              </h2>
              <p className="text-sm sm:text-base text-ink-700/80 dark:text-white/60 leading-relaxed max-w-md"><Localized>
                Meet some of the clients behind our residential, office and interior projects.
              </Localized></p>
            </Reveal>

            <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-4">
              <div
                className="flex gap-2"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <button
                  aria-label="Previous client"
                  onClick={prev}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-ink-900/20 text-ink-900 dark:text-white hover:bg-ink-950 hover:border-ink-950 hover:text-white transition-colors duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  aria-label="Next client"
                  onClick={next}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-ink-900/20 text-ink-900 dark:text-white hover:bg-ink-950 hover:border-ink-950 hover:text-white transition-colors duration-300"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Dots Indicator */}
              <div
                className="flex items-center gap-2 pl-2"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? "w-8 bg-nature-600 dark:bg-[#00E599]"
                        : "w-2 bg-ink-900/20 dark:bg-white/20 hover:bg-ink-900/40"
                    }`}
                  />
                ))}
              </div>
            </Reveal>
          </div>

          {/* Testimonial Card */}
          <div
            className="lg:col-span-7"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div className="relative">
              <Quote className="absolute -top-10 -left-6 sm:-left-10 w-20 h-20 sm:w-24 sm:h-24 text-ink-100 dark:text-white/5 -z-10 rotate-180" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: direction * 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -25 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="liquid-glass-card rounded-[2rem] p-6 sm:p-12 shadow-xl relative"
                >
                  <div className="liquid-sheen-sweep" />
                  <div className="liquid-glass-bevel" />
                  <div className="relative z-10">
                    <p className="text-xs uppercase tracking-widest text-ink-600 dark:text-ink-400 mb-5"><Localized>Project Spotlight</Localized></p>
                    <p className="text-lg sm:text-xl md:text-2xl font-serif italic leading-relaxed text-ink-900 dark:text-white mb-8 sm:mb-10">
                      <Localized>{testimonial.quote}</Localized>
                    </p>
                    <div className="flex items-center gap-4 sm:gap-5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shrink-0 bg-ink-950 dark:bg-white/10 text-white flex items-center justify-center shadow-md border border-ink-900/20 dark:border-white/20 select-none">
                        <span className="font-bold font-serif text-xl sm:text-2xl">
                          {testimonial.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-ink-950 dark:text-white leading-tight">
                          <Localized>{testimonial.author}</Localized>
                        </h4>
                        <p className="text-xs sm:text-sm text-ink-700/80 dark:text-white/70 mt-0.5">
                          <Localized>{testimonial.role}</Localized>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
