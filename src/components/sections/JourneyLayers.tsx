"use client";
import { Localized, useLanguage } from "@/providers/LanguageProvider";


import React, { useRef, useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/layout/Container";
import { motion, useScroll, useTransform } from "framer-motion";

const LAYERS = [
  {
    step: "01",
    title: "The Beginning",
    description: "A belief in the power of good architecture to create better lives.",
    details: ["AR. SENTHIL | B.ARCH", "THIAGARAJAR COLLEGE OF ENGINEERING, MADURAI", "EXPERIENCE IN LEADING ORGANIZATIONS"],
    image: "/assets/step1.png",
    accent: "green" as const,
  },
  {
    step: "02",
    title: "The Practice",
    description: "Delivering thoughtful and purposeful design across diverse projects.",
    details: ["ARCHITECTURE | INTERIOR DESIGN", "PROJECT MANAGEMENT"],
    image: "/assets/step2.png",
    accent: "red" as const,
  },
  {
    step: "03",
    title: "The People",
    description: "Clients, collaborators and communities.",
    details: ["TRUST | COLLABORATION", "LASTING RELATIONSHIPS"],
    image: "/assets/step3.png",
    accent: "green" as const,
  },
  {
    step: "04",
    title: "The Future",
    description: "Creating enduring spaces for generations ahead.",
    details: ["SUSTAINABLE DESIGN | QUALITY MATERIALS", "THOUGHTFUL PLANNING"],
    image: "/assets/step4.png",
    accent: "red" as const,
  },
];

export function JourneyLayers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { language } = useLanguage();
  const isTamil = language === "ta";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax the whole 3D isometric scene gently from top to bottom as we scroll
  const sceneY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  // Dimensions for the isometric blocks - perfectly tuned to fit 4 steps
  const W = 260; // Base Width/Length
  const H = 80; // Height (Z-axis) - thinner glass layers matching image

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen lg:min-h-[140vh] bg-transparent py-24 lg:py-32 overflow-hidden flex items-center transition-colors duration-500">

      {/* High-Tech Isometric Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            transform: 'perspective(2000px) rotateX(60deg) rotateZ(45deg) scale(3)',
            transformOrigin: 'center center'
          }}
        />
      </div>

      <Container className="relative z-10 w-full h-full">
        <div className="relative w-full max-w-7xl mx-auto lg:h-[1000px] flex flex-col lg:flex-row items-start lg:items-center justify-center">

          {/* Intro Text - Static on mobile, Absolute on desktop */}
          <div className="relative lg:absolute lg:top-10 lg:left-10 z-50 max-w-md pointer-events-none mb-10 lg:mb-0">
            <FadeIn>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-brand-700 dark:text-brand-300">
                  <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                  <Localized>Evolution &amp; Heritage</Localized>
                </span>
              </div>
              <h2
                className={`font-serif text-ink-950 dark:text-white mb-6 leading-[1.15] tracking-tight ${isTamil
                  ? "text-3xl sm:text-4xl lg:text-[40px]"
                  : "text-5xl lg:text-6xl lg:text-7xl"
                  }`}
              >
                <Localized>A JOURNEY </Localized><br />
                <span className="font-light italic text-nature-700 dark:text-nature-400"><Localized>IN LAYERS.</Localized></span>
              </h2>
              <p className="text-ink-700 dark:text-white/70 text-sm lg:text-base leading-relaxed max-w-sm font-light"><Localized>
                Each phase has added depth to our thinking, shaping the way we design, build and create.
              </Localized></p>
            </FadeIn>
          </div>

          {/* Mobile View: Vertical Animated Cards */}
          <div className="lg:hidden flex flex-col gap-6 w-full z-20">
            {LAYERS.map((layer, index) => {
              const isGreen = layer.accent === "green";
              return (
                <FadeIn key={layer.step} delay={index * 0.1}>
                  <div className={`group liquid-glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-md transition-all duration-500 ${
                    isGreen ? "border-nature-500/20" : "border-brand-500/20"
                  }`}>
                    <div className="liquid-water-wave" style={{ animationDelay: `${index * 1.1}s` }} />
                    <div className="liquid-sheen-sweep" />
                    <div className="liquid-glass-bevel" />
                    <div className="absolute inset-0 opacity-15 dark:opacity-25 group-hover:opacity-45 transition-all duration-500 group-hover:scale-105 mix-blend-multiply dark:mix-blend-screen">
                      <Image src={layer.image} alt={layer.title} fill className="object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent pointer-events-none" />

                    <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-[8px]">
                      <div className="flex items-center gap-4 mb-3">
                        <span className={`font-mono font-bold text-2xl tracking-wider ${
                          isGreen ? "text-nature-700 dark:text-nature-400" : "text-brand-600 dark:text-brand-400"
                        }`}>
                          <Localized>{layer.step}</Localized>
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl text-ink-950 dark:text-white">
                          <Localized>{layer.title}</Localized>
                        </h3>
                      </div>
                      <p className="text-ink-700 dark:text-white/80 text-sm leading-relaxed mb-5 max-w-[280px]">
                        <Localized>{layer.description}</Localized>
                      </p>
                      <div className="flex flex-col gap-2">
                        {layer.details.map((detail, idx) => (
                          <span key={idx} className={`flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase ${
                            isGreen ? "text-nature-800 dark:text-nature-300" : "text-brand-800 dark:text-brand-300"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              isGreen ? "bg-nature-600" : "bg-brand-600"
                            }`} />
                            <Localized>{detail}</Localized>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* 3D Scene Container - Desktop Only */}
          {/* Parallax Scrolling: Moves smoothly from top to bottom as user scrolls */}
          <div className="hidden lg:block absolute top-0 left-[14%] xl:left-[17%] 2xl:left-[20%] w-full max-w-[800px] h-[800px] scale-[0.88] xl:scale-95 2xl:scale-100 origin-center pointer-events-none">
            <motion.div
              style={{ y: sceneY, perspective: '3000px' }}
              className="relative w-full h-full pointer-events-none"
            >
              <div
                className="relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(60deg) rotateZ(45deg)'
                }}
              >
                {LAYERS.map((layer, index) => {
                  // Symmetrical offset to perfectly center the entire 4-step staircase
                  const centerOffset = 1.5;
                  const yPos = -(index - centerOffset) * W;
                  const zPos = (index - centerOffset) * H;
                  const isHovered = hoveredIndex === index;
                  const isGreen = layer.accent === "green";

                  return (
                    /* 3D Block Scroll Reveal: Z-axis and Y-axis slide-in with fade-in on scroll */
                    <motion.div
                      key={layer.step}
                      initial={{ opacity: 0, z: zPos - 250, y: yPos + 120, x: "-50%" }}
                      whileInView={{ opacity: 1, z: zPos, y: yPos, x: "-50%" }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 1.1,
                        delay: index * 0.18,
                        ease: [0.21, 1.11, 0.81, 0.99]
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="absolute top-1/2 left-1/2 group pointer-events-auto cursor-pointer"
                      style={{
                        transformStyle: 'preserve-3d',
                        width: W,
                        height: W,
                      }}
                    >
                      {/* 3D Block Hover Effect: Lifts slightly in 3D on hover */}
                      <div
                        className="relative w-full h-full"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
                          transition: 'transform 0.5s ease-out'
                        }}
                      >
                        {/* Top Face - Subtle Drafting Glass & Image */}
                        <div
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className={`absolute top-0 left-0 bg-white/40 border backdrop-blur-sm overflow-hidden transition-all duration-500 ${isHovered
                            ? isGreen ? "border-nature-600/70 shadow-xl" : "border-brand-600/70 shadow-xl"
                            : isGreen ? "border-nature-600/30 group-hover:border-nature-600/60" : "border-brand-600/30 group-hover:border-brand-600/60"
                            }`}
                          style={{
                            width: W,
                            height: W,
                            transform: `translateZ(${H}px)`,
                            boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.05), 0 10px 30px rgba(0,0,0,0.08)'
                          }}
                        >
                          {/* Continuous Liquid Water Shimmer / Sheen Animation */}
                          <div className="liquid-water-wave" style={{ animationDelay: `${index * 1.1}s` }} />
                          <div className="liquid-sheen-sweep" />
                          <div className="liquid-glass-bevel" />

                          <Image
                            src={layer.image}
                            alt={layer.title}
                            fill
                            className={`object-cover dark:mix-blend-screen mix-blend-multiply transition-all duration-500 ease-out -rotate-45 ${isHovered
                              ? "scale-[1.65] opacity-85 dark:opacity-100"
                              : "scale-[1.45] opacity-25 dark:opacity-40 group-hover:scale-[1.65] group-hover:opacity-85 dark:group-hover:opacity-100"
                              }`}
                          />
                          {/* 4 Corner Drafting Dots */}
                          <div className={`absolute top-0 left-0 w-1.5 h-1.5 rounded-full ${isGreen ? "bg-nature-600" : "bg-brand-600"}`} />
                          <div className={`absolute top-0 right-0 w-1.5 h-1.5 rounded-full ${isGreen ? "bg-nature-600" : "bg-brand-600"}`} />
                          <div className={`absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full ${isGreen ? "bg-nature-600" : "bg-brand-600"}`} />
                          <div className={`absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full ${isGreen ? "bg-nature-600" : "bg-brand-600"}`} />
                        </div>

                        {/* Front Face (+Y facing) - Transparent Wireframe */}
                        <div
                          className={`absolute left-0 top-0 border-x border-b bg-white/20 transition-colors duration-500 ${isHovered
                            ? isGreen ? "border-nature-600/50" : "border-brand-600/50"
                            : "border-ink-900/15 group-hover:border-ink-900/35"
                            }`}
                          style={{
                            width: W,
                            height: H,
                            transformOrigin: 'top left',
                            transform: `translateY(${W}px) translateZ(${H}px) rotateX(-90deg)`,
                          }}
                        />

                        {/* Right Face (+X facing) - Transparent Wireframe */}
                        <div
                          className={`absolute left-0 top-0 border-y border-r bg-white/20 transition-colors duration-500 ${isHovered
                            ? isGreen ? "border-nature-600/50" : "border-brand-600/50"
                            : "border-ink-900/15 group-hover:border-ink-900/35"
                            }`}
                          style={{
                            width: H,
                            height: W,
                            transformOrigin: 'top left',
                            transform: `translateX(${W}px) translateZ(${H}px) rotateY(90deg)`,
                          }}
                        />

                        {/* Content / Text - Connecting Line & Labels (Interactive & slides right 10px on hover) */}
                        <div
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className="absolute pointer-events-auto cursor-pointer flex flex-row items-start gap-3.5"
                          style={{
                            left: W,
                            top: 0,
                            transformOrigin: "0 14px",
                            // Reverse world rotation to face camera, cleanly anchored at the right corner vertex
                            transform: `translateZ(${H}px) rotateZ(-45deg) rotateX(-60deg)`,
                            width: '420px',
                          }}
                        >
                          {/* Horizontal Connecting Line with Arrow / Anchor Node */}
                          <div className="flex items-center mt-[13px] shrink-0">
                            <div
                              className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                                isHovered
                                  ? isGreen
                                    ? "bg-nature-500 border-nature-600 scale-125 shadow-[0_0_12px_rgba(57,150,90,0.8)]"
                                    : "bg-brand-500 border-brand-600 scale-125 shadow-[0_0_12px_rgba(224,62,62,0.8)]"
                                  : isGreen
                                    ? "bg-nature-600/90 border-nature-600 shadow-[0_0_8px_rgba(57,150,90,0.5)]"
                                    : "bg-brand-600/90 border-brand-600 shadow-[0_0_8px_rgba(224,62,62,0.5)]"
                              }`}
                            />
                            <div
                              className={`h-px transition-all duration-500 ${
                                isHovered
                                  ? isGreen ? "w-16 bg-nature-600 dark:bg-nature-400" : "w-16 bg-brand-600 dark:bg-brand-400"
                                  : isGreen ? "w-8 lg:w-11 bg-nature-600/50 group-hover:w-16 group-hover:bg-nature-600" : "w-8 lg:w-11 bg-brand-600/50 group-hover:w-16 group-hover:bg-brand-600"
                              }`}
                            />
                          </div>

                          {/* Text Block: shifts right by 10px on hover */}
                          <div className="flex flex-col">
                            <div
                              className={`flex items-center gap-4 mb-2 transition-transform duration-500 ease-out ${isHovered ? "translate-x-[10px]" : "translate-x-0 group-hover:translate-x-[10px]"
                                }`}
                            >
                              <span
                                className={`font-mono font-bold text-xl tracking-wider transition-colors duration-500 ${
                                  isGreen
                                    ? "text-nature-700 dark:text-nature-400"
                                    : "text-brand-600 dark:text-brand-400"
                                }`}
                              >
                                <Localized>{layer.step}</Localized>
                              </span>
                              <h3
                                className={`font-serif text-2xl lg:text-3xl transition-colors duration-500 ${isHovered
                                  ? isGreen ? "text-nature-700 dark:text-nature-400" : "text-brand-600 dark:text-brand-400"
                                  : "text-ink-950 dark:text-white"
                                  }`}
                              >
                                <Localized>{layer.title}</Localized>
                              </h3>
                            </div>

                            <p
                              className={`text-ink-700 dark:text-white/80 text-xs lg:text-sm leading-relaxed max-w-[280px] mb-4 transition-transform duration-500 ease-out ${isHovered ? "translate-x-[10px]" : "translate-x-0 group-hover:translate-x-[10px]"
                                }`}
                            >
                              <Localized>{layer.description}</Localized>
                            </p>

                            <div
                              className={`flex flex-col gap-1.5 transition-transform duration-500 ease-out ${isHovered ? "translate-x-[10px]" : "translate-x-0 group-hover:translate-x-[10px]"
                                }`}
                            >
                              {layer.details.map((detail, idx) => (
                                <span
                                  key={idx}
                                  className={`inline-flex items-center gap-2 text-[9px] lg:text-[10px] font-mono tracking-widest uppercase transition-colors ${
                                    isGreen
                                      ? "text-nature-800/80 dark:text-nature-300"
                                      : "text-brand-800/80 dark:text-brand-300"
                                  }`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      isGreen ? "bg-nature-600" : "bg-brand-600"
                                    }`}
                                  />
                                  <Localized>{detail}</Localized>
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
