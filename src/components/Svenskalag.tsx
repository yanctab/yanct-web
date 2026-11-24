import { ArrowUp, ArrowUpRight, Bell, CalendarDays, CreditCard, KeyRound, Mail, MessageCircle, Newspaper, ShieldCheck, Smartphone } from "lucide-react";
import { CLUB_SITE, LINKS } from "@/links";
import Reveal from "./Reveal";

// What members find on the club's Svenskalag site and in the app (from svenskalag.se/appen)
const FEATURES = [
  { icon: CalendarDays, label: "Lagens träningar, matcher och kalender" },
  { icon: Bell, label: "Kallelser du svarar på direkt i mobilen" },
  { icon: Newspaper, label: "Nyheter från klubben och ditt lag" },
  { icon: CreditCard, label: "Avgifter och digitalt medlemskort" },
];

// Step 3 of "Kom igång": after signing up you get a welcome e-mail with a Svenskalag login
const STEPS = [
  { icon: Mail, title: "Välkomstmejlet", text: "Efter anmälan får du ett välkomstmejl med din inloggning till Svenskalag." },
  { icon: KeyRound, title: "Byt lösenord", text: "Logga in på klubbens sida på Svenskalag och välj ett eget lösenord." },
  { icon: Smartphone, title: "Ladda ner appen", text: "Logga in i Svenskalag-appen med samma uppgifter. Den finns för iPhone och Android." },
];

/** The official App Store and Google Play badges, linking via Svenskalag to the right store page. */
const StoreBadges = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap items-center gap-3 ${className}`}>
    <a href={LINKS.appStore} target="_blank" rel="noopener" className="transition hover:-translate-y-0.5">
      <img src="/badges/app-store-sv.svg" alt="Hämta Svenskalag i App Store" className="h-11 w-auto" />
    </a>
    <a href={LINKS.googlePlay} target="_blank" rel="noopener" className="transition hover:-translate-y-0.5">
      <img src="/badges/google-play-sv.png" alt="Ladda ned Svenskalag på Google Play" className="h-11 w-auto" />
    </a>
  </div>
);

/**
 * Step 4 of "Kom igång". The invite links are never published here: anyone could join from a public
 * page, so teams share them with registered members (e.g. as a team news item on Svenskalag).
 */
const WhatsApp = () => (
  <Reveal className="lg:col-span-2">
    <div id="whatsapp" className="grid gap-8 rounded-3xl bg-[#e7f8ee] p-7 ring-1 ring-[#25d366]/30 md:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#25d366] text-white">
        <MessageCircle className="h-8 w-8" />
      </span>
      <div>
        <p className="eyebrow text-[#128c4a]">Steg 4 · WhatsApp</p>
        <h3 className="font-display text-2xl font-extrabold md:text-3xl">Gå med i lagets WhatsApp-grupp</h3>
        <p className="mt-3 max-w-2xl text-ink/75">
          Varje lag har en WhatsApp-grupp där du har direktkontakt med ledarna och de andra föräldrarna. När du har
          registrerat dig och kommit in i Svenskalag får du tillgång till ditt lags grupp. Inte fått det? Kontakta ledaren
          för ditt lag, som du hittar på lagets sida.
        </p>
        <p className="mt-4 flex items-start gap-2 text-sm text-ink/60">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#128c4a]" />
          Länkarna till grupperna delas bara med registrerade medlemmar, så att det bara är lagets familjer som är med.
        </p>
      </div>
      <a href="#lag" className="btn shrink-0 justify-self-start bg-ink text-white hover:-translate-y-0.5 hover:bg-ink/85 focus-visible:outline-ink">
        Hitta ditt lag <ArrowUp className="h-5 w-5" />
      </a>
    </div>
  </Reveal>
);

const Svenskalag = () => (
  <section id="svenskalag" className="bg-white py-24 md:py-32">
    <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <Reveal>
        <p className="eyebrow">Steg 3 · Svenskalag</p>
        <h2 className="section-title">All information finns i Svenskalag.</h2>
        <p className="mt-6 text-lg text-ink/70">
          BK50 använder Svenskalag för allt som rör klubben. Där hittar du lagen, kalendern och nyheterna, och som medlem
          får du kallelser och har koll på dina avgifter.
        </p>
        <p className="mt-4 text-lg text-ink/70">
          Du väljer själv om du använder klubbens webbsida på Svenskalag eller Svenskalag-appen i mobilen. Det är samma
          inloggning och samma information på båda ställena.
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-start gap-3 rounded-2xl bg-wine-50 p-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-wine-500" />
              <span className="font-medium">{label}</span>
            </li>
          ))}
        </ul>

        <a
          href={CLUB_SITE}
          target="_blank"
          rel="noopener"
          className="btn mt-8 bg-wine-500 text-white hover:-translate-y-0.5 hover:bg-wine-600 focus-visible:outline-wine-500"
        >
          BK50 Svenskalag <ArrowUpRight className="h-5 w-5" />
        </a>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="court-bg rounded-3xl bg-wine-800 p-7 text-white md:p-10">
          <h3 className="font-display text-2xl font-extrabold md:text-3xl">Så kommer du igång</h3>
          <ol className="mt-8 space-y-6">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ball text-ink">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">
                    <span className="text-white/50">{i + 1}.</span> {title}
                  </p>
                  <p className="mt-1 text-white/75">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <StoreBadges className="mt-8" />
          <p className="mt-6 text-sm text-white/70">
            Inget välkomstmejl? Titta i skräpposten, eller mejla{" "}
            <a href={`mailto:${LINKS.email}`} className="underline underline-offset-4 hover:text-white">
              {LINKS.email}
            </a>
            .
          </p>
          <a href={LINKS.svenskalagApp} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-1 text-sm text-white/70 hover:text-white">
            Läs mer om appen på svenskalag.se <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>

      <WhatsApp />
    </div>
  </section>
);

export default Svenskalag;
