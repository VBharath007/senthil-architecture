"use client";

import { Localized, useLanguage } from "@/providers/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { PROJECTS } from "@/data/site";
import {
  ArrowLeft,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Layers,
  Compass,
  CheckCircle2,
} from "lucide-react";

function ProjectHero({
  project,
  bannerImage,
}: {
  project: any;
  bannerImage: string;
}) {
  const { language } = useLanguage();
  const isTamil = language === "ta";

  return (
    <section className="relative w-full h-[52vh] min-h-[380px] max-h-[560px] sm:h-[60vh] sm:min-h-[440px] sm:max-h-[620px] overflow-hidden bg-ink-950 flex flex-col justify-end">
      {/* Full-Color Project Banner Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle cinematic overlays for legibility and seamless navbar blend */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/70 via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Banner Foreground Content */}
      <Container className="relative z-10 pb-8 sm:pb-12 pt-28 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <Link
            href="/projects"
            className="group mb-4 sm:mb-5 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white/90 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 transition-all shadow-md w-fit"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <Localized>Back to Projects</Localized>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
            {project.categories?.map((cat: string) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full bg-brand-600/90 text-white text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider backdrop-blur-sm shadow-sm"
              >
                <Localized>{cat}</Localized>
              </span>
            ))}
          </div>

          <h1
            className={`font-serif tracking-tight text-white drop-shadow-lg ${
              isTamil
                ? "text-[22px] sm:text-[24px] lg:text-[26px] leading-[1.35] font-medium"
                : "text-2xl sm:text-4xl md:text-5xl font-medium leading-tight"
            }`}
          >
            <Localized>{project.title}</Localized>
          </h1>

          <p className="mt-2 text-xs sm:text-sm md:text-base text-white/90 drop-shadow flex items-center gap-2 flex-wrap">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <Localized>{project.location}</Localized>
            {project.facts?.["Type"] && (
              <>
                <span className="opacity-60">•</span>
                <span><Localized>{project.facts["Type"]}</Localized></span>
              </>
            )}
            {project.facts?.["Year of completion"] && (
              <>
                <span className="opacity-60">•</span>
                <span><Localized>{project.facts["Year of completion"]}</Localized></span>
              </>
            )}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export function ProjectClient({
  params,
}: {
  params: { slug: string };
}) {
  const { language } = useLanguage();
  const isTamil = language === "ta";
  const projectIndex = PROJECTS.findIndex((p) => p.slug === params.slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  // Resolve active image from client search params or default to project cover
  const [activeImageFile, setActiveImageFile] = useState<string>(project.cover);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const img = urlParams.get("img");
      if (
        img &&
        (project.gallery?.includes(img) ||
          img === (project as any).interior_cover ||
          img === project.cover)
      ) {
        setActiveImageFile(img);
      }
    } catch {}
  }, [project]);

  const bannerImage = `/assets/projects/${project.slug}/${activeImageFile}`;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null && project.gallery) {
      setLightboxIndex(
        (lightboxIndex - 1 + project.gallery.length) % project.gallery.length
      );
    }
  }, [lightboxIndex, project.gallery]);

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null && project.gallery) {
      setLightboxIndex((lightboxIndex + 1) % project.gallery.length);
    }
  }, [lightboxIndex, project.gallery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, prevImage, nextImage]);

  const getLabel = (imgStr: string) => {
    if (imgStr === "built") return "Completed";
    if (imgStr === "design-render") return "Design Render";
    return null;
  };

  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);

  // Fallback facts if not specified
  const displayFacts = project.facts && Object.keys(project.facts).length > 0
    ? project.facts
    : {
        "Location": project.location,
        "Discipline": project.categories.join(", "),
        "Architectural Firm": "Senthil Associates",
        "Lead Architect": "Ar. Senthil, B.Arch, M.Arch",
        "Status": "Completed",
      };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#ededed] dark:bg-ink-950 transition-colors">
        {/* HERO: Clean Banner matching the clicked project photo */}
        <ProjectHero project={project} bannerImage={bannerImage} />

        {/* DETAILS SECTION: Directly below hero banner */}
        <div className="relative z-10 w-full">
          <Container className="pt-10 sm:pt-14 pb-20">
            {/* Overview & Facts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 sm:mb-20 items-start">
              {/* Left Column: Concept & Description (7 cols) */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
                <span className="text-brand-600 dark:text-brand-400 font-mono text-xs font-bold uppercase tracking-wider block mb-2">
                  <Localized>Project Overview</Localized>
                </span>
                <h2
                  className={`font-serif text-ink-950 dark:text-white mb-6 ${
                    isTamil
                      ? "text-[20px] sm:text-[22px] lg:text-[24px] leading-[1.35] font-medium"
                      : "text-2xl sm:text-3xl font-medium"
                  }`}
                >
                  <Localized>Architectural Concept & Execution</Localized>
                </h2>

                {project.description && (
                  <p className="text-base sm:text-lg leading-relaxed text-ink-800 dark:text-ink-100 mb-8 font-normal">
                    <Localized>{project.description}</Localized>
                  </p>
                )}

                {/* Architectural Highlights Bento Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                  <div className="liquid-glass-card rounded-2xl p-4 sm:p-5 border border-ink-900/10 dark:border-white/10 shadow-sm">
                    <div className="liquid-sheen-sweep" />
                    <Compass className="w-5 h-5 text-brand-600 dark:text-brand-400 mb-3" />
                    <h4 className="text-sm font-semibold text-ink-950 dark:text-white mb-1.5">
                      <Localized>Spatial Efficiency</Localized>
                    </h4>
                    <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                      <Localized>Thoughtful space planning prioritizing functional flow and natural comfort.</Localized>
                    </p>
                  </div>

                  <div className="liquid-glass-card rounded-2xl p-4 sm:p-5 border border-ink-900/10 dark:border-white/10 shadow-sm">
                    <div className="liquid-sheen-sweep" />
                    <Layers className="w-5 h-5 text-brand-600 dark:text-brand-400 mb-3" />
                    <h4 className="text-sm font-semibold text-ink-950 dark:text-white mb-1.5">
                      <Localized>Material Excellence</Localized>
                    </h4>
                    <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                      <Localized>Enduring, low-maintenance materials chosen for timeless beauty.</Localized>
                    </p>
                  </div>

                  <div className="liquid-glass-card rounded-2xl p-4 sm:p-5 border border-ink-900/10 dark:border-white/10 shadow-sm">
                    <div className="liquid-sheen-sweep" />
                    <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400 mb-3" />
                    <h4 className="text-sm font-semibold text-ink-950 dark:text-white mb-1.5">
                      <Localized>Climate Harmony</Localized>
                    </h4>
                    <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                      <Localized>Optimal sunlight, cross-ventilation, and site-responsive architecture.</Localized>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Project Specifications Card (5 cols) */}
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="liquid-glass-card rounded-2xl p-6 sm:p-7 shadow-md relative border border-ink-900/10 dark:border-white/10">
                  <div className="liquid-sheen-sweep" />
                  <div className="liquid-glass-bevel" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between border-b border-ink-900/10 dark:border-white/10 pb-4 mb-5">
                      <h3 className="text-lg font-serif font-medium text-ink-950 dark:text-white">
                        <Localized>Project Details</Localized>
                      </h3>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full">
                        SA-PROJECT
                      </span>
                    </div>

                    <dl className="space-y-3.5 text-sm">
                      {Object.entries(displayFacts).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-baseline gap-4 border-b border-ink-900/5 dark:border-white/5 pb-2.5 last:border-0 last:pb-0"
                        >
                          <dt className="text-ink-500 dark:text-ink-400 font-mono text-xs shrink-0">
                            <Localized>{key}</Localized>
                          </dt>
                          <dd className="font-medium text-ink-950 dark:text-white text-right text-xs sm:text-sm">
                            <Localized>{String(value)}</Localized>
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <Button
                      href="/contact"
                      variant="red"
                      className="w-full justify-center mt-6 text-sm font-semibold shadow-sm"
                    >
                      <Localized>Enquire About This Project</Localized>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            {hasGallery && (
              <div className="mb-20 sm:mb-24 pt-6 border-t border-ink-900/10 dark:border-white/10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-brand-600 dark:text-brand-400 font-mono text-xs font-bold uppercase tracking-wider block mb-1">
                      <Localized>Visual Documentation</Localized>
                    </span>
                    <h2
                      className={`font-serif text-ink-950 dark:text-white ${
                        isTamil
                          ? "text-[20px] sm:text-[22px] lg:text-[24px] leading-[1.35] font-medium"
                          : "text-2xl sm:text-3xl font-medium"
                      }`}
                    >
                      <Localized>Project Gallery</Localized>
                    </h2>
                  </div>
                  <span className="text-xs font-mono font-medium text-ink-600 dark:text-white/60 bg-ink-900/5 dark:bg-white/10 px-3 py-1 rounded-full">
                    {project.gallery!.length} <Localized>Photos</Localized>
                  </span>
                </div>

                <div
                  className={`grid gap-6 ${
                    project.gallery!.length === 1
                      ? "grid-cols-1"
                      : "grid-cols-1 md:grid-cols-2"
                  }`}
                >
                  {project.gallery!.map((img, idx) => (
                    <motion.div
                      key={img}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ delay: (idx % 2) * 0.08, duration: 0.5, ease: "easeOut" }}
                      className="liquid-glass-card rounded-2xl p-2.5 sm:p-3 relative cursor-pointer group shadow-sm border border-ink-900/10 dark:border-white/10"
                      onClick={() => openLightbox(idx)}
                    >
                      <div className="liquid-sheen-sweep" />
                      <div
                        className={`relative w-full overflow-hidden rounded-xl bg-ink-900/5 ${
                          project.gallery!.length === 1
                            ? "aspect-[16/9] sm:aspect-[21/9]"
                            : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={`/assets/projects/${project.slug}/${img}`}
                          alt={`${project.title} - ${img}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {getLabel(img) && (
                          <div className="absolute top-4 left-4 bg-ink-950/80 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                            <Localized>{getLabel(img)}</Localized>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Project Card */}
            <div className="pt-12 border-t border-ink-900/10 dark:border-white/10">
              <span className="text-xs font-mono font-bold text-ink-600 dark:text-ink-400 mb-4 uppercase tracking-wider block">
                <Localized>Next Project</Localized>
              </span>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group block relative overflow-hidden rounded-3xl aspect-[21/9] md:aspect-[21/6] liquid-glass-card shadow-lg border border-ink-900/10 dark:border-white/10"
              >
                <div className="liquid-sheen-sweep" />
                <div className="liquid-glass-bevel" />
                <Image
                  src={`/assets/projects/${nextProject.slug}/${nextProject.cover}`}
                  alt={nextProject.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink-950/50 group-hover:bg-ink-950/30 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center relative z-10 p-6">
                  <div className="text-center">
                    <h3
                      className={`font-serif font-medium text-white mb-2 drop-shadow-md ${
                        isTamil
                          ? "text-[20px] sm:text-[22px] lg:text-[24px] leading-[1.35]"
                          : "text-2xl sm:text-3xl md:text-4xl"
                      }`}
                    >
                      <Localized>{nextProject.title}</Localized>
                    </h3>
                    <span className="inline-flex items-center gap-2 text-white/95 font-medium group-hover:text-white transition-colors text-sm sm:text-base">
                      <Localized>View Project</Localized>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </Container>
        </div>

        {/* Full-Screen Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && project.gallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
              </button>

              <div className="relative w-full max-w-6xl aspect-[16/9] px-12 sm:px-16 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={`/assets/projects/${project.slug}/${project.gallery[lightboxIndex]}`}
                      alt={`${project.title} - Image ${lightboxIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      quality={92}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-medium text-xs sm:text-sm bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <Localized>{lightboxIndex + 1}</Localized> / <Localized>{project.gallery.length}</Localized>
                {getLabel(project.gallery[lightboxIndex]) && (
                  <span> • <Localized>{getLabel(project.gallery[lightboxIndex])}</Localized></span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
