"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Award, Landmark, Building2 } from "lucide-react";
import { Localized } from "@/providers/LanguageProvider";

interface MonographModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MonographModal({ isOpen, onClose }: MonographModalProps) {
  // Close on Escape key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      try {
        (window as any).__lenis?.stop();
      } catch (e) {}
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      try {
        (window as any).__lenis?.start();
      } catch (e) {}
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      try {
        (window as any).__lenis?.start();
      } catch (e) {}
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="monograph-title"
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[88vh] overflow-hidden rounded-[2rem] bg-white/95 dark:bg-ink-950/95 backdrop-blur-xl border border-ink-900/10 dark:border-white/10 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
            {/* Header / Top Bar */}
            <div className="shrink-0 px-6 sm:px-10 pt-8 pb-6 border-b border-ink-900/10 dark:border-white/10 flex items-start justify-between gap-4 bg-gradient-to-b from-white to-transparent dark:from-ink-950">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-nature-500/25 bg-nature-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-nature-700 dark:text-nature-300 mb-3">
                  <span className="h-2 w-2 rounded-full bg-nature-500 animate-pulse" />
                  <Localized>Full Monograph &amp; Profile</Localized>
                </div>
                <h2
                  id="monograph-title"
                  className="font-serif text-3xl sm:text-4xl text-ink-950 dark:text-white font-normal tracking-tight"
                >
                  <Localized>Ar. R. Senthil</Localized>
                </h2>
                <p className="mt-1 text-xs sm:text-sm font-mono tracking-wider uppercase text-brand-600 dark:text-brand-400 font-semibold">
                  <Localized>Founder &amp; Principal Architect — Senthil Associates</Localized>
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close monograph"
                className="rounded-full p-2.5 text-ink-600 dark:text-white/70 hover:text-ink-950 dark:hover:text-white bg-ink-900/5 dark:bg-white/10 hover:bg-ink-900/10 dark:hover:bg-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div
              className="overflow-y-auto overscroll-contain px-6 sm:px-10 py-8 space-y-10 text-ink-900 dark:text-white/90 touch-pan-y"
              data-lenis-prevent
              style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
              onWheel={(e) => e.stopPropagation()}
            >
              
              {/* SECTION 1: ABOUT SENTHIL ASSOCIATES */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full bg-nature-600" />
                  <h3 className="font-serif text-2xl sm:text-3xl text-ink-950 dark:text-white font-normal">
                    <Localized>About Senthil Associates</Localized>
                  </h3>
                </div>

                <div className="space-y-3.5 text-ink-700 dark:text-white/80 leading-relaxed text-sm sm:text-base font-light">
                  <p>
                    <Localized>
                      Senthil Associates is one of the leading consultancy service providers, specializing in architecture, interior design, and project management for more than 23 years. It is a full-service design firm focused on bringing unusual and innovative design projects to life with style and imagination.
                    </Localized>
                  </p>
                  <p>
                    <Localized>
                      Passionate about fine detail, the firm&apos;s design philosophy guarantees a unique and vibrant design solution for every project, subject, and space.
                    </Localized>
                  </p>
                </div>
              </section>

              {/* SECTION 2: FOUNDER — AR. R. SENTHIL */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full bg-brand-600" />
                  <h3 className="font-serif text-2xl sm:text-3xl text-ink-950 dark:text-white font-normal">
                    <Localized>Founder — Ar. R. Senthil</Localized>
                  </h3>
                </div>

                <div className="space-y-3.5 text-ink-700 dark:text-white/80 leading-relaxed text-sm sm:text-base font-light">
                  <p>
                    <Localized>
                      Senthil Associates was established as the brainchild of Mr. R. Senthil, B.Arch. (April 2000), who graduated as a promising student from Thiagarajar College of Engineering, Madurai, and M.Arch. (General) (June 2016) from R.V.S. School of Architecture, Coimbatore.
                    </Localized>
                  </p>
                  <p>
                    <Localized>
                      Before establishing his own practice, he worked for approximately three years with leading organizations.
                    </Localized>
                  </p>
                  <p>
                    <Localized>
                      Mr. Senthil&apos;s primary interest is in developing conceptually strong and innovative designs and creating unique, high-performance buildings that respond to their context, constraints, clients, and architectural vision.
                    </Localized>
                  </p>
                </div>
              </section>

              {/* SECTION 3: PROFESSIONAL AFFILIATIONS */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full bg-nature-600" />
                  <h3 className="font-serif text-2xl sm:text-3xl text-ink-950 dark:text-white font-normal">
                    <Localized>Professional Affiliations</Localized>
                  </h3>
                </div>

                <p className="text-ink-700 dark:text-white/80 leading-relaxed text-sm sm:text-base font-light">
                  <Localized>
                    Mr. Senthil is the Chairman of the Indian Institute of Architects (IIA), Madurai Centre, and a member of the Council of Architecture (COA) and the Institute of Indian Interior Designers (IIID).
                  </Localized>
                </p>

                {/* Affiliations Cards */}
                <div className="grid sm:grid-cols-3 gap-3.5 pt-2">
                  <div className="p-4 rounded-xl border border-brand-500/20 bg-brand-500/5 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-mono text-xs uppercase tracking-wider font-semibold">
                      <Award className="w-4 h-4" />
                      <span>IIA Madurai</span>
                    </div>
                    <p className="text-xs text-ink-800 dark:text-white/80 font-medium">
                      <Localized>Chairman, Indian Institute of Architects (IIA), Madurai Centre</Localized>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-nature-500/20 bg-nature-500/5 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-nature-700 dark:text-nature-400 font-mono text-xs uppercase tracking-wider font-semibold">
                      <Landmark className="w-4 h-4" />
                      <span>COA Registered</span>
                    </div>
                    <p className="text-xs text-ink-800 dark:text-white/80 font-medium">
                      <Localized>Member, Council of Architecture (COA)</Localized>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-brand-500/20 bg-brand-500/5 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-mono text-xs uppercase tracking-wider font-semibold">
                      <Building2 className="w-4 h-4" />
                      <span>IIID Fellow</span>
                    </div>
                    <p className="text-xs text-ink-800 dark:text-white/80 font-medium">
                      <Localized>Member, Institute of Indian Interior Designers (IIID)</Localized>
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 4: OUR MISSION */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full bg-brand-600" />
                  <h3 className="font-serif text-2xl sm:text-3xl text-ink-950 dark:text-white font-normal">
                    <Localized>Our Mission</Localized>
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 pt-1">
                  {[
                    { text: "Creative design", isGreen: true },
                    { text: "Efficient and effective planning", isGreen: false },
                    { text: "Attention to detail and quality materials", isGreen: true },
                    { text: "Application of sustainable design principles", isGreen: false },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border transition-colors ${
                        item.isGreen
                          ? "border-nature-500/20 bg-nature-500/5"
                          : "border-brand-500/20 bg-brand-500/5"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-5 h-5 shrink-0 ${
                          item.isGreen ? "text-nature-600" : "text-brand-600"
                        }`}
                      />
                      <span className="text-xs sm:text-sm font-medium text-ink-900 dark:text-white">
                        <Localized>{item.text}</Localized>
                      </span>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="shrink-0 px-6 sm:px-10 py-4 border-t border-ink-900/10 dark:border-white/10 flex items-center justify-between bg-ink-900/[0.02] dark:bg-white/[0.02]">
              <span className="text-xs font-mono text-ink-500 dark:text-white/50 tracking-wider uppercase">
                <Localized>MADURAI, TAMIL NADU</Localized>
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-ink-950 dark:bg-white text-white dark:text-ink-950 text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <Localized>Close</Localized>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
