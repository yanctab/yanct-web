import { ArrowDown, ArrowRight, ArrowUpRight, KeyRound, MessageCircle, Search, UserPlus } from "lucide-react";
import { LINKS } from "@/links";
import Reveal from "./Reveal";

/**
 * The whole way in, from finding a team to the team's WhatsApp group. Each step links to where it's
 * explained: the teams list (step 1), the sign-up form (step 2) and the Svenskalag section (steps 3–4).
 */
const STEPS = [
  {
    icon: Search,
    title: "Hitta ditt lag",
    text: "Välj födelseår i listan över våra lag så ser du vilka grupper som passar. Osäker? Anmäl dig ändå, så hjälper vi dig.",
    href: "#lag",
    cta: "Se lagen",
  },
  {
    icon: UserPlus,
    title: "Anmäl dig",
    text: "Fyll i formuläret ”Börja spela basket”. Anmälan är inte bindande och som ny spelare provar du på utan kostnad.",
    href: LINKS.signup,
    cta: "Till anmälan",
    external: true,
  },
  {
    icon: KeyRound,
    title: "Logga in i Svenskalag",
    text: "Du får ett välkomstmejl med inloggning till Svenskalag. Logga in, byt lösenord och ladda ner appen.",
    href: "#svenskalag",
    cta: "Så funkar Svenskalag",
  },
  {
    icon: MessageCircle,
    title: "Gå med i lagets WhatsApp",
    text: "Där har du direktkontakt med ledarna och de andra föräldrarna. Inte fått tillgång? Kontakta ledaren för ditt lag.",
    href: "#whatsapp",
    cta: "Mer om WhatsApp",
  },
];

const GetStarted = () => (
  <section id="kom-igang" className="bg-ink py-24 text-white md:py-32">
    <div className="container-page">
      <Reveal className="max-w-3xl">
        <p className="eyebrow text-ball">Kom igång</p>
        <h2 className="section-title">Från soffan till planen i fyra steg.</h2>
        <p className="mt-6 text-lg text-white/70">
          Så här går det till att börja i BK50, för dig som spelare eller förälder.
        </p>
      </Reveal>

      <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, text, href, cta, external }, i) => (
          <li key={title} className="h-full">
            <Reveal delay={i * 0.08} className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-6xl font-extrabold text-ball/90">{i + 1}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-ball">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-extrabold">{title}</h3>
              <p className="mt-2 text-white/70">{text}</p>
              <a
                href={href}
                {...(external && { target: "_blank", rel: "noopener" })}
                className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-ball hover:text-white"
              >
                {cta}
                {external ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              </a>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-12 flex flex-col items-start gap-5 rounded-3xl bg-wine-500 p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <p className="font-display text-2xl font-extrabold md:text-3xl">Redo att testa?</p>
          <p className="mt-1 text-white/80">
            Avgifterna för säsongen hittar du{" "}
            <a href={LINKS.fees} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-white">
              här
            </a>
            . Frågor? Mejla{" "}
            <a href={`mailto:${LINKS.email}`} className="underline underline-offset-4 hover:text-white">
              {LINKS.email}
            </a>
            .
          </p>
        </div>
        <a href={LINKS.signup} target="_blank" rel="noopener" className="btn-primary shrink-0 text-lg">
          Till anmälan <ArrowRight className="h-5 w-5" />
        </a>
      </Reveal>
    </div>
  </section>
);

export default GetStarted;
