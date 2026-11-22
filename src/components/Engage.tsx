import { ArrowRight, Camera, Check, PartyPopper, UsersRound } from "lucide-react";
import { LINKS } from "@/links";
import Reveal from "./Reveal";

const mail = (subject: string) => `mailto:${LINKS.email}?subject=${encodeURIComponent(subject)}`;

// Volunteer roles we are recruiting for right now
const ROLES = [
  {
    icon: UsersRound,
    title: "Ledare",
    lead: "Vi söker fler ledare till våra lag.",
    text: "Du behöver inte ha spelat basket själv. Det viktigaste är att du gillar att vara med barn och ungdomar och vill ge lite av din tid. Du blir en del av ett gäng ledare som hjälps åt.",
    points: ["Träna och peppa en grupp", "Följ med på matcher", "Bli en förebild"],
    cta: "Jag vill bli ledare",
    subject: "Jag vill bli ledare i BK50",
  },
  {
    icon: Camera,
    title: "Foto & film",
    lead: "Gillar du att fota, filma eller redigera?",
    text: "Hjälp oss fånga matcher, träningar och läger i bilder och korta klipp till våra sociala medier. Mobilen räcker långt, det viktiga är känslan för bra bilder.",
    points: ["Fota och filma matcher och träningar", "Klipp ihop korta videor", "Visa upp klubben i sociala medier"],
    cta: "Jag vill fota och filma",
    subject: "Jag vill fota och filma för BK50",
  },
  {
    icon: PartyPopper,
    title: "Open court-värd",
    lead: "Har du tid att vara med på våra open court-event?",
    text: "På open court kommer spelare för att umgås och spela basket. Vi behöver vuxna på plats som välkomnar alla och ser till att det blir en trygg och rolig stund.",
    points: ["Var en vuxen på plats", "Välkomna nya ansikten", "Skapa gemenskap"],
    cta: "Jag vill hjälpa till",
    subject: "Jag vill vara med på open court",
  },
];

const Engage = () => (
  <section id="engagera" className="py-24 md:py-32">
    <div className="container-page">
      <Reveal className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="eyebrow">Engagera dig</p>
          <h2 className="section-title">
            Du behöver inte kunna <span className="text-wine-500">basket</span>.
          </h2>
        </div>
        <p className="text-lg text-ink/70">
          BK50 drivs av människor som ger lite av sin tid. Vill du hjälpa till finns det en plats för dig, oavsett
          om du någonsin har studsat en boll.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {ROLES.map(({ icon: Icon, title, lead, text, points, cta, subject }, i) => (
          <Reveal key={title} delay={i * 0.08} className="flex">
            <article className="flex w-full flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-wine-500 text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="rounded-full bg-ball/15 px-3 py-1 text-xs font-semibold text-ball-600">Vi söker nu</span>
              </div>
              <h3 className="mt-6 font-display text-3xl font-extrabold">{title}</h3>
              <p className="mt-2 font-semibold text-wine-600">{lead}</p>
              <p className="mt-3 text-ink/70">{text}</p>
              <ul className="mb-8 mt-5 space-y-2">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-ink/80">
                    <Check className="h-4 w-4 shrink-0 text-wine-500" /> {point}
                  </li>
                ))}
              </ul>
              <a
                href={mail(subject)}
                className="group mt-auto inline-flex items-center justify-between gap-3 rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition hover:bg-wine-500"
              >
                {cta}
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl bg-wine-50 p-6 md:flex-row md:items-center md:px-8">
        <p className="text-ink/75">
          <strong className="text-ink">Något annat i tankarna?</strong> Styrelsearbete, projekt eller en egen idé,
          hör av dig till{" "}
          <a href={mail("Jag vill engagera mig i BK50")} className="font-semibold text-wine-500 underline underline-offset-4">
            {LINKS.email}
          </a>
          .
        </p>
        <a href={LINKS.engage} target="_blank" rel="noopener" className="shrink-0 font-semibold text-wine-500 hover:underline">
          Mer om att engagera dig →
        </a>
      </Reveal>
    </div>
  </section>
);

export default Engage;
