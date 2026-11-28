import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { LINKS } from "@/links";

const PERKS = ["Prova på utan kostnad", "Anmälan är inte bindande", "Barn, ungdomar och vuxna"];
const MARQUEE = ["Glädje", "Utveckling", "Gemenskap", "Lund sedan 1950"];

const Hero = () => {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay } };

  return (
    <section id="top" className="court-bg relative overflow-hidden bg-wine-800 text-white">
      {/* Warm glow behind the ball */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full bg-ball/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-wine-500/50 blur-3xl" />

      <div className="container-page relative grid min-h-[100svh] items-center gap-12 pb-28 pt-28 md:grid-cols-[1.3fr_1fr] md:pt-24">
        <div>
          <motion.p {...fadeUp(0)} className="mb-5 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/85">
            Basketklubben Lund 1950
          </motion.p>
          <motion.h1 {...fadeUp(0.08)} className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Kom och spela <span className="text-ball">basket</span> i&nbsp;Lund.
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl text-lg text-white/80 md:text-xl">
            Hos oss spelar barn, ungdomar och vuxna basket i mindre grupper där alla blir sedda. Du utvecklas
            som spelare och människa i en trygg miljö, utan press på att prestera.
          </motion.p>
          <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={LINKS.signup} target="_blank" rel="noopener" className="btn-primary text-lg">
              Börja spela – anmäl dig <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#lag" className="btn-ghost text-lg">
              Hitta ert lag
            </a>
          </motion.div>
          <motion.ul {...fadeUp(0.32)} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-ball" /> {perk}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="relative mx-auto hidden w-full max-w-sm md:block"
        >
          <div className="animate-bounce-ball">
            <div className="rounded-full bg-white p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
              <img src="/bk50-logo.png" alt="BK50:s klubbmärke" className="w-full" />
            </div>
          </div>
          <div className="mx-auto mt-8 h-4 w-2/3 rounded-[50%] bg-black/30 blur-md" />
        </motion.div>
      </div>

      {/* Club values running along the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 bg-wine-900/60 py-3" aria-hidden>
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {Array.from({ length: 4 }).flatMap((_, i) =>
                MARQUEE.map((word) => (
                  <span key={`${i}-${word}`} className="flex items-center gap-6 pr-6 font-display text-lg font-extrabold uppercase tracking-wide text-white/70">
                    {word} <span className="h-2 w-2 rounded-full bg-ball" />
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
