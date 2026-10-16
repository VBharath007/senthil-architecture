import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HomeAbout } from "@/components/sections/HomeAbout";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { WorkDrawings } from "@/components/sections/WorkDrawings";
import { Awards } from "@/components/sections/Awards";
import { HomeTestimonial } from "@/components/sections/HomeTestimonial";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContinuousPaintReveal } from "@/components/ui/ContinuousPaintReveal";

export default function Home() {
  return (
    <div className="min-h-screen relative text-ink-950">
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />

          <ContinuousPaintReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <Awards />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <HomeAbout />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <HomeTestimonial />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <Services />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <WorkDrawings />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <Projects />
            </ScrollReveal>

            <Footer />
          </ContinuousPaintReveal>
        </main>
      </div>
    </div>
  );
}
