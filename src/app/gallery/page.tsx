"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Localized, useLanguage } from "@/providers/LanguageProvider";
import { GALLERY } from "@/data/gallery";

export default function GalleryPage() {
  const { language } = useLanguage();
  const isTamil = language === "ta";
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<(typeof GALLERY)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = category === "All" ? GALLERY : GALLERY.filter(item => item.category === category);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);
  return <><Navbar /><main className="pt-32 sm:pt-40 pb-24 bg-transparent min-h-screen">
    <Container>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-nature-500/25 bg-nature-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-nature-700 dark:text-nature-300">
          <span className="h-2 w-2 rounded-full bg-nature-500 animate-pulse" />
          <Localized>Gallery</Localized> / {GALLERY.length} <Localized>Selected Views</Localized>
        </span>
      </div>
      <h1 className={`font-serif text-ink-950 dark:text-white ${isTamil ? "text-[22px] sm:text-[24px] lg:text-[26px] leading-[1.3] font-medium" : "text-4xl sm:text-6xl"}`}>
        <Localized>Spaces, </Localized>
        <span className="italic font-light text-brand-600 dark:text-brand-400">
          <Localized>inside and out.</Localized>
        </span>
      </h1>
      <p className="mt-6 text-ink-600 dark:text-white/70 max-w-2xl leading-relaxed"><Localized>A closer look at our exterior elevations and interior designs, from homes and workplaces to healthcare and retail spaces.</Localized></p>
      <div className="flex flex-wrap gap-3 mt-10 mb-10" role="group" aria-label="Gallery categories">
        {["All", "Exterior Elevation", "Interior Design"].map(value => <button key={value} onClick={() => setCategory(value)} aria-pressed={value === category} className={`rounded-full px-5 py-3 text-sm border transition-all ${value === category ? "bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-500/20" : "border-ink-900/15 dark:border-white/20 text-ink-700 dark:text-white bg-white/60 dark:bg-black/30 backdrop-blur-sm hover:border-nature-500/40 hover:text-nature-700"}`}><Localized>{value}</Localized><span className="ml-2 opacity-75 font-mono text-xs font-bold">{value === "All" ? GALLERY.length : GALLERY.filter(item => item.category === value).length}</span></button>)}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visible.map((item, idx) => {
          const isGreen = idx % 2 === 0;
          return (
            <figure key={item.image} className={`liquid-glass-card rounded-3xl p-3 sm:p-3.5 relative overflow-hidden group shadow-sm transition-all duration-500 hover:-translate-y-1 ${
              isGreen ? "border-nature-500/20" : "border-brand-500/20"
            }`}>
              <div className="liquid-sheen-sweep" />
              <div className="liquid-glass-bevel" />
              <div className="relative z-10 flex flex-col h-full">
                <button 
                  onClick={() => setSelected(item)} 
                  className="relative aspect-square w-full overflow-hidden rounded-2xl border border-ink-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-4 bg-white/40" 
                  aria-label={`Enlarge ${item.title}`}
                >
                  <Image 
                    src={item.image} 
                    alt={`${item.title}${item.location ? `, ${item.location}` : ""} — ${item.category}`} 
                    fill 
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" 
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                  />
                  {item.status && (
                    <span className={`absolute top-3 left-3 px-3 py-1 backdrop-blur-md rounded-full text-xs font-mono font-medium text-white shadow-sm ${
                      item.status.toLowerCase().includes("ongoing") ? "bg-nature-700/90" : "bg-brand-700/90"
                    }`}>
                      <Localized>{item.status}</Localized>
                    </span>
                  )}
                  <span className={`absolute bottom-3 right-3 bg-white/95 backdrop-blur-md w-8 h-8 rounded-full grid place-items-center shadow-sm transition-transform duration-300 group-hover:rotate-45 ${
                    isGreen ? "text-nature-700" : "text-brand-600"
                  }`} aria-hidden="true">
                    ↗
                  </span>
                </button>
                <figcaption className="pt-4 pb-1 px-1">
                  <h2 className={`font-serif text-lg text-ink-950 dark:text-white transition-colors ${
                    isGreen ? "group-hover:text-nature-700" : "group-hover:text-brand-600"
                  }`}>
                    <Localized>{item.title}</Localized>
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-ink-600 dark:text-white/60 font-sans">
                    <Localized>{item.location || item.category}</Localized>
                  </p>
                </figcaption>
              </div>
            </figure>
          );
        })}
      </div>
    </Container>
    <dialog ref={dialog} onClose={() => setSelected(null)} onClick={e => { if(e.target === e.currentTarget) setSelected(null); }} className="w-[min(92vw,850px)] max-h-[90vh] rounded-3xl liquid-glass-card p-6 backdrop:bg-black/70 shadow-2xl border border-white/60 relative overflow-hidden" aria-labelledby="gallery-image-title">
      <div className="liquid-sheen-sweep" />
      <div className="liquid-glass-bevel" />
      {selected && (
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 id="gallery-image-title" className="font-serif text-2xl text-ink-950">{selected.title}</h2>
            <button autoFocus onClick={() => setSelected(null)} aria-label="Close image" className="rounded-full border border-ink-900/15 bg-white/80 px-4 py-2 text-sm font-mono hover:bg-ink-950 hover:text-white transition-colors">✕</button>
          </div>
          <div className="relative w-full rounded-2xl overflow-hidden border border-ink-900/10">
            <img src={selected.image} alt={`${selected.title} — ${selected.category}`} className="w-full max-h-[65vh] object-contain mx-auto" />
          </div>
          <p className="text-sm text-ink-600 mt-4 font-mono">{selected.location} · {selected.category}</p>
        </div>
      )}
    </dialog>
  </main><Footer /></>;
}
