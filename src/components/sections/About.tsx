"use client";

import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { JourneyLayers } from "@/components/sections/JourneyLayers";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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

const ABOUT_PROCESS = [
  { step: "01", title: "Concept", description: "Understanding the requirements and creating the initial conceptual vision.", icon: Lightbulb },
  { step: "02", title: "Design", description: "Detailed development of the design integrating engineering principles.", icon: PenTool },
  { step: "03", title: "Build", description: "Precision execution and project supervision with quality materials.", icon: Hammer },
  { step: "04", title: "Handover", description: "Final inspection and handing over the living architecture to the client.", icon: CheckCircle2 },
];

const ADDITIONAL_TEAM = [
  { name: "Senior Architect", role: "Design Lead" },
  { name: "Project Manager", role: "Operations" },
  { name: "Interior Designer", role: "Interiors" },
  { name: "Civil Engineer", role: "Structural" },
];

const EXTRA_STATS = [
  { value: "19+", label: "Years of Experience" },
  { value: "150+", label: "Projects Completed" },
  { value: "200+", label: "Happy Clients" },
  { value: "25+", label: "Team Members" },
];

export function About() {
  return (
    <div className="bg-white dark:bg-[#020504] transition-colors duration-500 overflow-hidden" id="about">
      {/* 1. HERO - Architecture Theme */}
      <section className="relative w-full min-h-[100svh] flex items-center justify-center pt-32 pb-12 overflow-hidden bg-ink-50 dark:bg-[#030706] transition-colors duration-500">

        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(0,229,153,0.05)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(0,229,153,0.08)_0%,transparent_50%)] pointer-events-none" />

        <Container className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

          {/* Left Column: Content */}
          <div className="flex-1 flex flex-col justify-center w-full max-w-xl z-20 pt-10 lg:pt-0">

            {/* Eyebrow badge (Matching exact outline style) */}
            <FadeIn className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-xs font-mono uppercase tracking-widest font-semibold text-brand-600 dark:text-[#00E599] border border-brand-500/30 bg-brand-500/5 dark:bg-[#00E599]/[0.02]">
                <Compass className="w-3.5 h-3.5" />
                01 / ABOUT • OUR VISION
              </span>
            </FadeIn>

            {/* Stage Headline */}
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-serif text-ink-950 dark:text-white leading-[1.05] tracking-tight">
                Built On Vision,
                <br />
                <span className="font-light italic text-brand-600 dark:text-[#00E599] tracking-normal">
                  Not Just Blueprints.
                </span>
              </h1>
            </FadeIn>

            {/* Stage Description Narrative */}
            <FadeIn delay={0.2}>
              <p className="mt-6 text-sm lg:text-base leading-relaxed text-ink-700 dark:text-white/70 max-w-lg font-light">
                A premier architectural consultancy and design-build practice dedicated to transforming concepts into timeless, performative landmarks.
              </p>
            </FadeIn>

            {/* Buttons (Solid Mint + Outline) */}
            <FadeIn delay={0.3} className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="#story"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00E599] text-[#020504] text-sm font-semibold hover:bg-[#00E599]/90 transition-all hover:scale-105"
              >
                Explore Our Story <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:border-[#00E599]/50 hover:bg-[#00E599]/5 hover:text-[#00E599] transition-all"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>

          {/* Right Column: 3D Floating Image with Accents */}
          <div className="flex-1 relative w-full h-[55vh] sm:h-[65vh] lg:h-[80vh] z-10 mt-16 lg:mt-0">

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

            {/* Glowing Floor / Shadow under the floating house */}
            <div className="absolute bottom-[5%] lg:bottom-[15%] left-1/2 -translate-x-1/2 w-[60%] h-[20px] rounded-full bg-[#00E599]/20 blur-2xl" />
            <div className="absolute bottom-[5%] lg:bottom-[15%] left-1/2 -translate-x-1/2 w-[30%] h-[10px] rounded-full bg-[#00E599]/40 blur-xl" />

            <FadeIn direction="up" delay={0.2} className="w-full h-full relative z-10">
              {/* Parent handles scaling to avoid transform conflicts */}
              <div className="relative w-full h-full scale-[1.15] lg:scale-[1.25] origin-center">
                {/* Child handles the continuous floating animation */}
                <motion.div
                  className="relative w-full h-full"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/images/architecture_image.png"
                    alt="Floating Architecture"
                    fill
                    className="object-contain object-center drop-shadow-[0_20px_50px_rgba(0,229,153,0.15)]"
                    priority
                  />
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
      {/* 2. OUR STORY - 3D Isometric Journey */}
      <JourneyLayers />

      {/* 3. NUMBERS / STATS STRIP */}
      <section className="py-12 sm:py-16 bg-ink-50/40 dark:bg-ink-900/20 border-y border-ink-900/5 dark:border-white/5">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {EXTRA_STATS.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="flex flex-col justify-center gap-3 rounded-2xl border border-ink-900/5 bg-white/50 p-6 text-center dark:border-white/5 dark:bg-white/[0.04]">
                <span className="text-3xl sm:text-4xl font-serif text-ink-950 dark:text-white">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-ink-500 dark:text-white/50">
                  {stat.label}
                </span>
              </FadeIn>
            ))}
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
            description="The 10 core tenets that guide every architectural endeavor at Senthil Associates."
          />

          <div className="mt-16 max-w-4xl mx-auto">
            <FadeIn className="liquid-glass-card rounded-3xl p-6 sm:p-10">
              <div className="liquid-sheen-sweep" />
              <div className="liquid-glass-bevel" />

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {ARCHITECT.philosophy.map((phil, pIdx) => (
                  <div
                    key={phil}
                    className="flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3 text-sm font-medium text-ink-900 shadow-sm border border-ink-900/5 transition-all hover:border-nature-500/30 hover:bg-white dark:bg-white/[0.04] dark:border-white/5 dark:text-white/90"
                  >
                    <span className="font-mono text-xs font-bold text-nature-600 dark:text-nature-400">
                      0{pIdx + 1}
                    </span>
                    <span className="truncate">{phil}</span>
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-nature-600/50 dark:text-nature-400/50 ml-auto" />
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 5. PROCESS */}
      <section className="py-24 sm:py-32 bg-ink-50/40 dark:bg-ink-950/60 transition-colors duration-500">
        <Container>
          <SectionHeading
            eyebrow="Our Process"
            title="From Concept to Living Architecture"
            align="center"
            description="A structured 4-stage architectural workflow designed for precision, transparent communication, and flawless execution."
          />

          <div className="relative mt-16 sm:mt-20">
            <div className="pointer-events-none absolute top-14 left-10 right-10 hidden h-px bg-nature-500/20 lg:block dark:bg-nature-500/20" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ABOUT_PROCESS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <FadeIn
                    key={item.step}
                    delay={i * 0.1}
                    className="liquid-glass-card rounded-3xl group flex flex-col justify-between p-6 sm:p-7 cursor-default"
                  >
                    <div className="liquid-sheen-sweep" />
                    <div className="liquid-glass-bevel" />
                    <div>
                      <div className="relative z-10 flex items-center justify-between mb-6">
                        <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-white/85 dark:bg-white/10 text-sm font-mono font-bold text-nature-700 dark:text-nature-300 border border-nature-500/25 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:bg-nature-500 group-hover:text-white group-hover:border-nature-500">
                          {item.step}
                        </span>
                        <span className="p-2 rounded-sm bg-ink-900/[0.03] dark:bg-white/5 text-ink-500 dark:text-white/40 group-hover:text-nature-600 dark:group-hover:text-nature-400 transition-colors">
                          <Icon className="h-5 w-5" />
                        </span>
                      </div>

                      <h3 className="relative z-10 font-serif text-xl sm:text-2xl font-normal text-ink-950 dark:text-white group-hover:text-nature-700 dark:group-hover:text-nature-400 transition-colors">
                        {item.title}
                      </h3>

                      <p className="relative z-10 mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-700/80 dark:text-white/65">
                        {item.description}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 pt-3.5 border-t border-dashed border-ink-900/10 dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-ink-500 dark:text-white/40">
                      <span>STAGE {item.step}</span>
                      <span className="text-nature-600 dark:text-nature-400 font-semibold">WORKFLOW</span>
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

          <div className="mt-16 max-w-4xl mx-auto">
            {/* Lead Architect Card (Reusing exact profile card style) */}
            <FadeIn className="liquid-glass-card rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="liquid-sheen-sweep" />
              <div className="liquid-glass-bevel" />



              <div className="relative z-10 flex-1 flex flex-col justify-center h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-ink-950 dark:text-white">
                      {ARCHITECT.name}
                    </h3>
                    <p className="text-xs font-mono text-nature-700 dark:text-nature-400 font-semibold tracking-wider uppercase mt-0.5">
                      Principal Architect &amp; Founder
                    </p>
                  </div>
                  <span className="rounded-sm bg-nature-500/15 p-2.5 text-nature-700 dark:text-nature-400 border border-nature-500/25 hidden sm:block">
                    <Sparkles className="h-5 w-5" />
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-700/80 dark:text-white/70">
                  With {ARCHITECT.experience.toLowerCase()} Ar. Senthil graduated from Thiagarajar College of Engineering and RVS School of Architecture. After senior roles with premier architecture firms, he founded Senthil Associates in 2005 to champion contextually responsive, performative architecture.
                </p>

                <div className="mt-6 pt-4 border-t border-dashed border-ink-900/10 dark:border-white/10 flex items-center justify-between text-xs font-mono text-ink-500 dark:text-white/60">
                  <span>MADURAI, TN</span>
                  <span className="inline-flex items-center gap-1 text-nature-700 dark:text-nature-400 font-bold hover:underline cursor-pointer">
                    <span>Full Monograph</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Grid of additional team members */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {ADDITIONAL_TEAM.map((member, i) => (
                <FadeIn key={member.name} delay={i * 0.1} className="flex flex-col items-center text-center group">

                  <h4 className="font-serif text-base font-medium text-ink-950 dark:text-white">
                    {member.name}
                  </h4>
                  <p className="text-[11px] font-mono text-ink-500 dark:text-white/50 uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>



      {/* 8. CTA BANNER */}
      <section className="py-24 sm:py-32">
        <Container>
          <FadeIn className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-700 dark:text-brand-300 mb-6">
              <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              Start a Conversation
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-ink-950 dark:text-white leading-[1.15] mb-8">
              Ready to transform your vision into
              <br className="hidden sm:inline" />{" "}
              <span className="italic font-serif font-light text-nature-700 dark:text-nature-400">
                living architecture?
              </span>
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button href="#contact" variant="primary" className="text-sm px-6 py-3">
                Get a Quote
              </Button>
              <Button href="#contact" variant="outline" className="text-sm px-6 py-3">
                Contact Us
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

    </div>
  );
}
