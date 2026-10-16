"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Localized } from "@/providers/LanguageProvider";
import { ArrowRight, Play, Pause } from "lucide-react";

const photographs = [
  {
    image: "/assets/client/vengadesh-exterior.webp",
    title: "Mr. Vengadesh Advocate",
    location: "Kadachanendal, Madurai",
    category: "Residential Architecture",
    href: "/projects/mr-vengatesh-residence",
  },
  {
    image: "/assets/projects/ar-senthil-residence/exterior.webp",
    title: "Anandha Nilayam",
    location: "Ellis Nagar, Madurai",
    category: "Principal Residence",
    href: "/projects/ar-senthil-residence",
  },
  {
    image: "/assets/projects/lenin-advocate-office/built.webp",
    title: "Mr. Lenin Advocate’s Office",
    location: "Othakadai, Madurai",
    category: "Commercial Office",
    href: "/projects/lenin-advocate-office",
  },
];

// Repeat photographs to build dense continuous tracks for seamless infinite looping
const sequence = [
  ...photographs,
  ...photographs,
  ...photographs,
];

export function StudioPhotographs() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="mt-10 sm:mt-12">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-mono uppercase tracking-widest text-ink-600 dark:text-ink-400 font-bold">
            <Localized>Built Spaces · Real Photographs</Localized>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
            className="inline-flex items-center gap-1.5 text-xs font-mono underline underline-offset-4 text-ink-600 hover:text-ink-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            {paused ? <Play className="w-3 h-3 text-emerald-600" /> : <Pause className="w-3 h-3 text-amber-600" />}
            <Localized>{paused ? "Play motion" : "Pause motion"}</Localized>
          </button>
        </div>
      </div>

      {/* Automated Infinite Scroll Marquee Track with liquid glass cards */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] py-2 -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10">
        <div
          className="animate-marquee-continuous flex w-max"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {/* Half 1 */}
          <div className="flex shrink-0 items-center">
            {sequence.map((item, idx) => (
              <div key={`half1-${idx}`} className="pr-5 sm:pr-6 shrink-0">
                <Link
                  href={item.href}
                  className="liquid-glass-card rounded-3xl p-2.5 group relative overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-1 block w-[300px] sm:w-[360px] lg:w-[410px]"
                >
                  <div className="liquid-sheen-sweep" />
                  <div className="liquid-glass-bevel" />

                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink-950 z-10">
                    <Image
                      src={item.image}
                      alt={`${item.title}, ${item.location}`}
                      fill
                      sizes="(min-width: 1024px) 410px, (min-width: 640px) 360px, 300px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                    {/* Category pill */}
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-black/60 backdrop-blur-md text-white/90 border border-white/15 z-20">
                      <Localized>{item.category}</Localized>
                    </span>

                    {/* Information bottom overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white z-20">
                      <h3 className="font-serif text-base sm:text-lg lg:text-xl font-normal leading-snug text-white group-hover:text-amber-200 transition-colors">
                        <Localized>{item.title}</Localized>
                      </h3>
                      <div className="mt-1 flex items-center justify-between text-xs text-white/80 font-mono">
                        <span><Localized>{item.location}</Localized></span>
                        <span className="text-[11px] font-sans opacity-0 group-hover:opacity-100 transition-opacity text-amber-300 font-medium flex items-center gap-1">
                          <Localized>View Project</Localized> <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Half 2 (Exact duplicate for seamless infinite loop) */}
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {sequence.map((item, idx) => (
              <div key={`half2-${idx}`} className="pr-5 sm:pr-6 shrink-0">
                <Link
                  href={item.href}
                  tabIndex={-1}
                  className="liquid-glass-card rounded-3xl p-2.5 group relative overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-1 block w-[300px] sm:w-[360px] lg:w-[410px]"
                >
                  <div className="liquid-sheen-sweep" />
                  <div className="liquid-glass-bevel" />

                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink-950 z-10">
                    <Image
                      src={item.image}
                      alt={`${item.title}, ${item.location}`}
                      fill
                      sizes="(min-width: 1024px) 410px, (min-width: 640px) 360px, 300px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                    {/* Category pill */}
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-black/60 backdrop-blur-md text-white/90 border border-white/15 z-20">
                      <Localized>{item.category}</Localized>
                    </span>

                    {/* Information bottom overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white z-20">
                      <h3 className="font-serif text-base sm:text-lg lg:text-xl font-normal leading-snug text-white group-hover:text-amber-200 transition-colors">
                        <Localized>{item.title}</Localized>
                      </h3>
                      <div className="mt-1 flex items-center justify-between text-xs text-white/80 font-mono">
                        <span><Localized>{item.location}</Localized></span>
                        <span className="text-[11px] font-sans opacity-0 group-hover:opacity-100 transition-opacity text-amber-300 font-medium flex items-center gap-1">
                          <Localized>View Project</Localized> <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
