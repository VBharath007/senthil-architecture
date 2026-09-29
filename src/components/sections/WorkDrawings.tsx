import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { WORK_DRAWINGS } from "@/data/site";
import { CheckCircle2, Compass, Building2, Zap, Sofa, Trees, type LucideIcon } from "lucide-react";
import Image from "next/image";

const categoryIcons: Record<string, LucideIcon> = {
  "Architectural Drawings": Compass,
  "Structural Drawings": Building2,
  "Services Drawings": Zap,
  "Interior & Finish Drawings": Sofa,
  "Exterior & Supervision": Trees,
};

export function WorkDrawings() {
  return (
    <section id="drawings" className="relative overflow-hidden py-24 sm:py-32 bg-ink-50/50 dark:bg-ink-950/70">
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Technical Documentation"
          title="Work Stage Drawings"
          align="center"
          description="Comprehensive engineering and architectural drawings produced with micrometer precision for seamless on-site execution."
        />

        <div className="mt-20 flex flex-col gap-24 lg:gap-32">
          {WORK_DRAWINGS.map((drawing, i) => {
            const Icon = categoryIcons[drawing.category] ?? Compass;
            // Alternating layout: even index = image on left, odd index = image on right for better visual flow
            const isImageLeft = i % 2 === 0;

            return (
              <div key={drawing.category} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                
                {/* Image Side */}
                <FadeIn 
                  delay={0.1} 
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-ink-900/10 dark:bg-ink-900/50 shadow-xl dark:shadow-2xl dark:shadow-black/50 ${!isImageLeft ? 'lg:order-2' : ''}`}
                >
                  <Image
                    src={drawing.image}
                    alt={drawing.category}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-ink-950/10 pointer-events-none" />
                </FadeIn>

                {/* Content Side */}
                <FadeIn 
                  delay={0.2} 
                  className={`flex flex-col ${!isImageLeft ? 'lg:order-1' : ''}`}
                >
                  {/* Header */}
                  <div className="flex items-center gap-5 mb-8">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm border border-ink-900/5 text-nature-600 dark:bg-white/5 dark:border-white/10 dark:text-nature-400">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="text-4xl sm:text-5xl font-serif tracking-tight text-ink-900 dark:text-white mb-3">
                        {drawing.category}
                      </h3>
                      <div className="flex items-center gap-4">
                        <span className="text-sm sm:text-base font-mono text-ink-500 dark:text-white/40 uppercase tracking-widest">
                          Stage 0{i + 1}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-ink-300 dark:bg-white/20" />
                        <span className="text-sm sm:text-base font-mono text-nature-600 dark:text-nature-400 font-semibold uppercase tracking-widest">
                          {drawing.items.length} Details
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mt-4">
                    {drawing.items.map((item) => (
                      <div key={item} className="flex items-start gap-4 group/item">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nature-500/15 text-nature-600 dark:bg-nature-500/20 dark:text-nature-400 transition-colors group-hover/item:bg-nature-500 group-hover/item:text-white">
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                        <span className="text-base sm:text-lg font-medium leading-relaxed text-ink-700/90 dark:text-white/70 group-hover/item:text-ink-950 dark:group-hover/item:text-white transition-colors">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </FadeIn>

              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}