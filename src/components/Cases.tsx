import Reveal from "@/components/Reveal";

const CASES = [
  {
    client: "Mando AB",
    sector: "Medical",
    title: "Third-generation Mandometer, end to end",
    body: "Mandometer is a scale that weighs food for people with eating disorders. We redesigned and developed the third generation: electronics, software and the database behind it. We also assembled, tested and packed the devices, and handled RMA.",
    tags: ["Electronics", "Software", "Database", "Production", "RMA"],
  },
  {
    client: "Audio, Denmark",
    sector: "Consumer audio",
    title: "Embedded Linux platforms",
    body: "For customers in Denmark we have developed Linux platforms in C, C++ and Python, and helped build a product platform on the Yocto Project.",
    tags: ["Embedded Linux", "Yocto", "C / C++", "Python"],
  },
  {
    client: "Codab",
    sector: "Industrial",
    title: "A long-term extension of the team",
    body: "Codab makes terminals, diesel and AdBlue dispensers, forecourt controllers and transaction systems. We have worked alongside their team for many years, adding expertise where it is needed.",
    tags: ["Long-term partnership", "Embedded design"],
  },
];

const Cases = () => (
  <section id="cases" className="section bg-surface">
    <div className="container-page">
      <Reveal className="max-w-3xl">
        <p className="eyebrow">Cases</p>
        <h2 className="section-title">Products we have helped bring to market</h2>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {CASES.map((c, i) => (
          <Reveal key={c.client} delay={i * 0.08}>
            <article className="card flex h-full flex-col">
              <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                <span className="text-ink">{c.client}</span>
                <span className="text-ink-500">{c.sector}</span>
              </p>
              <h3 className="mt-6 font-display text-xl font-bold">{c.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-600">{c.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-600"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Cases;
