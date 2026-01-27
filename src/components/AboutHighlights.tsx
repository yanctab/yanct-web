
import React from "react";
import { Button } from "@/components/ui/button";
import { SlideIn } from "@/components/ui/motion-wrapper";

const AboutHighlights = () => (
  <section
    id="about-highlights"
    className="relative py-16 md:py-24 overflow-visible bg-fixed"
    style={{
      backgroundImage: `
        linear-gradient(to right,
          rgba(0, 0, 0, 0.85) 0%,
          rgba(0, 0, 0, 0.3) 20%,
          rgba(0, 0, 0, 0.3) 80%,
          rgba(0, 0, 0, 0.85) 100%
        ),
        linear-gradient(
          rgba(11, 19, 43, 0.5),
          rgba(11, 19, 43, 0.7)
        ),
        url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000")
      `,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div
      className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10"
      style={{
        top: "-68px",
        height: "calc(100% - 130px)",
        width: "0px",
        borderLeft: "3px solid #F5F7FA",
        pointerEvents: "none",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)"
      }}
    />
    <div className="container mx-auto px-4 flex flex-col items-center">
      <div className="flex flex-col gap-8 md:gap-12 w-full">

        {/* First Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch w-full">
          {/* Image Card */}
          <SlideIn direction="left" className="relative md:pr-16">
            <div className="absolute right-6 top-1/2 w-8 h-[3px] bg-[#F5F7FA] hidden md:block transform -translate-y-1/2" style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)" }} />
            <div className="bg-[#F5F7FA] flex items-center justify-center border border-[#d1d5db] h-full w-full aspect-[1.8/1] rounded-2xl" style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)" }}>
              <img
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800"
                alt="People collaborating"
                className="w-full h-56 object-cover filter grayscale rounded-2xl"
                style={{ objectPosition: 'center', height: '100%' }}
              />
            </div>
          </SlideIn>

          {/* Text Card with Double Border */}
          <SlideIn direction="right" delay={0.1} className="relative md:pl-16">
            <div className="absolute left-6 top-1/2 w-8 h-[3px] bg-[#F5F7FA] hidden md:block transform -translate-y-1/2" style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)" }} />
            <div className="bg-[#F5F7FA] p-1 rounded-2xl border-4 border-[#F5F7FA] h-full" style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)" }}>
              <div className="h-full w-full bg-[#0B132B] p-1 rounded-[calc(1rem-2px)]">
                <div className="h-full w-full bg-[#F5F7FA] flex flex-col justify-center p-4 sm:p-6 md:p-8 rounded-[calc(1rem-4px)]">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 md:mb-4 font-typewriter">
                    Collaborative Mindset
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-tight sm:leading-relaxed font-typewriter">
                    Effective communication is key to any successful project. By actively engaging
                    with existing team knowledge, I ensure that solutions are found faster and
                    more effectively.
                  </p>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>

        {/* Second Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch w-full">
          {/* Text Card with Double Border */}
          <SlideIn direction="left" className="relative order-2 md:order-1 md:pr-16">
            <div className="absolute right-6 top-1/2 w-8 h-[3px] bg-[#F5F7FA] hidden md:block transform -translate-y-1/2" style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)" }} />
            <div className="bg-[#F5F7FA] p-1 rounded-2xl border-4 border-[#F5F7FA] h-full" style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)" }}>
              <div className="h-full w-full bg-[#0B132B] p-1 rounded-[calc(1rem-2px)]">
                <div className="h-full w-full bg-[#F5F7FA] flex flex-col justify-center p-4 sm:p-6 md:p-8 rounded-[calc(1rem-4px)]">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 md:mb-4 font-typewriter">
                    A Community of Experts
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-tight sm:leading-relaxed font-typewriter">
                    Over the years, I've cultivated a strong network of talented professionals
                    across embedded systems and software development. When specialized knowledge
                    is required, I can connect you with the right expert or I can tap into the knowledge base.
                  </p>
                </div>
              </div>
            </div>
          </SlideIn>

          {/* Image Card */}
          <SlideIn direction="right" delay={0.1} className="relative order-1 md:order-2 md:pl-16">
            <div className="absolute left-6 top-1/2 w-8 h-[3px] bg-[#F5F7FA] hidden md:block transform -translate-y-1/2" style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)" }} />
            <div className="bg-[#F5F7FA] flex items-center justify-center border border-[#d1d5db] h-full w-full aspect-[1.8/1] rounded-2xl" style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)" }}>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800"
                alt="People in relaxed setting"
                className="w-full h-56 object-cover filter grayscale rounded-2xl"
                style={{ objectPosition: 'center', height: '100%' }}
              />
            </div>
          </SlideIn>
        </div>

        <div className="relative flex flex-col items-center w-full mt-0 md:mt-8 mb-4">
          {/* Outer white border with p-2 gap */}
          <div className="p-2 rounded-full border-4 border-white inline-block" style={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.8)" }}>
            <Button
              size="lg"
              id="about-highlights-continue-btn"
              className="bg-[#F5F7FA] text-[#0B132B] hover:bg-gray-200 rounded-full text-xl p-6 shadow-xl transition-colors duration-300 border-none"
              onClick={() => {
                const highlights = document.getElementById('expertise');
                highlights?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {/* Downward pointing triangle SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 text-[#0B132B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default AboutHighlights;
