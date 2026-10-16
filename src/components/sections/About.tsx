"use client";
import { Localized, useLanguage } from "@/providers/LanguageProvider";


import { ClientQueries } from "./ClientQueries";
import React, { useRef, useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { JourneyLayers } from "@/components/sections/JourneyLayers";
import { MonographModal } from "@/components/sections/MonographModal";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { ContinuousPaintReveal } from "@/components/ui/ContinuousPaintReveal";
import {
  COMPANY, ARCHITECT, MISSION, STATS, PROCESS
} from "@/data/site";
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  PenTool,
  MessageSquareQuote,
  Layers,
  Hammer,
  GraduationCap,
  Landmark,
  Sparkles,
  Compass,
  ArrowDown,
  ShieldCheck
} from "lucide-react";

// Curated 4K Architectural Photography
const IMAGES_4K = {
  hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=95",
  story: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  placeholder: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
};

const ABOUT_PROCESS = PROCESS.map((item, i) => ({ ...item, icon: [Compass, PenTool, Lightbulb, Hammer][i] }));

const ADDITIONAL_TEAM = [
  { name: "Senior Architect", role: "Design Lead" },
  { name: "Project Manager", role: "Operations" },
  { name: "Interior Designer", role: "Interiors" },
  { name: "Civil Engineer", role: "Structural" },
];

