import { ArrowDown, KeyRound, MessageCircle, Search, UserPlus } from "lucide-react";
import Reveal from "./Reveal";

/**
 * The whole way in, from finding a team to the team's WhatsApp group. Each step links to where it's
 * explained: the teams list (step 1), the sign-up banner (step 2) and the Svenskalag section (steps 3–4).
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
    href: "#anmalan",
    cta: "Till anmälan",
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
        {STEPS.map(({ icon: Icon, title, text, href, cta }, i) => (
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
                className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-ball hover:text-white"
              >
                {cta}
                <ArrowDown className="h-4 w-4" />
              </a>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default GetStarted;
