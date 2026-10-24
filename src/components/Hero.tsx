import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY } from "@/company";

const FACTS = [
  { value: "1980", label: "In business since" },
  { value: "40+", label: "Years of embedded design" },
  { value: "30", label: "Years of medical safety systems" },
  { value: "One team", label: "Hardware, software & DevOps" },
];

const Hero = () => (
  <section id="top" className="relative overflow-hidden bg-ink text-white">
    <div className="grid-bg absolute inset-0" aria-hidden />
    {/* Soft teal glow behind the headline */}
    <div
      className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-brand/25 blur-[120px]"
      aria-hidden
    />

    <div className="container-page relative pb-20 pt-36 md:pb-28 md:pt-48">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <p className="eyebrow text-brand-400">Embedded design · Malmö, Sweden</p>
        <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
          We build your embedded products, from schematic to series production.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-400 md:text-xl">
          Hardware, software, Linux BSPs and DevOps from one team with more than 40 years of
          experience. We find problems early, adapt quickly and see your product all the way to
          delivery.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="btn-primary px-7 py-3.5 text-base">
            Discuss your project <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={COMPANY.phoneHref}
            className="btn-ghost border-white/20 px-7 py-3.5 text-base text-white hover:border-white/50 hover:bg-white/5"
          >
            <Phone className="h-4 w-4" /> {COMPANY.phone}
          </a>
        </div>
      </motion.div>

      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:mt-28 md:grid-cols-4"
      >
        {FACTS.map((f) => (
          <div key={f.label} className="bg-ink-800/90 p-5 md:p-7">
            <dt className="text-xs uppercase tracking-wider text-ink-400 md:text-sm md:normal-case md:tracking-normal">
              {f.label}
            </dt>
            <dd className="mt-2 font-display text-xl font-bold text-white md:text-3xl">
              {f.value}
            </dd>
          </div>
        ))}
      </motion.dl>
    </div>
  </section>
);

export default Hero;
