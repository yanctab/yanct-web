import Nav from "@/spelare/Nav";
import Hero from "@/spelare/Hero";
import Offer from "@/spelare/Offer";
import RealTalk from "@/spelare/RealTalk";
import Teams from "@/spelare/Teams";
import Ambition from "@/spelare/Ambition";
import GetStarted from "@/spelare/GetStarted";
import Shop from "@/spelare/Shop";
import Instagram from "@/spelare/Instagram";
import Parents from "@/spelare/Parents";
import Footer from "@/spelare/Footer";

/**
 * The page for players (12 and up), at /spelare: dark and plain-spoken, fewer sections, club info
 * linked from the footer. Its components live in src/spelare/ and use the s- prefixed classes.
 */
const Spelare = () => (
  <div className="min-h-screen bg-night text-white">
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
  </div>
);

export default Spelare;
