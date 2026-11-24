import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import RealTalk from "@/components/RealTalk";
import Teams from "@/components/Teams";
import Ambition from "@/components/Ambition";
import GetStarted from "@/components/GetStarted";
import Shop from "@/components/Shop";
import Instagram from "@/components/Instagram";
import Parents from "@/components/Parents";
import Footer from "@/components/Footer";

// The player-facing alternative (13–16): fewer sections, club info is linked from the footer
const Index = () => (
  <>
    <Nav />
    <main>
      <Hero />
      <Offer />
      <RealTalk />
      <Teams />
      <Ambition />
      <GetStarted />
      <Shop />
      <Instagram />
      <Parents />
    </main>
    <Footer />
  </>
);

export default Index;
