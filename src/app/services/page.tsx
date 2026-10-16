"use client";
import { Localized, useLanguage } from "@/providers/LanguageProvider";


import { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactCta } from "@/components/sections/ContactCta";
import { Container } from "@/components/layout/Container";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { PROCESS, PROJECTS, STATS, SERVICES } from "@/data/site";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { ContinuousPaintReveal } from "@/components/ui/ContinuousPaintReveal";

const PAGE_SERVICES = [...SERVICES, { icon: "DraftingCompass", title: "Project Supervision & Drawings", description: "Regular site supervision, working drawings, structural coordination and approval drawings." }];

const FAQS = [
  { q: "How long does a typical project take?", a: "Project timelines vary based on scale and complexity. A standard residential design-build project typically takes 8-12 months from concept to final handover, while commercial or larger projects may take longer." },
  { q: "Do you handle approvals and permits?", a: "Yes, our team assists with all necessary municipal approvals and structural planning required to get your project moving efficiently." },
  { q: "What areas do you serve?", a: "We are based in Madurai and take on projects across Tamil Nadu, bringing our 25+ years of expertise to a wide variety of locations." },
  { q: "Do you offer interior-only projects?", a: "Absolutely. We provide bespoke interior design and styling services independent of our architectural and build services." }
];

function ServicesHeroLeft({ variant }: { variant: "dark" | "color" }) {
  const isDark = variant === "dark";
  const { language } = useLanguage();
  const isTamil = language === "ta";

  return (
    <div className="flex flex-col items-start w-full">
      <h1
        className={`font-serif tracking-tight max-w-2xl mb-2.5 sm:mb-6 ${isTamil
          ? "text-[19px] min-[360px]:text-[21px] sm:text-[24px] lg:text-[26px] leading-[1.3] font-medium"
          : "text-2xl min-[360px]:text-3xl sm:text-5xl lg:text-[72px] font-normal leading-[1.1]"
          }`}
      >
        <span className="font-serif font-light text-nature-700 dark:text-nature-400"><Localized>
          From Your Idea to
        </Localized></span><br />
        <span className="italic font-light block mt-1 sm:mt-2 text-nature-700 dark:text-nature-400"><Localized>
          Your Dream Space.
        </Localized></span>
      </h1>

      <p className={`text-xs min-[360px]:text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-xl font-light mb-3 sm:mb-10 ${isDark ? "text-white/80" : "text-ink-700"}`}><Localized>
        We bring precision, creativity, and efficient execution to every stage of building, transforming concepts into timeless, performative landmarks.
      </Localized></p>

      {/* Mobile Visual below description */}
      <div className="block lg:hidden my-3 sm:my-6 w-full flex justify-center">
        <ServicesHeroRight variant={variant} isMobile />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
        <Link
          href="#contact"
          className={`inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 font-semibold text-xs sm:text-[15px] rounded-full transition-all shadow-sm text-center ${isDark
            ? "bg-white/10 text-white/50 border border-white/10 hover:bg-white/20"
            : "bg-brand-600 text-white hover:bg-brand-700 hover:scale-105 shadow-md shadow-brand-500/20"
            }`}
        >
          <Localized>Explore Our Story</Localized> <ArrowRight className="h-4 w-4 shrink-0" />
        </Link>
        <Link
          href="/projects"
          className={`inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 font-medium text-xs sm:text-[15px] rounded-full transition-all text-center ${isDark
            ? "border border-white/10 text-white/40 hover:border-white/20"
            : "border border-ink-900/20 text-ink-950 hover:bg-nature-500/5 hover:border-nature-500/40 hover:text-nature-700"
            }`}
        >
          <Localized>View Projects</Localized> <ArrowRight className="h-4 w-4 shrink-0" />
        </Link>
      </div>
    </div>
  );
}

