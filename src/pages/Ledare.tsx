import { useEffect } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Coffee,
  Globe,
  GraduationCap,
  Mail,
  MessageCircle,
  PartyPopper,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { COMMUNITY_MAIL, LINKS } from "@/links";
import Reveal from "@/components/Reveal";
import PageNav from "@/components/PageNav";
import YearTimeline, { type Meeting, type MeetingKind } from "@/components/YearTimeline";

/**
 * The leaders' page at /ledare: links to what leaders use (the leaders' group on Svenskalag, education, values)
 * and the leaders' meetings over the year.
 */
const BECOME_LEADER = `mailto:${LINKS.email}?subject=${encodeURIComponent("Jag vill bli ledare i BK50")}`;

const NAV = [
  { href: "#lankar", label: "För ledare" },
  { href: "#bli-ledare", label: "Bli ledare" },
  { href: "#verktyg", label: "Verktyg" },
  { href: "#ledarmoten", label: "Ledarmöten" },
  { href: "#ledartraffar", label: "Ledarträffar" },
  { href: LINKS.leaders, label: "Ledarsidan" },
];

// Besides the meetings: an informal monthly get-together, clinics leaders can offer each other, and After Basket,
// the leaders' after work on a Friday. Each month's
// get-together is an activity in the leaders' group on Svenskalag: leaders reply there, and say in a comment if they
// want to hold a clinic.
const MEETUPS = [
  {
    icon: Coffee,
    eyebrow: "En gång i månaden",
    title: "Ledarträff i hallen",
    text: "En gång i månaden ses de ledare som kan i Fäladshallen eller ISLK-hallen, en dag när flera lag tränar. Ingen agenda, vi pratar bara: om träningar, lag och det som är på gång. Träffen läggs upp som en aktivitet på ledarsidan i Svenskalag, där du svarar om du kommer.",
    cta: { label: "Svara på Svenskalag", href: LINKS.leaders },
  },
  {
    icon: GraduationCap,
    eyebrow: "När någon vill",
    title: "Håll i en clinic",
    text: "Har du något du är bra på, en övning, ett försvarsspel eller ett sätt att peppa? Håll i en clinic under en av dina träningar, där andra ledare kan vara med och lära sig. Skriv det i en kommentar när du svarar på månadens ledarträff i Svenskalag.",
    cta: { label: "Anmäl intresse på Svenskalag", href: LINKS.leaders },
  },
  {
    icon: PartyPopper,
    eyebrow: "After work på en fredag",
    title: "After Basket",
    text: "Vår after work för ledare. Vi möts på en fredag, gärna i samband med en träning i Fäladshallen eller ISLK-hallen, och gör sedan något socialt tillsammans. Den läggs upp som en aktivitet på ledarsidan i Svenskalag, där du svarar om du kommer.",
    cta: { label: "Svara på Svenskalag", href: LINKS.leaders },
  },
];

const LINKS_FOR_LEADERS = [
  { title: "Ledarsidan på Svenskalag", text: "Nyheter, kalender och dokument. Kräver inloggning.", href: LINKS.leaders },
  { title: "Utbildningar", text: "Ledar-, domar- och funktionärsutbildningar.", href: LINKS.education },
  { title: "Värdegrund", text: "Så vill vi att alla i BK50 bemöter varandra.", href: LINKS.values },
];

// The club's levels of teams, for those who want to become leaders: what the players do, and how much basketball
// experience a leader needs (`need`, 1–3, drawn as a meter)
const LEVELS = [
  {
    age: "7–11 år",
    title: "Easy Basket",
    text: "Lagen spelar på Easy Basket-nivå, med sammankomster där flera lag möts, lite som en minicup. Här räknar man inte poäng än.",
    need: 1,
    leader: "Du behöver inte ha spelat basket själv. Det viktigaste är att du gillar att vara med barn.",
  },
  {
    age: "U13–U18",
    title: "Seriespel",
    text: "Från U13 (under 13 år) spelar lagen i serier, hela vägen upp till U18. Från 15 år kan spelaren välja att fortsätta spela för att det är kul och för att umgås med kompisar.",
    need: 2,
    leader: "Här är det viktigare att du har spelat eller tränat basket.",
  },
  {
    age: "Från 15 år",
    title: "Satsningslag",
    text: "Den som vill satsa kan kvala in till något av våra satsningslag.",
    need: 3,
    leader: "Du behöver ha flera års erfarenhet.",
  },
];

