"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-900/10 bg-white/80 backdrop-blur-lg dark:border-white/10 dark:bg-ink-950/80"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 sm:h-20 lg:h-24 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 max-w-[75%] sm:max-w-none">
          <img src="/images/logo.png" alt="Senthil Associates Logo" className="h-10 sm:h-16 lg:h-20 w-auto object-contain shrink-0" />
          <div className="flex flex-col justify-center">
            <span className="text-sm sm:text-base lg:text-lg font-bold text-ink-950 dark:text-white leading-tight">SENTHIL ASSOCIATES</span>
            <span className="hidden sm:block text-[10px] sm:text-xs text-ink-950/70 dark:text-white/70 font-semibold tracking-wide">ARCHITECTURE | CONSTRUCTION | INTERIOR DESIGN</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "text-brand-500 font-medium dark:text-brand-500"
                    : "text-ink-700/80 hover:text-nature-700 dark:text-white/75 dark:hover:text-nature-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <Button href="/#contact" variant="primary" className="text-xs">
            Contact Us
          </Button>
        </div>

        <button
          className="flex items-center justify-center rounded-full border border-ink-900/15 p-2 text-ink-900 dark:border-white/15 dark:text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-ink-900/10 bg-white/95 backdrop-blur-lg dark:border-white/10 dark:bg-ink-950/95 lg:hidden"
          >
            <Container className="flex flex-col gap-5 py-6">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-base ${
                      isActive
                        ? "text-brand-500 font-medium dark:text-brand-500"
                        : "text-ink-800 dark:text-white/85"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex items-center justify-between pt-2">
                <ThemeToggle />
                <Button href="/#contact" variant="primary" className="text-xs">
                  Contact Us
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
