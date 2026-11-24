import type { ReactNode } from "react";
import { LINKS } from "@/links";
import Reveal from "./Reveal";

/**
 * The worries that stop a 13–16-year-old from showing up, answered as a chat.
 * Keep the answers to what the club actually promises (see bk50.se), no made-up details.
 */
const CHAT: { q: string; a: ReactNode }[] = [
  {
    q: "Jag har aldrig spelat basket. Går det bra?",
    a: "Ja. Alla har varit nybörjare. Du lär dig grunderna i laget och utvecklas i din egen takt.",
  },
  {
    q: "Jag känner ingen i laget.",
    a: "Grupperna är små, så du lär känna de andra snabbt. Du kan också ta med en kompis och anmäla er båda.",
  },
  {
    q: "Vad kostar det?",
    a: (
      <>
        Att prova kostar inget och anmälan är inte bindande. Vill du fortsätta hittar du{" "}
        <a href={LINKS.fees} target="_blank" rel="noopener" className="font-semibold underline underline-offset-4">
          avgifterna här
        </a>
        .
      </>
    ),
  },
  {
    q: "Måste jag satsa på basketen?",
    a: "Nej. Upp till 15 år är det glädjen och utvecklingen som gäller. Från 15–16 år kan du välja att satsa och kvala in till ett satsningslag.",
  },
  {
    q: "Var tränar ni?",
    a: "I Fäladshallen, Vikingahallen och ISLK-hallen i Lund. Exakta tider står på ditt lags sida.",
  },
];

const RealTalk = () => (
  <section id="fragor" className="court-bg relative bg-wine-800 py-24 md:py-32">
    <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.3fr]">
      <Reveal className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow">Frågor</p>
        <h2 className="section-title">
          Innan första <span className="text-ball">träningen.</span>
        </h2>
        <p className="mt-6 max-w-md text-lg text-white/75">Det här brukar man undra över innan man kommer första gången.</p>
      </Reveal>

      <ul className="space-y-6">
        {CHAT.map(({ q, a }, i) => (
          <li key={q}>
            <Reveal delay={i * 0.05} className="space-y-2">
              <p className="ml-auto w-fit max-w-[85%] rounded-3xl rounded-br-md bg-ball px-5 py-3 font-semibold text-night">{q}</p>
              <div className="flex items-end gap-2">
                <img src="/bk50-logo.png" alt="" className="h-8 w-8 shrink-0 rounded-full bg-white p-0.5" />
                <p className="max-w-[85%] rounded-3xl rounded-bl-md bg-white px-5 py-3 text-night">{a}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default RealTalk;
