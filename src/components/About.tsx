import Reveal from "@/components/Reveal";

const MILESTONES = [
  {
    year: "1980s",
    body: "Mikrodidakt AB is founded in Lund, working with microcontrollers. That is where the name comes from.",
  },
  {
    year: "2021",
    body: "Mikrodidakt becomes Mikro.io, offering software, hardware and DevOps under one roof.",
  },
  {
    year: "Today",
    body: "Based in Malmö, helping clients in Sweden and Denmark build and maintain their embedded products.",
  },
];

const About = () => (
  <section id="about" className="section">
    <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
      <Reveal>
        <div className="relative">
          <img
            src="/office.jpg"
            alt="Mikro.io engineers talking in the office"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
          <div className="absolute -bottom-6 left-6 rounded-xl bg-brand px-6 py-4 text-white shadow-lg md:-right-6 md:left-auto">
            <p className="font-display text-3xl font-extrabold">40+</p>
            <p className="text-sm text-white/80">years in embedded design</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="eyebrow">About us</p>
        <h2 className="section-title">Microcontrollers are in our name</h2>
        <p className="section-lead">
          We have been in business since 1980 and built up knowledge that we are confident will
          be useful to you. Our focus is to be the one-stop shop for clients who need embedded
          designers.
        </p>

        <ol className="mt-10 space-y-6 border-l border-surface-line pl-6">
          {MILESTONES.map((m) => (
            <li key={m.year} className="relative">
              <span className="absolute -left-[1.84rem] top-1.5 h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-white" />
              <p className="font-display text-sm font-bold text-brand">{m.year}</p>
              <p className="mt-1 leading-relaxed text-ink-600">{m.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  </section>
);

export default About;
