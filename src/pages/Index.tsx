import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import GetStarted from "@/components/GetStarted";
import Teams from "@/components/Teams";
import History from "@/components/History";
import Instagram from "@/components/Instagram";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Nav />
    <main>
      <Hero />
      <Offer />
      <GetStarted />
      <Teams />
      <History />
      <Instagram />
    </main>
    <Footer />
  </>
);

export default Index;
