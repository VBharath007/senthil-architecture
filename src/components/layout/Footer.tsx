import Link from "next/link";
import { Container } from "./Container";
import { NAV_LINKS, COMPANY, SERVICES } from "@/data/site";
import { MapPin, Phone, Mail, Landmark } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-ink-900/10 bg-white py-14 dark:border-white/10 dark:bg-ink-950">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-ink-900/10 dark:border-white/10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="Senthil Associates Logo"
                className="h-16 w-auto transition-transform hover:scale-105"
              />
            </Link>
            <p className="text-sm leading-relaxed text-ink-700/70 dark:text-white/60 max-w-sm">
              {COMPANY.name} — Delivering conceptually strong, performative architectural solutions rooted in nature and designed for the future.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
              <Landmark className="h-4 w-4" />
              <span>IIA • COA • IIID Certified Practice</span>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-ink-900 dark:text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-ink-700/70 hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-ink-900 dark:text-white mb-4">
              Core Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-700/70 dark:text-white/60">
              <li>Architectural Design & Planning</li>
              <li>Interior Architecture & Styling</li>
              <li>Turnkey Design + Build Execution</li>
              <li>Project Supervision & Working Drawings</li>
              <li>Landscape Architecture</li>
            </ul>
          </div>

          {/* Studio Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-ink-900 dark:text-white mb-4">
              Madurai Studio
            </h4>
            <div className="space-y-3 text-xs text-ink-700/70 dark:text-white/60">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-brand-500 mt-0.5" />
                <span className="whitespace-pre-line leading-relaxed">{COMPANY.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-500" />
                <a href={`tel:${COMPANY.phone}`} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                  {COMPANY.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand-500" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                  {COMPANY.email}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-700/50 dark:text-white/40">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>Ellis Nagar, Madurai</span>
            <span>•</span>
            <span>Sustainable Architecture</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
