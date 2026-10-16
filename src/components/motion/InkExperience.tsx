"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
// All animation surfaces are image-sized. Text is never covered by a paint layer.
export function InkExperience() {
  const path = usePathname();
  useEffect(() => {
    const media = gsap.matchMedia();
    const hero = document.querySelector<HTMLElement>("#home-hero, #about-hero, #projects-hero, #services-hero, main section");
    hero?.classList.add("ink-hero");
    const cleanup: (() => void)[] = [];
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // One short wipe per image, not a persistent full-document compositing layer.
      document.querySelectorAll<HTMLImageElement>("main img").forEach(img => {
        if (hero?.contains(img) || img.closest("[aria-hidden='true']")) return;
        let overlay: HTMLImageElement | null = null;
        let reset: ReturnType<typeof setTimeout> | undefined;
        const reveal = () => {
          const parent = img.parentElement;
          if (!parent || parent.clientHeight > 1000 || parent.clientHeight < 90) return;
          overlay = img.cloneNode(true) as HTMLImageElement;
          overlay.removeAttribute("id"); overlay.removeAttribute("srcset");
          overlay.alt = ""; overlay.setAttribute("aria-hidden", "true");
          overlay.className = "paint-wipe";
          Object.assign(overlay.style, { position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)", pointerEvents: "none", zIndex: "2" });
          if (getComputedStyle(parent).position === "static") parent.style.position = "relative";
          parent.appendChild(overlay);
          gsap.fromTo(overlay, { clipPath: "polygon(0% -35%,10% -20%,20% -32%,30% -10%,40% -30%,50% -5%,60% -25%,70% -14%,80% -32%,90% -18%,100% -30%,100% 100%,0% 100%)" }, { clipPath: "polygon(0% 125%,10% 140%,20% 128%,30% 150%,40% 130%,50% 155%,60% 135%,70% 146%,80% 128%,90% 142%,100% 130%,100% 100%,0% 100%)", duration: 1.8, ease: "power1.inOut", onComplete: () => { overlay?.remove(); reset = setTimeout(() => img.classList.remove("paint-revealed"), 600); } });
        };
        ScrollTrigger.create({ trigger: img, start: "top 85%", once: true, onEnter: reveal });
        cleanup.push(() => { clearTimeout(reset); if (overlay) { gsap.killTweensOf(overlay); overlay.remove(); } img.classList.remove("paint-revealed"); });
      });
    });
    const videos = [...document.querySelectorAll<HTMLVideoElement>("video")];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.play().catch(() => { }); else video.pause();
    }));
    videos.forEach(v => { v.controls = true; observer.observe(v); });
    return () => { media.revert(); cleanup.forEach(fn => fn()); observer.disconnect(); };
  }, [path]);
  return null;
}
