import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Localized } from "@/providers/LanguageProvider";

export function PressFeature() {
  return <section className="py-20 sm:py-28 border-t border-ink-900/10 dark:border-white/10">
    <Container>
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-32">
          <p className="text-xs font-mono uppercase tracking-widest text-ink-600 dark:text-ink-400 mb-4"><Localized>In the Press</Localized></p>
          <h2 className="font-serif text-3xl sm:text-5xl text-ink-900 dark:text-white"><Localized>A home in the spotlight.</Localized></h2>
          <p className="mt-6 leading-relaxed text-ink-600 dark:text-white/70"><Localized>Dinamalar’s Kanavu Illam feature explores a home with a skywalk and includes insights from architect Senthil.</Localized></p>
          <a href="/assets/client/dinamalar-feature.webp" target="_blank" rel="noopener noreferrer" className="inline-flex mt-7 text-sm font-semibold text-ink-950 dark:text-white underline underline-offset-4"><Localized>Read the original Tamil feature</Localized> ↗</a>
        </div>
        <figure className="lg:col-span-8 liquid-glass-card rounded-3xl p-3 sm:p-5 shadow-xl relative overflow-hidden group">
          <div className="liquid-sheen-sweep" />
          <div className="liquid-glass-bevel" />
          <div className="relative z-10">
            <a href="/assets/client/dinamalar-feature.webp" target="_blank" rel="noopener noreferrer" aria-label="Open Dinamalar Tamil feature in full size">
              <Image src="/assets/client/dinamalar-feature.webp" alt="Dinamalar Kanavu Illam newspaper feature titled Veettukkul Sky Walk, with photographs and architect Senthil’s insights in Tamil." width={910} height={838} sizes="(min-width: 1024px) 65vw, 100vw" className="w-full h-auto rounded-2xl border border-ink-900/15 shadow-lg transition-transform duration-500 group-hover:scale-[1.01]" />
            </a>
            <figcaption className="mt-4 text-xs sm:text-sm font-mono text-ink-600 dark:text-ink-400"><Localized>Dinamalar · Kanavu Illam · Tamil press feature</Localized></figcaption>
          </div>
        </figure>
      </div>
    </Container>
  </section>;
}
