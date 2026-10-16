
import { Localized } from "@/providers/LanguageProvider";
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
  const isGreen = index % 2 !== 0; // Alternates Green and Red 50/50

  return (
    <FadeIn delay={delay} className="h-full">
      <div className={`liquid-glass-card rounded-[28px] group flex h-full flex-col justify-between p-6 sm:p-7 cursor-default transition-all duration-300 ${
        isGreen ? "border-nature-500/20" : "border-brand-500/20"
      }`}>
        <div className="liquid-sheen-sweep" />
        <div className="liquid-glass-bevel" />
        <div className="relative z-10">
          {/* Top Meta Bar: Index Numeral & Delicately Outlined Icon Capsule */}
          <div className="flex items-center justify-between pb-5 border-b border-ink-900/10 dark:border-white/10">
            <span className={`font-mono text-xs font-bold tracking-widest ${
              isGreen ? "text-nature-700 dark:text-nature-400" : "text-brand-600 dark:text-brand-400"
            }`}>
              <Localized>{formattedIndex}</Localized><Localized> / DISCIPLINE
              </Localized></span>
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 border shadow-sm ${
              isGreen
                ? "bg-nature-500/10 border-nature-500/25 text-nature-700 dark:text-nature-400 group-hover:bg-nature-600 group-hover:text-white"
                : "bg-brand-500/10 border-brand-500/25 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white"
            }`}>
              <Icon className="h-4 w-4" strokeWidth={1.85} />
            </span>
          </div>

          {/* Service Title */}
          <h3 className={`font-serif text-xl sm:text-2xl font-normal tracking-tight text-ink-950 mt-5 transition-colors dark:text-white ${
            isGreen ? "group-hover:text-nature-700 dark:group-hover:text-nature-400" : "group-hover:text-brand-600 dark:group-hover:text-brand-400"
          }`}>
            <Localized>{title}</Localized>
          </h3>

          {/* Clean Description */}
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-700/85 dark:text-white/70">
            <Localized>{description}</Localized>
          </p>
        </div>

        {/* Minimalist Architectural Footer Bar */}
        <div className="relative z-10 mt-6 pt-4 border-t border-ink-900/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-ink-500 dark:text-white/50">
          <span className="tracking-wider uppercase group-hover:text-ink-800 dark:group-hover:text-white/80 transition-colors"><Localized>
            Scope Specification
          </Localized></span>
          <ArrowUpRight className={`h-3.5 w-3.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            isGreen ? "text-nature-600 group-hover:text-nature-700" : "text-brand-600 group-hover:text-brand-600"
          }`} />
        </div>

      </div>
    </FadeIn>
  );
}
