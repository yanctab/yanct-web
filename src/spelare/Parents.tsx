import { ArrowUpRight, FileText } from "lucide-react";
import { CLUB_SITE, LINKS, doc } from "@/links";
import Reveal from "@/components/Reveal";

/**
 * A compact corner for parents: this version of the site talks to players. Documents are stored on
 * the club's Svenskalag site; some are per term (instruktion-kiosk-vt26), so check the links each term.
 */
const DOCS = [
  { title: "Guide för vårdnadshavare", href: doc("03a8dba7-f2ca-4225-a90f-f29d6a9a48e6/bk50-en-guide-for-vardnadshavare.pdf") },
  { title: "Sekretariatet", href: doc("76859501-6e0c-482d-b192-33a4a1b60ccf/instruktion-sekretariatet.pdf") },
  { title: "Kiosken", href: doc("28160b63-6287-45a3-b2b2-8e19685a47f4/instruktion-kiosk-vt26.pdf") },
  { title: "Bakning till kiosken", href: doc("efa06668-4e32-486f-a1ef-97691f62f83f/bakning.pdf") },
];

const LINKS_FOR_PARENTS = [
  { title: "Avgifter", href: LINKS.fees },
  { title: "Värdegrund", href: LINKS.values },
  { title: "BK50 Svenskalag", href: CLUB_SITE },
];

const Parents = () => (
  <section id="foraldrar" className="bg-cream py-20 text-ink md:py-24">
    <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr]">
      <Reveal>
        <p className="s-eyebrow text-wine-500">Visa för en förälder</p>
        <h2 className="font-poster text-4xl uppercase leading-[0.95] md:text-6xl">För föräldrar</h2>
        <p className="mt-5 text-lg text-ink/70">
          Som förälder förväntas du som minimum hjälpa till att sitta i sekretariatet på lagets hemmamatcher och köra till och från
          matcher. Börja med guiden för vårdnadshavare, eller läs{" "}
          <a href="/foralder" className="font-semibold text-wine-600 underline underline-offset-4">
            hela sidan för föräldrar
          </a>
          . Frågor? Mejla{" "}
          <a href={`mailto:${LINKS.email}`} className="font-semibold text-wine-600 underline underline-offset-4">
            {LINKS.email}
          </a>
          .
        </p>
      </Reveal>

      <Reveal delay={0.1} className="grid content-start gap-2 sm:grid-cols-2">
        {DOCS.map((d, i) => (
          <a
            key={d.title}
            href={d.href}
            target="_blank"
            rel="noopener"
            className={`flex items-center justify-between gap-3 p-4 font-semibold transition hover:-translate-y-0.5 ${
              i === 0 ? "bg-wine-500 text-white" : "bg-white ring-1 ring-ink/10 hover:ring-wine-300"
            }`}
          >
            {d.title} <FileText className="h-5 w-5 shrink-0 opacity-70" />
          </a>
        ))}
        {LINKS_FOR_PARENTS.map((l) => (
          <a
            key={l.title}
            href={l.href}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-between gap-3 p-4 font-semibold ring-1 ring-ink/10 transition hover:bg-white"
          >
            {l.title} <ArrowUpRight className="h-5 w-5 shrink-0 opacity-70" />
          </a>
        ))}
      </Reveal>
    </div>
  </section>
);

export default Parents;
