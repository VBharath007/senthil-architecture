"use client";
import { Localized, useLanguage } from "@/providers/LanguageProvider";


import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactCta } from "@/components/sections/ContactCta";
import { Container } from "@/components/layout/Container";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { PressFeature } from "@/components/sections/PressFeature";
import { TESTIMONIALS } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import { ContinuousPaintReveal } from "@/components/ui/ContinuousPaintReveal";

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = TESTIMONIALS.length - 1;
      if (next >= TESTIMONIALS.length) next = 0;
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  // Auto-advance client testimonials every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  const { language } = useLanguage();
  const isTamil = language === "ta";
  const current = TESTIMONIALS[currentIndex];

  return (
    <>
      <Navbar />
      <main className="bg-transparent overflow-hidden">
        <ContinuousPaintReveal>
          {/* Testimonials Hero */}
        <section className="pt-32 pb-16">
          <Container>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-brand-700 dark:text-brand-300">
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                <Localized>Client Stories</Localized>
              </span>
            </div>
            <h1
              className={`tracking-tight text-ink-900 dark:text-white max-w-4xl ${
                isTamil
                  ? "font-serif text-[22px] sm:text-[24px] lg:text-[26px] leading-[1.3] font-medium"
                  : "font-sans text-5xl sm:text-7xl lg:text-8xl font-medium leading-[1.05]"
              }`}
            >
              <SplitText text="Our clients. Our shared journey." />
            </h1>
          </Container>
        </section>

        {/* Editorial Testimonial Carousel */}
        <section className="py-24 relative min-h-[80vh] flex items-center">
          <div className="absolute inset-0 bg-black/[0.02] dark:bg-black/20 pointer-events-none" />
          
          <Container className="relative z-10 w-full">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              
              {/* Image Side with Parallax */}
              <div className="lg:col-span-5 relative h-[50vh] lg:h-[70vh] rounded-3xl overflow-hidden shadow-2xl liquid-glass-card p-2 sm:p-2.5 group">
                <div className="liquid-sheen-sweep" />
                <div className="liquid-glass-bevel" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden z-10">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) paginate(1);
                        else if (swipe > swipeConfidenceThreshold) paginate(-1);
                      }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <ParallaxImage 
                        src={current.image}
                        alt={current.project}
                        speed={0.1}
                        className="w-full h-full"
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Navigation Controls Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                    <div className="flex gap-2">
                      <button aria-label="Previous client" onClick={() => paginate(-1)} className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors border border-white/30 shadow-sm">
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <button aria-label="Next client" onClick={() => paginate(1)} className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors border border-white/30 shadow-sm">
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {TESTIMONIALS.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40"}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography Side */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="liquid-glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden group shadow-xl">
                  <div className="liquid-sheen-sweep" />
                  <div className="liquid-glass-bevel" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="inline-flex items-center gap-2 rounded-full border border-nature-500/25 bg-nature-500/10 px-3.5 py-1 text-xs font-mono font-bold tracking-wider uppercase text-nature-700 dark:text-nature-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-nature-500 animate-pulse" />
                        <Localized>Client Spotlight</Localized>
                      </span>
                    </div>
                    <div className="min-h-[220px] flex items-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <h2
                            className={`font-serif text-ink-950 dark:text-white leading-[1.25] mb-8 ${
                              isTamil
                                ? "text-[20px] sm:text-[22px] lg:text-[24px]"
                                : "text-3xl sm:text-4xl md:text-5xl"
                            }`}
                          >
                            <Localized>{current.author}</Localized>
                          </h2>
                          <div className="flex items-center gap-6">
                            <div className="h-px w-12 bg-brand-600 dark:bg-brand-400 shrink-0" />
                            <div>
                              <p className="text-lg sm:text-xl font-normal italic text-ink-900 dark:text-white leading-relaxed"><Localized>{current.quote}</Localized></p>
                              <p className="text-xs sm:text-sm font-mono text-ink-600 dark:text-ink-400 mt-2 uppercase tracking-wider"><Localized>{current.role}</Localized>, <Localized>{current.project}</Localized></p>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* All 3 Distinguished Client Profiles Grid */}
        <section className="py-20 border-t border-ink-900/10 dark:border-white/10 bg-transparent">
          <Container>
            <div className="mb-10 sm:mb-12">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-3.5 py-1 text-xs font-mono uppercase tracking-[0.2em] text-brand-700 dark:text-brand-300 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
                <Localized>DISTINGUISHED CLIENTS</Localized>
              </span>
              <h2 className={`font-serif leading-tight text-ink-950 dark:text-white mt-2 ${
                isTamil ? "text-2xl sm:text-3xl lg:text-4xl" : "text-3xl sm:text-4xl lg:text-5xl font-normal"
              }`}>
                {isTamil ? (
                  <>
                    எங்கள் வாடிக்கையாளர்களின்{" "}
                    <span className="italic font-light text-nature-700 dark:text-nature-400">
                      மதிப்பிற்குரிய கருத்துக்கள்.
                    </span>
                  </>
                ) : (
                  <>
                    <Localized>Words from </Localized>
                    <span className="italic font-light text-nature-700 dark:text-nature-400">
                      <Localized>Our Valued Patrons.</Localized>
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {TESTIMONIALS.map((item, index) => {
                const isGreen = index % 2 !== 0; // index 0 & 2 Red, index 1 Green
                return (
                  <Reveal key={item.author} delay={index * 0.1}>
                    <div className={`liquid-glass-card rounded-3xl p-5 sm:p-7 relative overflow-hidden group shadow-lg flex flex-col justify-between h-full border hover:-translate-y-1 transition-all duration-500 ${
                      isGreen ? "border-nature-500/25" : "border-brand-500/25"
                    }`}>
                      <div className="liquid-sheen-sweep" />
                      <div className="liquid-glass-bevel" />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-3.5 sm:gap-4 mb-4 sm:mb-6">
                          <div className={`relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border shadow-sm bg-black/5 ${
                            isGreen ? "border-nature-500/30" : "border-brand-500/30"
                          }`}>
                            <Image
                              src={item.image}
                              alt={item.author}
                              fill
                              sizes="80px"
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-serif text-base sm:text-xl font-medium text-ink-950 dark:text-white break-words leading-snug">
                              <Localized>{item.author}</Localized>
                            </h3>
                            <p className="text-xs text-ink-600 dark:text-white/60 font-mono mt-0.5 break-words">
                              <Localized>{item.role}</Localized>
                            </p>
                            <p className={`text-[11px] font-mono font-bold mt-1 break-words ${
                              isGreen ? "text-nature-700 dark:text-nature-400" : "text-brand-600 dark:text-brand-400"
                            }`}>
                              <Localized>{item.project}</Localized>
                            </p>
                          </div>
                        </div>

                        <div className="relative pt-4 border-t border-ink-900/10 dark:border-white/10 flex-1 flex flex-col justify-between">
                          <p className="text-sm sm:text-[15px] italic text-ink-800 dark:text-white/80 leading-relaxed font-sans mb-4">
                            &ldquo;<Localized>{item.quote}</Localized>&rdquo;
                          </p>
                          <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] sm:text-xs font-mono text-ink-500 dark:text-white/40 pt-2">
                            <span className={`flex items-center gap-1.5 font-medium shrink-0 ${
                              isGreen ? "text-nature-700" : "text-brand-600"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                isGreen ? "bg-nature-600" : "bg-brand-600"
                              }`} />
                              <Localized>Verified Client</Localized>
                            </span>
                            <span className="text-amber-500 tracking-wider shrink-0 text-xs">★★★★★</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

          <PressFeature />
          <ContactCta />
        </ContinuousPaintReveal>
      </main>
      <Footer />
    </>
  );
}