// What each team has on Svenskalag
const SVENSKALAG_FEATURES = [
  { icon: Globe, label: "En laghemsida där du publicerar nyheter" },
  { icon: CalendarDays, label: "En kalender med lagets matcher och träningar" },
  { icon: Bell, label: "Kallelser som spelare och föräldrar svarar på i appen" },
];

// The leaders' meetings: two compulsory meetings in person at the start of each term (in August the club also
// decides which cups to go to), and an online check-in mid-term. `col` is the month on the timeline.
const MEETING_KINDS: Record<string, MeetingKind> = {
  physical: {
    label: "Ledarmöte på plats, obligatoriskt",
    tag: "På plats · obligatoriskt",
    dot: "bg-wine-600 ring-wine-600/25",
    chip: "bg-wine-600 text-white",
  },
  online: { label: "Avstämning online", tag: "Online", dot: "bg-ball ring-ball/30", chip: "bg-ball text-ink" },
};

const MEETINGS: Meeting[] = [
  {
    col: 1,
    when: "Januari",
    kind: "physical",
    title: "Ledarmöte inför våren",
    text: "Vi stämmer av inför vårterminen: lagen, hallarna, matcherna och det som behöver lösas.",
  },
  {
    col: 3,
    when: "Mars",
    kind: "online",
    title: "Avstämning",
    text: "Hur går terminen? Vi tar upp det som behöver lösas innan säsongen är slut.",
  },
  {
    col: 8,
    when: "Augusti",
    kind: "physical",
    title: "Ledarmöte inför hösten",
    text: "Vi bestämmer vilka cuper klubben ska åka på och stämmer av inför höstterminen.",
  },
  {
    col: 10,
    when: "Oktober",
    kind: "online",
    title: "Avstämning",
    text: "Hur går terminen? Vi tar upp det som behöver lösas, och stämmer av inför cuperna.",
  },
];

