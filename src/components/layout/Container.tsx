import type { HTMLAttributes, ReactNode } from "react";

export function Container({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
