import { ArrowRight, Flag, UsersRound } from "lucide-react";
import Reveal from "@/components/Reveal";

/** The contact for players who want to help out as assistant leaders or referees. */
const CONTACT = "mikael@bk50.se";

const mail = (subject: string) => `mailto:${CONTACT}?subject=${encodeURIComponent(subject)}`;

// Ways a player can get involved in the club besides playing
const ROLES = [
  {
    icon: UsersRound,
    title: "Assisterande ledare",
    text: "Hjälp till på träningarna för ett av våra yngre lag. Du peppar, visar övningar och blir någon de yngre ser upp till.",
    cta: "Jag vill bli assisterande ledare",
    subject: "Jag vill bli assisterande ledare i BK50",
  },
  {
    icon: Flag,
    title: "Domare",
    text: "Lär dig reglerna på riktigt och döm matcher. Du ser spelet på ett nytt sätt, och det gör dig till en bättre spelare.",
    cta: "Jag vill bli domare",
    subject: "Jag vill bli domare i BK50",
  },
];

const Engage = () => (
  <section id="engagera" className="court-bg relative bg-wine-800 py-24 md:py-32">
    <div className="container-page">
      <Reveal className="max-w-4xl">
        <p className="s-eyebrow">Engagera dig</p>
        <h2 className="s-title">
          Mer än <span className="text-outline">spelare.</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-white/75">
          Vill du göra mer i klubben än att spela? Bli assisterande ledare eller domare.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {ROLES.map(({ icon: Icon, title, text, cta, subject }, i) => (
          <Reveal key={title} delay={i * 0.08} className="flex h-full flex-col bg-night p-7 md:p-9">
            <Icon className="h-8 w-8 text-ball" />
            <h3 className="mt-6 font-poster text-4xl uppercase leading-none md:text-5xl">{title}</h3>
            <p className="mb-8 mt-3 text-white/70">{text}</p>
            <a
              href={mail(subject)}
              className="group mt-auto inline-flex items-center gap-2 self-start font-extrabold uppercase tracking-wide text-ball hover:underline"
            >
              {cta} <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8 text-lg text-white/75">
        Vill du veta mer? Mejla{" "}
        <a href={mail("Engagera mig i BK50")} className="font-semibold text-ball underline underline-offset-4">
          {CONTACT}
        </a>
        .
      </Reveal>
    </div>
  </section>
);

export default Engage;
