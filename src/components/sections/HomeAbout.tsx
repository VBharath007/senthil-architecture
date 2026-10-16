"use client";

import { Localized, useLanguage } from "@/providers/LanguageProvider";
import { StudioPhotographs } from "./StudioPhotographs";
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
  atelier: "/assets/homepge landscape img.png",
  blueprints: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
};

export function HomeAbout() {
  const { language } = useLanguage();
  const isTamil = language === "ta";

  return (
    <section className="relative w-full py-24 sm:py-32 bg-transparent overflow-hidden" id="about">
      <Container className="relative z-10">

        {/* Luxury Typography Masthead */}
        <FadeIn className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-nature-800 dark:text-nature-400 font-bold"><Localized>
              ABOUT THE STUDIO • EST. 2002
            </Localized></span>
          </div>

          <h2
            className={`font-serif font-normal tracking-tight text-ink-950 dark:text-white ${
              isTamil
                ? "text-[22px] sm:text-[24px] lg:text-[26px] leading-[1.35]"
                : "text-3xl sm:text-5xl lg:text-6xl leading-[1.12]"
            }`}
          >
            <Localized>Design Your Space Together.</Localized>
            <br />
            <span className="italic font-serif font-light text-nature-700 dark:text-nature-400">
              <Localized>Crafted for the Unfolding Future.</Localized>
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-ink-700/80 dark:text-white/70 max-w-2xl font-light"><Localized>
            Founded in 2002, Senthil Associates is a professional architectural consultancy in Madurai. We have designed and executed prestigious, challenging projects in Madurai, Sivakasi, Devakottai, Singampunari, Dindigul and Trichy. Our innovative and sustainable architectural solutions turn your vision into carefully planned, timeless spaces.
          </Localized></p>
        </FadeIn>

        <StudioPhotographs />

        {/* Main 2-Column Story Grid */}
        <div className="mt-14 sm:mt-18 grid gap-10 lg:grid-cols-12 lg:items-start">

          {/* Left Column: 4K Atelier Visuals & Principal Architect Liquid Glass Card (5 cols) */}
          <FadeIn direction="left" className="lg:col-span-5 flex flex-col gap-6">

            {/* Primary 4K Atelier Hero Image */}
            <div className="liquid-glass-card rounded-3xl p-2.5 shadow-2xl relative overflow-hidden group">
              <div className="liquid-sheen-sweep" />
              <div className="liquid-glass-bevel" />
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-ink-900/10 dark:bg-white/5 z-10">
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
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 relative overflow-hidden group shadow-md">
              <div className="liquid-sheen-sweep" />
              <div className="liquid-glass-bevel" />

              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-ink-950 dark:text-white">
                    <Localized>{ARCHITECT.name}</Localized>
                  </h3>
                  <p className="text-xs font-mono text-ink-600 dark:text-ink-400 font-semibold tracking-wider uppercase mt-0.5"><Localized>
                    Principal Architect &amp; Founder
                  </Localized></p>
                </div>
                <span className="rounded-sm bg-ink-900/5 p-2.5 text-ink-900 dark:text-white border border-ink-900/10">
                  <Sparkles className="h-5 w-5" />
                </span>
              </div>
              <p className="relative z-10 mt-3.5 text-xs sm:text-sm leading-relaxed text-ink-700/80 dark:text-white/70"><Localized>
                With </Localized><Localized>{ARCHITECT.experience.toLowerCase()}</Localized><Localized> Ar. Senthil graduated from Thiagarajar College of Engineering and RVS School of Architecture. After senior roles with premier architecture firms, he founded Senthil Associates in 2002 to champion contextually responsive, performative architecture.
              </Localized></p>

              <div className="relative z-10 mt-4 pt-3.5 border-t border-dashed border-ink-900/10 dark:border-white/10 flex items-center justify-between text-xs font-mono text-ink-500 dark:text-white/60">
                <span><Localized>MADURAI, TN</Localized></span>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 text-ink-950 dark:text-white font-bold hover:underline"
                >
                  <span><Localized>Full Monograph</Localized></span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Secondary 4K Technical Blueprint Card */}
            <div className="liquid-glass-card rounded-2xl p-2 shadow-md relative overflow-hidden group">
              <div className="liquid-sheen-sweep" />
              <div className="liquid-glass-bevel" />
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden z-10">
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

              {/* Education Card (Nature Green theme) */}
              <FadeIn delay={0.1} className="liquid-glass-card rounded-3xl p-6 sm:p-7 h-full flex flex-col border border-nature-500/20">
                <div className="liquid-sheen-sweep" />
                <div className="liquid-glass-bevel" />

                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-nature-500/10 text-nature-700 dark:text-nature-400 border border-nature-500/20">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-ink-950 dark:text-white"><Localized>
                      Education
                    </Localized></h4>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-nature-700 dark:text-nature-400 font-bold"><Localized>
                      Academic Pedigree
                    </Localized></span>
                  </div>
                </div>
                <ul className="relative z-10 mt-5 space-y-3 text-xs leading-relaxed text-ink-700/80 dark:text-white/70">
                  {ARCHITECT.education.map((edu) => (
                    <li key={edu} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-nature-600" />
                      <span><Localized>{edu}</Localized></span>
                    </li>
                  ))}
                </ul>
              </FadeIn>

              {/* Associations Card (Brand Red theme) */}
              <FadeIn delay={0.15} className="liquid-glass-card rounded-3xl p-6 sm:p-7 h-full flex flex-col border border-brand-500/20">
                <div className="liquid-sheen-sweep" />
                <div className="liquid-glass-bevel" />

                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-ink-950 dark:text-white"><Localized>
                      Associations
                    </Localized></h4>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 font-bold"><Localized>
                      Governance
                    </Localized></span>
                  </div>
                </div>
                <ul className="relative z-10 mt-5 space-y-3 text-xs leading-relaxed text-ink-700/80 dark:text-white/70">
                  {ARCHITECT.associations.map((assoc) => (
                    <li key={assoc} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                      <span><Localized>{assoc}</Localized></span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            {/* Mission Statements Bento */}
            <FadeIn delay={0.2} className="liquid-glass-card rounded-3xl p-6 sm:p-7 border border-nature-500/20">
              <div className="liquid-sheen-sweep" />
              <div className="liquid-glass-bevel" />

              <div className="relative z-10 flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-nature-500/10 text-nature-700 dark:text-nature-400 border border-nature-500/25 shadow-sm">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-sm sm:text-base text-ink-950 dark:text-white"><Localized>
                    Our Core Mission
                  </Localized></h4>
                </div>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-600 dark:text-brand-400"><Localized>
                  4 Guiding Pillars
                </Localized></span>
              </div>
              <div className="relative z-10 grid gap-3 sm:grid-cols-2">
                {MISSION.map((item, mIdx) => {
                  const isGreen = mIdx % 2 === 0;
                  return (
                    <div
                      key={item}
                      className={`flex items-center gap-3 rounded-2xl border bg-white/50 p-3.5 dark:bg-white/[0.04] ${
                        isGreen ? "border-nature-500/20" : "border-brand-500/20"
                      }`}
                    >
                      <CheckCircle2 className={`h-4 w-4 shrink-0 ${
                        isGreen ? "text-nature-600" : "text-brand-600"
                      }`} />
                      <span className="text-xs sm:text-sm font-medium text-ink-900 dark:text-white/90">
                        <Localized>{item}</Localized>
                      </span>
                    </div>
                  );
                })}
              </div>
            </FadeIn>

            {/* Design Philosophy Grid */}
            <FadeIn delay={0.25} className="liquid-glass-card rounded-3xl p-6 sm:p-7 border border-brand-500/20">
              <div className="liquid-sheen-sweep" />
              <div className="liquid-glass-bevel" />

              <div className="relative z-10 flex items-center justify-between mb-5">
                <h4 className="font-serif text-xl sm:text-2xl font-normal text-ink-950 dark:text-white"><Localized>
                  Design Philosophy
                </Localized></h4>
                <span className="text-xs font-mono text-nature-700 dark:text-nature-400 font-bold"><Localized>
                  10 Core Tenets
                </Localized></span>
              </div>
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ARCHITECT.philosophy.map((phil, pIdx) => {
                  const isGreen = pIdx % 2 === 0;
                  return (
                    <div
                      key={phil}
                      className={`flex items-center gap-2.5 rounded-xl bg-white/70 px-3.5 py-2.5 text-xs font-medium text-ink-900 shadow-sm border transition-all hover:bg-white dark:bg-white/[0.04] dark:text-white/90 ${
                        isGreen
                          ? "border-nature-500/20 hover:border-nature-500/40"
                          : "border-brand-500/20 hover:border-brand-500/40"
                      }`}
                    >
                      <span className={`font-mono text-[10px] font-bold shrink-0 ${
                        isGreen ? "text-nature-700 dark:text-nature-400" : "text-brand-600 dark:text-brand-400"
                      }`}>
                        0<Localized>{pIdx + 1}</Localized>
                      </span>
                      <span className="truncate flex-1"><Localized>{phil}</Localized></span>
                    </div>
                  );
                })}
              </div>

              {/* Callout Link to Full Monograph */}
              <div className="relative z-10 mt-5 pt-4 border-t border-dashed border-ink-900/10 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-ink-500 dark:text-white/50 font-mono"><Localized>
                  Explore full architectural philosophy
                </Localized></span>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 font-mono font-bold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <span><Localized>Read The Full Monograph</Localized></span>
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
