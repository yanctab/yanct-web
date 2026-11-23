import { ArrowUpRight, Bell, CalendarDays, CreditCard, Newspaper, Smartphone, UserPlus, LogIn } from "lucide-react";
import { CLUB_SITE, LINKS } from "@/links";
import Reveal from "./Reveal";

// What members find on the club's Svenskalag site and in the app (from svenskalag.se/appen)
const FEATURES = [
  { icon: CalendarDays, label: "Lagens träningar, matcher och kalender" },
  { icon: Bell, label: "Kallelser du svarar på direkt i mobilen" },
  { icon: Newspaper, label: "Nyheter från klubben och ditt lag" },
  { icon: CreditCard, label: "Avgifter och digitalt medlemskort" },
];

// Membership first: the app only has something to show once you're registered in the club
const STEPS = [
  { icon: UserPlus, title: "Bli medlem", text: "Registrera dig i klubben via vår anmälan." },
  { icon: Smartphone, title: "Ladda ner appen", text: "Svenskalag-appen finns för iPhone och Android." },
  { icon: LogIn, title: "Logga in", text: "Med samma inloggning som på klubbens sida på Svenskalag." },
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

const Svenskalag = () => (
  <section id="svenskalag" className="py-24 md:py-32">
    <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <Reveal>
        <p className="eyebrow">Svenskalag</p>
        <h2 className="section-title">All information finns i Svenskalag.</h2>
        <p className="mt-6 text-lg text-ink/70">
          BK50 använder Svenskalag för allt som rör klubben. Där hittar du lagen, kalendern och nyheterna, och som medlem
          får du kallelser och har koll på dina avgifter.
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
          <h3 className="font-display text-2xl font-extrabold md:text-3xl">Så kommer du åt appen</h3>
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
                  <p className="mt-1 text-white/75">
                    {text}
                    {i === 0 && (
                      <>
                        {" "}
                        <a href={LINKS.signup} target="_blank" rel="noopener" className="font-semibold text-ball underline-offset-4 hover:underline">
                          Anmäl dig här
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <StoreBadges className="mt-8" />
          <a href={LINKS.svenskalagApp} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-1 text-sm text-white/70 hover:text-white">
            Läs mer om appen på svenskalag.se <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Svenskalag;
