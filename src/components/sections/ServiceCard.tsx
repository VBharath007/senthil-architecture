import { Building2, Home, Compass, Leaf, Sofa, Briefcase, DraftingCompass, Cuboid, PencilRuler, FileSignature, Zap, Eye, ArrowUpRight, type LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const icons: Record<string, LucideIcon> = {
  Building2,
  Home,
  Compass,
  Leaf,
  Sofa,
  Briefcase,
  DraftingCompass,
  Cuboid,
  PencilRuler,
  FileSignature,
  Zap,
  Eye,
};

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
  delay?: number;
}

export function ServiceCard({
  icon,
  title,
  description,
  index,
  delay = 0,
}: ServiceCardProps) {
  const Icon = icons[icon] ?? Building2;
  const formattedIndex = index < 10 ? `0${index}` : `${index}`;

  return (
    <FadeIn delay={delay}>
      <div className="liquid-glass-card rounded-3xl group flex h-full flex-col justify-between p-6 sm:p-7 cursor-default">
        <div className="liquid-sheen-sweep" />
        <div className="liquid-glass-bevel" />
        <div className="relative z-10">
          {/* Top Meta Bar: Index Numeral & Delicately Outlined Icon */}
          <div className="flex items-center justify-between pb-5 border-b border-ink-900/10 dark:border-white/10">
            <span className="font-mono text-xs font-bold tracking-widest text-nature-700 dark:text-nature-400">
              {formattedIndex} / DISCIPLINE
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/80 dark:bg-white/10 text-nature-700 dark:text-nature-300 border border-nature-500/25 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:bg-nature-500 group-hover:text-white group-hover:border-nature-500">
              <Icon className="h-4 w-4" strokeWidth={1.85} />
            </span>
          </div>

          {/* Service Title */}
          <h3 className="font-serif text-lg sm:text-xl font-normal tracking-tight text-ink-950 mt-5 transition-colors group-hover:text-nature-700 dark:text-white dark:group-hover:text-nature-400">
            {title}
          </h3>

          {/* Clean Description */}
          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-700/80 dark:text-white/65">
            {description}
          </p>
        </div>

        {/* Minimalist Architectural Footer Bar */}
        <div className="relative z-10 mt-6 pt-3.5 border-t border-dashed border-ink-900/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-ink-500 dark:text-white/40">
          <span className="tracking-wider uppercase group-hover:text-ink-800 dark:group-hover:text-white/70 transition-colors">
            Scope Specification
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 text-ink-400 transition-all duration-300 group-hover:text-nature-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-white/40 dark:group-hover:text-nature-400" />
        </div>

      </div>
    </FadeIn>
  );
}