const EXTRA_STATS = STATS;

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMonographOpen, setIsMonographOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const resetScroll = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (document.scrollingElement) {
          document.scrollingElement.scrollTop = 0;
        }
        const lenis = (window as any).__lenis || (window as any).lenis;
        if (lenis) {
          lenis.scrollTo(0, { immediate: true, force: true });
        }
      };

      resetScroll();
      const f1 = requestAnimationFrame(resetScroll);
      const f2 = requestAnimationFrame(() => requestAnimationFrame(resetScroll));
      const t = setTimeout(resetScroll, 50);

      if (window.location.hash === "#monograph" || window.location.hash === "#profile") {
        setIsMonographOpen(true);
      }

      return () => {
        cancelAnimationFrame(f1);
        cancelAnimationFrame(f2);
        clearTimeout(t);
      };
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const splashMaskSize = useTransform(scrollYProgress, [0, 0.65, 1], ["0%, 100% 100%", "700%, 100% 100%", "850%, 100% 100%"]);

  // Scroll-driven Black & White to Original Color state:
  // Starts strictly at 100% B&W before scrolling, and reveals original color progressively as user scrolls
  const [grayscalePercent, setGrayscalePercent] = useState(100);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      // At scroll 0: 100% Black and White.
      // Progressively reveals to 0% (Full vibrant color) as user scrolls down through the hero (0 to 450px)
      const maxScroll = 450;
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      const val = Math.round((1 - progress) * 100);
      setGrayscalePercent(val);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, []);

  const { language } = useLanguage();
  const isTamil = language === "ta";

  return (
    <div className="bg-white dark:bg-[#020504] transition-colors duration-500" id="about">
      {/* 1. HERO - Architecture Theme */}
      <section id="about-hero" ref={containerRef} className="relative w-full h-[180vh] sm:h-[200vh] bg-ink-50 dark:bg-[#030706] transition-colors duration-500">
        <div className="sticky top-0 w-full h-[100svh] overflow-hidden flex items-center justify-center pt-20 sm:pt-32 pb-8 sm:pb-12">

          {/* Scroll-driven Paint Splash Grayscale Overlay (Mobile & Desktop) */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-[60]"
            style={{
              backgroundColor: "black",
              mixBlendMode: "color",
              WebkitMaskImage: "url('/splash.svg'), linear-gradient(black, black)",
              maskImage: "url('/splash.svg'), linear-gradient(black, black)",
              WebkitMaskPosition: "center, center",
              maskPosition: "center, center",
              WebkitMaskRepeat: "no-repeat, no-repeat",
              maskRepeat: "no-repeat, no-repeat",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              WebkitMaskSize: splashMaskSize as any,
              maskSize: splashMaskSize as any,
              transform: "translateZ(0)"
            }}
          />

          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(0,229,153,0.05)_0%,transparent_50%)] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(0,229,153,0.08)_0%,transparent_50%)] pointer-events-none" />

          <Container className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">

            {/* Left Column: Content */}
            <div className="flex-1 flex flex-col justify-center w-full max-w-xl z-20 pt-6 lg:pt-0">

              {/* Stage Headline */}
              <FadeIn delay={0.1}>
                <h1
                  className={`font-serif leading-[1.05] tracking-tight ${isTamil
                    ? "text-[22px] sm:text-[24px] lg:text-[26px] leading-[1.3] font-medium"
                    : "text-4xl md:text-5xl lg:text-[4.5rem]"
                    }`}
                >
                  <span className="font-serif text-nature-700 dark:text-nature-400">
                    <Localized>Built On Vision,</Localized>
                  </span>
                  <br />
                  <span className="font-light italic text-nature-700 dark:text-nature-400 tracking-normal">
                    <Localized>Not Just Blueprints.</Localized>
                  </span>
                </h1>
              </FadeIn>

              {/* Stage Description Narrative */}
              <FadeIn delay={0.2}>
                <p className="mt-4 sm:mt-6 text-sm lg:text-base leading-relaxed text-ink-700 dark:text-white/70 max-w-lg font-light">
                  <Localized>
                    A premier architectural consultancy and design-build practice dedicated to transforming concepts into timeless, performative landmarks.
                  </Localized>
                </p>
              </FadeIn>

              {/* Mobile View Image: Placed directly below description as requested */}
              <FadeIn delay={0.25} className="block lg:hidden my-6 w-full max-w-sm mx-auto">
                <motion.div
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    filter: `grayscale(${grayscalePercent}%) contrast(${1 + (grayscalePercent / 100) * 0.08})`,
                    transition: "filter 0.1s linear",
                  }}
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center bg-nature-500/5 p-2 border border-nature-500/10 shadow-lg"
                >
                  <img
                    src="/assets/about-page-home.png"
                    alt="Floating Architecture Mobile"
                    className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,229,153,0.22)]"
                  />
                </motion.div>
              </FadeIn>

              {/* Buttons (Solid Red + Outline) */}
              <FadeIn delay={0.3} className="mt-6 lg:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Link
                  href="#story"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-all hover:scale-105 shadow-md shadow-brand-500/20 text-center"
                >
                  <Localized>Explore Our Story</Localized> <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-ink-900/20 dark:border-white/20 text-ink-900 dark:text-white text-sm font-medium hover:border-nature-500/50 hover:bg-nature-500/5 hover:text-nature-700 dark:hover:text-nature-400 transition-all text-center"
                >
                  <Localized>View Projects</Localized> <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </FadeIn>
            </div>

            {/* Right Column: 3D Floating Image with Accents (Desktop only) */}
            <div className="hidden lg:flex flex-1 relative w-full h-[400px] sm:h-[500px] lg:h-[80vh] min-h-[40vh] z-10 mt-12 lg:mt-0 items-center justify-center">

              {/* Reference Image Accents: Glowing Rings & Grid Lines */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square max-w-[800px] pointer-events-none">
                {/* Outer Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-[#00E599]/10" />
                {/* Inner Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border border-[#00E599]/15" />

                {/* Vertical Accent Line */}
                <div className="absolute top-0 bottom-0 left-[65%] w-px bg-gradient-to-b from-transparent via-[#00E599]/40 to-transparent" />
                <div className="absolute top-[10%] left-[65%] -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00E599] shadow-[0_0_10px_#00E599]" />

                {/* Horizontal Accent Line */}
                <div className="absolute left-0 right-0 top-[80%] h-px bg-gradient-to-r from-transparent via-[#00E599]/30 to-transparent" />
                <div className="absolute left-[80%] top-[80%] -translate-y-1/2 w-1 h-1 rounded-full bg-[#00E599] shadow-[0_0_8px_#00E599]" />
              </div>

              {/* Glowing Floor / Shadow under the floating house with synchronized pulsing */}
              <motion.div
                animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[10%] lg:bottom-[15%] left-1/2 -translate-x-1/2 w-[60%] h-[20px] rounded-full bg-[#00E599]/25 blur-2xl pointer-events-none"
              />
              <motion.div
                animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[10%] lg:bottom-[15%] left-1/2 -translate-x-1/2 w-[30%] h-[10px] rounded-full bg-[#00E599]/45 blur-xl pointer-events-none"
              />

              <div className="absolute inset-0 z-10 pointer-events-none">
                {/* Container with scaling */}
                <div className="absolute inset-0 w-full h-full scale-100 lg:scale-[1.25] origin-center flex items-center justify-center">
                  {/* Dedicated Motion Div handles continuous 3D floating animation */}
                  <motion.div
                    className="relative w-full h-full flex items-center justify-center pointer-events-auto"
                    animate={{ y: [-24, 20, -24], rotate: [-0.6, 0.6, -0.6] }}
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <img
                      style={{
                        filter: `grayscale(${grayscalePercent}%) contrast(${1 + (grayscalePercent / 100) * 0.08})`,
                        transition: "filter 0.12s ease-out",
                      }}
                      src="/assets/about-page-home.png"
                      alt="Floating Architecture"
                      className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,229,153,0.22)]"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Subsequent Sections with Continuous Paint Reveal */}
      <ContinuousPaintReveal>
        {/* 2. OUR STORY - 3D Isometric Journey */}
        <div id="story"><JourneyLayers /></div>

        {/* 3. NUMBERS / STATS STRIP */}
        <section className="py-12 sm:py-16 bg-transparent border-y border-ink-900/10">
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {EXTRA_STATS.map((stat, i) => {
                const isEven = i % 2 === 0;
                return (
                  <FadeIn key={stat.label} delay={i * 0.1} className={`liquid-glass-card rounded-2xl p-6 text-center flex flex-col justify-center gap-2 relative shadow-sm ${isEven ? "border-brand-500/20" : "border-nature-500/20"
                    }`}>
                    <div className="liquid-sheen-sweep" />
                    <div className="liquid-glass-bevel" />
                    <div className="relative z-10 flex flex-col justify-center gap-2">
                      <span className={`text-3xl sm:text-4xl font-serif ${isEven ? "text-brand-600 dark:text-brand-400" : "text-nature-700 dark:text-nature-400"
                        }`}>
                        <Localized>{stat.value}</Localized>
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-ink-600 dark:text-ink-300">
                        <Localized>{stat.label}</Localized>
                      </span>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </Container>
        </section>

        {/* 4. PHILOSOPHY / VALUES */}
        <section className="py-24 sm:py-32">
          <Container>
            <SectionHeading
              eyebrow="Values"
              title="Design Philosophy"
              align="center"
              variant="nature"
              description="The 10 core tenets that guide every architectural endeavor at Senthil Associates."
            />

            <div className="mt-16 max-w-4xl mx-auto">
              <FadeIn className="liquid-glass-card rounded-3xl p-6 sm:p-10 shadow-lg">
                <div className="liquid-sheen-sweep" />
                <div className="liquid-glass-bevel" />

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {ARCHITECT.philosophy.map((phil, pIdx) => {
                    const isGreen = pIdx % 2 === 0;
                    return (
                      <div
                        key={phil}
                        className={`flex items-center gap-4 rounded-xl bg-white/70 px-6 py-5 text-base font-medium text-ink-900 shadow-sm border transition-all dark:bg-white/[0.04] dark:text-white/90 ${isGreen
                          ? "border-nature-500/20 hover:border-nature-500/40 hover:bg-nature-500/[0.02]"
                          : "border-brand-500/20 hover:border-brand-500/40 hover:bg-brand-500/[0.02]"
                          }`}
                      >
                        <span className={`font-mono text-xs font-bold ${isGreen ? "text-nature-700 dark:text-nature-400" : "text-brand-600 dark:text-brand-400"
                          }`}>
                          0<Localized>{pIdx + 1}</Localized>
                        </span>
                        <span className="truncate"><Localized>{phil}</Localized></span>
                        <CheckCircle2 className={`h-4 w-4 shrink-0 ml-auto ${isGreen ? "text-nature-600 dark:text-nature-400" : "text-brand-600 dark:text-brand-400"
                          }`} />
                      </div>
                    );
                  })}
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* 5. PROCESS */}
        <section className="py-24 sm:py-32 bg-transparent transition-colors duration-500">
          <Container>
            <SectionHeading
              eyebrow="Our Process"
              title="From Concept to Living Architecture"
              align="center"
              description="A structured 4-stage architectural workflow designed for precision, transparent communication, and flawless execution."
            />

            <div className="relative mt-16 sm:mt-20">
              <div className="pointer-events-none absolute top-14 left-10 right-10 hidden h-px bg-ink-900/10 lg:block dark:bg-white/10" />

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {ABOUT_PROCESS.map((item, i) => {
                  const Icon = item.icon;
                  const isGreen = i % 2 === 0;
                  return (
                    <FadeIn
                      key={item.step}
                      delay={i * 0.1}
                      className={`liquid-glass-card rounded-3xl group flex flex-col justify-between p-6 sm:p-7 cursor-default shadow-md ${isGreen ? "border-nature-500/20" : "border-brand-500/20"
                        }`}
                    >
                      <div className="liquid-sheen-sweep" />
                      <div className="liquid-glass-bevel" />
                      <div>
                        <div className="relative z-10 flex items-center justify-between mb-6">
                          <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-mono font-bold border shadow-sm backdrop-blur-md transition-all duration-300 ${isGreen
                            ? "bg-nature-500/10 text-nature-700 dark:text-nature-300 border-nature-500/30 group-hover:bg-nature-600 group-hover:text-white"
                            : "bg-brand-500/10 text-brand-700 dark:text-brand-300 border-brand-500/30 group-hover:bg-brand-600 group-hover:text-white"
                            }`}>
                            <Localized>{item.step}</Localized>
                          </span>
                          <span className={`p-2 rounded-xl transition-colors ${isGreen
                            ? "bg-nature-500/10 text-nature-700 dark:text-nature-300 group-hover:text-nature-600"
                            : "bg-brand-500/10 text-brand-700 dark:text-brand-300 group-hover:text-brand-600"
                            }`}>
                            <Icon className="h-5 w-5" />
                          </span>
                        </div>

                        <h3 className="relative z-10 font-serif text-xl sm:text-2xl font-normal text-ink-950 dark:text-white group-hover:text-ink-700 dark:group-hover:text-white transition-colors">
                          <Localized>{item.title}</Localized>
                        </h3>

                        <p className="relative z-10 mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-700/80 dark:text-white/65">
                          <Localized>{item.description}</Localized>
                        </p>
                      </div>

                      <div className="relative z-10 mt-6 pt-3.5 border-t border-dashed border-ink-900/10 dark:border-white/10 flex items-center justify-between text-[10px] font-mono">
                        <span className={isGreen ? "text-nature-700 dark:text-nature-400 font-semibold" : "text-brand-600 dark:text-brand-400 font-semibold"}>
                          <Localized>STAGE </Localized><Localized>{item.step}</Localized>
                        </span>
                        <span className="text-ink-900 dark:text-white font-semibold"><Localized>WORKFLOW</Localized></span>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* 6. TEAM */}
        <section className="py-24 sm:py-32">
          <Container>
            <SectionHeading
              eyebrow="The Team"
              title="Minds Behind the Architecture"
              align="center"
            />

            <div className="mt-16 max-w-5xl mx-auto">
              {/* Lead Architect Premium Liquid Glass Card */}
              <FadeIn className="liquid-glass-card rounded-[2rem] p-4 sm:p-6 flex flex-col md:flex-row gap-8 shadow-xl relative">
                <div className="liquid-sheen-sweep" />
                <div className="liquid-glass-bevel" />

                {/* Left Side: Portrait */}
                <div className="relative z-10 w-full md:w-[320px] h-[380px] sm:h-[400px] shrink-0 rounded-2xl overflow-hidden bg-ink-900/5 border border-ink-900/10">
                  <Image
                    src="/assets/architecture img.jpeg"
                    alt={ARCHITECT.name}
                    fill
                    sizes="(min-width: 768px) 320px, 100vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* Right Side: Info */}
                <div className="relative z-10 flex-1 flex flex-col justify-center py-2 sm:py-6 pr-2 sm:pr-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-3xl sm:text-4xl font-normal text-ink-950 dark:text-white mb-2">
                        <Localized>Ar. SENTHIL</Localized>
                      </h3>
                      <p className="text-xs font-mono font-bold tracking-widest uppercase text-nature-700 dark:text-nature-400">
                        <Localized>PRINCIPAL ARCHITECT & FOUNDER</Localized>
                      </p>
                    </div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-brand-500/25 bg-brand-500/10 text-brand-600 dark:text-brand-400 shrink-0">
                      <Sparkles className="h-5 w-5" />
                    </span>
                  </div>

                  <p className="mt-6 text-sm sm:text-base leading-relaxed text-ink-700/90 dark:text-white/70 font-light max-w-2xl">
                    <Localized>Ar. Senthil is the founder of Senthil Associates, a full-service architecture and interior design consultancy with over 23 years of experience. A graduate of Thiagarajar College of Engineering, Madurai, and R.V.S. School of Architecture, Coimbatore, he is passionate about creating innovative, context-responsive, and sustainable architectural spaces.</Localized>
                  </p>

                  <div className="mt-8 pt-6 border-t border-ink-900/10 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-ink-500 dark:text-white/50 tracking-wider uppercase"><Localized>MADURAI, TN</Localized></span>
                    <button
                      type="button"
                      onClick={() => setIsMonographOpen(true)}
                      className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-bold hover:underline underline-offset-4 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
                      aria-label="Open Full Monograph of Ar. Senthil"
                    >
                      <span><Localized>Full Monograph</Localized></span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </FadeIn>

              {/* Below Card: Roles */}
              <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {ADDITIONAL_TEAM.map((member, i) => {
                  const isGreen = i % 2 === 0;
                  return (
                    <FadeIn key={member.name} delay={i * 0.1} className={`liquid-glass-card rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center w-full relative shadow-sm ${isGreen ? "border-nature-500/20" : "border-brand-500/20"
                      }`}>
                      <div className="liquid-sheen-sweep" />
                      <div className="relative z-10">
                        <h4 className="font-serif text-base sm:text-lg font-medium text-ink-950 dark:text-white mb-1">
                          <Localized>{member.name}</Localized>
                        </h4>
                        <p className={`text-[10px] sm:text-xs font-mono uppercase tracking-widest font-semibold ${isGreen ? "text-nature-700 dark:text-nature-400" : "text-brand-600 dark:text-brand-400"
                          }`}>
                          <Localized>{member.role}</Localized>
                        </p>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>



        <ClientQueries />

        {/* 8. CTA BANNER */}
        <section className="py-24 sm:py-32">
          <Container>
            <FadeIn className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-700 dark:text-brand-300 mb-6">
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" /><Localized>
                  Start a Conversation
                </Localized></div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-ink-950 dark:text-white leading-[1.15] mb-8"><Localized>
                Ready to transform your vision into
              </Localized><br className="hidden sm:inline" /><Localized>{" "}</Localized>
                <span className="italic font-serif font-light text-nature-700 dark:text-nature-400"><Localized>
                  living architecture?
                </Localized></span>
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Button href="/contact" variant="red" className="text-sm px-6 py-3"><Localized>
                  Get a Quote
                </Localized></Button>
                <Button href="/contact" variant="outline" className="text-sm px-6 py-3"><Localized>
                  Contact Us
                </Localized></Button>
              </div>
            </FadeIn>
          </Container>
        </section>
      </ContinuousPaintReveal>

      {/* Full Monograph Modal */}
      <MonographModal
        isOpen={isMonographOpen}
        onClose={() => setIsMonographOpen(false)}
      />

    </div>
  );
}
