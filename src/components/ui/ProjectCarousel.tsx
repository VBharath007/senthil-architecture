"use client";
import { Localized } from "@/providers/LanguageProvider";


import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Simple class name merger since we don't have cn utility
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export interface CarouselProject {
  id: string;
  name: string;
  category: string;
  image: string;
  slug: string;
}

export interface ProjectCarouselProps {
  projects: CarouselProject[];
  cardWidth?: number;
  cardHeight?: number;
  cardRadius?: number;
  showArrows?: boolean;
  showDots?: boolean;
  keyboardNavigation?: boolean;
  touchNavigation?: boolean;
  animationDuration?: number;
  autoPlay?: number;
  pauseOnHover?: boolean;
  visibleCards?: number;
  sideCardScale?: number;
  sideCardOpacity?: number;
  grayscaleEffect?: boolean;
  className?: string;
  cardClassName?: string;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  projects,
  cardWidth = 600,
  cardHeight = 375,
  cardRadius = 16,
  showArrows = true,
  showDots = true,
  keyboardNavigation = true,
  touchNavigation = true,
  animationDuration = 800,
  autoPlay = 0,
  pauseOnHover = true,
  visibleCards = 2,
  sideCardScale = 0.85,
  sideCardOpacity = 0.6,
  grayscaleEffect = false,
  className,
  cardClassName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: no movement, 1: next, -1: prev
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Responsive card size state
  const [actualCardWidth, setActualCardWidth] = useState(cardWidth);
  const [actualCardHeight, setActualCardHeight] = useState(cardHeight);

