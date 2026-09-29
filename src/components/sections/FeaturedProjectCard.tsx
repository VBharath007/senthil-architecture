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
    <div className="flex w-full max-w-xl gap-4 sm:gap-5 rounded-2xl border border-ink-900/10 bg-white/90 p-3 sm:p-4 shadow-xl shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-ink-900/70 dark:shadow-black/30">
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-32">
        <Image
          src={image}
          alt={title}
          fill
          sizes="144px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-1.5">
        <span className="text-xs font-medium tracking-wide text-brand-600 dark:text-brand-300">
          {eyebrow}
        </span>
        <h3 className="text-base font-semibold text-ink-900 dark:text-white sm:text-lg">
          {title}
        </h3>
        <p className="text-sm leading-snug text-ink-700/70 dark:text-white/60">
          {description}
        </p>
        <a
          href="#projects"
          className="mt-1 inline-flex w-fit items-center gap-1.5 border-b border-brand-500 pb-0.5 text-xs font-medium text-ink-900 transition-colors hover:text-brand-600 dark:text-white dark:hover:text-brand-300"
        >
          Learn more
          <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
