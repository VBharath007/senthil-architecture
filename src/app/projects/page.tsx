"use client";
import { Localized, useLanguage } from "@/providers/LanguageProvider";


import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactCta } from "@/components/sections/ContactCta";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContinuousPaintReveal } from "@/components/ui/ContinuousPaintReveal";
import { PROJECTS } from "@/data/site";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass } from "lucide-react";

// TASK 3c: Individual Card Component for Parallax & Entrance
function ProjectGridCard({ project, index, activeCategory }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isColor, setIsColor] = useState(false);

  useEffect(() => {
    let ticking = false;
    const checkColorReveal = () => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Check if the hero section has finished scrolling away
      const hero = document.getElementById("projects-hero");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;

      // Reveal to original color when card is in view on scroll
      const cardInView = rect.top < vh * 0.88 && rect.bottom > 20;

      if (cardInView) {
        setIsColor(true);
      } else if (window.scrollY < 30) {
        setIsColor(false);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkColorReveal);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    checkColorReveal();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      key={project.slug}
      className="group project-card h-full"
      ref={cardRef}
    >
      <Link
        href={`/projects/${project.slug}${activeCategory === "Interior Design" && project.interior_cover ? `?img=${project.interior_cover}` : ""}`}
        className="block w-full h-full lg:cursor-auto"
      >
        <div className="liquid-glass-card rounded-3xl p-4 sm:p-5 h-full flex flex-col justify-between shadow-md relative">
          <div className="liquid-sheen-sweep" />
          <div className="liquid-glass-bevel" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div
                className="relative overflow-hidden rounded-2xl mb-4 bg-ink-900/10 dark:bg-ink-900 w-full aspect-[4/3] project-image-wrap shadow-sm border border-ink-900/5"
                style={{
                  filter: isColor ? "grayscale(0%)" : "grayscale(100%)",
                  transition: "filter 2.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease",
                }}
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

                {/* View Project badge */}
                <div className="absolute bottom-4 left-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 bg-ink-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-semibold">
                  <span><Localized>View Project</Localized></span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <span className="text-ink-600 dark:text-ink-300 text-[11px] font-mono font-bold uppercase tracking-wider block mb-1">
                  <Localized>{project.categories.join(", ")}</Localized>
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-normal text-ink-950 dark:text-white mb-1.5">
                  <Localized>{project.title}</Localized>
                </h3>
                <p className="text-ink-500 dark:text-ink-400 text-xs mb-2">
                  <Localized>{project.location}</Localized>
                </p>
                {project.description && (
                  <p className="text-ink-700/80 dark:text-white/60 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    <Localized>{project.description}</Localized>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .project-card:hover .project-image-wrap,
        .project-image-wrap:hover {
          filter: grayscale(0%) !important;
        }
      `}</style>
    </motion.div>
  );
}



function ProjectHeroVisual({ filter }: { filter?: any }) {
  return (
    <motion.div
      style={{ filter }}
      className="relative w-full h-full p-2 sm:p-3 rounded-[2rem] sm:rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden transition-all duration-300"
    >
      <div className="relative w-full h-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-[#030706]">
        {/* Full Color Base Image */}
        <div className="absolute inset-0 z-10">
          <Image src="/assets/project hero.png" alt="Modern Architecture" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030706]/80 via-transparent to-[#030706]/20 pointer-events-none z-40" />
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const categories = ["All", "Architecture Design", "Interior Design", "Design + Build"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.categories.includes(activeCategory));

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });
  const splashMaskSize = useTransform(heroScrollYProgress, [0, 0.65, 1], ["0%, 100% 100%", "700%, 100% 100%", "850%, 100% 100%"]);
  const heroFilter = useTransform(heroScrollYProgress, [0, 0.45], ["grayscale(100%)", "grayscale(0%)"]);
  const { language } = useLanguage();
  const isTamil = language === "ta";

  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });
  // Use matching string formats so Framer Motion can interpolate them properly!
  const x = useTransform(scrollYProgress, [0, 1], ["calc(0% + 0vw)", "calc(-100% + 100vw)"]);

  return (
    <>
      <Navbar />

      <main className="bg-white dark:bg-ink-950">

        {/* Hero with Original Paint Splash Grayscale Overlay (Mobile & Desktop) */}
        <section id="projects-hero" ref={containerRef} className="relative w-full h-[180vh] sm:h-[200vh] bg-ink-50 dark:bg-[#030706] transition-colors duration-500">
          <div className="sticky top-0 w-full h-[100svh] overflow-hidden flex items-center justify-center pt-20 sm:pt-32 pb-8 sm:pb-12">

            {/* Subtle Ambient Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(0,229,153,0.05)_0%,transparent_50%)] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(0,229,153,0.08)_0%,transparent_50%)] pointer-events-none" />

            {/* Scroll-driven Paint Splash Grayscale Overlay */}
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

            {/* The Entire Hero Container */}
            <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center">
              <Container className="w-full h-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">

                {/* Left Column: Content */}
                <div className="flex-1 flex flex-col justify-center w-full max-w-xl z-20 pt-6 lg:pt-0">
                  <FadeIn delay={0.1}>
                    <h1
                      className={`tracking-tight ${isTamil
                        ? "font-serif text-[22px] sm:text-[24px] lg:text-[26px] leading-[1.3] font-medium"
                        : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-medium leading-[1.12]"
                        }`}
                    >
                      <span className="font-serif font-light text-nature-700 dark:text-nature-400">
                        <Localized>Spaces We&apos;ve</Localized>
                      </span>
                      <br className="hidden sm:inline" />{" "}
                      <span className="font-semibold italic font-serif font-light text-nature-700 dark:text-nature-400">
                        <Localized>Brought to</Localized>
                      </span>
                      <br className="hidden sm:inline" />{" "}
                      <span className="font-semibold italic font-serif font-light text-nature-700 dark:text-nature-400">
                        <Localized>Life.</Localized>
                      </span>
                    </h1>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                    <p className="mt-2.5 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-ink-700 dark:text-white/80 max-w-xl font-light">
                      <Localized>Explore our residential, commercial, and industrial landmarks across Tamil Nadu.</Localized>
                    </p>
                    <div className="mt-3 sm:mt-4">
                      <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-nature-700 dark:text-nature-400 font-bold">
                        <Localized>{PROJECTS.length}</Localized> <Localized>PROJECTS</Localized>
                      </span>
                    </div>
                  </FadeIn>

                  {/* Mobile View Visual: Placed directly below description as requested */}
                  <FadeIn delay={0.25} className="block lg:hidden my-6 w-full max-w-sm mx-auto">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-white/10">
                      <ProjectHeroVisual filter={heroFilter} />
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.3} className="mt-6 lg:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <Link
                      href="#projects-grid"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#00E599] text-[#020504] text-sm font-semibold hover:bg-[#00E599]/90 transition-all hover:scale-105 text-center"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <Localized>Explore Projects</Localized> <ArrowRight className="w-4 h-4 rotate-90 shrink-0" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-ink-900/20 dark:border-white/20 text-ink-900 dark:text-white text-sm font-medium hover:border-[#00E599]/50 hover:bg-[#00E599]/5 hover:text-[#00E599] transition-all text-center"
                    >
                      <Localized>Get a Quote</Localized> <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </FadeIn>
                </div>

                {/* Right Column: Visual (Desktop only) */}
                <div className="hidden lg:block lg:flex-1 relative min-h-[350px] h-[45vh] sm:h-[55vh] lg:h-[70vh] z-10 mt-12 lg:mt-0 mx-auto max-w-2xl">
                  <FadeIn direction="left" delay={0.2} className="w-full h-full relative z-10">
                    <ProjectHeroVisual filter={heroFilter} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00E599]/10 blur-[100px] rounded-full pointer-events-none -z-10" />
                  </FadeIn>
                </div>
              </Container>
            </div>
          </div>
        </section>

        {/* Project Grid & Content with Scroll-driven Black-and-White to Color Reveal */}
        <ContinuousPaintReveal>
          <div className="relative">
            {/* Category Filter */}
            <section id="projects-grid" className="py-4 sm:py-6 lg:py-8 relative lg:sticky lg:top-22 z-30 bg-[#ededed]/95 backdrop-blur-md border-y border-ink-900/10 shadow-sm">
              <Container>
                <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar py-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 relative shrink-0 py-1 ${activeCategory === cat ? "text-ink-950 font-bold" : "text-ink-600 hover:text-ink-950 font-medium"
                        }`}
                    >
                      <Localized>{cat}</Localized>
                      {activeCategory === cat && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-nature-500"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </Container>
            </section>

            {/* Mix of Layouts for Filtered Projects */}
            <section id="projects-list-section" className="relative z-10 py-16 min-h-[50vh]">
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

          <section className="py-16">
            <Container>
              <div className="liquid-glass-card rounded-3xl p-6 sm:p-10 shadow-lg relative">
                <div className="liquid-sheen-sweep" />
                <div className="liquid-glass-bevel" />
                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-nature-700 dark:text-nature-400 mb-4 font-mono font-bold"><Localized>Spatial Planning</Localized></p>
                    <h2 className="font-serif text-3xl sm:text-4xl text-ink-950 dark:text-white"><Localized>3D Floor Plan</Localized></h2>
                    <p className="mt-4 text-ink-700/85 dark:text-white/70 leading-relaxed"><Localized>Understand how rooms connect, how furniture fits and how everyday life flows through your home before construction begins.</Localized></p>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-ink-900/10 shadow-sm">
                    <Image src="/assets/client/3d-floor-plan.webp" alt="Three-dimensional floor plan showing room layouts, circulation and furniture placement" width={671} height={502} className="w-full h-auto" />
                  </div>
                </div>
              </div>
            </Container>
          </section>
          <ContactCta />
        </ContinuousPaintReveal>
      </main>
      <Footer />
    </>
  );
}
