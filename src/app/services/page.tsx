"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactCta } from "@/components/sections/ContactCta";
import { Container } from "@/components/layout/Container";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { PROCESS, PROJECTS, STATS } from "@/data/site";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ServiceCard } from "@/components/sections/ServiceCard";

const PAGE_SERVICES = [
  { icon: "Compass", title: "Architectural Design & Planning", description: "Concept design, master planning, and structural approvals." },
  { icon: "Sofa", title: "Interior Design & Styling", description: "Space planning, material selection, and custom interiors." },
  { icon: "Building2", title: "Design + Build (Turnkey Execution)", description: "End-to-end delivery from initial concept to final handover." },
  { icon: "DraftingCompass", title: "Project Supervision & Drawings", description: "Regular site supervision, working drawings, and detailing." }
];

const FAQS = [
  { q: "How long does a typical project take?", a: "Project timelines vary based on scale and complexity. A standard residential design-build project typically takes 8-12 months from concept to final handover, while commercial or larger projects may take longer." },
  { q: "Do you handle approvals and permits?", a: "Yes, our team assists with all necessary municipal approvals and structural planning required to get your project moving efficiently." },
  { q: "What areas do you serve?", a: "We are based in Madurai and take on projects across Tamil Nadu, bringing our 19+ years of expertise to a wide variety of locations." },
  { q: "Do you offer interior-only projects?", a: "Absolutely. We provide bespoke interior design and styling services independent of our architectural and build services." }
];

