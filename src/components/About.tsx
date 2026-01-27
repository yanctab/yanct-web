import React from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import AboutHighlights from "./AboutHighlights";

const About = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <section
        id="about"
        className="py-24 relative overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(71, 112, 135, 1), rgba(71, 112, 135, 1))',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.50) 100%)",
          }}
        />

        <div className="container mx-auto px-4 relative z-20">
          <div className="relative flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=450&q=80"
              alt="Profile of smiling man"
              className="mb-10 w-72 h-72 object-cover rounded-full grayscale shadow-xl border-4 border-white"
              style={{
                marginTop: '-24px',
                backgroundColor: '#fff',
              }}
              width={288}
              height={288}
            />

            <h2
              className="text-white text-5xl font-typewriter mt-6 text-center"
            >
              About
            </h2>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center mt-8 px-4">
            <p className="text-white text-lg leading-relaxed font-typewriter">
              Yanct is a one man show at the moment but with over 15 years of embedded Linux experience, I focus on turning complex platforms into secure, production-ready systems. I specialize in bridging the gap between vendor BSPs and reliable products, with deep experience across multiple hardware suppliers and ecosystems. But what really sets me apart is how I work — with a service-minded approach, strong communication, and a focus on collaboration.
            </p>

            <p className="text-white text-4xl mt-8 font-signature">
              Måns Zigher
            </p>

            <div className="relative flex flex-col items-center w-full mt-16">
              {/* Vertical line */}
              <div
                className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10"
                style={{
                  top: '68px',
                  height: 'calc(100% - 0px)',
                  width: '0px',
                  borderLeft: '3px solid #fff',
                  pointerEvents: "none",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)",
                }}
              />

              {/* Outer white border with p-2 gap */}
              <div className="p-2 rounded-full border-4 border-white inline-block" style={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.8)" }}>
                <Button
                  size="lg"
                  className="bg-white text-[#0B132B] hover:bg-gray-200 rounded-full text-xl px-14 py-7 font-typewriter shadow-lg transition-colors duration-300 border-none"
                  onClick={() => {
                    const highlights = document.getElementById('about-highlights');
                    highlights?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AboutHighlights />
    </>
  );
};

export default About;