const Ledare = () => {
  useEffect(() => {
    document.title = "Ledare – BK50";
  }, []);

  return (
    <>
      <PageNav
        label="Ledarsidans meny"
        items={NAV}
        cta={
          <a href={BECOME_LEADER} className="btn-primary px-5 py-2.5 text-sm">
            Bli ledare
          </a>
        }
      />
      <main>
        <section className="court-bg relative overflow-hidden bg-wine-800 text-white">
          <div className="pointer-events-none absolute -right-40 -top-20 h-[36rem] w-[36rem] rounded-full bg-ball/15 blur-3xl" />
          <div className="container-page relative pb-20 pt-32 md:pb-28 md:pt-40">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ball">Ledare</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
              För dig som leder ett lag i BK50.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              Tränare och lagledare är hjärtat i klubben. Här hittar du det du behöver som ledare och när vi ses under året. Vill
              du bli ledare? Hör av dig, du behöver inte ha spelat basket själv.
            </p>

            <ul id="lankar" className="mt-10 grid max-w-4xl scroll-mt-24 gap-3 md:grid-cols-3">
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

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#ledarmoten" className="btn-primary">
                Ledarmötena under året <ArrowDown className="h-5 w-5" />
              </a>
              <a href="#bli-ledare" className="btn-ghost">
                Jag vill bli ledare
              </a>
            </div>
          </div>
        </section>

        <section id="bli-ledare" className="scroll-mt-16 bg-white py-20 text-ink md:py-28">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Bli ledare</p>
              <h2 className="section-title max-w-3xl">Vi behöver ledare på alla nivåer.</h2>
              <p className="mt-6 max-w-3xl text-lg text-ink/75">
                I BK50 finns lag på tre nivåer, från de yngsta som precis börjat till de som satsar. Hur mycket basket du behöver
                kunna beror på nivån.
              </p>
            </Reveal>

            <ol className="mt-12 grid gap-4 lg:grid-cols-3">
              {LEVELS.map((l, i) => (
                <Reveal key={l.title} delay={i * 0.05} className="flex">
                  <li className="flex w-full flex-col rounded-3xl bg-cream p-7 md:p-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-wine-500">{l.age}</p>
                    <h3 className="mt-1 font-display text-3xl font-extrabold">{l.title}</h3>
                    <p className="mt-3 text-ink/70">{l.text}</p>
                    <div className="mt-auto pt-6">
                      <div className="rounded-2xl bg-white p-5">
                        <p className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wider text-ink/50">
                          Basketerfarenhet som ledare
                          <span className="flex gap-1" aria-label={`${l.need} av 3`}>
                            {[1, 2, 3].map((n) => (
                              <span key={n} className={`h-2.5 w-6 rounded-full ${n <= l.need ? "bg-wine-600" : "bg-ink/10"}`} />
                            ))}
                          </span>
                        </p>
                        <p className="mt-2 text-ink/80">{l.leader}</p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal className="mt-8">
              <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-wine-800 p-7 text-white md:flex-row md:items-center md:p-8">
                <div>
                  <p className="font-display text-2xl font-extrabold">Alla kan alltid spela basket hos oss.</p>
                  <p className="mt-2 max-w-2xl text-white/75">
                    Från 15 år väljer spelaren om den vill spela för att det är kul eller satsa, men det finns alltid ett lag att
                    spela i. Vill du bli ledare? Berätta vilken nivå du är intresserad av.
                  </p>
                </div>
                <a href={BECOME_LEADER} className="btn-primary shrink-0">
                  Jag vill bli ledare
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="verktyg" className="scroll-mt-16 bg-cream py-20 text-ink md:py-28">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Verktyg</p>
              <h2 className="section-title max-w-3xl">Vi jobbar i Svenskalag och WhatsApp.</h2>
              <p className="mt-6 max-w-3xl text-lg text-ink/75">
                Som ny ledare kommer du att använda två verktyg: Svenskalag för lagets sida, kalender och kallelser, och WhatsApp
                för att hålla kontakten.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              <Reveal className="flex">
                <div className="court-bg flex w-full flex-col rounded-3xl bg-wine-800 p-7 text-white md:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ball">Svenskalag</p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">Lagets sida, kalender och kallelser</h3>
                  <p className="mt-3 text-white/75">
                    Varje lag har en laghemsida på Svenskalag. Där samlas allt om laget, och spelare och föräldrar svarar på
                    kallelser i Svenskalag-appen.
                  </p>
                  <ul className="mt-6 grid gap-3">
                    {SVENSKALAG_FEATURES.map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ball" />
                        <span className="font-medium">{label}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <a href={LINKS.svenskalagApp} target="_blank" rel="noopener" className="btn-primary">
                      Svenskalag-appen <ArrowUpRight className="h-5 w-5" />
                    </a>
                    <a href={LINKS.leaders} target="_blank" rel="noopener" className="btn-ghost">
                      Ledarsidan <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05} className="flex">
                <div className="flex w-full flex-col rounded-3xl bg-[#e7f8ee] p-7 ring-1 ring-[#25d366]/30 md:p-10">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#25d366] text-white">
                    <MessageCircle className="h-8 w-8" />
                  </span>
                  <p className="eyebrow mt-6 text-[#128c4a]">WhatsApp</p>
                  <h3 className="font-display text-2xl font-extrabold md:text-3xl">Lagets grupp och BK50-communityn</h3>
                  <div className="mt-6 grid gap-4">
                    <div className="flex gap-4 rounded-2xl bg-white p-5">
                      <UsersRound className="mt-1 h-5 w-5 shrink-0 text-[#128c4a]" />
                      <div>
                        <p className="font-display text-lg font-extrabold">Lagets WhatsApp-grupp</p>
                        <p className="mt-1 text-ink/70">
                          Varje lag har en WhatsApp-grupp där föräldrar och spelare har kontakt med ledarna.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 rounded-2xl bg-white p-5">
                      <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-[#128c4a]" />
                      <div>
                        <p className="font-display text-lg font-extrabold">BK50-communityn</p>
                        <p className="mt-1 text-ink/70">
                          Klubbens community, där alla ledare är med. Inte med än? Mejla sekreteraren, så får du en inbjudan.
                        </p>
                        <a
                          href={COMMUNITY_MAIL}
                          className="btn mt-4 bg-ink px-5 py-2.5 text-sm text-white hover:-translate-y-0.5 hover:bg-ink/85 focus-visible:outline-ink"
                        >
                          <Mail className="h-4 w-4" /> Mejla sekreteraren
                        </a>
                      </div>
                    </div>
                  </div>
                  <p className="mt-6 flex items-start gap-2 text-sm text-ink/60">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#128c4a]" />
                    Länkarna till grupperna delas inte här på sidan, bara med lagets och klubbens medlemmar.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="ledarmoten" className="scroll-mt-16 bg-white py-20 text-ink md:py-28">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Ledarmöten</p>
              <h2 className="section-title max-w-3xl">Fyra möten om året.</h2>
              <p className="mt-6 max-w-3xl text-lg text-ink/75">
                Varje termin börjar med ett ledarmöte på plats. De två mötena är obligatoriska för alla ledare: där stämmer vi av
                inför terminen, och på hösten bestämmer vi vilka cuper klubben ska åka på. Mitt i varje termin ses vi online och
                stämmer av hur det går.
              </p>
            </Reveal>
            <Reveal className="mt-10">
              <YearTimeline meetings={MEETINGS} kinds={MEETING_KINDS} />
            </Reveal>
            <p className="mt-8 max-w-3xl text-sm text-ink/60">
              Upplägget är ett förslag som styrelsen tar ställning till. Tycker du något om det?{" "}
              <a
                href={`mailto:${LINKS.board}?subject=${encodeURIComponent("Förslag: Ledarmöten")}`}
                className="font-semibold text-wine-600 underline underline-offset-4 hover:text-wine-700"
              >
                Hör av dig till styrelsen
              </a>
              .
            </p>
          </div>
        </section>

        <section id="ledartraffar" className="scroll-mt-16 bg-cream py-20 text-ink md:py-28">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Ledarträffar</p>
              <h2 className="section-title max-w-3xl">Lär av varandra, och ha kul ihop.</h2>
              <p className="mt-6 max-w-3xl text-lg text-ink/75">
                Mellan ledarmötena ses vi mer avslappnat i hallen, den som vill delar med sig av det den kan, och ibland avslutar vi veckan tillsammans.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {MEETUPS.map(({ icon: Icon, eyebrow, title, text, cta }, i) => (
                <Reveal key={title} delay={i * 0.05}>
                  <div className="flex h-full flex-col rounded-3xl bg-cream p-7 md:p-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-wine-600 text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-wine-500">{eyebrow}</p>
                    <h3 className="mt-1 font-display text-3xl font-extrabold">{title}</h3>
                    <p className="mt-3 text-ink/70">{text}</p>
                    {cta && (
                      <a
                        href={cta.href}
                        target="_blank"
                        rel="noopener"
                        className="group mt-auto inline-flex items-center gap-2 self-start pt-6 font-semibold text-wine-600 hover:underline"
                      >
                        {cta.label}{" "}
                        <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-ink/70">
              Mer information om träffarna finns på{" "}
              <a
                href={LINKS.leaders}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 font-semibold text-wine-600 underline underline-offset-4 hover:text-wine-700"
              >
                ledarsidan på Svenskalag <ArrowUpRight className="h-4 w-4" />
              </a>{" "}
              (kräver inloggning).
            </p>
          </div>
        </section>

        <footer className="bg-wine-900 text-white/60">
          <div className="container-page py-6 text-sm">
            <a href="/" className="inline-flex items-center gap-2 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Tillbaka till start
            </a>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Ledare;
