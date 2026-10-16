import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Localized } from "@/providers/LanguageProvider";

const topics = [
  ["Budget & design fees", "Discuss your priorities, project scope and design fees before planning begins."],
  ["Natural light & ventilation", "Plan comfortable spaces that welcome daylight and fresh air."],
  ["Modern, space-saving design", "Make thoughtful use of every room with practical layouts and integrated storage."],
  ["Vastu preferences", "Share your Vastu requirements so they can be considered alongside the site and your lifestyle."],
  ["Site visits & approvals", "Understand architect site visits, structural drawings and the approval process."],
  ["3D designs & views", "Explore the design through 3D views before moving into execution."],
];

export function ClientQueries() {
  return <section id="client-queries" className="py-20 sm:py-28 bg-transparent">
    <Container>
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <figure className="lg:col-span-5 liquid-glass-card rounded-3xl p-3 sm:p-4 shadow-lg relative">
          <div className="liquid-sheen-sweep" />
          <div className="liquid-glass-bevel" />
          <div className="relative z-10 overflow-hidden rounded-2xl border border-ink-900/10 bg-white/90">
            <Image src="/assets/client/client-queries.png" alt="Client queries: budget-friendly design, design fees, natural light and ventilation, space-saving designs, Vastu, architect site visits, structural drawings and approvals, and 3D views." width={502} height={497} sizes="(min-width: 1024px) 40vw, 100vw" className="w-full h-auto" />
            <figcaption className="px-5 py-3.5 text-xs sm:text-sm text-ink-700 font-medium border-t border-ink-900/10 bg-white/70"><Localized>Your questions shape our design.</Localized></figcaption>
          </div>
        </figure>
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-nature-500/25 bg-nature-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-nature-700 dark:text-nature-300">
              <span className="h-2 w-2 rounded-full bg-nature-500 animate-pulse" />
              <Localized>Client Queries</Localized>
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-ink-950 dark:text-white leading-tight">
            <Localized>Good design begins with a </Localized>
            <span className="font-serif italic font-light text-brand-600 dark:text-brand-400">
              <Localized>conversation.</Localized>
            </span>
          </h2>
          <p className="mt-5 text-ink-600 dark:text-white/70 leading-relaxed"><Localized>From your budget to the way your home feels, we begin by understanding what matters to you.</Localized></p>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mt-8">
            {topics.map(([title, description], i) => {
              const isGreen = i % 2 === 0;
              return (
                <div key={title} className={`liquid-glass-card rounded-2xl p-5 relative flex flex-col justify-between ${
                  isGreen ? "border-nature-500/20" : "border-brand-500/20"
                }`}>
                  <div className="liquid-sheen-sweep" />
                  <div className="liquid-glass-bevel" />
                  <div className="relative z-10">
                    <span className={`font-mono text-[11px] font-bold px-2.5 py-1 rounded-md border ${
                      isGreen
                        ? "text-nature-700 dark:text-nature-300 bg-nature-500/10 border-nature-500/20"
                        : "text-brand-700 dark:text-brand-300 bg-brand-500/10 border-brand-500/20"
                    }`}>
                      0{i + 1}
                    </span>
                    <h3 className="text-base font-serif font-medium text-ink-950 dark:text-white mt-3.5"><Localized>{title}</Localized></h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-ink-700/80 dark:text-white/65 mt-2"><Localized>{description}</Localized></p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/contact" className="inline-flex mt-8 px-6 py-3 bg-brand-600 text-white rounded-full text-sm font-semibold hover:bg-brand-700 shadow-md shadow-brand-500/20 transition-all hover:scale-105"><Localized>Discuss Your Project</Localized> <span aria-hidden="true" className="ml-3">↗</span></Link>
        </div>
      </div>
    </Container>
  </section>;
}
