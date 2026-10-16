
import { Localized } from "@/providers/LanguageProvider";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface FeaturedProjectCardProps {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
}

export function FeaturedProjectCard({
  image,
  eyebrow,
  title,
  description,
}: FeaturedProjectCardProps) {
  return (
    <div className="liquid-glass-card rounded-2xl flex w-full max-w-xl gap-4 sm:gap-5 p-3.5 sm:p-4 shadow-xl relative overflow-hidden group">
      <div className="liquid-sheen-sweep" />
      <div className="liquid-glass-bevel" />
      <div className="relative z-10 flex w-full gap-4 sm:gap-5 items-center">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-32 border border-ink-900/10">
          <Image
            src={image}
            alt={title}
            fill
            sizes="144px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center gap-1.5 flex-1 min-w-0">
          <span className="text-xs font-mono uppercase tracking-wider font-semibold text-ink-600 dark:text-ink-400">
            <Localized>{eyebrow}</Localized>
          </span>
          <h3 className="text-base font-semibold text-ink-950 dark:text-white sm:text-lg truncate">
            <Localized>{title}</Localized>
          </h3>
          <p className="text-xs sm:text-sm leading-snug text-ink-700/80 dark:text-white/60 line-clamp-2">
            <Localized>{description}</Localized>
          </p>
          <a
            href="#projects"
            className="mt-1 inline-flex w-fit items-center gap-1.5 border-b border-ink-900 pb-0.5 text-xs font-mono font-medium text-ink-950 transition-colors hover:text-ink-600 dark:text-white"
          ><Localized>
            Learn more
            </Localized><ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