// Right Side Vertical Image in Liquid Glass Card (Layer 1 is B&W behind splash; Layer 2 is Color revealed by splash)
function ServicesHeroRight({ variant = "color", isMobile = false }: { variant?: "dark" | "color"; isMobile?: boolean }) {
  const isDark = variant === "dark";
  const filter = isDark ? "grayscale(100%) brightness(0.75)" : "none";
  return (
    <div
      style={{
        filter,
        width: isMobile ? "210px" : "100%",
        maxWidth: isMobile ? "210px" : "360px",
        margin: "0 auto",
      }}
      className="liquid-glass-card rounded-[22px] sm:rounded-[32px] p-2 sm:p-2.5 shadow-2xl relative overflow-hidden group transition-all duration-500 w-full"
    >
      <div className="liquid-sheen-sweep" />
      <div className="liquid-glass-bevel" />
      <div
        style={{
          width: "100%",
          height: isMobile ? "280px" : "auto",
          aspectRatio: "1054 / 1492",
        }}
        className="relative z-10 rounded-[16px] sm:rounded-[24px] overflow-hidden bg-[#030706]"
      >
        <Image
          src="/assets/service page hero.png"
          alt="Services Hero Architecture"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 420px"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });
  const smoothHeroProgress = useSpring(heroScrollYProgress, {
    stiffness: 180,
    damping: 20,
    restDelta: 0.001
  });
  // Starts from 0% at the very beginning and splashes outwards smoothly across the screen on scroll all the way to 750%
  const splashMaskSize = useTransform(smoothHeroProgress, [0, 0.55], ["0%", "750%"]);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
    layoutEffect: false
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      <main className="bg-transparent">

        {/* Services Hero with High-Contrast Paint Splash Reveal (Mobile & Desktop) */}
        <section id="services-hero" ref={containerRef} className="relative w-full h-[180vh] sm:h-[200vh] bg-transparent">
          <div className="sticky top-0 w-full min-h-[100svh] pt-20 sm:pt-28 lg:pt-32 pb-8 sm:pb-24 flex items-center justify-center overflow-hidden">

            {/* Layer 1: Dark Blueprint Base (Behind the Paint Splash - in Black & White) */}
            <div className="absolute inset-0 bg-[#020504] pt-20 sm:pt-28 lg:pt-24 xl:pt-28 pb-8 sm:pb-16 lg:pb-24 flex items-start lg:items-center justify-center overflow-hidden w-full">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(0,229,153,0.04)_0%,transparent_50%)] pointer-events-none" />
              <Container className="relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                  <ServicesHeroLeft variant="dark" />
                  <div className="hidden lg:block w-full lg:pt-6 xl:pt-8">
                    <ServicesHeroRight variant="dark" />
                  </div>
                </div>
              </Container>
            </div>

            {/* Layer 2: White & Vibrant Color Paint Splash Layer (Mobile & Desktop) */}
            <motion.div
              data-splash-overlay
              className="flex absolute inset-0 bg-white pt-20 sm:pt-28 lg:pt-24 xl:pt-28 pb-8 sm:pb-16 lg:pb-24 items-start lg:items-center justify-center overflow-hidden z-20"
              style={{
                WebkitMaskImage: "url('/splash.svg')",
                maskImage: "url('/splash.svg')",
                WebkitMaskPosition: "center center",
                maskPosition: "center center",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: splashMaskSize as any,
                maskSize: splashMaskSize as any,
                transform: "translateZ(0)"
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(0,229,153,0.06)_0%,transparent_50%)] pointer-events-none" />
              <Container className="relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                  <ServicesHeroLeft variant="color" />
                  <div className="hidden lg:block w-full lg:pt-6 xl:pt-8">
                    <ServicesHeroRight variant="color" />
                  </div>
                </div>
              </Container>
            </motion.div>

          </div>
        </section>

        {/* Subsequent Sections with Continuous Paint Reveal */}
        <ContinuousPaintReveal>
          {/* Our Services Grid */}
          <section className="py-24 bg-transparent">
            <Container>
              <div className="mb-16">
                <span className="mb-4 inline-block text-sm font-medium tracking-widest text-ink-600 uppercase"><Localized>
                  OUR SERVICES
                </Localized></span>
                <h2 className="text-4xl sm:text-5xl font-medium text-ink-900 dark:text-white max-w-2xl"><Localized>
                  Expertise across the spectrum.
                </Localized></h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {PAGE_SERVICES.map((service, i) => (
                  <ServiceCard
                    key={service.title}
                    {...service}
                    index={i + 1}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </Container>
          </section>

          {/* Pinned Process Timeline */}
          <section className="py-32 bg-transparent relative overflow-hidden transition-colors duration-500" ref={timelineRef}>
            <Container>
              <Reveal className="text-center">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-3.5 py-1 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-brand-700 dark:text-brand-300 font-bold">
                  <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                  <Localized>METHODOLOGY</Localized>
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-ink-950 dark:text-white mb-6">
                  <Localized>Our </Localized><span className="italic font-light text-nature-700 dark:text-nature-400"><Localized>Process.</Localized></span>
                </h2>
                <p className="text-sm sm:text-base text-ink-700/80 dark:text-white/60 max-w-2xl mx-auto leading-relaxed mb-24 transition-colors"><Localized>
                  A seamless journey from initial concept to the final handover, ensuring quality at every step.
                </Localized></p>
              </Reveal>

              <div className="relative max-w-5xl mx-auto pb-24">

                {/* === PROGRESS INDICATOR === */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-ink-900/10 z-0 transition-colors" />

                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] z-10 pointer-events-none">
                  {/* The main filled progress line (Red to Nature Green gradient) */}
                  <motion.div
                    className="absolute top-0 w-full"
                    style={{
                      height: progressHeight,
                      background: `linear-gradient(to bottom, #e03e3e, #39965a)`,
                    }}
                  />

                  {/* The traveling indicator */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ top: progressHeight }}
                  >
                    <motion.div
                      className="w-4 h-4 rounded-full bg-brand-600 shadow-[0_0_12px_rgba(224,62,62,0.8)]"
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>

                {/* TIMELINE ITEMS */}
                <div className="relative z-20 flex flex-col gap-12 md:gap-24">
                  {PROCESS.map((step, index) => {
                    const isEven = index % 2 === 0;
                    const isGreen = index % 2 === 0;
                    return (
                      <div key={step.step} className={`flex flex-col md:flex-row items-center relative group ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                        {/* Visual Step Illustration Card */}
                        <motion.div
                          className={`hidden md:block md:w-1/2 ${isEven ? 'md:pr-10 lg:pr-16' : 'md:pl-10 lg:pl-16'}`}
                          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
                        >
                          <div className={`liquid-glass-card rounded-2xl p-2.5 relative overflow-hidden group shadow-md aspect-[16/10] w-full max-w-md mx-auto ${
                            isGreen ? "border-nature-500/20" : "border-brand-500/20"
                          }`}>
                            <div className="liquid-sheen-sweep" />
                            <div className="liquid-glass-bevel" />
                            <div className="relative z-10 w-full h-full rounded-xl overflow-hidden">
                              <Image
                                src={`/assets/step${index + 1}.png`}
                                alt={step.title}
                                fill
                                sizes="(min-width: 1024px) 450px, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                            </div>
                          </div>
                        </motion.div>

                        {/* Center Node / Dot with Green/Red Accents */}
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-12 h-12 z-30">
                          <div className={`w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-500 group-hover:scale-125 ${
                            isGreen
                              ? "border-nature-600 group-hover:bg-nature-600 shadow-[0_0_10px_rgba(57,150,90,0.5)]"
                              : "border-brand-600 group-hover:bg-brand-600 shadow-[0_0_10px_rgba(224,62,62,0.5)]"
                          }`} />
                        </div>

                        {/* Content Card with Alternating Green / Red Accents */}
                        <motion.div
                          className={`w-full md:w-1/2 ${isEven ? 'md:pl-10 lg:pl-16' : 'md:pr-10 lg:pr-16'}`}
                          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
                        >
                          <div className={`liquid-glass-card rounded-2xl p-8 relative overflow-hidden group shadow-sm transition-all duration-500 hover:-translate-y-1 ${
                            isGreen ? "border-nature-500/20" : "border-brand-500/20"
                          }`}>
                            <div className="liquid-sheen-sweep" />
                            <div className="liquid-glass-bevel" />
                            <div className="relative z-10">
                              <span className={`inline-block font-mono font-bold text-[11px] sm:text-xs tracking-widest mb-4 px-3 py-1.5 rounded-md border ${
                                isGreen
                                  ? "text-nature-700 dark:text-nature-300 bg-nature-500/10 border-nature-500/20"
                                  : "text-brand-700 dark:text-brand-300 bg-brand-500/10 border-brand-500/20"
                              }`}>
                                <Localized>STEP </Localized><Localized>{step.step}</Localized>
                              </span>
                              <h3 className={`text-2xl font-serif font-normal text-ink-950 dark:text-white mb-3 transition-colors ${
                                isGreen ? "group-hover:text-nature-700" : "group-hover:text-brand-600"
                              }`}>
                                <Localized>{step.title}</Localized>
                              </h3>
                              <p className="text-sm sm:text-base text-ink-700/90 dark:text-white/60 leading-relaxed transition-colors"><Localized>{step.description}</Localized></p>
                            </div>
                          </div>
                        </motion.div>

                      </div>
                    );
                  })}
                </div>

              </div>
            </Container>
          </section>

          {/* Why Choose Us Strip (Alternating Red and Green metrics) */}
          <section className="py-16 sm:py-24 bg-transparent transition-colors duration-500">
            <Container>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {STATS.map((stat, idx) => {
                  const isGreen = idx % 2 === 0;
                  return (
                    <Reveal key={stat.label} delay={idx * 0.1}>
                      <div className={`liquid-glass-card rounded-2xl p-6 sm:p-7 h-full flex flex-col justify-center relative overflow-hidden group shadow-sm ${
                        isGreen ? "border-nature-500/20" : "border-brand-500/20"
                      }`}>
                        <div className="liquid-sheen-sweep" />
                        <div className="liquid-glass-bevel" />
                        <div className="relative z-10">
                          <span className={`text-3xl sm:text-4xl md:text-5xl font-serif mb-2 block ${
                            isGreen ? "text-nature-700 dark:text-nature-400" : "text-brand-600 dark:text-brand-400"
                          }`}>
                            <Localized>{stat.value}</Localized>
                          </span>
                          <span className="text-[11px] sm:text-xs text-ink-700 dark:text-white/70 uppercase tracking-widest font-mono font-medium leading-relaxed break-words block"><Localized>{stat.label}</Localized></span>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </Container>
          </section>

          {/* Visual Project References tied to Services */}
          <section className="py-24 bg-transparent">
            <div className="mx-auto w-full max-w-[120rem] px-4 sm:px-6 lg:px-8 xl:px-10">
              <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12 sm:mb-16">
                <Reveal>
                  <span className="mb-3 inline-block text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-ink-600 font-bold"><Localized>
                    PORTFOLIO HIGHLIGHTS
                  </Localized></span>
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-ink-950 dark:text-white"><Localized>
                    Services in </Localized><span className="italic font-light text-ink-700 dark:text-white/60"><Localized>Action.</Localized></span>
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-ink-700/80 dark:text-white/60 max-w-md"><Localized>
                    Explore how our architectural expertise and creative vision shape real-world environments.
                  </Localized></p>
                </Reveal>
                <Reveal delay={0.2}>
                  <Link href="/projects" className="inline-flex items-center gap-2 text-ink-900 font-semibold pb-2 border-b border-ink-900/40 hover:border-ink-900 transition-colors"><Localized>
                    View All Projects </Localized><ArrowRight className="h-4 w-4" />
                  </Link>
                </Reveal>
              </div>

              <div className="w-full">
                <ProjectCarousel projects={PROJECTS.filter(p => p.cover === 'built' || p.categories.includes('Architecture Design')).slice(0, 6).map((project, idx) => ({
                  id: String(idx),
                  name: project.title,
                  category: project.categories[0],
                  image: `/assets/projects/${project.slug}/${project.cover}`,
                  slug: project.slug,
                }))} />
              </div>
            </div>
          </section>

          {/* Craftsmanship & Living Spaces Showcase */}
          <section className="py-24 bg-transparent border-t border-ink-900/10 dark:border-white/10">
            <Container>
              <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                <Reveal>
                  <span className="mb-3 inline-block text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-ink-600 font-bold">
                    <Localized>REALIZED CRAFTSMANSHIP</Localized>
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-ink-950 dark:text-white">
                    <Localized>Spaces Crafted to </Localized>
                    <span className="italic font-light text-ink-700 dark:text-white/60"><Localized>Perfection.</Localized></span>
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-ink-700/80 dark:text-white/60 max-w-xl">
                    <Localized>Take a close look at our on-site execution, interior styling, and structural detailing across residential and commercial developments.</Localized>
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-ink-900/15 dark:border-white/20 text-xs sm:text-sm font-medium text-ink-950 dark:text-white bg-white/50 dark:bg-black/30 backdrop-blur-sm hover:bg-ink-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  >
                    <Localized>View Full Gallery</Localized> <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Reveal>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Anandha Nilayam — Studio & Residence",
                    category: "Architecture & Interior",
                    location: "Ellis Nagar, Madurai",
                    image: "/assets/client/gallery-anandha-nilayam-interior.webp",
                    link: "/projects/ar-senthil-residence"
                  },
                  {
                    title: "Mr. Ganesh Kumar’s Residence",
                    category: "Exterior Architecture",
                    location: "Nagamalai Pudhukottai",
                    image: "/assets/client/gallery-ganesh-kumar-exterior.webp",
                    link: "/projects/mr-ganesh-kumar-residence"
                  },
                  {
                    title: "Mr. Vengatesh Advocate’s Residence",
                    category: "Design + Build",
                    location: "Kadachanendal, Madurai",
                    image: "/assets/client/gallery-vengatesh-elevation.webp",
                    link: "/projects/mr-vengatesh-residence"
                  },
                  {
                    title: "Vengatesh Residence — Floating Staircase",
                    category: "Interior Styling",
                    location: "Kadachanendal, Madurai",
                    image: "/assets/client/gallery-vengatesh-interior.webp",
                    link: "/projects/mr-vengatesh-residence"
                  },
                  {
                    title: "Kids Bedroom & Study Space",
                    category: "Custom Interior",
                    location: "Madurai",
                    image: "/assets/client/gallery-interior-kids-room.webp",
                    link: "/gallery"
                  },
                  {
                    title: "Modern Family Dining Space",
                    category: "Interior Styling",
                    location: "Madurai",
                    image: "/assets/client/gallery-interior-dining.webp",
                    link: "/gallery"
                  }
                ].map((item, idx) => {
                  const isGreen = idx % 2 === 0;
                  return (
                    <Reveal key={item.title} delay={idx * 0.08} width="100%" className="h-full w-full">
                      <Link href={item.link} className="block group h-full w-full">
                        <div className={`liquid-glass-card rounded-2xl p-3 relative overflow-hidden group shadow-sm transition-all duration-500 hover:-translate-y-1 h-full w-full flex flex-col justify-between ${
                          isGreen ? "border-nature-500/20" : "border-brand-500/20"
                        }`}>
                          <div className="liquid-sheen-sweep" />
                          <div className="liquid-glass-bevel" />
                          <div className="relative z-10 aspect-[4/3] w-full rounded-xl overflow-hidden mb-3.5 bg-black/5 shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-mono font-medium text-white ${
                              isGreen ? "bg-nature-700/90 shadow-sm" : "bg-brand-700/90 shadow-sm"
                            }`}>
                              <Localized>{item.category}</Localized>
                            </div>
                          </div>
                          <div className="relative z-10 px-1 pb-1 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className={`font-serif text-base sm:text-lg font-medium text-ink-950 dark:text-white transition-colors line-clamp-2 min-h-[3rem] flex items-center ${
                                isGreen ? "group-hover:text-nature-700" : "group-hover:text-brand-600"
                              }`}>
                                <Localized>{item.title}</Localized>
                              </h3>
                              <p className="text-xs text-ink-600 dark:text-white/60 mt-1 font-mono">
                                <Localized>{item.location}</Localized>
                              </p>
                            </div>
                            <div className={`mt-4 flex items-center gap-1.5 text-xs font-semibold group-hover:translate-x-1 transition-transform ${
                              isGreen ? "text-nature-700 dark:text-nature-400" : "text-brand-600 dark:text-brand-400"
                            }`}>
                              <Localized>View Details</Localized> <ArrowRight className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </Container>
          </section>

          {/* FAQ Section */}
          <section className="py-32 bg-transparent relative overflow-hidden">
            <Container className="relative z-10">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                <div className="lg:col-span-5">
                  <Reveal>
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-nature-500/25 bg-nature-500/10 px-3.5 py-1 text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-nature-700 dark:text-nature-300 font-bold">
                      <span className="h-2 w-2 rounded-full bg-nature-500 animate-pulse" />
                      <Localized>FAQ</Localized>
                    </span>
                    <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-ink-950 dark:text-white mb-6">
                      <Localized>Common </Localized><br />
                      <span className="italic font-light text-brand-600 dark:text-brand-400"><Localized>Inquiries.</Localized></span>
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-ink-700/80 dark:text-white/60 max-w-md"><Localized>
                      Clear answers to help you understand our design-build process and how we can bring your architectural vision to life.
                    </Localized></p>
                  </Reveal>
                </div>

                <div className="lg:col-span-7 flex flex-col gap-4">
                  {FAQS.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <Reveal key={idx} delay={idx * 0.1}>
                        <div className={`liquid-glass-card rounded-2xl overflow-hidden relative group transition-all duration-300 ${isOpen ? 'shadow-md border-ink-900/30' : ''}`}>
                          <div className="liquid-sheen-sweep" />
                          <div className="liquid-glass-bevel" />
                          <div className="relative z-10">
                            <button
                              onClick={() => setOpenFaq(isOpen ? null : idx)}
                              className="flex w-full items-center justify-between p-6 sm:p-8 text-left group"
                            >
                              <span className={`text-base sm:text-lg font-medium pr-8 transition-colors ${isOpen ? 'text-ink-950 font-semibold' : 'text-ink-900 group-hover:text-black'}`}>
                                <Localized>{faq.q}</Localized>
                              </span>
                              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-ink-950 text-white rotate-45' : 'bg-ink-900/10 text-ink-900 group-hover:bg-ink-950 group-hover:text-white'}`}>
                                <Plus className="h-4 w-4" />
                              </span>
                            </button>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                  <div className="px-6 sm:px-8 pb-8">
                                    <div className="h-px w-full bg-ink-900/10 dark:bg-white/10 mb-6" />
                                    <p className="text-sm sm:text-base leading-relaxed text-ink-700/90 dark:text-white/70">
                                      <Localized>{faq.a}</Localized>
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
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
