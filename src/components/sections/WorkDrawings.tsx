
"use client";

import { useState, useRef, useEffect } from "react";
import { Localized } from "@/providers/LanguageProvider";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { WORK_DRAWINGS } from "@/data/site";
import { CheckCircle2, Compass, Building2, Zap, Sofa, Trees, type LucideIcon } from "lucide-react";
import Image from "next/image";

const categoryIcons: Record<string, LucideIcon> = {
  "Architectural Drawings": Compass,
  "Structural Drawings": Building2,
  "Services Drawings": Zap,
  "Interior & Finish Drawings": Sofa,
  "Exterior & Supervision": Trees,
};

function WorkDrawingRow({ drawing, i }: { drawing: typeof WORK_DRAWINGS[0]; i: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isColor, setIsColor] = useState(false);
  const Icon = categoryIcons[drawing.category] ?? Compass;
  const isImageLeft = i % 2 === 0;

  useEffect(() => {
    let ticking = false;
    const checkColorReveal = () => {
      const el = rowRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Reveal to original color when drawing is in view on scroll
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
    <div ref={rowRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center group/row">
      {/* Image Side */}
      <FadeIn
        delay={0.1}
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-ink-900/10 dark:bg-ink-900/50 shadow-xl dark:shadow-2xl dark:shadow-black/50 ${!isImageLeft ? 'lg:order-2' : ''}`}
      >
        <div
          className="w-full h-full relative overflow-hidden drawing-image-wrap"
          style={{
            filter: isColor ? "grayscale(0%)" : "grayscale(100%)",
            transition: "filter 2.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease",
          }}
        >
          <Image
            src={drawing.image}
            alt={drawing.category}
            fill
            className="object-cover transition-transform duration-700 group-hover/row:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="absolute inset-0 bg-ink-950/10 pointer-events-none" />
      </FadeIn>

      {/* Content Side in Liquid Glass Card */}
      <FadeIn
        delay={0.2}
        className={`liquid-glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-lg relative ${
          isImageLeft ? "border-nature-500/20" : "border-brand-500/20"
        } ${!isImageLeft ? 'lg:order-1' : ''}`}
      >
        <div className="liquid-sheen-sweep" />
        <div className="liquid-glass-bevel" />
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-5 mb-8">
            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-sm ${
              isImageLeft
                ? "bg-nature-500/10 border-nature-500/25 text-nature-700 dark:text-nature-400"
                : "bg-brand-500/10 border-brand-500/25 text-brand-600 dark:text-brand-400"
            }`}>
              <Icon className="h-7 w-7" />
            </span>
            <div>
              <h3 className="text-3xl sm:text-4xl font-serif tracking-tight text-ink-950 dark:text-white mb-2">
                <Localized>{drawing.category}</Localized>
              </h3>
              <div className="flex items-center gap-3">
                <span className={`text-xs sm:text-sm font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md border ${
                  isImageLeft
                    ? "text-nature-700 dark:text-nature-300 bg-nature-500/10 border-nature-500/20"
                    : "text-brand-700 dark:text-brand-300 bg-brand-500/10 border-brand-500/20"
                }`}>
                  <Localized>Stage 0</Localized><Localized>{i + 1}</Localized>
                </span>
                <span className={`h-1.5 w-1.5 rounded-full ${isImageLeft ? "bg-nature-500" : "bg-brand-500"}`} />
                <span className="text-xs sm:text-sm font-mono text-ink-900 dark:text-white font-semibold uppercase tracking-widest">
                  <Localized>{drawing.items.length}</Localized><Localized> Details
                  </Localized></span>
              </div>
            </div>
          </div>

          {/* Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 mt-4">
            {drawing.items.map((item) => (
              <div key={item} className="flex items-start gap-3 group/item">
                <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isImageLeft
                    ? "bg-nature-500/15 text-nature-700 group-hover/item:bg-nature-600 group-hover/item:text-white"
                    : "bg-brand-500/15 text-brand-700 group-hover/item:bg-brand-600 group-hover/item:text-white"
                }`}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm sm:text-base font-medium leading-relaxed text-ink-700/90 dark:text-white/70 group-hover/item:text-ink-950 dark:group-hover/item:text-white transition-colors">
                  <Localized>{item}</Localized>
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
      <style jsx>{`
        .group\\/row:hover .drawing-image-wrap,
        .drawing-image-wrap:hover {
          filter: grayscale(0%) !important;
        }
      `}</style>
    </div>
  );
}

export function WorkDrawings() {
  return (
    <section id="drawings" className="relative overflow-hidden py-24 sm:py-32 bg-transparent">
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Technical Documentation"
          title="Work Stage Drawings"
          align="center"
          variant="nature"
          description="Comprehensive engineering and architectural drawings produced with micrometer precision for seamless on-site execution."
        />

        <div className="mt-20 flex flex-col gap-24 lg:gap-32">
          {WORK_DRAWINGS.map((drawing, i) => (
            <WorkDrawingRow key={drawing.category} drawing={drawing} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}