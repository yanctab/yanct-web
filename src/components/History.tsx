import { LINKS } from "@/links";
import Reveal from "./Reveal";

// Highlights from https://www.bk50.se/sida/109410/historia
const MOMENTS = [
  { year: "1950", text: "En grupp baltiska studenter startar basketen i Lund. Föreningen bildas två år före Svenska Basketbollförbundet." },
  { year: "1955", text: "Herrlaget vinner DM, och gör om det 1965 och 1966." },
  { year: "1967", text: "Damlaget vinner DM." },
  { year: "1972", text: "Herrlaget kvalificerar sig för Allsvenskan." },
  { year: "1994", text: "Årets ungdomsförening i Skåne, och samma utmärkelse igen 1995." },
  { year: "Idag", text: "Som BK50, tidigare Lugi Basket, spelar barn, ungdomar och vuxna basket i Lund." },
];

const History = () => (
  <section id="historia" className="court-bg bg-wine-800 py-24 text-white md:py-32">
    <div className="container-page grid gap-14 md:grid-cols-[1fr_1.4fr]">
      <Reveal>
        <p className="eyebrow text-ball">Tradition sedan 1950</p>
        <h2 className="section-title">Över 75 år av basket i Lund.</h2>
        <p className="mt-6 text-lg text-white/75">
          Vi är en av Sveriges äldsta basketklubbar. Generationer av Lundabor har lärt sig spela hos oss, och nu
          är det din tur.
        </p>
        <a href={LINKS.history} target="_blank" rel="noopener" className="btn-ghost mt-8">
          Läs hela historien
        </a>
      </Reveal>

      <ol className="relative border-l-2 border-white/15 pl-8">
        {MOMENTS.map((m, i) => (
          <li key={m.year} className="relative pb-9 last:pb-0">
            <Reveal delay={i * 0.05}>
              <span className="absolute -left-[2.6rem] top-1.5 h-4 w-4 rounded-full border-4 border-wine-800 bg-ball" />
              <p className="font-display text-3xl font-extrabold text-ball">{m.year}</p>
              <p className="mt-1 text-white/80">{m.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default History;
