import { useState } from "react";
import BootHero from "@/components/BootHero";
import Journey from "@/components/Journey";
import HowIWork from "@/components/HowIWork";
import Toolbox from "@/components/Toolbox";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  // Bumping this replays the boot sequence
  const [bootKey, setBootKey] = useState(0);

  // Jump straight to the top so the page doesn't visibly scroll past the
  // other sections before the boot starts
  const reboot = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setBootKey((k) => k + 1);
  };

  return (
    <main className="min-h-screen bg-term-bg">
      <BootHero bootKey={bootKey} />
      <Journey onReboot={reboot} />
      <HowIWork />
      <Toolbox />
      <Testimonials />
      <Team />
      <Contact />
      <Footer onReboot={reboot} />
    </main>
  );
};

export default Index;
