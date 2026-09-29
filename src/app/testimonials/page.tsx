"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactCta } from "@/components/sections/ContactCta";
import { Container } from "@/components/layout/Container";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { TESTIMONIALS } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = TESTIMONIALS.length - 1;
      if (next >= TESTIMONIALS.length) next = 0;
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-ink-950 overflow-hidden">
        
        {/* Testimonials Hero */}
        <section className="pt-32 pb-16">
          <Container>
            <span className="mb-6 inline-block text-sm font-medium tracking-widest text-brand-500 uppercase">
              Client Stories
            </span>
            <h1 className="font-sans text-5xl sm:text-7xl lg:text-8xl font-medium leading-[1.05] tracking-tight text-ink-900 dark:text-white max-w-4xl">
              <SplitText text="Relationships built on trust and delivered promises." />
            </h1>
          </Container>
        </section>

        {/* Editorial Testimonial Carousel */}
        <section className="py-24 relative min-h-[80vh] flex items-center">
          <div className="absolute inset-0 bg-ink-900/[0.02] dark:bg-ink-900/40" />
          
          <Container className="relative z-10 w-full">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              
              {/* Image Side with Parallax */}
              <div className="lg:col-span-5 relative h-[50vh] lg:h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);
                      if (swipe < -swipeConfidenceThreshold) paginate(1);
                      else if (swipe > swipeConfidenceThreshold) paginate(-1);
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <ParallaxImage 
                      src={current.image}
                      alt={current.project}
                      speed={0.1}
                      className="w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation Controls Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                  <div className="flex gap-2">
                    <button onClick={() => paginate(-1)} className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/20">
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button onClick={() => paginate(1)} className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/20">
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {TESTIMONIALS.map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-8 bg-brand-500" : "w-2 bg-white/40"}`} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Typography Side */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <Quote className="h-16 w-16 text-brand-500/20 mb-8" />
                <div className="min-h-[250px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink-900 dark:text-white leading-[1.2] mb-12">
                        &quot;{current.quote}&quot;
                      </h2>
                      <div className="flex items-center gap-6">
                        <div className="h-px w-12 bg-brand-500" />
                        <div>
                          <p className="text-xl font-medium text-ink-900 dark:text-white">{current.author}</p>
                          <p className="text-ink-500 dark:text-ink-400 mt-1">{current.role}, {current.project}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
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
