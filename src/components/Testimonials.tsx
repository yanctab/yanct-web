import { Button } from "@/components/ui/button";
import { SlideIn } from "@/components/ui/motion-wrapper";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-24 bg-[#477087] relative overflow-visible"
    >
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.50) 100%)",
        }}
      />
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex justify-center mb-16">
          <h2
            id="testimonials-header-btn"
            className="text-white text-4xl font-typewriter"
          >
            Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-8 md:gap-12">
          <SlideIn direction="up">
            <div className="text-center border-4 border-white rounded-2xl p-6 md:p-8 bg-[#0B132B] h-full"
              style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)" }}
            >
              <div className="text-6xl text-white mb-4 leading-none font-typewriter">"</div>
              <p className="text-white opacity-90 mb-6 font-typewriter">
                Måns was incredibly service-minded, pedagogical, and highly knowledgeable. We will continue to rely on him as our go-to expert for all IoT-related matters.
              </p>
              <p className="text-white font-bold font-typewriter">Daria Madjidian</p>
              <p className="text-white italic text-sm font-typewriter">
                Co-Founder and Chief Scientist at Emulate Energy
              </p>
            </div>
          </SlideIn>

          <SlideIn direction="up" delay={0.1}>
            <div className="text-center border-4 border-white rounded-2xl p-6 md:p-8 bg-[#0B132B] h-full"
              style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)" }}
            >
              <div className="text-6xl text-white mb-4 leading-none font-typewriter">"</div>
              <p className="text-white opacity-90 mb-6 font-typewriter">
                Complexity is not a problem. He works proactively and reacts fast on observations made. He has good contacts with other teams and could handle different cultures easily.
              </p>
              <p className="text-white font-bold font-typewriter">Kent Pålsson</p>
              <p className="text-white italic text-sm font-typewriter">
                Senior Hardware Project Design Lead på SCHNEIDER ELECTRIC
              </p>
            </div>
          </SlideIn>

          <SlideIn direction="up" delay={0.2}>
            <div className="text-center border-4 border-white rounded-2xl p-6 md:p-8 bg-[#0B132B] h-full"
              style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)" }}
            >
              <div className="text-6xl text-white mb-4 leading-none font-typewriter">"</div>
              <p className="text-white opacity-90 mb-6 font-typewriter">
                Måns is next level embedded linux expert. Not only does he understand the tools surrounding custom embedded linux system like yocto, but he has very good linux knowledge which is important to have this combo in my opinion.
              </p>
              <p className="text-white font-bold font-typewriter">Frederik Vibe-Petersen</p>
              <p className="text-white italic text-sm font-typewriter">
                Creator of the TopBrewer Experience. Engineering awesome.
              </p>
            </div>
          </SlideIn>

          <SlideIn direction="up" delay={0.3}>
            <div className="text-center border-4 border-white rounded-2xl p-6 md:p-8 bg-[#0B132B] h-full"
              style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)" }}
            >
              <div className="text-6xl text-white mb-4 leading-none font-typewriter">"</div>
              <p className="text-white opacity-90 mb-6 font-typewriter">
                Always ready to help improving the development processes, tools etc. and has a high focus on quality. A true asset for the team.
              </p>
              <p className="text-white font-bold font-typewriter">Jeppe Frandsen</p>
              <p className="text-white italic text-sm font-typewriter">
                Senior Developer | Architect | Manager | DevOps Guy
              </p>
            </div>
          </SlideIn>
        </div>

        <div className="relative flex flex-col items-center w-full mt-0 md:mt-8 mb-4">
          {/* Outer white border with p-2 gap */}
          <div className="p-2 rounded-full border-4 border-white inline-block" style={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.8)" }}>
            <Button
              size="lg"
              id="testimonials-continue-btn"
              className="bg-[#F5F7FA] text-[#0B132B] hover:bg-gray-200 rounded-full text-xl p-6 shadow-xl transition-colors duration-300 border-none"
              onClick={() => {
                const highlights = document.getElementById('connect');
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
    </section>
  );
};

export default Testimonials;
