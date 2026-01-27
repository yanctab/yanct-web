
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { SlideIn } from "@/components/ui/motion-wrapper";

const Services = () => {
  const isMobile = useIsMobile();

  return (
    <section
    id="services"
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
      <div className="relative flex flex-col items-center w-full mt-0">
        <h2
          id="services-header-btn"
          className="text-white text-4xl font-typewriter"
        >
          Services
        </h2>
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center mt-16 md:mt-32">
        <div className="relative flex flex-col gap-8 md:gap-12 w-full">
          {/* Vertical center line */}
          <div className="absolute left-1/2 top-0 bottom-[80px] w-[3px] bg-[#F5F7FA] -translate-x-1/2 hidden md:block" />

          {/* Row 1: Image left, Text right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch w-full">
            <SlideIn direction="left" className="relative md:pr-16">
              <div className="absolute right-6 top-1/2 w-8 h-[3px] bg-[#F5F7FA] hidden md:block transform -translate-y-1/2" />
              <div
                className="bg-white flex items-center justify-center border border-[#e5e5e5] h-full w-full aspect-[1.8/1] rounded-2xl bg-cover bg-center grayscale"
                style={{
                  backgroundImage: "url('/Southtech-38_edited1.jpg')",
                }}
                aria-label="Black and white photo of building"
                role="img"
              />
            </SlideIn>
            <SlideIn direction="right" delay={0.1} className="relative md:pl-16">
              <div className="absolute left-6 top-1/2 w-8 h-[3px] bg-[#F5F7FA] hidden md:block transform -translate-y-1/2" />
              <div className="bg-white p-1 rounded-2xl border-4 border-[#F5F7FA] h-full">
                <div className="h-full w-full bg-[#0B132B] p-1 rounded-[calc(1rem-2px)]">
                  <div className="h-full w-full bg-[#F5F7FA] flex flex-col justify-center shadow-md p-4 sm:p-6 md:p-8 rounded-[calc(1rem-4px)]">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 md:mb-4 font-typewriter">
                      Remote-First Support
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-tight sm:leading-relaxed font-typewriter">
                      Ideal for small to mid-sized companies, offering flexible,
                      ongoing support with expert-level embedded Linux and Yocto
                      expertise.
                    </p>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* Row 2: Text left, Image right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch w-full">
            <SlideIn direction="left" className="relative md:pr-16">
              <div className="absolute right-6 top-1/2 w-8 h-[3px] bg-[#F5F7FA] hidden md:block transform -translate-y-1/2" />
              <div className="bg-white p-1 rounded-2xl border-4 border-[#F5F7FA] h-full">
                <div className="h-full w-full bg-[#0B132B] p-1 rounded-[calc(1rem-2px)]">
                  <div className="h-full w-full bg-[#F5F7FA] flex flex-col justify-center shadow-md p-4 sm:p-6 md:p-8 rounded-[calc(1rem-4px)]">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 md:mb-4 font-typewriter">
                      Full-Time Engagement
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-tight sm:leading-relaxed font-typewriter">
                      Full-time, on-site or hybrid consulting, providing hands-on
                      support for day-to-day development and real-time issue
                      resolution.
                    </p>
                  </div>
                </div>
              </div>
            </SlideIn>
            <SlideIn direction="right" delay={0.1} className="relative md:pl-16">
              <div className="absolute left-6 top-1/2 w-8 h-[3px] bg-[#F5F7FA] hidden md:block transform -translate-y-1/2" />
              <div
                className="bg-white flex items-center justify-center border border-[#e5e5e5] h-full w-full aspect-[1.8/1] rounded-2xl bg-cover bg-center grayscale"
                style={{
                  backgroundImage: "url('/P_AB3418.jpg')",
                }}
                aria-label="Black and white photo of gray building"
                role="img"
              />
            </SlideIn>
          </div>

          {/* Row 3: Image left, Text right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch w-full">
            <SlideIn direction="left" className="relative md:pr-16">
              <div className="absolute right-6 top-1/2 w-8 h-[3px] bg-[#F5F7FA] hidden md:block transform -translate-y-1/2" />
              <div
                className="bg-white flex items-center justify-center border border-[#e5e5e5] h-full w-full aspect-[1.8/1] rounded-2xl bg-cover bg-center grayscale"
                style={{
                  backgroundImage: "url('P_AB3378.jpg')",
                }}
                aria-label="Black and white photo of herd of sheep"
                role="img"
              />
            </SlideIn>
            <SlideIn direction="right" delay={0.1} className="relative md:pl-16">
              <div className="absolute left-6 top-1/2 w-8 h-[3px] bg-[#F5F7FA] hidden md:block transform -translate-y-1/2" />
              <div className="bg-white p-1 rounded-2xl border-4 border-[#F5F7FA] h-full">
                <div className="h-full w-full bg-[#0B132B] p-1 rounded-[calc(1rem-2px)]">
                  <div className="h-full w-full bg-[#F5F7FA] flex flex-col justify-center shadow-md p-4 sm:p-6 md:p-8 rounded-[calc(1rem-4px)]">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 md:mb-4 font-typewriter">
                      Platform Review & Roadmap
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-tight sm:leading-relaxed font-typewriter">
                      Tailored review of your platform and processes, with a clear
                      roadmap for improvements and implementation options.
                    </p>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>

        <div className="relative flex flex-col items-center w-full mt-0 md:mt-8 mb-4">
          {/* Outer white border with p-2 gap */}
          <div className="p-2 rounded-full border-4 border-white inline-block">
            <Button
              size="lg"
              id="services-continue-btn"
              className="bg-[#F5F7FA] text-[#0B132B] hover:bg-gray-200 rounded-full text-xl p-6 shadow-xl transition-colors duration-300 border-none"
              onClick={() => {
                const highlights = document.getElementById('testimonials');
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

export default Services;
