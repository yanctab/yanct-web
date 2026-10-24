import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Expertise from "@/components/Expertise";
import Process from "@/components/Process";
import Cases from "@/components/Cases";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Clients />
      <Services />
      <Expertise />
      <Process />
      <Cases />
      <About />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Index;
