import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}
