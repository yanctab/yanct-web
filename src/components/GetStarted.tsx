import { ArrowRight } from "lucide-react";
import { LINKS } from "@/links";
import Reveal from "./Reveal";

const STEPS = [
  {
    title: "Anmäl dig",
    text: "Fyll i formuläret ”Börja spela basket”. Det tar en minut och anmälan är inte bindande.",
  },
  {
    title: "Prova på",
    text: "Är du ny basketspelare får du prova på träningarna utan kostnad. Ingen erfarenhet behövs.",
  },
  {
    title: "Bli en del av laget",
    text: "Gillar du det? Då är du en BK50:a. Vi hjälper dig hitta rätt grupp för din ålder och nivå.",
  },
];

const GetStarted = () => (
  <section id="kom-igang" className="bg-ink py-24 text-white md:py-32">
    <div className="container-page">
      <Reveal className="max-w-3xl">
        <p className="eyebrow text-ball">Kom igång</p>
        <h2 className="section-title">Från soffan till planen i tre steg.</h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.1} className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <div>
              <span className="font-display text-7xl font-extrabold text-ball/90">{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-extrabold">{step.title}</h3>
              <p className="mt-2 text-white/70">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex flex-col items-start gap-5 rounded-3xl bg-wine-500 p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <p className="font-display text-2xl font-extrabold md:text-3xl">Redo att testa?</p>
          <p className="mt-1 text-white/80">
            Avgifterna för säsongen hittar du{" "}
            <a href={LINKS.fees} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-white">
              här
            </a>
            . Frågor? Mejla{" "}
            <a href={`mailto:${LINKS.email}`} className="underline underline-offset-4 hover:text-white">
              {LINKS.email}
            </a>
            .
          </p>
        </div>
        <a href={LINKS.signup} target="_blank" rel="noopener" className="btn-primary shrink-0 text-lg">
          Till anmälan <ArrowRight className="h-5 w-5" />
        </a>
      </Reveal>
    </div>
  </section>
);

export default GetStarted;
