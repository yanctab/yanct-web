import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const STEPS = [
  {
    title: "Specify",
    body: "We work through requirements with you and point out risks while they are still cheap to fix.",
  },
  {
    title: "Design",
    body: "Electronics, firmware and Linux platform designed together, so hardware and software fit from the start.",
  },
  {
    title: "Build & verify",
    body: "Prototypes assembled in-house, tested continuously through CI, and iterated in short, agile loops.",
  },
  {
    title: "Produce",
    body: "Small series built by us; larger series with long-term manufacturing partners we know well.",
  },
  {
    title: "Support",
    body: "Updates, maintenance and RMA handling, so the product keeps working long after launch.",
  },
];

const Process = () => (
  <section className="section">
    <div className="container-page">
      <Reveal className="max-w-3xl">
        <p className="eyebrow">How we work</p>
        <h2 className="section-title">A one-stop shop, from idea to delivery</h2>
        <p className="section-lead">
          We have encouraged agile development in its true sense since the 80s: short feedback
          loops, early testing and quick adaptation when requirements change. Join us at any
          step, or let us carry the whole way.
        </p>
      </Reveal>

      <div className="relative mt-14">
        {/* Connecting rule between the step numbers on desktop */}
        <div className="absolute left-0 right-0 top-5 hidden h-px bg-surface-line md:block" aria-hidden />
        <ol className="relative grid gap-8 md:grid-cols-5 md:gap-6">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-5 md:block"
            >
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-white font-display text-sm font-bold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold md:mt-6">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default Process;