export default function ServicesPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
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
      <main className="bg-white dark:bg-ink-950">
        
        {/* Services Hero */}
        <section className="pt-32 pb-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="mb-6 inline-block text-sm font-medium tracking-widest text-brand-500 uppercase">
                  What We Do
                </span>
                <h1 className="font-sans text-5xl sm:text-7xl font-medium leading-[1.05] tracking-tight text-ink-900 dark:text-white max-w-2xl mb-8">
                  <SplitText text="From Your Idea to Your Dream Space" />
                </h1>
                <Reveal delay={0.2}>
                  <p className="text-xl text-ink-700/80 dark:text-white/70 max-w-xl">
                    We bring precision, creativity, and efficient execution to every stage of building.
                  </p>
                </Reveal>
              </div>

              {/* Right Side Video */}
              <Reveal delay={0.4} className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-ink-900/10 dark:border-white/10">
                <video 
                  src="/assets/service%20page.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ink-950/5 pointer-events-none" />
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Our Services Grid */}
        <section className="py-24 bg-ink-900/[0.02] dark:bg-ink-900/40">
          <Container>
            <div className="mb-16">
              <span className="mb-4 inline-block text-sm font-medium tracking-widest text-brand-500 uppercase">
                ● OUR SERVICES
              </span>
              <h2 className="text-4xl sm:text-5xl font-medium text-ink-900 dark:text-white max-w-2xl">
                Expertise across the spectrum.
              </h2>
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
        <section className="py-32 bg-ink-50 dark:bg-ink-950 relative overflow-hidden transition-colors duration-500" ref={timelineRef}>
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-brand-500/10 dark:bg-brand-500/5 blur-[120px] pointer-events-none" />

          <Container>
            <Reveal>
              <h2 className="text-4xl sm:text-5xl font-medium text-ink-950 dark:text-white mb-6 text-center transition-colors">
                Our Process
              </h2>
              <p className="text-lg text-ink-700 dark:text-white/60 max-w-2xl mx-auto text-center mb-24 transition-colors">
                A seamless journey from initial concept to the final handover.
              </p>
            </Reveal>
            
            <div className="relative max-w-5xl mx-auto pb-24">
              
              {/* === ENHANCED PROGRESS INDICATOR === */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-ink-900/10 dark:bg-white/10 z-0 transition-colors" />
              
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] z-10 pointer-events-none">
                {/* The main filled progress line */}
                <motion.div
                  className="absolute top-0 w-full"
                  style={{
                    height: progressHeight,
                    background: `linear-gradient(to bottom, #00E599, #059669)`,
                    boxShadow: `0 0 15px rgba(0,229,153,0.5), 0 0 25px rgba(5,150,105,0.3)`,
                  }}
                />
                
                {/* The traveling glow "comet" */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ top: progressHeight }}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full bg-brand-500"
                    style={{
                      boxShadow: `0 0 15px 4px rgba(0, 229, 153, 0.6), 0 0 25px 8px rgba(5, 150, 105, 0.4)`
                    }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>

              {/* TIMELINE ITEMS */}
              <div className="relative z-20 flex flex-col gap-12 md:gap-24">
                {PROCESS.map((step, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div key={step.step} className={`flex flex-col md:flex-row items-center relative group ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      
                      {/* Empty space for alternating layout */}
                      <div className="hidden md:block md:w-1/2" />
                      
                      {/* Center Node / Dot */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-12 h-12 z-30">
                        <div className="w-4 h-4 rounded-full border-2 border-brand-500 bg-ink-50 dark:bg-ink-950 flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:bg-brand-500 group-hover:shadow-[0_0_15px_rgba(0,229,153,0.5)]" />
                      </div>

                      {/* Content Card */}
                      <motion.div 
                        className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 lg:pr-24' : 'md:pl-16 lg:pl-24'}`}
                        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
                      >
                        <div className="bg-white dark:bg-ink-900/40 backdrop-blur-sm border border-ink-900/5 dark:border-white/10 rounded-2xl p-8 hover:border-brand-500/30 transition-colors duration-500 hover:bg-ink-50 dark:hover:bg-ink-900/60 shadow-sm dark:shadow-xl group-hover:-translate-y-1 transform">
                          <span className="inline-block text-brand-500 font-mono font-bold text-lg mb-3 bg-brand-500/10 px-3 py-1 rounded-md">
                            STEP {step.step}
                          </span>
                          <h3 className="text-2xl font-medium text-ink-950 dark:text-white mb-4 transition-colors">{step.title}</h3>
                          <p className="text-ink-700 dark:text-white/60 leading-relaxed transition-colors">{step.description}</p>
                        </div>
                      </motion.div>
                      
                    </div>
                  );
                })}
              </div>

            </div>
          </Container>
        </section>

        {/* Why Choose Us Strip */}
        <section className="py-24 bg-ink-100 dark:bg-ink-900 text-ink-950 dark:text-white transition-colors duration-500">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, idx) => (
                <Reveal key={stat.label} delay={idx * 0.1}>
                  <div className="flex flex-col border-l border-ink-900/20 dark:border-white/20 pl-6 h-full justify-center transition-colors">
                    <span className="text-4xl md:text-5xl font-serif text-brand-500 mb-2">{stat.value}</span>
                    <span className="text-sm text-ink-700 dark:text-white/70 uppercase tracking-widest leading-relaxed transition-colors">{stat.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Visual Project References tied to Services */}
        <section className="py-24 bg-ink-900/[0.02] dark:bg-ink-900/40">
          <Container>
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
              <Reveal>
                <h2 className="text-3xl font-medium text-ink-900 dark:text-white">Services in Action</h2>
                <p className="mt-4 text-ink-700/70 dark:text-white/60">See how our expertise shapes real environments.</p>
              </Reveal>
              <Reveal delay={0.2}>
                <Link href="/projects" className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-600 font-medium pb-2 border-b border-brand-500/30 hover:border-brand-500 transition-colors">
                  View All Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROJECTS.filter(p => p.cover === 'built' || p.categories.includes('Architecture Design')).slice(0, 4).map((project, idx) => (
                <Reveal key={project.title} delay={idx * 0.1}>
                  <Link href={`/projects/${project.slug}`} className="block group">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink-900/5 mb-4 shadow-lg">
                      <Image
                        src={`/assets/projects/${project.slug}/${project.cover}`}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%231a1a1a'%3E%3Crect width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-family='sans-serif' font-size='14'%3EPhoto Unavailable%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/20 transition-colors duration-300" />
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-brand-500 text-white text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full">
                          View Project
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-ink-900 dark:text-white mb-1 truncate group-hover:text-brand-500 transition-colors">{project.title}</h3>
                      <p className="text-sm text-ink-500 dark:text-ink-400 truncate">{project.categories[0]}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white dark:bg-ink-950">
          <Container>
            <div className="grid lg:grid-cols-2 gap-16">
              <Reveal>
                <h2 className="text-4xl sm:text-5xl font-medium text-ink-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                <p className="text-lg text-ink-700/80 dark:text-white/70 max-w-md">
                  Clear answers to help you understand our process and how we can bring your vision to life.
                </p>
              </Reveal>
              <div>
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border-b border-ink-900/10 dark:border-white/10 overflow-hidden">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="flex w-full items-center justify-between py-6 text-left group"
                    >
                      <span className="text-lg font-medium text-ink-900 dark:text-white group-hover:text-brand-500 transition-colors">{faq.q}</span>
                      <span className={`text-brand-500 transition-transform duration-300 shrink-0 ml-4 ${openFaq === idx ? 'rotate-45' : ''}`}>
                        <Plus className="h-5 w-5" />
                      </span>
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="pb-6 text-ink-700/80 dark:text-white/70">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
