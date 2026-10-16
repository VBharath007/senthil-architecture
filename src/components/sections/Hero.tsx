"use client";
import { Localized, useLanguage } from "@/providers/LanguageProvider";


import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
import { Button } from "@/components/ui/Button";
import { ArrowDown, Layers, Sparkles, Compass } from "lucide-react";

interface ArchitecturalStage {
  id: string;
  name: string;
  headline: string;
  headlineHighlight: string;
  description: string;
  specs: { label: string; value: string }[];
}

const STAGES: ArchitecturalStage[] = [
  {
    id: "01",
    name: "Creative design",
    headline: "Creative",
    headlineHighlight: "design",
    description: "Creative Design We bring your dreams to life by designing spaces that match your lifestyle and personal taste",
    specs: [],
  },
  {
    id: "02",
    name: "Effective planning",
    headline: "Effective",
    headlineHighlight: "planning",
    description: "Effective Planning We make the best use of every space, carefully planning each area to suit your needs.",
    specs: [],
  },
  {
    id: "03",
    name: "Quality materials",
    headline: "Quality",
    headlineHighlight: "materials",
    description: "Quality Materials We choose quality materials that look beautiful, last longer, and are easy to maintain.",
    specs: [],
  },
  {
    id: "04",
    name: "Sustainable design",
    headline: "Sustainable",
    headlineHighlight: "design",
    description: "Sustainable Design We design spaces with natural light and fresh air, helping you save energy and live comfortably.",
    specs: [],
  },
];

