import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LINKS } from "@/links";
import Tape from "./Tape";

const TAPE = ["Prova gratis", "Nybörjare välkomna", "Ingen bindning", "BK50", "Lund"];

/** A basketball drawn with its seams, so the hero doesn't need a photo. */
const Ball = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden>
    <circle cx="100" cy="100" r="96" fill="#f2882b" />
    <circle cx="100" cy="100" r="96" fill="none" stroke="#0d0a0b" strokeWidth="5" />
    <path
      d="M4 100h192M100 4v192M34 30c34 34 34 106 0 140M166 30c-34 34-34 106 0 140"
      fill="none"
      stroke="#0d0a0b"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

const Hero = () => {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay } };

  return (
    <section id="top" className="relative overflow-hidden bg-night">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(155,45,64,0.55),transparent_60%)]" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="container-page relative grid min-h-[92svh] items-center gap-10 pb-16 pt-28 md:grid-cols-[1.4fr_1fr] md:pt-24">
        <div>
          <motion.p {...fadeUp(0)} className="eyebrow">
            <span className="h-2 w-2 animate-pulse rounded-full bg-ball" /> BK50 · Basketklubben Lund 1950
          </motion.p>
          <motion.h1 {...fadeUp(0.06)} className="font-display text-[19vw] uppercase leading-[0.82] tracking-tight sm:text-8xl md:text-[8.5rem] lg:text-[10rem]">
            Spela
            <br />
            <span className="text-outline">basket</span>
            <br />
            <span className="text-ball">i Lund.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.14)} className="mt-8 max-w-lg text-lg text-white/80 md:text-xl">
            Hos oss tränar du med ditt lag, spelar riktiga matcher och blir bättre varje vecka.
          </motion.p>
          <motion.div {...fadeUp(0.22)} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href={LINKS.signup} target="_blank" rel="noopener" className="btn-primary text-lg">
              Prova gratis <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#lag" className="btn-ghost text-lg">
              Hitta ditt lag
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -40 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.15, type: "spring" }}
          className="relative mx-auto hidden w-full max-w-sm md:block"
        >
          <Ball className="w-full animate-spin-slow drop-shadow-[0_40px_60px_rgba(242,136,43,0.35)]" />
          <span className="sticker absolute -left-6 top-6 -rotate-12">Gratis att prova</span>
          <span className="sticker absolute -right-4 bottom-12 rotate-6 bg-ball">Sedan 1950</span>
        </motion.div>
      </div>

      <div className="relative pb-10">
        <Tape words={TAPE} />
        <Tape words={["Glädje", "Utveckling", "Gemenskap", "Lund sedan 1950"]} className="-mt-2 bg-wine-500 text-white" tilt="rotate-1" />
      </div>
    </section>
  );
};

export default Hero;
