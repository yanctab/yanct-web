import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    ts: "1337.000042",
    source: "emulate-energy",
    quote:
      "Måns was incredibly service-minded, pedagogical, and highly knowledgeable. We will continue to rely on him as our go-to expert for all IoT-related matters.",
    name: "Daria Madjidian",
    role: "Co-Founder and Chief Scientist, Emulate Energy",
  },
  {
    ts: "2048.161803",
    source: "schneider-electric",
    quote:
      "Complexity is not a problem. He works proactively and reacts fast on observations made. He has good contacts with other teams and could handle different cultures easily.",
    name: "Kent Pålsson",
    role: "Senior Hardware Project Design Lead, Schneider Electric",
  },
  {
    ts: "3141.592653",
    source: "topbrewer",
    quote:
      "Måns is next level embedded linux expert. Not only does he understand the tools surrounding custom embedded linux system like yocto, but he has very good linux knowledge which is important to have this combo in my opinion.",
    name: "Frederik Vibe-Petersen",
    role: "Creator of the TopBrewer Experience",
  },
  {
    ts: "4096.000001",
    source: "dev-team",
    quote:
      "Always ready to help improving the development processes, tools etc. and has a high focus on quality. A true asset for the team.",
    name: "Jeppe Frandsen",
    role: "Senior Developer | Architect | Manager | DevOps Guy",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="border-t border-term-line px-4 py-24 md:px-8">
    <div className="mx-auto max-w-6xl">
      <p className="section-prompt">~$ dmesg | grep -i måns</p>
      <h2 className="section-title">What the logs say</h2>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="term-window flex flex-col p-6"
          >
            <p className="break-words text-xs text-term-dim">
              [{t.ts}] <span className="text-term-cyan">{t.source}</span>: feedback received
            </p>
            <blockquote className="mt-4 flex-1 leading-relaxed text-term-text">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold text-white">{t.name}</span>
              <span className="block text-term-dim">{t.role}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
