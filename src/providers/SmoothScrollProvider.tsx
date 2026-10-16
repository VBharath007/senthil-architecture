"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    try {
      const navEntries = window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("navigation");
      let isReload = false;
      if (navEntries && navEntries.length > 0) {
        if ((navEntries[0] as PerformanceNavigationTiming).type === "reload") isReload = true;
      }
      if (!isReload && (window.performance as any)?.navigation?.type === 1) {
        isReload = true;
      }
      if (!isReload && sessionStorage.getItem("sa_was_reloaded") === "true") {
        isReload = true;
      }
      sessionStorage.removeItem("sa_was_reloaded");

      if (isReload) {
        const path = window.location.pathname;
        if (path !== "/" && path !== "") {
          window.location.replace("/");
          return;
        } else {
          window.scrollTo(0, 0);
        }
      }
    } catch (e) {}

    const handleBeforeUnload = () => {
      try {
        sessionStorage.setItem("sa_was_reloaded", "true");
      } catch (e) {}
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Initialize smooth scroll (Lenis)
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const lenis = new Lenis({
        duration: 0.85,
        smoothWheel: true,
        anchors: { offset: -100 },
        stopInertiaOnNavigate: true,
      });
      (window as any).__lenis = lenis;
      (window as any).lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);

      return () => {
        delete (window as any).__lenis;
        delete (window as any).lenis;
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => {
      media.revert();
    };
  }, []);

  // On ANY route/pathname change: immediately and unconditionally scroll to top (0, 0)
  useEffect(() => {
    const performReset = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (typeof document !== "undefined" && document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
      }
      const lenis = (window as any).__lenis || (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
    };

    // 1. Instant execution
    performReset();

    // 2. Next animation frame
    const frame1 = requestAnimationFrame(() => {
      performReset();
      ScrollTrigger.refresh();
    });

    // 3. Second animation frame (after React commit and DOM mount)
    const frame2 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        performReset();
        ScrollTrigger.refresh();
      });
    });

    // 4. Fallback check for any async image or layout shifts
    const timer1 = setTimeout(() => {
      performReset();
      ScrollTrigger.refresh();
    }, 30);

    const timer2 = setTimeout(() => {
      performReset();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
