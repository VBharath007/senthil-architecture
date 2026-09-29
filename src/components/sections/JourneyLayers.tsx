"use client";

import React, { useRef } from "react";
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
  },
  {
    step: "02",
    title: "The Practice",
    description: "Delivering thoughtful and purposeful design across diverse projects.",
    details: ["ARCHITECTURE | INTERIOR DESIGN", "PROJECT MANAGEMENT"],
    image: "/assets/step2.png",
  },
  {
    step: "03",
    title: "The People",
    description: "Clients, collaborators and communities.",
    details: ["TRUST | COLLABORATION", "LASTING RELATIONSHIPS"],
    image: "/assets/step3.png",
  },
  {
    step: "04",
    title: "The Future",
    description: "Creating enduring spaces for generations ahead.",
    details: ["SUSTAINABLE DESIGN | QUALITY MATERIALS", "THOUGHTFUL PLANNING"],
    image: "/assets/step4.png",
  },
];

export function JourneyLayers() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });


  // Parallax the whole scene slightly as we scroll
  const sceneY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Dimensions for the isometric blocks - perfectly tuned to fit 4 steps
  const W = 260; // Base Width/Length
  const H = 80; // Height (Z-axis) - thinner glass layers matching image

  return (
    <section ref={sectionRef} className="relative w-full min-h-[140vh] bg-ink-50 dark:bg-[#020504] py-32 overflow-hidden flex items-center transition-colors duration-500">

      {/* High-Tech Isometric Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#00E599 1px, transparent 1px), linear-gradient(90deg, #00E599 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            transform: 'perspective(2000px) rotateX(60deg) rotateZ(45deg) scale(3)',
            transformOrigin: 'center center'
          }}
        />
        {/* Radial vignette to fade out the grid edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f8faf9_70%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#020504_70%)] transition-colors duration-500" />
      </div>

      <Container className="relative z-10 w-full h-full">
        <div className="relative w-full max-w-7xl mx-auto h-[1000px] flex items-center justify-center">

          {/* Intro Text - Absolute positioned exactly matching reference */}
          <div className="absolute top-10 left-4 md:left-10 z-50 max-w-md pointer-events-none">
            <FadeIn>
              <div className="flex items-center gap-3 text-brand-600 dark:text-[#00E599] font-mono tracking-widest text-xs md:text-sm mb-6">
                <div className="w-10 h-px bg-brand-600 dark:bg-[#00E599]" />
                <span className="font-bold">01 / ABOUT • OUR VISION</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-ink-950 dark:text-white mb-6 leading-[1.1] tracking-tight">
                A JOURNEY <br />
                <span className="text-brand-600 dark:text-[#00E599] font-light italic">IN LAYERS.</span>
              </h2>
              <p className="text-ink-700 dark:text-white/70 text-sm md:text-base leading-relaxed max-w-sm font-light">
                Each phase has added depth to our thinking, shaping the way we design, build and create.
              </p>
            </FadeIn>
          </div>

          {/* 3D Scene Container */}
          <motion.div
            style={{ y: sceneY, perspective: '3000px' }}
            // Center positioned and pushed left (20%)
            className="absolute top-[0%] left-[10%] md:left-[20%] w-full max-w-[800px] h-[800px] -translate-x-[50%] -translate-y-[50%]"
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

                return (
                  <motion.div
                    key={layer.step}
                    initial={{ opacity: 0, z: zPos - 300, y: yPos + 150 }}
                    whileInView={{ opacity: 1, z: zPos, y: yPos }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 1.2,
                      delay: index * 0.2,
                      ease: [0.21, 1.11, 0.81, 0.99]
                    }}
                    className="absolute top-1/2 left-1/2 group"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `translate(-50%, -50%)`,
                      width: W,
                      height: W,
                    }}
                  >
                    {/* Lift Interaction Area */}
                    <div
                      className="relative w-full h-full transition-transform duration-700 ease-out group-hover:-translate-z-8"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Top Face - Glowing Glass & Image */}
                      <div
                        className="absolute top-0 left-0 bg-[#00E599]/[0.02] border border-[#00E599]/40 backdrop-blur-sm overflow-hidden"
                        style={{
                          width: W,
                          height: W,
                          transform: `translateZ(${H}px)`,
                          boxShadow: 'inset 0 0 40px rgba(0, 229, 153, 0.1), 0 0 20px rgba(0,229,153,0.15)'
                        }}
                      >
                        <Image
                          src={layer.image}
                          alt={layer.title}
                          fill
                          className="object-cover dark:mix-blend-screen mix-blend-multiply transition-all duration-700 -rotate-45 scale-[1.45] opacity-20 dark:opacity-40 group-hover:scale-[1.55] group-hover:opacity-60 dark:group-hover:opacity-100"
                        />
                        {/* High-tech dots overlay */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,153,0.4)_1px,transparent_1px)] bg-[size:12px_12px] opacity-20 pointer-events-none mix-blend-overlay" />

                        {/* 4 Corner Glowing Dots */}
                        <div className="absolute top-0 left-0 w-1 h-1 bg-[#00E599] rounded-full shadow-[0_0_8px_2px_#00E599]" />
                        <div className="absolute top-0 right-0 w-1 h-1 bg-[#00E599] rounded-full shadow-[0_0_8px_2px_#00E599]" />
                        <div className="absolute bottom-0 left-0 w-1 h-1 bg-[#00E599] rounded-full shadow-[0_0_8px_2px_#00E599]" />
                        <div className="absolute bottom-0 right-0 w-1 h-1 bg-[#00E599] rounded-full shadow-[0_0_8px_2px_#00E599]" />
                      </div>

                      {/* Front Face (+Y facing) - Transparent Wireframe */}
                      <div
                        className="absolute left-0 top-0 border-x border-b border-[#00E599]/30 bg-[#00E599]/[0.01]"
                        style={{
                          width: W,
                          height: H,
                          transformOrigin: 'top left',
                          transform: `translateY(${W}px) translateZ(${H}px) rotateX(-90deg)`,
                        }}
                      />

                      {/* Right Face (+X facing) - Transparent Wireframe */}
                      <div
                        className="absolute left-0 top-0 border-y border-r border-[#00E599]/30 bg-[#00E599]/[0.01]"
                        style={{
                          width: H,
                          height: W,
                          transformOrigin: 'top left',
                          transform: `translateX(${W}px) translateZ(${H}px) rotateY(90deg)`,
                        }}
                      />

                      {/* Content / Text - Connecting Line & Labels */}
                      <div
                        className="absolute pointer-events-none flex flex-row items-start gap-4"
                        style={{
                          left: W,
                          top: W / 2,
                          // Reverse world rotation to face camera, translate right
                          transform: `translateZ(${H}px) rotateZ(-45deg) rotateX(-60deg) translate(40px, -20px)`,
                          width: '500px',
                        }}
                      >
                        {/* Horizontal Connecting Line */}
                        <div className="w-12 md:w-20 h-px bg-[#00E599]/60 shadow-[0_0_8px_#00E599] mt-[14px] shrink-0" />

                        {/* Text Block Exact Replica */}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-4 mb-2 transition-transform duration-700 group-hover:translate-x-[10px]">
                            <span className="font-mono font-bold text-xl tracking-wider transition-colors duration-700 text-brand-600 dark:text-[#00E599] group-hover:text-ink-950 dark:group-hover:text-white dark:group-hover:drop-shadow-[0_0_8px_#00E599]">
                              {layer.step}
                            </span>
                            <h3 className="font-serif text-2xl md:text-3xl transition-colors duration-700 text-ink-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-[#00E599]">
                              {layer.title}
                            </h3>
                          </div>

                          <p className="text-ink-700 dark:text-white/80 text-xs md:text-sm leading-relaxed max-w-[280px] mb-4">
                            {layer.description}
                          </p>

                          <div className="flex flex-col gap-1.5">
                            {layer.details.map((detail, idx) => (
                              <span key={idx} className="text-[9px] md:text-[10px] text-ink-500 dark:text-white/40 font-mono tracking-widest uppercase">
                                {detail}
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
      </Container>
    </section>
  );
}
