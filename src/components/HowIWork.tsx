import { motion } from "framer-motion";

const UNITS = [
  {
    unit: "assess.service",
    title: "Look under the hood",
    body: "A short deep-dive into your hardware, code and team. You get an honest picture of where you are and what moving to Linux really costs.",
  },
  {
    unit: "plan.service",
    title: "Draw the map",
    body: "Architecture, tooling, build system and a realistic plan for people and time. Mistakes are cheapest on a whiteboard.",
  },
  {
    unit: "build.service",
    title: "Get hands dirty",
    body: "I work inside your team: BSP bring-up, Yocto layers, CI pipelines, whatever moves the product forward this week.",
  },
  {
    unit: "handover.service",
    title: "Make myself unnecessary",
    body: "Docs, pairing and workshops so your team owns the platform. The goal is that you don't need me. (You'll call anyway, people usually do.)",
  },
];

const HowIWork = () => (
  <section id="how" className="border-t border-term-line px-4 py-24 md:px-8">
    <div className="mx-auto max-w-6xl">
      <p className="section-prompt">~$ systemctl list-units 'yanct-*'</p>
      <h2 className="section-title">How we'd work together</h2>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {UNITS.map((u, i) => (
          <motion.article
            key={u.unit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="term-window p-6"
          >
            <p className="flex flex-wrap items-center gap-x-3 text-xs">
              <span className="text-term-green">●</span>
              <span className="text-term-text">{u.unit}</span>
              <span className="text-term-green">active (running)</span>
            </p>
            <h3 className="mt-4 font-display text-xl font-bold text-white">
              {i + 1}. {u.title}
            </h3>
            <p className="mt-3 leading-relaxed text-term-dim">{u.body}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default HowIWork;
