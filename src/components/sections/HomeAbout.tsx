import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ARCHITECT, MISSION } from "@/data/site";
import { 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Landmark, 
  Compass, 
  CheckCircle2 
} from "lucide-react";

const IMAGES_4K = {
  atelier: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=95",
  blueprints: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
};

export function HomeAbout() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#fcfdfd] dark:bg-[#020504] overflow-hidden" id="about">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(0,229,153,0.02)_0%,transparent_50%)] pointer-events-none" />
      
      <Container className="relative z-10">
        
        {/* Luxury Typography Masthead */}
        <FadeIn className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-nature-800 dark:text-nature-400 font-bold">
              ABOUT THE STUDIO • EST. 2005
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight text-ink-950 dark:text-white">
            Rooted in Nature.
            <br />
            <span className="italic font-serif font-light text-nature-700 dark:text-nature-400">
              Crafted for the Unfolding Future.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-ink-700/80 dark:text-white/70 max-w-2xl font-light">
            A premier architectural consultancy and design-build practice in Madurai with over 19 years of dedicated practice, transforming concepts into timeless landmarks.
          </p>
        </FadeIn>

        {/* Main 2-Column Story Grid */}
        <div className="mt-14 sm:mt-18 grid gap-10 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column: 4K Atelier Visuals & Principal Architect Liquid Glass Card (5 cols) */}
          <FadeIn direction="left" className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Primary 4K Atelier Hero Image */}
            <div className="relative overflow-hidden rounded-3xl border border-ink-900/10 dark:border-white/10 shadow-2xl group">
              <div className="relative aspect-[4/5] w-full bg-ink-900/10 dark:bg-white/5">
                <Image
                  src={IMAGES_4K.atelier}
                  alt="Senthil Associates Architecture Studio Atelier"
                  fill
                  sizes="(min-width: 1024px) 450px, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Principal Architect Profile Card */}
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7">
              <div className="liquid-sheen-sweep" />
              <div className="liquid-glass-bevel" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-ink-950 dark:text-white">
                    {ARCHITECT.name}
                  </h3>
                  <p className="text-xs font-mono text-nature-700 dark:text-nature-400 font-semibold tracking-wider uppercase mt-0.5">
                    Principal Architect &amp; Founder
                  </p>
                </div>
                <span className="rounded-sm bg-nature-500/15 p-2.5 text-nature-700 dark:text-nature-400 border border-nature-500/25">
                  <Sparkles className="h-5 w-5" />
                </span>
              </div>
              <p className="relative z-10 mt-3.5 text-xs sm:text-sm leading-relaxed text-ink-700/80 dark:text-white/70">
                With {ARCHITECT.experience.toLowerCase()} Ar. Senthil graduated from Thiagarajar College of Engineering and RVS School of Architecture. After senior roles with premier architecture firms, he founded Senthil Associates in 2005 to champion contextually responsive, performative architecture.
              </p>
              
              <div className="relative z-10 mt-4 pt-3.5 border-t border-dashed border-ink-900/10 dark:border-white/10 flex items-center justify-between text-xs font-mono text-ink-500 dark:text-white/60">
                <span>MADURAI, TN</span>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 text-nature-700 dark:text-nature-400 font-bold hover:underline"
                >
                  <span>Full Monograph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Secondary 4K Technical Blueprint Card */}
            <div className="relative rounded-2xl overflow-hidden border border-ink-900/10 dark:border-white/10 shadow-md group">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={IMAGES_4K.blueprints}
                  alt="Architectural Drafting & Engineering Drawings"
                  fill
                  sizes="(min-width: 1024px) 450px, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

          </FadeIn>

          {/* Right Column: Liquid Glass Bento Cards for Credentials, Mission & Philosophy (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Top Row: Education & Associations Liquid Glass Bento */}
            <div className="grid gap-6 sm:grid-cols-2">
              
              {/* Education Card */}
              <FadeIn delay={0.1} className="liquid-glass-card rounded-3xl p-6 sm:p-7">
                <div className="liquid-sheen-sweep" />
                <div className="liquid-glass-bevel" />

                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/80 dark:bg-white/10 text-nature-700 dark:text-nature-400 border border-nature-500/25 shadow-sm">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-ink-950 dark:text-white">
                      Education
                    </h4>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ink-500 dark:text-white/40">
                      Academic Pedigree
                    </span>
                  </div>
                </div>
                <ul className="relative z-10 mt-5 space-y-3 text-xs leading-relaxed text-ink-700/80 dark:text-white/70">
                  {ARCHITECT.education.map((edu) => (
                    <li key={edu} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-nature-500" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>

              {/* Associations Card */}
              <FadeIn delay={0.15} className="liquid-glass-card rounded-3xl p-6 sm:p-7">
                <div className="liquid-sheen-sweep" />
                <div className="liquid-glass-bevel" />

                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/80 dark:bg-white/10 text-nature-700 dark:text-nature-400 border border-nature-500/25 shadow-sm">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-ink-950 dark:text-white">
                      Associations
                    </h4>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ink-500 dark:text-white/40">
                      Governance
                    </span>
                  </div>
                </div>
                <ul className="relative z-10 mt-5 space-y-3 text-xs leading-relaxed text-ink-700/80 dark:text-white/70">
                  {ARCHITECT.associations.map((assoc) => (
                    <li key={assoc} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-nature-500" />
                      <span>{assoc}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            {/* Mission Statements Bento */}
            <FadeIn delay={0.2} className="liquid-glass-card rounded-3xl p-6 sm:p-7">
              <div className="liquid-sheen-sweep" />
              <div className="liquid-glass-bevel" />

              <div className="relative z-10 flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/80 dark:bg-white/10 text-nature-700 dark:text-nature-400 border border-nature-500/25 shadow-sm">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-sm sm:text-base text-ink-950 dark:text-white">
                    Our Core Mission
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-nature-700 dark:text-nature-400">
                  4 Guiding Pillars
                </span>
              </div>
              <div className="relative z-10 grid gap-3 sm:grid-cols-2">
                {MISSION.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-ink-900/5 bg-white/50 p-3.5 dark:border-white/5 dark:bg-white/[0.04]"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-nature-600 dark:text-nature-400" />
                    <span className="text-xs sm:text-sm font-medium text-ink-900 dark:text-white/90">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Design Philosophy Grid */}
            <FadeIn delay={0.25} className="liquid-glass-card rounded-3xl p-6 sm:p-7">
              <div className="liquid-sheen-sweep" />
              <div className="liquid-glass-bevel" />

              <div className="relative z-10 flex items-center justify-between mb-5">
                <h4 className="font-serif text-xl sm:text-2xl font-normal text-ink-950 dark:text-white">
                  Design Philosophy
                </h4>
                <span className="text-xs font-mono text-nature-700 dark:text-nature-400 font-semibold">
                  10 Core Tenets
                </span>
              </div>
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ARCHITECT.philosophy.map((phil, pIdx) => (
                  <div
                    key={phil}
                    className="flex items-center gap-2.5 rounded-xl bg-white/70 px-3.5 py-2.5 text-xs font-medium text-ink-900 shadow-sm border border-ink-900/5 transition-all hover:border-nature-500/30 hover:bg-white dark:bg-white/[0.04] dark:border-white/5 dark:text-white/90"
                  >
                    <span className="font-mono text-[10px] font-bold text-nature-600 dark:text-nature-400">
                      0{pIdx + 1}
                    </span>
                    <span className="truncate">{phil}</span>
                  </div>
                ))}
              </div>

              {/* Callout Link to Full Monograph */}
              <div className="relative z-10 mt-5 pt-4 border-t border-dashed border-ink-900/10 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-ink-500 dark:text-white/50 font-mono">
                  Explore full architectural philosophy
                </span>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 font-mono font-bold text-nature-700 dark:text-nature-400 hover:underline"
                >
                  <span>Read The Full Monograph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </FadeIn>

          </div>
        </div>
      </Container>
    </section>
  );
}
