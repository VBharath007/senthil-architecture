"use client";

import { Localized } from "@/providers/LanguageProvider";
import Link from "next/link";
import { Container } from "./Container";
import { COMPANY } from "@/data/site";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const resetScrollToTop = () => {
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

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-[#f5f0e8] dark:bg-[#161412] text-[#2a241e] dark:text-[#ece4d9] border-t border-[#d8cdbf]/80 dark:border-white/10 pt-16 pb-8 transition-colors duration-500 select-none">

      {/* Architectural Background Sketch Drawings */}
      {/* 1. Bottom-Left Botanical Pencil Leaves (Naturally growing from the corner) */}
      <div className="absolute bottom-0 left-0 w-[220px] sm:w-[280px] md:w-[320px] lg:w-[350px] pointer-events-none select-none z-0 opacity-90 dark:opacity-35 mix-blend-multiply dark:mix-blend-screen">
        <img
          src="/assets/footer-botanical-realistic.png"
          alt="Botanical Pencil Sketch"
          className="w-full h-auto object-contain object-left-bottom"
        />
      </div>

      {/* 2. Right-Side Luxury Villa Architectural Sketch (Desktop background) */}
      <div className="hidden lg:block absolute right-0 bottom-0 top-0 w-[36%] max-w-[560px] pointer-events-none select-none z-0">
        <img
          src="/assets/footer-villa-feathered.png"
          alt="Architectural Villa Drawing"
          className="w-full h-full object-contain object-right-bottom mix-blend-multiply dark:mix-blend-screen opacity-95 dark:opacity-35"
        />
      </div>

      {/* Main Content Container */}
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0 pb-12 items-start">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 lg:pr-8 flex flex-col gap-3.5">
            <Link href="/" onClick={() => resetScrollToTop()} className="inline-flex items-center gap-3.5 group w-max">
              <img
                src="/assets/footer-logo-clean.png"
                alt="Senthil Associates Logo"
                className="h-12 sm:h-13 w-12 sm:w-13 rounded-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-base sm:text-lg font-bold text-[#1f1b16] dark:text-[#f4efe8] uppercase leading-tight">
                  <Localized>{COMPANY.name}</Localized>
                </span>
                <span className="text-[9px] sm:text-[9.5px] tracking-[0.16em] text-[#635a50] dark:text-[#b8ad9f] uppercase font-sans font-medium mt-0.5">
                  <Localized>ARCHITECTURE / INTERIORS / CONSTRUCTION</Localized>
                </span>
              </div>
            </Link>

            {/* Subtle horizontal separator line */}
            <div className="w-12 border-t border-[#c8bcad] dark:border-white/20 my-1" />

            {/* Company Description */}
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#52493f] dark:text-[#cfc4b6] max-w-sm">
              <Localized>{COMPANY.name}</Localized><Localized> — Delivering conceptually strong, performative architectural solutions rooted in nature and designed for the future.</Localized>
            </p>

            {/* Contact Us Link */}
            <Link
              href="/contact"
              onClick={() => resetScrollToTop()}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#1f1b16] dark:text-white hover:underline underline-offset-4 mt-1 transition-colors"
            >
              <Localized>Contact Us</Localized> ↗
            </Link>

            {/* Social Media Links (Original Logos) */}
            <div className="flex items-center gap-3 pt-1.5">
              <a
                href="https://www.facebook.com/architecture.interiordesign.consultancy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-7 w-7 rounded-lg overflow-hidden transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <img src="/assets/facebook.svg" alt="Facebook" className="w-full h-full object-contain" />
              </a>
              <a
                href="https://www.instagram.com/senthil_associates?stkn=NXNwaDhvNWxqZTAx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-7 w-7 rounded-lg overflow-hidden transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <img src="/assets/instagram.svg" alt="Instagram" className="w-full h-full object-contain" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 lg:border-l lg:border-[#d8cdbf] dark:lg:border-white/10 lg:pl-8 lg:pr-4 flex flex-col">
            <h4 className="font-serif italic text-xl sm:text-2xl font-normal text-[#231f1a] dark:text-[#f4efe8] mb-4">
              <Localized>Quick Links</Localized>
            </h4>
            <ul className="flex flex-col gap-1.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => resetScrollToTop()}
                    className="group flex items-center justify-between text-xs sm:text-[13px] text-[#4a4239] dark:text-[#cfc4b6] hover:text-[#181410] dark:hover:text-white transition-colors py-0.5"
                  >
                    <span><Localized>{link.label}</Localized></span>
                    <span className="text-xs transition-transform duration-300 group-hover:translate-x-1 opacity-70 group-hover:opacity-100">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get In Touch */}
          <div className="lg:col-span-3 lg:border-l lg:border-[#d8cdbf] dark:lg:border-white/10 lg:pl-8 lg:pr-4 flex flex-col">
            <h4 className="font-serif italic text-xl sm:text-2xl font-normal text-[#231f1a] dark:text-[#f4efe8] mb-4">
              <Localized>Get In Touch</Localized>
            </h4>
            <div className="space-y-3 text-xs sm:text-[13px] text-[#4a4239] dark:text-[#cfc4b6] mb-5">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[#231f1a] dark:text-white mt-0.5" />
                <span className="leading-relaxed"><Localized>{COMPANY.address}</Localized></span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#231f1a] dark:text-white" />
                <a href={`tel:${COMPANY.phone}`} className="hover:text-[#181410] dark:hover:text-white transition-colors">
                  <Localized>{COMPANY.phone}</Localized>
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#231f1a] dark:text-white" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-[#181410] dark:hover:text-white transition-colors">
                  <Localized>{COMPANY.email}</Localized>
                </a>
              </p>
            </div>
          </div>

          {/* Column 4: Mobile Villa Sketch for small/medium screens */}
          <div className="block lg:hidden col-span-1 md:col-span-2 pt-6 w-full max-w-sm mx-auto">
            <img
              src="/assets/footer-villa-feathered.png"
              alt="Architectural Sketch"
              className="w-full h-auto object-contain mix-blend-multiply dark:mix-blend-screen opacity-90 dark:opacity-40"
            />
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-8 pt-5 border-t border-[#d8cdbf] dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#635a50] dark:text-[#a89d8f] relative z-10">
          <p>© <Localized>{new Date().getFullYear()}</Localized> <Localized>{COMPANY.name}. All rights reserved.</Localized></p>
        </div>
      </Container>
    </footer>
  );
}
