
"use client";

import { useState, useRef, useEffect } from "react";
import { Localized } from "@/providers/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

interface ProjectCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  location?: string;
  delay?: number;
  slug: string;
}

export function ProjectCard({
  image,
  category,
  title,
  description,
  location,
  delay = 0,
  slug,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isColor, setIsColor] = useState(false);

  useEffect(() => {
    let ticking = false;
    const checkColorReveal = () => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Reveal to original color when card is in view on scroll
      const cardInView = rect.top < vh * 0.88 && rect.bottom > 20;

      if (cardInView) {
        setIsColor(true);
      } else if (window.scrollY < 30) {
        setIsColor(false);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkColorReveal);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    checkColorReveal();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <FadeIn delay={delay} className="group h-full">
      <Link href={`/projects/${slug}`} className="block h-full w-full">
        <div
          ref={cardRef}
          className="liquid-glass-card project-card rounded-2xl relative aspect-[4/5] w-full overflow-hidden border border-ink-900/10 shadow-sm transition-all duration-500 hover:shadow-lg dark:border-white/10"
        >
          <div className="liquid-sheen-sweep z-10" />
          <div className="liquid-glass-bevel z-10" />
          <div
            className="w-full h-full relative overflow-hidden project-image-wrap"
            style={{
              filter: isColor ? "grayscale(0%)" : "grayscale(100%)",
              transition: "filter 2.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease",
            }}
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 1024px) 360px, 90vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          
          {/* Cinematic Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent transition-opacity duration-300 group-hover:opacity-90 pointer-events-none" />
          
          {/* Top Badges */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
            <span className="rounded-sm border border-white/20 bg-ink-950/60 px-3 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-md">
              <Localized>{category}</Localized>
            </span>
            {location && (
              <span className="flex items-center gap-1 rounded-sm border border-white/20 bg-ink-950/60 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur-md">
                <MapPin className="h-3 w-3 text-white/70" />
                <Localized>{location}</Localized>
              </span>
            )}
          </div>

          {/* Bottom Content */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 pointer-events-none">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base sm:text-lg font-semibold text-white transition-colors">
                <Localized>{title}</Localized>
              </h3>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-white/10 text-white transition-all duration-300 group-hover:bg-white group-hover:text-ink-950 group-hover:rotate-45 pointer-events-auto">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/70 line-clamp-2">
              <Localized>{description}</Localized>
            </p>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .group:hover .project-image-wrap,
        .project-image-wrap:hover {
          filter: grayscale(0%) !important;
        }
      `}</style>
    </FadeIn>
  );
}
