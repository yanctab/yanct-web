import { ArrowRight, Camera, Check, ClipboardList, Lightbulb, Mail, MessageCircle, PartyPopper, ShieldCheck, UsersRound } from "lucide-react";
import { COMMUNITY_MAIL, LINKS, boardMail } from "@/links";
import Reveal from "./Reveal";

const mail = (subject: string) => `mailto:${LINKS.email}?subject=${encodeURIComponent(subject)}`;

// Volunteer roles we are recruiting for right now. `href` overrides the default mail to info@ with `subject`.
const ROLES: {
  icon: typeof UsersRound;
  title: string;
  lead: string;
  text: string;
  points: string[];
  cta: string;
  subject: string;
  href?: string;
}[] = [
  {
    icon: ClipboardList,
    title: "Lagförälder",
    lead: "Hjälp ditt barns ledare med allt runt omkring.",
    text: "Som lagförälder har du koll på lagets matcher, cuper och aktiviteter och hjälper ledaren att planera säsongen. Du ser till att det finns föräldrar som ställer upp, och att föräldrarna svarar i tid. Sekreteraren hjälper dig att komma igång.",
    points: [
      "Planera säsongen med ledaren: matcher, sekretariat och körningar",
      "Ha koll på matcher, cuper och aktiviteter",
      "Se till att föräldrar ställer upp och svarar i tid",
    ],
    cta: "Jag vill bli lagförälder",
    subject: "Fråga: Jag vill bli lagförälder",
    // The secretary helps team parents get started, and reads the board's address
    href: boardMail("Fråga: Jag vill bli lagförälder"),
  },
  {
    icon: UsersRound,
    title: "Ledare",
    lead: "Vi söker fler ledare till våra lag.",
    text: "Du behöver inte ha spelat basket själv. Det viktigaste är att du gillar att vara med barn och ungdomar och vill ge lite av din tid. Du blir en del av ett gäng ledare som hjälps åt.",
    points: ["Träna och peppa en grupp", "Följ med på matcher", "Bli en förebild"],
    cta: "Jag vill bli ledare",
    subject: "Jag vill bli ledare i BK50",
  },
  {
    icon: Camera,
    title: "Foto & film",
    lead: "Gillar du att fota, filma eller redigera?",
    text: "Hjälp oss fånga matcher, träningar och läger i bilder och korta klipp till våra sociala medier. Mobilen räcker långt, det viktiga är känslan för bra bilder.",
    points: ["Fota och filma matcher och träningar", "Klipp ihop korta videor", "Visa upp klubben i sociala medier"],
    cta: "Jag vill fota och filma",
    subject: "Jag vill fota och filma för BK50",
  },
  {
    icon: PartyPopper,
    title: "Open court-värd",
    lead: "Har du tid att vara med på våra open court-event?",
    text: "På open court kommer spelare för att umgås och spela basket. Vi behöver vuxna på plats som välkomnar alla och ser till att det blir en trygg och rolig stund.",
    points: ["Var en vuxen på plats", "Välkomna nya ansikten", "Skapa gemenskap"],
    cta: "Jag vill hjälpa till",
    subject: "Jag vill vara med på open court",
  },
];

const Engage = () => (
  <section id="engagera" className="bg-ink py-24 text-white md:py-32">
    <div className="container-page">
      <Reveal className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="eyebrow text-ball">Engagera dig</p>
          <h2 className="section-title">
            Du behöver inte kunna <span className="text-ball">basket</span>.
          </h2>
        </div>
        <p className="text-lg text-white/70">
          BK50 drivs av människor som ger lite av sin tid. Vill du hjälpa till finns det en plats för dig, oavsett
          om du någonsin har studsat en boll.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {ROLES.map(({ icon: Icon, title, lead, text, points, cta, subject, href }, i) => (
          <Reveal key={title} delay={(i % 2) * 0.08} className="flex">
            <article className="flex w-full flex-col rounded-3xl bg-white p-7 text-ink md:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-wine-500 text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="rounded-full bg-ball/15 px-3 py-1 text-xs font-semibold text-ball-600">Vi söker nu</span>
              </div>
              <h3 className="mt-6 font-display text-3xl font-extrabold">{title}</h3>
              <p className="mt-2 font-semibold text-wine-600">{lead}</p>
              <p className="mt-3 text-ink/70">{text}</p>
              <ul className="mb-8 mt-5 space-y-2">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-ink/80">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-wine-500" /> {point}
                  </li>
                ))}
              </ul>
              <a
                href={href ?? mail(subject)}
                className="group mt-auto inline-flex items-center justify-between gap-3 rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition hover:bg-wine-500"
              >
                {cta}
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      {/* The club's WhatsApp community, the same as on the board's page, and the workshop concept for ideas */}
      <Reveal className="mt-8">
        <div className="grid gap-8 rounded-3xl bg-[#e7f8ee] p-7 text-ink ring-1 ring-[#25d366]/30 md:p-10 lg:grid-cols-[auto_1fr] lg:items-start">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#25d366] text-white">
            <MessageCircle className="h-8 w-8" />
          </span>
          <div>
            <p className="eyebrow text-[#128c4a]">BK50-communityn · WhatsApp</p>
            <h3 className="font-display text-2xl font-extrabold md:text-3xl">Vill du hjälpa till men vet inte hur?</h3>
            <p className="mt-3 max-w-2xl text-ink/75">
              Gå med i BK50-communityn på WhatsApp, så kan vi nå ut till dig när vi behöver hjälp med andra uppgifter. Har du
              en idé som du skulle vilja jobba med kan du sätta upp en workshop. Skriv idén i chatten Workshop i communityn och se
              om fler vill vara med.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="flex gap-4 rounded-2xl bg-white p-5">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-[#128c4a]" />
                <div>
                  <p className="font-display text-lg font-extrabold">Gå med i communityn</p>
                  <p className="mt-1 text-ink/70">Mejla sekreteraren, så får du en inbjudan.</p>
                  <a
                    href={COMMUNITY_MAIL}
                    className="btn mt-4 bg-ink px-5 py-2.5 text-sm text-white hover:-translate-y-0.5 hover:bg-ink/85 focus-visible:outline-ink"
                  >
                    Mejla sekreteraren
                  </a>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl bg-white p-5">
                <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-[#128c4a]" />
                <div>
                  <p className="font-display text-lg font-extrabold">Gör något av din idé</p>
                  <p className="mt-1 text-ink/70">Så går en workshop till, och så skickar ni in den till styrelsen.</p>
                  <a
                    href={LINKS.workshop}
                    className="btn mt-4 bg-ink px-5 py-2.5 text-sm text-white hover:-translate-y-0.5 hover:bg-ink/85 focus-visible:outline-ink"
                  >
                    Så gör du en workshop <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-6 flex items-start gap-2 text-sm text-ink/60">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#128c4a]" />
              Länken till communityn delas inte här på sidan. Sekreteraren skickar en inbjudan till dig som är med i klubben.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.05] p-6 md:flex-row md:items-center md:px-8">
        <p className="text-white/75">
          <strong className="text-white">Något annat i tankarna?</strong> Till exempel styrelsearbete, hör av dig
          till{" "}
          <a href={mail("Jag vill engagera mig i BK50")} className="font-semibold text-ball underline underline-offset-4">
            {LINKS.email}
          </a>
          .
        </p>
        <a href={LINKS.engage} target="_blank" rel="noopener" className="shrink-0 font-semibold text-ball hover:underline">
          Mer om att engagera dig →
        </a>
      </Reveal>
    </div>
  </section>
);

export default Engage;
