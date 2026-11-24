import { ArrowUpRight } from "lucide-react";
import { LINKS, team } from "@/links";
import Reveal from "./Reveal";

const mail = (subject: string) => `mailto:${LINKS.email}?subject=${encodeURIComponent(subject)}`;

// A player's path, as levels: try it, play with your team, then commit from 15–16
const LEVELS = [
  {
    lvl: "01",
    title: "Prova på",
    when: "Start",
    text: "Anmäl dig och prova på. Det kostar inget och är inte bindande.",
  },
  {
    lvl: "02",
    title: "Spela i lag",
    when: "Upp till 15 år",
    text: "Träna med ditt lag och spela seriematcher. Du utvecklas i din egen takt.",
  },
  {
    lvl: "03",
    title: "Satsa",
    when: "Från 15–16 år",
    text: "Kvala in till ett satsningslag. Vi hjälper dig att sätta mål och visar vägen.",
  },
];

// Teams you qualify for. Anyone may try out.
const ELITE = [
  { code: "P11", name: "Pojkar födda 2011", url: team("bk50-pojkar2011vit") },
  { code: "Damer utv.", name: "Flickor födda 2008–2011", url: team("bk50-damerutveckling") },
];

const Ambition = () => (
  <section id="satsa" className="relative overflow-hidden bg-ball py-24 text-night md:py-32">
    <div className="grain pointer-events-none absolute inset-0" />
    <div className="container-page relative">
      <Reveal className="max-w-4xl">
        <p className="eyebrow text-night">Satsa på basket</p>
        <h2 className="section-title">
          Level <span className="text-outline-dark">up.</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg font-medium text-night/80">
          Först ska basketen vara kul. Sen bestämmer du själv hur långt du vill ta den.
        </p>
      </Reveal>

      <ol className="mt-14 grid gap-4 md:grid-cols-3">
        {LEVELS.map(({ lvl, title, when, text }, i) => (
          <li key={lvl}>
            <Reveal delay={i * 0.1} className={`flex h-full flex-col p-7 ${i === 2 ? "bg-night text-white" : "bg-night/10"}`}>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-extrabold uppercase tracking-[0.25em]">Lvl {lvl}</span>
                <span className={`text-xs font-semibold uppercase tracking-widest ${i === 2 ? "text-ball" : "text-night/60"}`}>{when}</span>
              </div>
              {/* XP bar filling up level by level */}
              <div className={`mt-4 h-2 ${i === 2 ? "bg-white/15" : "bg-night/15"}`}>
                <div className={`h-full ${i === 2 ? "bg-ball" : "bg-night"}`} style={{ width: `${((i + 1) / 3) * 100}%` }} />
              </div>
              <h3 className="mt-6 font-display text-5xl uppercase leading-none">{title}</h3>
              <p className={`mt-3 ${i === 2 ? "text-white/75" : "text-night/75"}`}>{text}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-4 grid gap-6 bg-night p-7 text-white md:p-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div>
          <h3 className="font-display text-4xl uppercase leading-none md:text-5xl">Våra satsningslag</h3>
          <p className="mt-3 text-white/75">
            <strong className="text-white">Alla får provträna.</strong> För att spela i laget behöver du kvala in.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {ELITE.map((t) => (
            <div key={t.code} className="flex flex-col border border-white/15 p-5">
              <p className="font-display text-4xl uppercase leading-none text-ball">{t.code}</p>
              <p className="mt-1 text-white/70">{t.name}</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold uppercase tracking-wide">
                <a href={mail(`Jag vill provträna med ${t.code}`)} className="text-ball hover:underline">
                  Boka provträning
                </a>
                <a href={t.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-white/70 hover:text-white">
                  Lagets sida <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Ambition;
