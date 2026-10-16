"use client";

import React, { useEffect, useRef } from "react";

interface ContinuousPaintRevealProps {
  children: React.ReactNode;
}

/**
 * ContinuousPaintReveal:
 * Implements the full-website scroll-driven Black-and-White to Color engine.
 * - Entire website starts 100% in Black and White theme.
 * - As the user scrolls down ("scrol panna panna"): elements and sections smoothly transition
 *   into full vibrant color ("color full yakanum").
 * - When the user scrolls back up: elements return to architectural Black & White.
 * - Hovering any element/card instantly illuminates it in full color.
 */
export function ContinuousPaintReveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    // Target sections and visual media
    const getTargets = () => {
      const sections = Array.from(
        container.querySelectorAll<HTMLElement>("section:not([class*='sticky']), footer, .paint-section, div[id='story']")
      );
      const media = Array.from(
        container.querySelectorAll<HTMLElement>(
          "img, video, canvas, .liquid-glass-card, [class*='aspect-'], [id='drawings'] .group, .project-card, .project-image-wrap"
        )
      );
      return Array.from(new Set([...sections, ...media]));
    };

    let targets = getTargets();

    const updateColorState = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight || 750;
      // Start color reveal when top of element reaches 78% of viewport height
      // Complete color reveal when top of element reaches 32% of viewport height
      const revealStart = vh * 0.78;
      const revealEnd = vh * 0.32;
      const range = revealStart - revealEnd;

      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();

        // 1. Element is below the reveal zone (further down the page) -> Solid 100% Black & White
        if (rect.top >= revealStart) {
          el.style.filter = "grayscale(100%) contrast(1.05)";
          el.classList.add("bw-active");
        }
        // 2. Element has scrolled past the reveal zone (near top of screen) -> 100% Full Vibrant Original Color
        else if (rect.top <= revealEnd) {
          el.style.filter = "grayscale(0%) contrast(1)";
          el.classList.remove("bw-active");
        }
        // 3. Element is actively scrolling through the view zone -> Dynamically reveals original color right before user's eyes!
        else {
          const progress = (revealStart - rect.top) / range; // 0 at bottom, 1 at top
          const clampedProgress = Math.min(1, Math.max(0, progress));
          const grayscale = Math.round((1 - clampedProgress) * 100);
          el.style.filter = `grayscale(${grayscale}%) contrast(${1 + (grayscale / 100) * 0.05})`;
          if (grayscale > 40) {
            el.classList.add("bw-active");
          } else {
            el.classList.remove("bw-active");
          }
        }
      });

      ticking = false;
    };

    // Initialize all targets initially in Black and White
    targets.forEach((el) => {
      el.style.filter = "grayscale(100%) contrast(1.05)";
      el.classList.add("bw-active");
    });
    updateColorState();

    // Watch for dynamic DOM changes (e.g. project category filtering)
    const observer = new MutationObserver(() => {
      targets = getTargets();
      updateColorState();
    });
    observer.observe(container, { childList: true, subtree: true });

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateColorState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.addEventListener("touchend", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("touchend", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="paint-content relative">
      <style jsx global>{`
        /* Initial Black and White theme baseline for entire website with smooth transitions */
        .paint-content section:not([class*="sticky"]),
        .paint-content footer,
        .paint-content img,
        .paint-content video,
        .paint-content canvas,
        .paint-content .liquid-glass-card,
        .paint-content [class*="aspect-"],
        .paint-content .project-image-wrap {
          transition: filter 0.25s ease-out;
        }

        .paint-content .bw-active {
          filter: grayscale(100%) contrast(1.05);
          transition: filter 0.25s ease-out;
        }

        /* Fast, responsive color blooming on mobile touch devices */
        @media (max-width: 767px) {
          .paint-content section:not([class*="sticky"]),
          .paint-content footer,
          .paint-content img,
          .paint-content video,
          .paint-content canvas,
          .paint-content .liquid-glass-card,
          .paint-content [class*="aspect-"],
          .paint-content .project-image-wrap {
            transition: filter 0.2s ease-out;
          }

          .paint-content .bw-active {
            filter: grayscale(100%) contrast(1.05);
            transition: filter 0.2s ease-out;
          }
        }

        /* Hover always reveals 100% full vibrant color on cards/media */
        .paint-content img:hover,
        .paint-content .liquid-glass-card:hover,
        .paint-content [class*="aspect-"]:hover,
        .paint-content .project-card:hover,
        .paint-content a:hover img {
          filter: grayscale(0%) !important;
          transition: filter 0.3s ease-out;
        }

        /* Smooth slow-motion color transitions for text and accents */
        .paint-content [class*="text-[#00E599]"],
        .paint-content [class*="text-nature-400"],
        .paint-content [class*="text-nature-500"],
        .paint-content [class*="text-brand-600"] {
          transition: color 1.0s cubic-bezier(0.25, 1, 0.5, 1), filter 1.0s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        .paint-content [class*="bg-[#00E599]"],
        .paint-content [class*="bg-nature-500"] {
          transition: background-color 1.0s cubic-bezier(0.25, 1, 0.5, 1), color 1.0s cubic-bezier(0.25, 1, 0.5, 1), filter 1.0s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* High-contrast crisp B&W text replacements - respects both light PDF and dark modes */
        .paint-content .bw-active [class*="text-[#00E599]"],
        .paint-content .bw-active [class*="text-nature-400"],
        .paint-content .bw-active [class*="text-nature-500"],
        .paint-content .bw-active [class*="text-brand-600"],
        .paint-content .bw-active[class*="text-[#00E599]"] {
          filter: grayscale(100%);
        }

        .paint-content .bw-active [class*="bg-[#00E599]"],
        .paint-content .bw-active [class*="bg-nature-500"],
        .paint-content .bw-active[class*="bg-[#00E599]"] {
          filter: grayscale(100%);
        }
        
        .paint-content .bw-active [class*="border-[#00E599]"],
        .paint-content .bw-active [class*="border-nature-500"] {
          border-color: rgba(0, 0, 0, 0.15) !important;
          transition: border-color 1.0s cubic-bezier(0.25, 1, 0.5, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .paint-content section,
          .paint-content footer,
          .paint-content img,
          .paint-content video,
          .paint-content canvas,
          .paint-content .liquid-glass-card,
          .paint-content [class*="aspect-"],
          .paint-content .bw-active {
            transition: none !important;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
