import { ArrowRight, ShieldCheck } from "lucide-react";
import { CLUB_SITE, LINKS } from "@/links";
import Reveal from "./Reveal";

/**
 * The whole way in, short. Same four steps as the parent-facing site: team → sign-up → Svenskalag → WhatsApp.
 * WhatsApp invite links are never published here; teams share them with registered members only.
 */
const STEPS = [
  {
    title: "Välj lag",
    text: "Se vilket lag som passar ditt födelseår. Osäker? Anmäl dig ändå, så hjälper vi dig.",
  },
  {
    title: "Anmäl dig",
    text: "Fyll i formuläret ”Börja spela basket”, gärna tillsammans med en förälder. Gratis att prova, inte bindande.",
  },
  {
    title: "Logga in i Svenskalag",
    text: "Du får ett välkomstmejl med inloggning till Svenskalag. Ladda ner appen, där kommer kallelser till träningar och matcher.",
  },
  {
    title: "Gå med i lagets WhatsApp",
    text: "När du är registrerad får du tillgång till ditt lags grupp. Har du inte fått det? Fråga din ledare.",
  },
];

const GetStarted = () => (
  <section id="kom-igang" className="py-24 md:py-32">
    <div className="container-page">
      <Reveal className="max-w-4xl">
        <p className="eyebrow">Kom igång</p>
        <h2 className="section-title">
          Fyra <span className="text-outline">steg.</span>
        </h2>
      </Reveal>

      <ol className="mt-14 border-t border-white/15">
        {STEPS.map(({ title, text }, i) => (
          <li key={title}>
            <Reveal delay={i * 0.05} className="grid gap-2 border-b border-white/15 py-7 md:grid-cols-[7rem_1fr_1.4fr] md:items-baseline md:gap-8">
              <span className="font-display text-6xl leading-none text-ball md:text-7xl">{i + 1}</span>
              <h3 className="font-display text-3xl uppercase leading-none md:text-4xl">{title}</h3>
              <p className="text-white/70">{text}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <a href={LINKS.signup} target="_blank" rel="noopener" className="btn-primary self-start text-lg">
          Till anmälan <ArrowRight className="h-5 w-5" />
        </a>
        <div className="flex flex-wrap items-center gap-3">
          <a href={LINKS.appStore} target="_blank" rel="noopener" className="transition hover:-translate-y-0.5">
            <img src="/badges/app-store-sv.svg" alt="Hämta Svenskalag i App Store" className="h-11 w-auto" />
          </a>
          <a href={LINKS.googlePlay} target="_blank" rel="noopener" className="transition hover:-translate-y-0.5">
            <img src="/badges/google-play-sv.png" alt="Ladda ned Svenskalag på Google Play" className="h-11 w-auto" />
          </a>
        </div>
      </Reveal>

      <p className="mt-8 flex max-w-3xl items-start gap-2 text-sm text-white/55">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ball" />
        <span>
          Allt om klubben, kalendern och lagen finns på{" "}
          <a href={CLUB_SITE} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-white">
            BK50 Svenskalag
          </a>
          . Länkarna till lagens WhatsApp-grupper delas bara med registrerade medlemmar. Inget välkomstmejl? Kolla skräpposten eller
          mejla{" "}
          <a href={`mailto:${LINKS.email}`} className="underline underline-offset-4 hover:text-white">
            {LINKS.email}
          </a>
          .
        </span>
      </p>
    </div>
  </section>
);

export default GetStarted;
