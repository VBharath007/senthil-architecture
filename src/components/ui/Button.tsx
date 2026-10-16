import { ArrowRight, Play } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "ghost" | "outline" | "red";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  icon?: "arrow" | "play" | "none";
  children: ReactNode;
}

const base =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink-950 text-white hover:bg-ink-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-ink-950",
  outline:
    "border border-ink-900/20 text-ink-900 hover:text-black hover:border-ink-900/40 hover:bg-black/5 transition-all duration-300",
  ghost:
    "text-ink-700 hover:text-black hover:bg-black/5 transition-all duration-300",
  red:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-brand-600",
};

export function Button({
  variant = "primary",
  icon = "arrow",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Link href={props.href || "#"} className={`${base} ${variants[variant]} ${className}`} {...(props as any)}>
      {icon === "play" && (
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current">
          <Play className="h-3.5 w-3.5 fill-current" />
        </span>
      )}
      {children}
      {icon === "arrow" && <ArrowRight className="h-4 w-4" />}
    </Link>
  );
}
