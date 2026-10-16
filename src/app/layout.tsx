import type { Metadata } from "next";
import "./globals.css";
// import "./corrections.css";
import { InkExperience } from "@/components/motion/InkExperience";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";



export const metadata: Metadata = {
  title: "Senthil Associates | Architects & Interior Designers, Madurai",
  description:
    "Senthil Associates, established in 2002 in Madurai. Architecture, interior design and landscape design. Design your space together.",
};

import { ArchitecturalBackground } from "@/components/layout/ArchitecturalBackground";

// Runs before hydration so the correct theme class is already on <html>
// when the page paints, scroll restoration is set to manual, and any page refresh
// redirects to the Home page hero section at scroll (0, 0).
const headInitScript = `
document.documentElement.classList.remove("dark");
(function() {
  try {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    var isReload = false;
    var navEntries = window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType('navigation');
    if (navEntries && navEntries.length > 0) {
      if (navEntries[0].type === 'reload') isReload = true;
    }
    if (!isReload && window.performance && window.performance.navigation) {
      if (window.performance.navigation.type === 1) isReload = true;
    }
    if (!isReload && sessionStorage.getItem('sa_was_reloaded') === 'true') {
      isReload = true;
    }
    sessionStorage.removeItem('sa_was_reloaded');

    if (isReload) {
      var currentPath = window.location.pathname;
      if (currentPath !== '/' && currentPath !== '') {
        window.location.replace('/');
        return;
      } else {
        window.scrollTo(0, 0);
      }
    }

    window.addEventListener('beforeunload', function() {
      try { sessionStorage.setItem('sa_was_reloaded', 'true'); } catch(e) {}
    });
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@300;400;500;600;700;800&family=Noto+Serif+Tamil:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: headInitScript }} />
      </head>
      <body className="font-sans bg-[#ededed] text-ink-950 antialiased selection:bg-ink-900/10 selection:text-ink-950">
        <ArchitecturalBackground />
        <LanguageProvider>
          <ThemeProvider>
            <SmoothScrollProvider>
              <InkExperience />
              <div className="relative z-10">
                {children}
              </div>
            </SmoothScrollProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
