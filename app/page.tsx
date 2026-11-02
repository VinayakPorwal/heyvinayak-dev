import { sections } from "@/data";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { Process } from "@/components/sections/Process";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { Testimonials } from "@/components/sections/Testimonials";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Services />
        {sections.work && <Work />}
        {sections.experience && <Experience />}
        <Process />
        <TechStack />
        {sections.projects && <Projects />}
        <About />
        {sections.testimonials && <Testimonials />}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