  const totalProjects = projects.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setActualCardWidth(280);
        setActualCardHeight(175);
      } else if (window.innerWidth < 1024) {
        setActualCardWidth(400);
        setActualCardHeight(250);
      } else {
        setActualCardWidth(cardWidth);
        setActualCardHeight(cardHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cardWidth, cardHeight]);

  const paginate = useCallback(
    (newDirection: number) => {
      if (totalProjects === 0) return;
      setDirection(newDirection);
      const nextIndex = (currentIndex + newDirection + totalProjects) % totalProjects;
      setCurrentIndex(nextIndex);
    },
    [currentIndex, totalProjects]
  );

  const wrapIndex = (index: number) => {
    return (index + totalProjects) % totalProjects;
  };

  const calculatePosition = (index: number) => {
    const activeIndex = currentIndex;
    const diff = wrapIndex(index - activeIndex);

    if (diff === 0) return 'center';
    if (diff <= visibleCards) return `right-${diff}`;
    if (diff >= totalProjects - visibleCards) return `left-${totalProjects - diff}`;
    return 'hidden';
  };

  const getVariantStyles = (position: string): any => {
    const transition = {
      duration: animationDuration / 1000,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    };

    switch (position) {
      case 'center':
        return {
          zIndex: 10,
          opacity: 1,
          scale: 1,
          x: 0,
          filter: 'grayscale(0%)',
          pointerEvents: 'auto',
          transition,
        };
      case 'right-1':
        return {
          zIndex: 5,
          opacity: sideCardOpacity,
          scale: sideCardScale,
          x: actualCardWidth * 0.6,
          filter: grayscaleEffect ? 'grayscale(100%)' : 'grayscale(0%)',
          pointerEvents: 'auto',
          transition,
        };
      case 'right-2':
        return {
          zIndex: 1,
          opacity: sideCardOpacity * 0.5,
          scale: sideCardScale * 0.8,
          x: actualCardWidth * 1.1,
          filter: grayscaleEffect ? 'grayscale(100%)' : 'grayscale(0%)',
          pointerEvents: 'auto',
          transition,
        };
      case 'left-1':
        return {
          zIndex: 5,
          opacity: sideCardOpacity,
          scale: sideCardScale,
          x: -actualCardWidth * 0.6,
          filter: grayscaleEffect ? 'grayscale(100%)' : 'grayscale(0%)',
          pointerEvents: 'auto',
          transition,
        };
      case 'left-2':
        return {
          zIndex: 1,
          opacity: sideCardOpacity * 0.5,
          scale: sideCardScale * 0.8,
          x: -actualCardWidth * 1.1,
          filter: grayscaleEffect ? 'grayscale(100%)' : 'grayscale(0%)',
          pointerEvents: 'auto',
          transition,
        };
      default:
        return {
          zIndex: 0,
          opacity: 0,
          scale: 0.8,
          x: direction > 0 ? actualCardWidth * (visibleCards + 1) : -actualCardWidth * (visibleCards + 1),
          pointerEvents: 'none',
          filter: grayscaleEffect ? 'grayscale(100%)' : 'grayscale(0%)',
          transition,
        };
    }
  };



  useEffect(() => {
    if (!keyboardNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyboardNavigation, paginate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!touchNavigation) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchNavigation) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchNavigation) return;
    const swipeThreshold = 50;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        paginate(1);
      } else {
        paginate(-1);
      }
    }
  };

  return (
    <div
      id="project-carousel-container"
      className={cn(
        "w-full py-8 md:py-16 flex flex-col items-center justify-center relative overflow-hidden",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="w-full relative z-10 mx-auto flex items-center justify-center overflow-visible"
        style={{
          height: actualCardHeight + 60,
          perspective: '1000px',
        }}
      >
        {showArrows && (
          <>
            <motion.button
              onClick={() => paginate(-1)}
              className="absolute left-2 md:left-12 lg:left-24 top-1/2 transform -translate-y-1/2 bg-ink-900/40 hover:bg-ink-900/80 backdrop-blur-md text-white w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 shadow-lg border border-white/10"
              whileTap={{ scale: 0.9 }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={() => paginate(1)}
              className="absolute right-2 md:right-12 lg:right-24 top-1/2 transform -translate-y-1/2 bg-ink-900/40 hover:bg-ink-900/80 backdrop-blur-md text-white w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 shadow-lg border border-white/10"
              whileTap={{ scale: 0.9 }}
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </>
        )}

        <div
          className="w-full h-full flex justify-center items-center relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence initial={false} custom={direction}>
            {projects.map((project, index) => {
              const position = calculatePosition(index);
              const isCurrent = index === currentIndex;

              if (position === 'hidden' && !isCurrent) return null;

              return (
                <motion.div
                  key={project.id}
                  className={cn(
                    "absolute bg-ink-900 overflow-hidden shadow-2xl group",
                    cardClassName
                  )}
                  style={{
                    width: actualCardWidth,
                    height: actualCardHeight,
                    borderRadius: cardRadius,
                    top: '50%',
                    left: '50%',
                    marginLeft: -actualCardWidth / 2,
                    marginTop: -actualCardHeight / 2,
                  }}
                  initial={getVariantStyles('hidden')}
                  animate={getVariantStyles(position)}
                  exit={getVariantStyles('hidden')}
                  onClick={() => {
                    if (!isCurrent) {
                      const newDirection = index > currentIndex ? 1 : -1;
                      setDirection(newDirection);
                      setCurrentIndex(index);
                    }
                  }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className={`block w-full h-full ${!isCurrent ? 'pointer-events-none' : ''}`}
                    tabIndex={isCurrent ? 0 : -1}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/20 transition-colors duration-300" />

                      {isCurrent && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="bg-brand-500 text-white text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full shadow-md"><Localized>
                            View Project
                          </Localized></span>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {projects[currentIndex] && (
        <motion.div
          key={projects[currentIndex].id + "-info"}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="text-center mt-8 z-10"
        >
          <Link href={`/projects/${projects[currentIndex].slug}`} className="hover:text-brand-500 transition-colors">
            <h3 className="text-2xl md:text-3xl font-medium text-ink-900 dark:text-white mb-2">
              <Localized>{projects[currentIndex].name}</Localized>
            </h3>
          </Link>
          <p className="text-sm md:text-base text-ink-500 dark:text-ink-400">
            <Localized>{projects[currentIndex].category}</Localized>
          </p>
        </motion.div>
      )}

      {showDots && (
        <div className="flex justify-center gap-3 mt-8 z-10">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                if (index !== currentIndex) {
                  const newDirection = index > currentIndex ? 1 : -1;
                  setDirection(newDirection);
                  setCurrentIndex(index);
                }
              }}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "scale-125 bg-brand-500"
                  : "bg-ink-900/20 dark:bg-white/20 hover:scale-110"
              )}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
