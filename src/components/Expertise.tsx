import { HardDrive, Code, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlideIn } from "@/components/ui/motion-wrapper";

const Expertise = () => {
  return (
    <section id="expertise" className="py-24 bg-[#477087] relative overflow-visible">
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
            id="expertise-header-btn"
            className="text-white text-4xl font-typewriter"
          >
            Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-8 md:gap-12 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-white -translate-x-1/2 hidden md:block" />

          <div className="hidden md:block md:order-1"></div>

          <SlideIn direction="right" className="relative pr-0 md:pl-16 order-1 md:order-2">
            <div className="absolute left-0 top-1/2 w-12 h-[3px] bg-white hidden md:block transform -translate-y-1/2" />
            <div className="text-center border-4 border-white rounded-2xl p-6 md:p-8 bg-[#0B132B]"
              style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)" }}
            >
              <HardDrive className="h-12 w-12 mx-auto mb-6 text-white" />
              <h3 className="text-2xl font-bold text-white mb-4 font-typewriter">
                Embedded Linux Development
              </h3>
              <p className="text-white opacity-90 font-typewriter">
                Since 2008, I've helped companies implement and optimize embedded Linux systems
                across various industries, covering everything from bootloaders and kernels to
                middleware layers.
              </p>
            </div>
          </SlideIn>

          <SlideIn direction="left" delay={0.1} className="relative pl-0 md:pr-16 order-2 md:order-3">
            <div className="absolute right-0 top-1/2 w-12 h-[3px] bg-white hidden md:block transform -translate-y-1/2" />
            <div className="text-center border-4 border-white rounded-2xl p-6 md:p-8 bg-[#0B132B]"
              style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)" }}
            >
              <Code className="h-12 w-12 mx-auto mb-6 text-white" />
              <h3 className="text-2xl font-bold text-white mb-4 font-typewriter">
                Yocto Project Expertise
              </h3>
              <p className="text-white opacity-90 font-typewriter">
                The Yocto Project can be daunting, but I've worked extensively with its BSP
                and platform layers, gaining deep insights into its quirks across different
                vendor ecosystems.
              </p>
            </div>
          </SlideIn>

          <div className="hidden md:block md:order-4"></div>
          <div className="hidden md:block md:order-5"></div>

          <SlideIn direction="right" delay={0.2} className="relative pr-0 md:pl-16 order-3 md:order-6">
            <div className="absolute left-0 top-1/2 w-12 h-[3px] bg-white hidden md:block transform -translate-y-1/2" />
            <div className="text-center border-4 border-white rounded-2xl p-6 md:p-8 bg-[#0B132B]"
              style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)" }}
            >
              <Settings className="h-12 w-12 mx-auto mb-6 text-white" />
              <h3 className="text-2xl font-bold text-white mb-4 font-typewriter">
                Developer Enablement
              </h3>
              <p className="text-white opacity-90 font-typewriter">
                I simplify workflows and enhance productivity, allowing your team to focus on
                their strengths. I also collaborate with DevOps to optimize build pipelines.
              </p>
            </div>
          </SlideIn>
        </div>

        <div className="relative flex flex-col items-center w-full mt-0 md:mt-8 mb-4">
          <div className="p-2 rounded-full border-4 border-white inline-block">
            <Button
              size="lg"
              id="expertise-continue-btn"
              className="bg-[#F5F7FA] text-[#0B132B] hover:bg-gray-200 rounded-full text-xl p-6 transition-colors duration-300 border-none shadow-xl"
              onClick={() => {
                const highlights = document.getElementById('services');
                highlights?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
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

export default Expertise;