function HeroDesktop() {
  const { language } = useLanguage();
  const isTamil = language === "ta";
  const containerRef = useRef<HTMLElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const activeStageRef = useRef(0);
  const lastFrameRef = useRef(-1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Image sequence state
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 76;
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Stage state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  // Load the first frame immediately, then decode the sequence in small batches.
  useEffect(() => {
    let disposed = false;
    const query = window.matchMedia("(min-width: 768px)");
    const load = async () => {
      if (!query.matches) return;
      const frames = imagesRef.current = new Array(totalImages);
      let completed = 0;
      const loadFrame = (index: number) => new Promise<void>(resolve => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (!disposed) {
            frames[index] = img;
            completed++;
            if (index === 0) {
              const canvas = canvasRef.current;
              if (canvas) { canvas.width = img.width; canvas.height = img.height; canvas.getContext("2d")?.drawImage(img, 0, 0); }
            }
            if (completed === 1 || completed === totalImages) setImagesLoaded(completed);
          }
          resolve();
        };
        img.onerror = () => { if (!disposed) setImagesLoaded(1); resolve(); };
        img.src = `/assets/optimized-hero/desktop/${index + 1}.webp`;
      });
      await loadFrame(0);
      for (let i = 1; i < totalImages && !disposed; i += 3) await Promise.all(Array.from({ length: Math.min(3, totalImages - i) }, (_, n) => loadFrame(i + n)));
    };
    load();
    return () => { disposed = true; };
  }, []);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const latest = self.progress;


        if (imagesRef.current.length > 0) {
          const frameIndex = Math.min(
            imagesRef.current.length - 1,
            Math.max(0, Math.floor(latest * imagesRef.current.length))
          );
          const img = imagesRef.current[frameIndex] || imagesRef.current.slice(0, frameIndex + 1).reverse().find(Boolean);
          const canvas = canvasRef.current;
          if (img && canvas && frameIndex !== lastFrameRef.current) {
            lastFrameRef.current = frameIndex;
            const ctx = canvas.getContext('2d');
            if (ctx) {

              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
          }
        }

        let stage = 0;
        if (latest < 0.25) stage = 0;
        else if (latest < 0.50) stage = 1;
        else if (latest < 0.75) stage = 2;
        else stage = 3;

        if (stage !== activeStageRef.current) {
          activeStageRef.current = stage;
          setActiveStage(stage);
        }

        if (splashRef.current) {
          const maskP = Math.min(1, Math.max(0, latest / 0.9));
          const maskW = maskP * 300;
          splashRef.current.style.maskSize = `${maskW}%, 100% 100%`;
          splashRef.current.style.webkitMaskSize = `${maskW}%, 100% 100%`;
        }

        // Slow-motion Black & White to Original Color reveal on scroll:
        // Starts 100% black and white at scroll = 0, and smoothly reveals full vibrant color in slow motion (progress up to 0.72)
        const revealDuration = 0.72;
        const linearP = Math.min(1, Math.max(0, latest / revealDuration));
        // Smooth sine curve for natural, visible slow-motion color bloom
        const easedP = 0.5 * (1 - Math.cos(Math.PI * linearP));
        const grayScale = (1 - easedP) * 100;

        if (textContainerRef.current) {
          textContainerRef.current.style.filter = `grayscale(${grayScale}%)`;
        }

        if (canvasRef.current) {
          canvasRef.current.style.filter = `grayscale(${grayScale}%)`;
        }
      }
    });
  }, { scope: containerRef });

  const jumpToStage = (stageIdx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScrollable = rect.height - window.innerHeight;

    const targets = [0.0, 0.30, 0.55, 0.80];
    const targetP = targets[stageIdx] ?? 0.0;
    const targetY = scrollTop + targetP * totalScrollable;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const currentStageData = STAGES[activeStage] || STAGES[0];

  return (
    <section
      ref={containerRef}
      id="hero-pixel-morph-desktop"
      className="relative w-full h-[280vh] bg-transparent select-none transition-colors duration-500"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent flex flex-col justify-between transition-colors duration-500">

        {/* Canvas Background */}
        <div className="absolute inset-0 z-0">
          <canvas
            ref={canvasRef}
            style={{ filter: "grayscale(100%)" }}
            className="w-full h-full object-cover object-[center_top] sm:object-center mix-blend-multiply opacity-90"
          />
        </div>

        {/* Loading overlay */}
        {imagesLoaded === 0 && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#020504] text-white font-mono text-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${(imagesLoaded / totalImages) * 100}%` }}
                />
              </div>
              <span className="text-white/50 tracking-widest"><Localized>LOADING EXPERIENCE </Localized><Localized>{Math.round((imagesLoaded / totalImages) * 100)}</Localized>%</span>
            </div>
          </div>
        )}

        <div className="h-16 sm:h-20 lg:h-28 xl:h-32 pointer-events-none shrink-0 z-10" />

        {/* CENTER / BOTTOM CONTENT: Dynamic Architectural Text */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-end lg:justify-center px-4 sm:px-8 lg:px-12 pb-2 sm:pb-4 lg:pt-4 lg:pb-8 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">

            <div
              ref={textContainerRef}
              style={{ filter: "grayscale(100%)" }}
              className="w-full lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl pointer-events-auto"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStageData.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col justify-center"
                >


                  <h1
                    className={`font-sans font-medium tracking-tight text-ink-950 dark:text-white ${
                      isTamil
                        ? "text-[22px] sm:text-[24px] lg:text-[26px] leading-[1.35]"
                        : "text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.2]"
                    }`}
                  >
                    <Localized>{currentStageData.headline}</Localized>
                    <br className="hidden sm:inline" /><Localized>{" "}</Localized>
                    <span className="font-semibold italic font-serif font-light text-nature-700 dark:text-nature-400">
                      <Localized>{currentStageData.headlineHighlight}</Localized>
                    </span>
                  </h1>

                  <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm lg:text-base leading-relaxed text-ink-800 dark:text-ink-200 max-w-xl line-clamp-3 lg:line-clamp-none">
                    <Localized>{currentStageData.description}</Localized>
                  </p>

                  <div className="mt-3.5 sm:mt-5 flex items-center gap-2.5 sm:gap-3">
                    <Button href="/contact" variant="red" className="whitespace-nowrap text-sm px-5 py-2.5 sm:px-6 sm:py-3 lg:px-7 lg:py-3.5"><Localized>
                      Get a Quote
                    </Localized></Button>
                    <button
                      onClick={() => jumpToStage((activeStage + 1) % 4)}
                      className="whitespace-nowrap group inline-flex items-center gap-2 sm:gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 lg:px-7 lg:py-3.5 rounded-full border border-ink-900/15 dark:border-white/20 text-sm font-mono text-ink-800 dark:text-white hover:bg-brand-600 hover:border-brand-600 hover:text-white dark:hover:bg-brand-600 dark:hover:border-brand-600 dark:hover:text-white backdrop-blur-sm transition-colors"
                    >
                      <span><Localized>Next Stage</Localized></span>
                      <span className="text-brand-600 dark:text-brand-400 font-bold group-hover:text-white">→</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="hidden lg:block lg:flex-1 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMobile() {
  const { language } = useLanguage();
  const isTamil = language === "ta";
  const containerRef = useRef<HTMLElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const activeStageRef = useRef(0);
  const lastFrameRef = useRef(-1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Image sequence state
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 95;
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Stage state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  // Load the first frame immediately, then decode the sequence in small batches.
  useEffect(() => {
    let disposed = false;
    const query = window.matchMedia("(max-width: 767px)");
    const load = async () => {
      if (!query.matches) return;
      const frames = imagesRef.current = new Array(totalImages);
      let completed = 0;
      const loadFrame = (index: number) => new Promise<void>(resolve => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (!disposed) {
            frames[index] = img;
            completed++;
            if (index === 0) {
              const canvas = canvasRef.current;
              if (canvas) { canvas.width = img.width; canvas.height = img.height; canvas.getContext("2d")?.drawImage(img, 0, 0); }
            }
            if (completed === 1 || completed === totalImages) setImagesLoaded(completed);
          }
          resolve();
        };
        img.onerror = () => { if (!disposed) setImagesLoaded(1); resolve(); };
        img.src = `/assets/optimized-hero/mobile/${index + 1}.webp`;
      });
      await loadFrame(0);
      for (let i = 1; i < totalImages && !disposed; i += 3) await Promise.all(Array.from({ length: Math.min(3, totalImages - i) }, (_, n) => loadFrame(i + n)));
    };
    load();
    return () => { disposed = true; };
  }, []);

  useEffect(() => {
    const handleMobileScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));

      if (imagesRef.current.length > 0) {
        const frameIndex = Math.min(
          imagesRef.current.length - 1,
          Math.max(0, Math.floor(progress * imagesRef.current.length))
        );
        const img = imagesRef.current[frameIndex] || imagesRef.current.slice(0, frameIndex + 1).reverse().find(Boolean);
        const canvas = canvasRef.current;
        if (img && canvas && frameIndex !== lastFrameRef.current) {
          lastFrameRef.current = frameIndex;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }
      }

      let stage = 0;
      if (progress < 0.25) stage = 0;
      else if (progress < 0.50) stage = 1;
      else if (progress < 0.75) stage = 2;
      else stage = 3;

      if (stage !== activeStageRef.current) {
        activeStageRef.current = stage;
        setActiveStage(stage);
      }

      if (splashRef.current) {
        const maskP = Math.min(1, Math.max(0, progress / 0.85));
        const maskW = maskP * 400;
        splashRef.current.style.maskSize = `${maskW}%, 100% 100%`;
        splashRef.current.style.webkitMaskSize = `${maskW}%, 100% 100%`;
      }

      const revealDuration = 0.55;
      const linearP = Math.min(1, Math.max(0, progress / revealDuration));
      const easedP = 0.5 * (1 - Math.cos(Math.PI * linearP));
      const grayScale = (1 - easedP) * 100;

      if (textContainerRef.current) {
        textContainerRef.current.style.filter = `grayscale(${grayScale}%)`;
      }
      if (canvasRef.current) {
        canvasRef.current.style.filter = `grayscale(${grayScale}%)`;
      }
      if (footerRef.current) {
        footerRef.current.style.filter = `grayscale(${grayScale}%)`;
      }
    };

    window.addEventListener("scroll", handleMobileScroll, { passive: true });
    window.addEventListener("touchmove", handleMobileScroll, { passive: true });
    window.addEventListener("touchend", handleMobileScroll, { passive: true });
    handleMobileScroll();
    return () => {
      window.removeEventListener("scroll", handleMobileScroll);
      window.removeEventListener("touchmove", handleMobileScroll);
      window.removeEventListener("touchend", handleMobileScroll);
    };
  }, []);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const latest = self.progress;

        if (imagesRef.current.length > 0) {
          const frameIndex = Math.min(
            imagesRef.current.length - 1,
            Math.max(0, Math.floor(latest * imagesRef.current.length))
          );
          const img = imagesRef.current[frameIndex] || imagesRef.current.slice(0, frameIndex + 1).reverse().find(Boolean);
          const canvas = canvasRef.current;
          if (img && canvas && frameIndex !== lastFrameRef.current) {
            lastFrameRef.current = frameIndex;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
          }
        }

        let stage = 0;
        if (latest < 0.25) stage = 0;
        else if (latest < 0.50) stage = 1;
        else if (latest < 0.75) stage = 2;
        else stage = 3;

        if (stage !== activeStageRef.current) {
          activeStageRef.current = stage;
          setActiveStage(stage);
        }

        if (splashRef.current) {
          const maskP = Math.min(1, Math.max(0, latest / 0.9));
          const maskW = maskP * 300;
          splashRef.current.style.maskSize = `${maskW}%, 100% 100%`;
          splashRef.current.style.webkitMaskSize = `${maskW}%, 100% 100%`;
        }
      }
    });
  }, { scope: containerRef });

  const jumpToStage = (stageIdx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScrollable = rect.height - window.innerHeight;

    const targets = [0.0, 0.30, 0.55, 0.80];
    const targetP = targets[stageIdx] ?? 0.0;
    const targetY = scrollTop + targetP * totalScrollable;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const currentStageData = STAGES[activeStage] || STAGES[0];

  return (
    <section
      ref={containerRef}
      id="hero-pixel-morph-mobile"
      className="relative w-full h-[280vh] bg-transparent select-none transition-colors duration-500"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent flex flex-col justify-between transition-colors duration-500">

        {/* Canvas Background */}
        <div className="absolute inset-0 z-0">
          <canvas
            ref={canvasRef}
            style={{ filter: "grayscale(100%)" }}
            className="w-full h-full object-cover object-[center_top] mix-blend-multiply opacity-90"
          />
        </div>

        {/* Loading overlay */}
        {imagesLoaded === 0 && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#020504] text-white font-mono text-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${(imagesLoaded / totalImages) * 100}%` }}
                />
              </div>
              <span className="text-white/50 tracking-widest"><Localized>LOADING EXPERIENCE </Localized><Localized>{Math.round((imagesLoaded / totalImages) * 100)}</Localized>%</span>
            </div>
          </div>
        )}

        <div className="h-16 sm:h-20 lg:h-28 xl:h-32 pointer-events-none shrink-0 z-10" />

        {/* CENTER / BOTTOM CONTENT: Dynamic Architectural Text */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-end px-4 pb-2 pt-4 pointer-events-none">
          <div
            ref={textContainerRef}
            style={{ filter: "grayscale(100%)" }}
            className="w-full pointer-events-auto"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStageData.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-center"
              >


                <h1
                  className={`font-sans font-medium tracking-tight text-ink-950 dark:text-white ${
                    isTamil
                      ? "text-[20px] sm:text-[24px] leading-[1.35]"
                      : "text-2xl sm:text-3xl leading-[1.2]"
                  }`}
                >
                  <Localized>{currentStageData.headline}</Localized>
                  <br className="hidden sm:inline" /><Localized>{" "}</Localized>
                  <span className="font-semibold italic font-serif font-light text-nature-700 dark:text-nature-400">
                    <Localized>{currentStageData.headlineHighlight}</Localized>
                  </span>
                </h1>

                <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm lg:text-base leading-relaxed text-ink-800 dark:text-ink-200 max-w-xl line-clamp-4">
                  <Localized>{currentStageData.description}</Localized>
                </p>

                <div className="mt-3 sm:mt-4 flex flex-col min-[420px]:flex-row items-stretch min-[420px]:items-center gap-2 sm:gap-2.5 w-full max-w-sm">
                  <Button
                    href="/contact"
                    variant="red"
                    className="w-full min-[420px]:flex-1 justify-center text-xs sm:text-sm px-3 sm:px-4 py-2.5 font-semibold shadow-sm h-10 sm:h-11 text-center"
                  >
                    <Localized>Get a Quote</Localized>
                  </Button>
                  <button
                    onClick={() => jumpToStage((activeStage + 1) % 4)}
                    className="w-full min-[420px]:flex-1 justify-center group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-full border border-ink-900/20 dark:border-white/20 text-xs sm:text-sm font-mono font-medium text-ink-800 dark:text-white hover:bg-brand-600 hover:border-brand-600 hover:text-white dark:hover:bg-brand-600 dark:hover:border-brand-600 dark:hover:text-white backdrop-blur-sm transition-all h-10 sm:h-11"
                  >
                    <span><Localized>Next Stage</Localized></span>
                    <span className="text-brand-600 dark:text-brand-400 font-bold group-hover:text-white transition-colors shrink-0">→</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM LAYER: Minimalist Status & Scroll Cue */}
        <footer
          ref={footerRef}
          style={{ filter: "grayscale(100%)" }}
          className="relative z-20 w-full px-4 pb-4 sm:pb-6 flex items-center justify-between pointer-events-none gap-2 shrink-0"
        >

          <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-ink-900/10 dark:border-white/10 shadow-sm text-xs">
            <span className="font-mono font-bold text-brand-700 dark:text-brand-400 whitespace-nowrap"><Localized>
              STAGE </Localized><Localized>{currentStageData.id}</Localized> / 04
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-ink-900/10 dark:border-white/10 shadow-sm">
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-500/20 text-brand-700 dark:text-brand-300"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </motion.div>
          </div>

        </footer>

      </div>
    </section>
  );
}

export function Hero() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  if (mobile === null) return <div className="min-h-screen" />;
  return mobile ? <HeroMobile /> : <HeroDesktop />;
}

