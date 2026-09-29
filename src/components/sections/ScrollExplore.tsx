export function ScrollExplore() {
  return (
    <a
      href="#about"
      className="group hidden items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-ink-700/60 transition-colors hover:text-brand-600 dark:text-white/50 dark:hover:text-brand-300 md:flex"
    >
      <span className="h-px w-10 bg-current opacity-40" />
      SCROLL
      <span className="flex h-9 w-6 items-center justify-center rounded-full border border-current opacity-70">
        <span className="h-1.5 w-1.5 animate-bounce-slow rounded-full bg-current" />
      </span>
      EXPLORE
      <span className="h-px w-10 bg-current opacity-40" />
    </a>
  );
}
