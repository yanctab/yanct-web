import { motion } from "framer-motion";

const ROLES = [
  { role: "CEO", note: "Makes the big decisions, like which coffee to buy." },
  { role: "Lead Embedded Engineer", note: "15+ years of making boards boot." },
  { role: "Head of CI", note: "Keeps the pipeline green. Mostly." },
  { role: "Intern", note: "Fetches coffee for the CEO." },
];

const Team = () => (
  <section id="team" className="border-t border-term-line px-4 py-24 md:px-8">
    <div className="mx-auto max-w-6xl">
      <p className="section-prompt">~$ ps aux | grep yanct</p>
      <h2 className="section-title">Meet the entire team</h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-term-dim">
        Yanct is a one-man show. That means you always talk to the person doing the work: no
        account managers, no juniors learning on your budget, no game of telephone.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ROLES.map((r, i) => (
          <motion.div
            key={r.role}
            initial={{ opacity: 0, rotate: -2, y: 20 }}
            whileInView={{ opacity: 1, rotate: 0, y: 0 }}
            whileHover={{ rotate: i % 2 ? 2 : -2, y: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="term-window p-6 text-center"
          >
            {/* TODO: swap for a real photo, maybe with a different hat per role */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue font-display text-2xl font-bold text-white">
              ME
            </div>
            <p className="mt-4 font-semibold text-white">Me</p>
            <p className="text-sm text-term-green">{r.role}</p>
            <p className="mt-3 text-sm text-term-dim">{r.note}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
