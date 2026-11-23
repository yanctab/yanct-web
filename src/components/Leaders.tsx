import { ArrowUpRight, GraduationCap, HeartHandshake, Lock } from "lucide-react";
import { LINKS } from "@/links";
import Reveal from "./Reveal";

/**
 * A short section for the club's current leaders. Their group on Svenskalag (bk50-ledare) is internal,
 * so it has no public news feed to show here: news, calendar and documents need a login.
 */
const LINKS_FOR_LEADERS = [
  {
    icon: Lock,
    title: "Ledarsidan",
    text: "Nyheter, kalender och dokument för klubbens ledare. Logga in med ditt Svenskalag-konto.",
    href: LINKS.leaders,
    cta: "Till ledarsidan",
    primary: true,
  },
  {
    icon: GraduationCap,
    title: "Utbildningar",
    text: "Ledar-, domar- och funktionärsutbildningar via Svenska Basketbollförbundet. Hör av dig till utbildningsansvarig om du vill gå en.",
    href: LINKS.education,
    cta: "Se utbildningar",
  },
  {
    icon: HeartHandshake,
    title: "Värdegrund",
    text: "Så vill vi att alla i BK50 ska bemöta varandra, på och utanför planen.",
    href: LINKS.values,
    cta: "Läs värdegrunden",
  },
];

const Leaders = () => (
  <section id="ledare" className="py-20 md:py-24">
    <div className="container-page">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">För ledare</p>
        <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">Redan ledare i BK50?</h2>
        <p className="mt-5 text-lg text-ink/70">
          Allt för dig som tränar eller leder ett lag finns i ledargruppen på Svenskalag. Där hittar du också ledarnyheterna
          när du är inloggad.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {LINKS_FOR_LEADERS.map(({ icon: Icon, title, text, href, cta, primary }, i) => (
          <Reveal key={title} delay={i * 0.06} className="h-full">
            <a
              href={href}
              target="_blank"
              rel="noopener"
              className={`group flex h-full flex-col rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl md:p-7 ${
                primary ? "bg-wine-500 text-white" : "bg-white ring-1 ring-ink/5"
              }`}
            >
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${primary ? "bg-ball text-ink" : "bg-wine-50 text-wine-500"}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
              <p className={`mt-2 ${primary ? "text-white/80" : "text-ink/70"}`}>{text}</p>
              <span
                className={`mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold ${primary ? "text-ball" : "text-wine-600"}`}
              >
                {cta} <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Leaders;
