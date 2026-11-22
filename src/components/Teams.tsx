import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { LINKS } from "@/links";
import Reveal from "./Reveal";

type Group = "ungdom" | "start" | "vuxen" | "lager";

type Team = {
  name: string;
  url: string;
  group: Group;
  /** Birth years the team is for, inclusive. Omitted when the page doesn't say. */
  born?: [number, number];
  /** Shown under the name, e.g. "Flickor" or a status note. */
  tag: string;
};

// Team pages on the club's svenskalag.se site (https://www.bk50.se/lag)
const TEAMS: Team[] = [
  { name: "Basketskola", url: "https://www.bk50.se/bk50-basketskola", group: "start", born: [2019, 2020], tag: "Flickor och pojkar, första steget" },
  { name: "Flickor 2017/2018", url: "https://www.bk50.se/bk50-flickor2017-2018", group: "ungdom", born: [2017, 2018], tag: "Flickor" },
  { name: "Pojkar 2017/2018", url: "https://www.bk50.se/bk50-pojkar2017-2018", group: "ungdom", born: [2017, 2018], tag: "Pojkar" },
  { name: "Flickor 2016", url: "https://www.bk50.se/bk50-flickor2016", group: "ungdom", born: [2016, 2016], tag: "Flickor" },
  { name: "Pojkar 2015/2016", url: "https://www.bk50.se/bk50-pojkar2015-2016", group: "ungdom", born: [2015, 2016], tag: "Pojkar" },
  { name: "Flickor 2014/15", url: "https://www.bk50.se/bk50-flickor2014-15", group: "ungdom", born: [2014, 2015], tag: "Flickor" },
  { name: "Pojkar 2014", url: "https://www.bk50.se/bk50-pojkar2014", group: "ungdom", born: [2014, 2014], tag: "Pojkar" },
  { name: "Flickor 2013", url: "https://www.bk50.se/bk50-flickor2013", group: "ungdom", born: [2013, 2013], tag: "Flickor" },
  { name: "Pojkar 2013", url: "https://www.bk50.se/bk50-pojkar2013", group: "ungdom", born: [2013, 2013], tag: "Pojkar" },
  { name: "Flickor 2011/2012 vit", url: "https://www.bk50.se/bk50-flickor2011-2012vit", group: "ungdom", born: [2011, 2012], tag: "Flickor" },
  { name: "Pojkar 2011 vit", url: "https://www.bk50.se/bk50-pojkar2011vit", group: "ungdom", born: [2011, 2011], tag: "Pojkar" },
  { name: "Flickor 2012–2010 vinröd", url: "https://www.bk50.se/bk50-flickor2012-2010vinrod", group: "ungdom", born: [2010, 2012], tag: "Flickor" },
  { name: "Damer utveckling", url: "https://www.bk50.se/bk50-damerutveckling", group: "ungdom", born: [2008, 2011], tag: "Flickor, elitsatsande grupp" },
  { name: "Basketfitness", url: "https://www.bk50.se/bk50-basketfitness", group: "vuxen", tag: "Vuxna, nybörjare och spelfokus" },
  { name: "Damer", url: "https://www.bk50.se/bk50-damer", group: "vuxen", tag: "Vilande 26/27, intresseanmälan" },
  { name: "Senior 65+", url: "https://www.bk50.se/bk50-senior65", group: "vuxen", tag: "Startar när vi är några stycken" },
  { name: "Sommarläger prova på", url: "https://www.bk50.se/bk50-sommarlagerprovapa", group: "lager", born: [2011, 2020], tag: "Helt gratis, för nya spelare" },
  { name: "Sommarläger 2026, födda 2018–2015", url: "https://www.bk50.se/bk50-sommarlager2026medlemmar2018-2015", group: "lager", born: [2015, 2018], tag: "För medlemmar" },
  { name: "Sommarläger 2026, födda 2014–2009", url: "https://www.bk50.se/bk50-sommarlager2026medlemmar2014-2009", group: "lager", born: [2009, 2014], tag: "För medlemmar" },
];

