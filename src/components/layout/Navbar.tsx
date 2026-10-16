"use client";
import { Localized } from "@/providers/LanguageProvider";


import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/providers/LanguageProvider";
import { NAV_LINKS } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const handleNavClick = () => {
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

  const isDarkHero = !scrolled && (pathname === "/about" || pathname === "/services" || pathname.startsWith("/projects"));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
          ? "border-b border-ink-900/10 bg-white/80 backdrop-blur-lg dark:border-white/10 dark:bg-ink-950/80"
          : "border-b border-transparent bg-transparent"
        }`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-3.5 sm:px-5 lg:px-5 xl:px-6 2xl:px-8 flex h-16 sm:h-20 items-center justify-between gap-1.5 sm:gap-2 min-[1250px]:gap-3 xl:gap-4 2xl:gap-6">
        {/* Brand / Logo */}
        <Link href="/" onClick={() => handleNavClick()} className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 shrink-0 group">
          <img
            src="/images/logo.png"
            alt="Senthil Associates Logo"
            className="h-7 sm:h-9 lg:h-11 xl:h-12 w-auto object-contain shrink-0 transition-all duration-500 group-hover:scale-[1.02]"
          />
          <div className="flex flex-col justify-center shrink-0">
            <span className={`text-[10px] min-[340px]:text-[10.5px] min-[380px]:text-[11.5px] sm:text-base lg:text-[14px] xl:text-[15px] font-bold leading-tight tracking-tight whitespace-nowrap transition-colors ${
              isDarkHero ? "text-white" : "text-ink-950 dark:text-white"
            }`}><Localized>SENTHIL ASSOCIATES</Localized></span>
            <span className={`hidden sm:block min-[1160px]:max-[1359px]:hidden min-[1360px]:block text-[8px] xl:text-[9.5px] font-semibold tracking-wide whitespace-nowrap transition-colors ${
              isDarkHero ? "text-white/70" : "text-ink-950/70 dark:text-white/70"
            }`}><Localized>ARCHITECTURE | INTERIOR DESIGN</Localized></span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-0.5 min-[1250px]:gap-1 xl:gap-2 2xl:gap-3 min-[1160px]:flex shrink-0">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => handleNavClick()}
                className={`relative px-1.5 py-1 min-[1250px]:px-2 xl:px-2.5 text-xs min-[1250px]:text-[12.5px] xl:text-[13.5px] font-medium transition-colors whitespace-nowrap rounded-md ${
                  isActive
                    ? `${isDarkHero ? "text-white" : "text-brand-600"} font-bold`
                    : `${isDarkHero ? "text-white/80 hover:text-white" : "text-ink-700 hover:text-ink-950 hover:bg-black/5 dark:hover:bg-white/5"}`
                }`}
              >
                <Localized>{link.label}</Localized>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-1.5 right-1.5 h-[2px] bg-brand-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Action Buttons */}
        <div className="hidden items-center gap-2 xl:gap-2.5 min-[1160px]:flex shrink-0">
          <LanguageToggle />
          <Button href="/contact" variant="red" className="!text-xs !px-3 !py-1.5 xl:!px-3.5 xl:!py-2 shadow-sm whitespace-nowrap !gap-1.5"><Localized>
            Contact Us
          </Localized></Button>
        </div>

        {/* Mobile controls grouped neatly on the right */}
        <div className="flex items-center gap-1 sm:gap-2 min-[1160px]:hidden shrink-0 ml-auto pr-1 sm:pr-0">
          <LanguageToggle />
          <button
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className={`flex items-center justify-center rounded-full border p-1.5 sm:p-2 shrink-0 transition-colors mr-0.5 sm:mr-0 ${
              isDarkHero ? "border-white/20 text-white" : "border-ink-900/15 text-ink-900 dark:border-white/15 dark:text-white"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-ink-900/10 bg-white/95 backdrop-blur-lg dark:border-white/10 dark:bg-ink-950/95 min-[1160px]:hidden"
          >
            <Container className="flex flex-col gap-5 py-6">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => {
                      setOpen(false);
                      handleNavClick();
                    }}
                    className={`text-base ${isActive
                        ? "text-ink-950 font-bold"
                        : "text-ink-600 hover:text-ink-950"
                      }`}
                  >
                    <Localized>{link.label}</Localized>
                  </Link>
                );
              })}
              <div className="flex items-center justify-between pt-4 border-t border-ink-900/10 dark:border-white/10">
                <LanguageToggle />
                <Button href="/contact" variant="red" className="text-xs px-4 py-2"><Localized>
                  Contact Us
                </Localized></Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
