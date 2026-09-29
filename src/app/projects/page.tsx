"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactCta } from "@/components/sections/ContactCta";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { PROJECTS } from "@/data/site";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass } from "lucide-react";

// TASK 3c: Individual Card Component for Parallax & Entrance
function ProjectGridCard({ project, index, activeCategory }: any) {
  // Removed parallax and clip-path animations to fix flickering

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      key={project.slug}
      className="group"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block w-full h-full lg:cursor-auto"
      >
        <div
          className="relative overflow-hidden rounded-2xl mb-4 bg-ink-900/10 dark:bg-ink-900 w-full aspect-[4/3] group-hover:shadow-xl transition-shadow duration-500"
        >
          <div className="w-full h-full relative">
            <Image
              src={`/assets/projects/${project.slug}/${activeCategory === "Interior Design" && project.interior_cover ? project.interior_cover : project.cover}`}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority={index < 4}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%231a1a1a'%3E%3Crect width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-family='sans-serif' font-size='14'%3EProject Photo Unavailable%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>

          {/* TASK 2: Label (no full-card gradient overlay) */}
          <div className="absolute bottom-6 left-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center gap-2 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="text-white text-sm font-medium tracking-wide uppercase shadow-black drop-shadow-md">View Project</span>
            <ArrowRight className="w-4 h-4 text-nature-400" />
          </div>
        </div>

        {/* TASK 2: Project title shifts up 4px */}
        <div className="transition-transform duration-500 group-hover:-translate-y-1">
          <span className="text-red-500 text-xs font-bold uppercase tracking-wider block mb-1">
            {project.categories.join(", ")}
          </span>
          <h3 className="text-2xl font-medium text-ink-900 dark:text-white mb-1">
            {project.title}
          </h3>
          <p className="text-ink-500 dark:text-ink-400 text-sm mb-2">
            {project.location}
          </p>
          {project.description && (
            <p className="text-ink-700/70 dark:text-white/60 max-w-md line-clamp-2">
              {project.description}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const categories = ["All", "Architecture Design", "Interior Design", "Design + Build"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.categories.includes(activeCategory));

  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: horizontalRef,
    offset: ["start start", "end end"]
  });
  // Use matching string formats so Framer Motion can interpolate them properly!
  const x = useTransform(scrollYProgress, [0, 1], ["calc(0% + 0vw)", "calc(-100% + 100vw)"]);

  return (
    <>
      <Navbar />

      <main className="bg-white dark:bg-ink-950">

        {/* NEW HERO - Matches About Page Style */}
        <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pt-32 pb-12 overflow-hidden bg-ink-50 dark:bg-[#030706] transition-colors duration-500">

          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(0,229,153,0.05)_0%,transparent_50%)] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(0,229,153,0.08)_0%,transparent_50%)] pointer-events-none" />

          <Container className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

            {/* Left Column: Content */}
            <div className="flex-1 flex flex-col justify-center w-full max-w-xl z-20 pt-10 lg:pt-0">

              {/* Eyebrow badge */}
              <FadeIn className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-sm text-[11px] sm:text-xs md:text-sm font-mono uppercase tracking-wider font-bold text-nature-800 bg-nature-500/10 border border-nature-500/25 dark:text-nature-300 dark:bg-nature-950/60 dark:border-nature-500/30">
                  <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-nature-600 dark:text-nature-400" />
                  01 / PROJECTS • SELECTED WORKS
                </span>
              </FadeIn>

              {/* Headline */}
              <FadeIn delay={0.1}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-medium tracking-tight text-ink-950 dark:text-white leading-[1.12]">
                  Spaces We&apos;ve
                  <br className="hidden sm:inline" />{" "}
                  <span className="font-semibold italic font-serif font-light text-nature-700 dark:text-nature-400">
                    Brought to
                  </span>
                  <br className="hidden sm:inline" />{" "}
                  <span className="font-semibold italic font-serif font-light text-nature-700 dark:text-nature-400">
                    Life.
                  </span>
                </h1>
              </FadeIn>

              {/* Description */}
              <FadeIn delay={0.2}>
                <p className="mt-2.5 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-ink-700/85 dark:text-white/75 max-w-xl">
                  Explore our residential, commercial, and industrial landmarks across Tamil Nadu.
                </p>
                <div className="mt-3 sm:mt-4">
                  <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-nature-600 dark:text-nature-400 font-semibold">
                    {PROJECTS.length} PROJECTS
                  </span>
                </div>
              </FadeIn>

              {/* Buttons */}
              <FadeIn delay={0.3} className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="#projects-grid"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00E599] text-[#020504] text-sm font-semibold hover:bg-[#00E599]/90 transition-all hover:scale-105"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore Projects <ArrowRight className="w-4 h-4 rotate-90" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:border-[#00E599]/50 hover:bg-[#00E599]/5 hover:text-[#00E599] transition-all"
                >
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
            </div>

            {/* Right Column: Visual */}
            <div className="flex-1 relative w-full h-[45vh] sm:h-[55vh] lg:h-[70vh] z-10 mt-12 lg:mt-0 mx-auto max-w-2xl">
              <FadeIn direction="left" delay={0.2} className="w-full h-full relative z-10">
                <div className="relative w-full h-full p-2 sm:p-3 rounded-[2rem] sm:rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl group">
                  <div className="relative w-full h-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop"
                      alt="Modern Architecture Masterpiece"
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      priority
                    />
                    {/* Subtle gradient overlay to blend perfectly with the dark theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030706]/80 via-transparent to-[#030706]/20 pointer-events-none" />
                  </div>
                </div>
                
                {/* Elegant glow effect behind the image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00E599]/10 blur-[100px] rounded-full pointer-events-none -z-10" />
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* Project Grid Wrapper to contain the sticky filter */}
        <div className="relative">
          {/* Category Filter */}
          <section id="projects-grid" className="py-16 sticky top-20 z-40 bg-white/90 dark:bg-ink-950/90 backdrop-blur-md border-y border-ink-900/10 dark:border-white/10">
            <Container>
              <div className="flex flex-wrap gap-8">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm tracking-wide uppercase transition-all duration-300 relative ${activeCategory === cat ? "text-ink-900 dark:text-white font-medium" : "text-ink-500 hover:text-ink-900 dark:hover:text-white"
                      }`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-2 left-0 right-0 h-px bg-nature-500"
                      />
                    )}
                  </button>
                ))}
              </div>
            </Container>
          </section>

          {/* Mix of Layouts for Filtered Projects */}
          <section className="py-16 min-h-[50vh]">
            <Container>
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, i) => (
                    <ProjectGridCard
                      key={project.slug}
                      project={project}
                      index={i}
                      activeCategory={activeCategory}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </Container>
          </section>
        </div>

        {/* TASK 5: Architecture in Motion - Pinned Horizontal Scroll (Desktop) & Swipeable (Mobile) */}
       

        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
