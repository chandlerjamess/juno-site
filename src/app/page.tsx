import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import Workflow from "@/components/sections/Workflow";
import Benefits from "@/components/sections/Benefits";
import Compliance from "@/components/sections/Compliance";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <Workflow />
        <Benefits />
        <Compliance />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
