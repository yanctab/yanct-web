import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LINKS, team } from "@/links";
import Reveal from "./Reveal";

type Team = {
  name: string;
  url: string;
  /** Birth years the team is for, inclusive. */
  born: [number, number];
  tag: string;
  /** A team you qualify for, from 15–16. */
  elite?: boolean;
};

/**
 * Only the teams for players around 13–16 (from the full list on BK50 lag, LINKS.teams).
 * Younger kids and adults are sent to the full list on Svenskalag.
 */
const TEAMS: Team[] = [
  { name: "Flickor 2014/15", url: team("bk50-flickor2014-15"), born: [2014, 2015], tag: "Flickor" },
  { name: "Pojkar 2014", url: team("bk50-pojkar2014"), born: [2014, 2014], tag: "Pojkar" },
  { name: "Flickor 2013", url: team("bk50-flickor2013"), born: [2013, 2013], tag: "Flickor" },
  { name: "Pojkar 2013", url: team("bk50-pojkar2013"), born: [2013, 2013], tag: "Pojkar" },
  { name: "Flickor 2011/12 vit", url: team("bk50-flickor2011-2012vit"), born: [2011, 2012], tag: "Flickor" },
  { name: "Flickor 2010–12 vinröd", url: team("bk50-flickor2012-2010vinrod"), born: [2010, 2012], tag: "Flickor" },
  { name: "Pojkar 2011 vit", url: team("bk50-pojkar2011vit"), born: [2011, 2011], tag: "Pojkar · Satsningslag P11", elite: true },
  { name: "Damer utveckling", url: team("bk50-damerutveckling"), born: [2008, 2011], tag: "Flickor · Satsningslag", elite: true },
];

const YEARS = [2014, 2013, 2012, 2011, 2010, 2009, 2008];

const fits = (t: Team, year: number | null) => year === null || (year >= t.born[0] && year <= t.born[1]);

const Teams = () => {
  const [year, setYear] = useState<number | null>(null);
  const hits = TEAMS.filter((t) => fits(t, year)).length;

  return (
    <section id="lag" className="py-24 md:py-32">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Våra lag</p>
          <h2 className="section-title">
            Vilket år är <span className="text-ball">du</span> född?
          </h2>
          <p className="mt-6 text-lg text-white/70">
            Välj ditt födelseår så ser du vilka lag som passar. Varje lag har en egen sida med träningstider och matcher.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Födelseår">
          {YEARS.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYear(year === y ? null : y)}
              aria-pressed={year === y}
              className={`border-2 px-5 py-2.5 font-display text-2xl transition md:text-3xl ${
                year === y ? "border-ball bg-ball text-night" : "border-white/25 text-white hover:border-white"
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        <p className="mt-5 min-h-6 text-white/70" role="status">
          {year !== null &&
            (hits > 0 ? (
              <>
                <strong className="text-white">{hits === 1 ? "1 lag" : `${hits} lag`}</strong> för dig. Osäker på vilket? Anmäl dig ändå, så hjälper vi dig.
              </>
            ) : (
              <>Inget lag på listan för just ditt år. Anmäl dig ändå, så hittar vi en grupp.</>
            ))}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TEAMS.map((t) => {
            const on = fits(t, year);
            return (
              <a
                key={t.url}
                href={t.url}
                target="_blank"
                rel="noopener"
                className={`group relative flex min-h-28 flex-col gap-6 sm:min-h-44 justify-between overflow-hidden border p-5 transition hover:-translate-y-1 ${
                  t.elite ? "border-ball bg-ball/10" : "border-white/15 bg-night-800"
                } ${on ? "" : "opacity-25 hover:opacity-100"}`}
              >
                {t.elite && <span className="absolute right-3 top-3 bg-ball px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-night">Satsning</span>}
                <p className={`text-xs font-semibold uppercase tracking-widest text-white/50 ${t.elite ? "pr-20" : ""}`}>{t.tag}</p>
                <div className="flex items-end justify-between gap-3">
                  <p className="font-display text-3xl uppercase leading-none">{t.name}</p>
                  <ArrowUpRight className="h-6 w-6 shrink-0 text-ball transition group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>

        <p className="mt-10 text-white/60">
          Söker du lag för yngre barn eller vuxna? Alla lag, från basketskola till basketfitness, finns på{" "}
          <a href={LINKS.teams} target="_blank" rel="noopener" className="font-semibold text-white underline decoration-ball underline-offset-4">
            BK50 lag
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Teams;
