"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowDown, Layers, Sparkles, Compass } from "lucide-react";

interface ArchitecturalStage {
  id: string;
  name: string;
  category: string;
  eyebrow: string;
  headline: string;
  headlineHighlight: string;
  description: string;
  specs: { label: string; value: string }[];
}

const STAGES: ArchitecturalStage[] = [
  {
    id: "01",
    name: "Creative design",
    category: "Mission",
    eyebrow: "01 / MISSION • Creative design",
    headline: "Creative",
    headlineHighlight: "design",
    description: "Conceptually strong designs that are innovative and build unique and performative buildings that respond to context.",
    specs: [],
  },
  {
    id: "02",
    name: "Effective planning",
    category: "Mission",
    eyebrow: "02 / MISSION • Efficient planning",
    headline: "Efficient and",
    headlineHighlight: "effective planning",
    description: "Integration of design with engineering principles. Detailed development of the design.",
    specs: [],
  },
  {
    id: "03",
    name: "Quality materials",
    category: "Mission",
    eyebrow: "03 / MISSION • Quality materials",
    headline: "Attention to details",
    headlineHighlight: "with quality materials",
    description: "Fine detail and design philosophy guarantees a unique and vibrant design solution for each new subject and space.",
    specs: [],
  },
  {
    id: "04",
    name: "Sustainable design",
    category: "Mission",
    eyebrow: "04 / MISSION • Sustainable design",
    headline: "Application of sustainable",
    headlineHighlight: "design principles",
    description: "Respect nature. Learning from the Past and applying to the FUTURE.",
    specs: [],
  },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Image sequence state
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 81;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Stage state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  // Preload images
  useEffect(() => {
    let isMounted = true;
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = new Array(totalImages);
      let loadedCount = 0;
      const promises = [];
      
      for (let i = 1; i <= totalImages; i++) {
        const promise = new Promise((resolve) => {
          const img = new Image();
          img.src = `/hero scroll image/${i}.webp`;
          img.onload = () => {
            if (!isMounted) return;
            loadedCount++;
            setImagesLoaded(loadedCount);
            loadedImages[i - 1] = img;
            resolve(null);
          };
          img.onerror = () => {
            if (!isMounted) return;
            loadedCount++;
            setImagesLoaded(loadedCount);
            resolve(null);
          };
        });
        promises.push(promise);
      }
      
      await Promise.all(promises);
      if (!isMounted) return;
      
      const validImages = loadedImages.filter(Boolean);
      imagesRef.current = validImages;
      
      if (validImages[0] && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          canvasRef.current.width = validImages[0].width;
          canvasRef.current.height = validImages[0].height;
          ctx.drawImage(validImages[0], 0, 0);
        }
      }
    };
    
    loadImages();
    return () => { isMounted = false; };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
    
    if (imagesRef.current.length === 0) return;
    
    const frameIndex = Math.min(
      imagesRef.current.length - 1,
      Math.max(0, Math.floor(latest * imagesRef.current.length))
    );
    
    const img = imagesRef.current[frameIndex];
    const canvas = canvasRef.current;
    
    if (img && canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }

    // Determine active stage based on scroll progress (4 stages)
    let stage = 0;
    if (latest < 0.25) stage = 0;
    else if (latest < 0.50) stage = 1;
    else if (latest < 0.75) stage = 2;
    else stage = 3;
    
    if (stage !== activeStage) {
      setActiveStage(stage);
    }
  });

  const jumpToStage = (stageIdx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScrollable = rect.height - window.innerHeight;
    
    const targets = [0.05, 0.42, 0.76, 0.99];
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
      id="hero-pixel-morph"
      className="relative w-full h-[400vh] bg-[#f8faf9] dark:bg-[#020303] select-none transition-colors duration-500"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#f8faf9] dark:bg-[#020303] flex flex-col justify-between transition-colors duration-500">
        
        {/* Canvas Background */}
        <div className="absolute inset-0 z-0">
          <canvas 
            ref={canvasRef}
            className="w-full h-full object-cover object-[center_top] sm:object-center"
          />
          <div className="absolute inset-0 bg-ink-950/20 pointer-events-none" />
          {/* Gradient overlay for mobile text visibility */}
          <div className="absolute inset-x-0 bottom-0 h-[65vh] bg-gradient-to-t from-[#f8faf9] via-[#f8faf9]/80 to-transparent sm:hidden pointer-events-none" />
        </div>

        {/* Loading overlay */}
        {imagesLoaded < totalImages && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#020504] text-white font-mono text-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#00E599] transition-all duration-300"
                  style={{ width: `${(imagesLoaded / totalImages) * 100}%` }}
                />
              </div>
              <span className="text-white/50 tracking-widest">LOADING EXPERIENCE {Math.round((imagesLoaded / totalImages) * 100)}%</span>
            </div>
          </div>
        )}

        <div className="h-16 sm:h-20 lg:h-28 xl:h-32 pointer-events-none shrink-0 z-10" />

        {/* CENTER / BOTTOM CONTENT: Dynamic Architectural Text */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-end lg:justify-center px-4 sm:px-8 lg:px-12 pb-2 sm:pb-4 lg:pt-4 lg:pb-8 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            
            <div className="w-full lg:max-w-md xl:max-w-lg 2xl:max-w-xl pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStageData.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col justify-center"
                >
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-sm text-[11px] sm:text-xs md:text-sm font-mono uppercase tracking-wider font-bold text-nature-800 bg-nature-500/10 border border-nature-500/25 dark:text-nature-300 dark:bg-nature-950/60 dark:border-nature-500/30 backdrop-blur-md">
                      <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-nature-600 dark:text-nature-400" />
                      {currentStageData.eyebrow}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sans font-medium tracking-tight text-ink-950 leading-[1.12]">
                    {currentStageData.headline}
                    <br className="hidden sm:inline" />{" "}
                    <span className="font-semibold italic font-serif font-light text-nature-700">
                      {currentStageData.headlineHighlight}
                    </span>
                  </h1>

                  <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm lg:text-base leading-relaxed text-ink-800 max-w-xl line-clamp-2 sm:line-clamp-3 lg:line-clamp-none">
                    {currentStageData.description}
                  </p>

                  <div className="mt-3.5 sm:mt-5 flex items-center gap-2.5 sm:gap-3">
                    <Button href="#contact" variant="primary" className="text-xs px-3.5 py-2 sm:px-4 sm:py-2.5">
                      Get a Quote
                    </Button>
                    <button
                      onClick={() => jumpToStage((activeStage + 1) % 4)}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border border-ink-900/15 text-xs font-mono text-ink-800 hover:bg-ink-900/5 backdrop-blur-sm transition-colors"
                    >
                      <span>Next Morphology</span>
                      <span className="text-brand-600 font-bold">→</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="hidden lg:block lg:flex-1 pointer-events-none" />
          </div>
        </div>

        {/* BOTTOM LAYER: Minimalist Status & Scroll Cue */}
        <footer className="relative z-20 w-full px-4 pb-3 sm:px-8 sm:pb-5 md:px-12 md:pb-6 flex items-center justify-between pointer-events-none gap-2 shrink-0">
          
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm bg-white/80 dark:bg-black/60 backdrop-blur-md border border-ink-900/10 dark:border-white/10 shadow-sm text-xs">
            <span className="font-mono font-bold text-brand-700 dark:text-brand-400 whitespace-nowrap">
              STAGE {currentStageData.id} / 04
            </span>
            <span className="hidden sm:inline text-ink-400 dark:text-white/30">•</span>
            <span className="hidden sm:inline font-medium text-ink-700 dark:text-white/70 truncate max-w-[120px] md:max-w-none">
              {currentStageData.name}
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-sm bg-white/80 dark:bg-black/60 backdrop-blur-md border border-ink-900/10 dark:border-white/10 shadow-sm">
            <div className="text-right hidden sm:block">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-nature-700 dark:text-nature-400 font-semibold">
                Scroll to Transform
              </span>
              <span className="block text-xs font-medium text-ink-800 dark:text-white/80">
                {scrollProgress >= 0.98 ? "Scroll down for details" : "Image Sequence Active"}
              </span>
            </div>
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-500/20 text-brand-700 dark:text-brand-300"
            >
              <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </motion.div>
          </div>

        </footer>

      </div>
    </section>
  );
}