const GROUPS: { id: Group; title: string; lead: string }[] = [
  { id: "start", title: "Första steget", lead: "För de allra yngsta som ska lära sig bollen." },
  { id: "ungdom", title: "Barn & ungdom", lead: "Flick- och pojklag efter födelseår." },
  { id: "vuxen", title: "Vuxna", lead: "Motion, gemenskap och spel för alla nivåer." },
  { id: "lager", title: "Läger", lead: "Sommarläger för medlemmar och nya spelare." },
];

const ADULT = "vuxen";
const YEARS = Array.from({ length: 2020 - 2008 + 1 }, (_, i) => 2020 - i);

const matches = (team: Team, choice: string) => {
  if (!choice) return true;
  if (choice === ADULT) return team.group === "vuxen";
  const year = Number(choice);
  return !!team.born && year >= team.born[0] && year <= team.born[1];
};

const TeamCard = ({ team, dimmed }: { team: Team; dimmed: boolean }) => (
  <a
    href={team.url}
    target="_blank"
    rel="noopener"
    className={`group flex items-center justify-between gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-wine-300 ${
      dimmed ? "opacity-35 hover:opacity-100" : ""
    }`}
  >
    <div>
      <p className="font-display text-lg font-extrabold leading-tight">{team.name}</p>
      <p className="mt-1 text-sm text-ink/60">{team.tag}</p>
    </div>
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wine-50 text-wine-500 transition group-hover:bg-wine-500 group-hover:text-white">
      <ArrowUpRight className="h-5 w-5" />
    </span>
  </a>
);

const Teams = () => {
  const [choice, setChoice] = useState("");
  const hits = useMemo(() => TEAMS.filter((t) => matches(t, choice)).length, [choice]);

  return (
    <section id="lag" className="py-24 md:py-32">
      <div className="container-page">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Våra lag</p>
            <h2 className="section-title">Hitta ditt lag.</h2>
            <p className="mt-6 text-lg text-ink/70">
              Varje lag har en egen sida med träningstider, kalender och nyheter. Välj ditt födelseår så visar vi
              vilka grupper som passar dig.
            </p>
          </div>

          <label className="flex w-full items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 shadow-sm ring-1 ring-ink/10 focus-within:ring-2 focus-within:ring-wine-500 md:w-auto">
            <Search className="h-5 w-5 shrink-0 text-wine-500" />
            <span className="sr-only">Födelseår</span>
            <select
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
              className="w-full cursor-pointer rounded-full bg-transparent py-2 pr-2 font-semibold outline-none md:w-56"
            >
              <option value="">Jag är född …</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
              <option value={ADULT}>Jag är vuxen</option>
            </select>
          </label>
        </Reveal>

        {choice && (
          <p className="mt-6 rounded-2xl bg-wine-50 px-5 py-4 text-wine-700" role="status">
            {hits > 0 ? (
              <>
                <strong>{hits} {hits === 1 ? "grupp passar" : "grupper passar"}</strong> dig. Hittar du inte rätt?{" "}
              </>
            ) : (
              <>Vi har inget lag för just din ålder på listan. </>
            )}
            <a href={LINKS.signup} target="_blank" rel="noopener" className="font-semibold underline underline-offset-4">
              Anmäl dig ändå
            </a>{" "}
            så hjälper vi dig hitta en grupp.
          </p>
        )}

        <div className="mt-12 space-y-12">
          {GROUPS.map((group) => (
            <Reveal key={group.id}>
              <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-ink/10 pb-3">
                <h3 className="font-display text-2xl font-extrabold text-wine-500">{group.title}</h3>
                <p className="text-ink/60">{group.lead}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {TEAMS.filter((t) => t.group === group.id).map((team) => (
                  <TeamCard key={team.url} team={team} dimmed={!matches(team, choice)} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-ink/60">
          Alla lag finns också på{" "}
          <a href={LINKS.teams} target="_blank" rel="noopener" className="font-semibold text-wine-500 underline underline-offset-4">
            bk50.se/lag
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Teams;
