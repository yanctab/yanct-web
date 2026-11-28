import { ArrowUpRight, Compass, Flag, Smile, Target } from "lucide-react";
import { LINKS, team } from "@/links";
import Reveal from "./Reveal";

const mail = (subject: string) => `mailto:${LINKS.email}?subject=${encodeURIComponent(subject)}`;

// The two steps of a player's path: have fun first, then commit from 15–16. The page is for parents, so the
// text explains what the club offers their child rather than speaking to the player.
const PATH = [
  {
    icon: Smile,
    when: "Upp till 15 år",
    title: "Utvecklas i sin egen takt",
    text: "Spelarna spelar, lär sig och har kul tillsammans med kompisar. Här är utveckling viktigare än resultat.",
  },
  {
    icon: Flag,
    when: "Från 15–16 år",
    title: "Dags att satsa",
    text: "Nu kan spelaren välja att satsa på basketen och kvala in till något av våra satsningslag.",
  },
];

// Teams for players who want to commit. Pages on the club's svenskalag.se site.
const TEAMS = [
  // Män utveckling is the P11 team (Pojkar 2011 vit) on Svenskalag
  { code: "Män utveckling", name: "P11–P08", url: team("bk50-pojkar2011vit") },
  { code: "Damer utveckling", name: "F11–F08", url: team("bk50-damerutveckling") },
];

const Ambition = () => (
  <section id="satsa" className="bg-wine-50 py-24 md:py-32">
    <div className="container-page">
      <Reveal className="max-w-3xl">
        <p className="eyebrow">Satsa på basket</p>
        <h2 className="section-title">Nästa steg.</h2>
        <p className="mt-6 text-lg text-ink/70">
          För de spelare som vill satsa lite mer när de har nått åldern kan vi erbjuda följande. Men först ska basketen vara kul.
        </p>
      </Reveal>

      {/* The path: own pace first, commit from 15–16 */}
      <div className="relative mt-14 grid gap-4 md:grid-cols-2">
        {PATH.map(({ icon: Icon, when, title, text }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <div className={`h-full rounded-3xl p-7 md:p-8 ${i === 0 ? "bg-white ring-1 ring-ink/5" : "bg-wine-500 text-white"}`}>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                    i === 0 ? "bg-wine-50 text-wine-500" : "bg-ball text-ink"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className={`text-sm font-semibold uppercase tracking-widest ${i === 0 ? "text-wine-500" : "text-white/80"}`}>
                  {when}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold md:text-3xl">{title}</h3>
              <p className={`mt-2 ${i === 0 ? "text-ink/70" : "text-white/80"}`}>{text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        {/* Teams you qualify for */}
        <Reveal className="rounded-3xl bg-ink p-7 text-white md:p-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ball text-ink">
              <Target className="h-5 w-5" />
            </span>
            <h3 className="font-display text-2xl font-extrabold md:text-3xl">Våra satsningslag</h3>
          </div>
          <p className="mt-4 text-white/75">
            Just nu har vi två satsningslag. <strong className="text-white">Alla är välkomna att provträna</strong>, men för att
            börja spela i laget behöver spelaren kvala in.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {TEAMS.map((team) => (
              <div key={team.code} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <p className="font-display text-4xl font-extrabold leading-none text-ball">{team.code}</p>
                <p className="mt-1 text-white/75">{team.name}</p>
                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-sm font-semibold">
                  <a href={mail(`Jag vill provträna med ${team.code}`)} className="text-ball hover:underline">
                    Boka provträning
                  </a>
                  <a href={team.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-white/80 hover:text-white">
                    Lagets sida <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Guidance towards the player's goals */}
        <Reveal delay={0.1} className="flex flex-col rounded-3xl bg-white p-7 ring-1 ring-ink/5 md:p-8">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-wine-50 text-wine-500">
            <Compass className="h-5 w-5" />
          </span>
          <h3 className="mt-5 font-display text-2xl font-extrabold md:text-3xl">Vi guidar spelaren mot sina mål</h3>
          <p className="mt-2 text-ink/70">
            Vill ert barn nå längre med sin basket? Vi hjälper spelaren att sätta upp mål och visar vägen för att nå dem.
          </p>
          <a
            href={mail("Jag vill satsa på basket")}
            className="group mt-6 inline-flex items-center gap-2 self-start font-semibold text-wine-500 hover:underline md:mt-auto md:pt-6"
          >
            Prata med oss om en satsning <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Ambition;
