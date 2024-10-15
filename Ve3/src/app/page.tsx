import PreHeroTitle from "@/components/section/pre-hero";
import FrontParticles from "@/components/section/front-particles";
import Hero from "@/components/section/hero";
import About from "@/components/section/about";
// import Education from "@/components/section/education";
// import Work from "@/components/section/work";
import Skills from "@/components/section/skills";
import Projects from "@/components/section/projects";
// import Hackathons from "@/components/section/hackathons";
import Contact from "@/components/section/contact";
import Timeline from "@/components/section/timeline";
import { Toaster } from "@/components/ui/toaster";

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <FrontParticles />
      <PreHeroTitle />
      <Hero />
      <About />
      <Timeline />
      {/* <Education /> */}
      {/* <Work /> */}
      <Skills />
      <Projects />
      {/* <Hackathons /> */}
      <Contact />
      <Toaster />
    </main >
  );
}
