
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const Connect = () => {
  return (
    <section
      id="connect"
      className="py-24 bg-[#0B132B] relative"
    >
      <div className="container mx-auto px-4 relative z-20">
        <div className="relative flex flex-col items-center w-full">
          <h2
            id="connect-main-btn"
            className="text-white text-4xl font-typewriter"
          >
            Connect
          </h2>
        </div>

        <div className="relative flex flex-col items-center w-full mt-16 md:mt-24 font-typewriter">
          <div
            id="contact-box"
            className="bg-transparent border-2 border-white w-full md:w-3/4 p-8 rounded-2xl"
            style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.9)" }}
          >
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-start">
              <div className="flex flex-col gap-8 items-center">
                <Linkedin className="w-8 h-8 text-white cursor-pointer hover:text-gray-200 transition-colors" />
                <Mail className="w-8 h-8 text-white cursor-pointer hover:text-gray-200 transition-colors" />
                <Github className="w-8 h-8 text-white cursor-pointer hover:text-gray-200 transition-colors" />
              </div>
              <div className="flex flex-col gap-8 text-white text-center md:text-left font-typewriter">
                <a
                  href="https://www.linkedin.com/in/måns-zigher-a4656954"
                  className="text-lg underline hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.linkedin.com/in/måns-zigher-a4656954
                </a>
                <p className="text-lg">
                  info @ yanct.com
                </p>
                <a
                  href="https://github.com/yanctab"
                  className="text-lg underline hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/yanctab
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
