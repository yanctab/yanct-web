import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Construction } from "lucide-react";
import { LINKS } from "@/links";

/** The leaders' page at /ledare. Not built yet: until then it links to what leaders already use. */
const LINKS_FOR_LEADERS = [
  { title: "Ledarsidan på Svenskalag", text: "Nyheter, kalender och dokument. Kräver inloggning.", href: LINKS.leaders },
  { title: "Utbildningar", text: "Ledar-, domar- och funktionärsutbildningar.", href: LINKS.education },
  { title: "Värdegrund", text: "Så vill vi att alla i BK50 bemöter varandra.", href: LINKS.values },
];

const Ledare = () => {
  useEffect(() => {
    document.title = "Ledare – BK50";
  }, []);

  return (
    <main className="court-bg flex min-h-screen flex-col items-center justify-center bg-wine-800 px-4 py-16 text-center text-white">
      <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-ball text-ink">
        <Construction className="h-10 w-10" />
      </span>
      <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-ball">Under uppbyggnad</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold md:text-6xl">Sidan för ledare kommer snart.</h1>
      <p className="mt-5 max-w-xl text-lg text-white/75">
        Vi bygger en sida för dig som är tränare eller lagledare i BK50. Tills den är klar hittar du det viktigaste här. Vill du
        bli ledare? Mejla{" "}
        <a href={`mailto:${LINKS.email}?subject=${encodeURIComponent("Jag vill bli ledare i BK50")}`} className="underline underline-offset-4 hover:text-white">
          {LINKS.email}
        </a>
        .
      </p>

      <ul className="mt-10 grid w-full max-w-4xl gap-3 text-left md:grid-cols-3">
        {LINKS_FOR_LEADERS.map((l) => (
          <li key={l.title}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener"
              className="group flex h-full flex-col rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <span className="flex items-center justify-between gap-2 font-semibold">
                {l.title} <ArrowUpRight className="h-4 w-4 shrink-0 text-ball" />
              </span>
              <span className="mt-1 text-sm text-white/65">{l.text}</span>
            </a>
          </li>
        ))}
      </ul>

      <a href="/" className="btn-ghost mt-10">
        <ArrowLeft className="h-5 w-5" /> Tillbaka till start
      </a>
    </main>
  );
};

export default Ledare;
