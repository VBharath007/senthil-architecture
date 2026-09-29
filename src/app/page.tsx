import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HomeAbout } from "@/components/sections/HomeAbout";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { ContactCta } from "@/components/sections/ContactCta";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { Process } from "@/components/sections/Process";
import { WorkDrawings } from "@/components/sections/WorkDrawings";
import { Awards } from "@/components/sections/Awards";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Awards />
        <HomeAbout />
        
        <Process />
        <Services />
        <WorkDrawings />
        <Projects />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
