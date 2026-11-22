import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import GetStarted from "@/components/GetStarted";
import Teams from "@/components/Teams";
import History from "@/components/History";
import Engage from "@/components/Engage";
import Instagram from "@/components/Instagram";
import Sponsors from "@/components/Sponsors";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Nav />
    <main>
      <Hero />
      <Offer />
      <GetStarted />
      <Teams />
      <Engage />
      <Instagram />
      <Sponsors />
      <History />
    </main>
    <Footer />
  </>
);

export default Index;
