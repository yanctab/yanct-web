import { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Lightbulb,
  Mail,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import PageNav from "@/components/PageNav";
import YearTimeline, { type Meeting, type MeetingKind } from "@/components/YearTimeline";
import { COMMUNITY_MAIL, LINKS, boardMail } from "@/links";

/**
 * The board's page at /styrelse: how the board works, how to reach it (styrelse@bk50.se and the subject
 * lines the secretary's workflow sorts on), the workshop concept and the issues in the board's queue.
 * Sources: basket/dokument/styrelsen/skicka-till-styrelsen.md, basket/dokument/workshop/workshop-i-klubben.md
 * and basket/styrelse/inkommet/. ISSUES are proposals only, not yet on any agenda; update them and NEXT_MEETING after each board meeting.
 */
const BOARD_EMAIL = LINKS.board;

const NEXT_MEETING = "8 december 2026";
const UPDATED = "28 november 2026";

const mailto = boardMail;

const NAV = [
  { href: "#sa-jobbar-vi", label: "Så jobbar vi" },
  { href: "#kontakt", label: "Kontakta oss" },
  { href: "#workshop", label: "Workshop" },
  { href: "#genomfort", label: "Genomfört" },
  { href: "#arenden", label: "Ärenden" },
];

// From the board's settings (basket/styrelse/styrelse.json). Personal e-mail addresses are never published here.
const MEMBERS = [
  { name: "Susanna Falkengren", role: "Ordförande", area: "Sponsring och inkomstkällor" },
  { name: "Monica Gonzalez Säfström", role: "Kassör", area: "Ekonomi" },
  { name: "Måns Zigher", role: "Sekreterare", area: "AI och IT" },
  { name: "Hannah Johansson", role: "Ledamot", area: "Verksamhetsutveckling" },
  { name: "Alice Nordberg", role: "Ledamot", area: "Media, marknadsföring och domarutveckling" },
];

const PRINCIPLES = [
  {
    title: "En väg in",
    text: `Allt som ska till styrelsen går till ${BOARD_EMAIL}. Då tas alla förslag och frågor emot, bedöms och behandlas på samma sätt.`,
  },
  {
    title: "Rätt sak på rätt ställe",
    text: "Inte allt behöver ett styrelsebeslut. Praktiska saker går till kansliet, och frågor inom en ledamots område till den ledamoten. Är det osäkert går det hellre till styrelsen.",
  },
  {
    title: "Besluten tas på möten",
    text: "Styrelsen har sex möten om året, tre per termin (se halvårsplanen nedan). Ärenden står i dagordningen och besluten i protokollet. Inget är beslutat förrän styrelsen har tagit upp det.",
  },
  {
    title: "Ni gör, vi stöttar",
    text: "Styrelsen kan ge pengar eller klartecken, men en idé genomförs av dem som vill driva den. Styrelsen är ideell, precis som ni.",
  },
];

// The board's year: a half-year plan per term. A planning meeting at the start of each term, then two online
// meetings: a check-in on the plan mid-term and a follow-up at the end of the term. `col` is the month (1–12)
// the dot sits on in the desktop timeline.
const MEETING_KINDS: Record<string, MeetingKind> = {
  plan: { label: "Planeringsmöte", tag: "Planering", dot: "bg-wine-600 ring-wine-600/25", chip: "bg-wine-600 text-white" },
  check: { label: "Avstämning online", tag: "Online", dot: "bg-ball ring-ball/30", chip: "bg-ball text-ink" },
  end: { label: "Terminsavslut online", tag: "Online", dot: "bg-ink ring-ink/20", chip: "bg-ink text-white" },
};

// What goes into a planning meeting and what comes out of it
const PLAN_INPUTS = [
  {
    icon: Briefcase,
    title: "Kansliets punkter",
    text: "Kansliet tar med det som hen ser att klubben behöver jobba med.",
  },
  {
    icon: Lightbulb,
    title: "Förslag från workshops",
    text: "Förslagen som medlemmarna har kommit fram till i sina workshops.",
    href: "#workshop",
  },
];

const MEETINGS: Meeting[] = [
  { col: 1, when: "Januari", kind: "plan", title: "Planeringsmöte", text: "Utifrån kansliets punkter och workshopförslag väljer vi vad vi jobbar med i vår, och presenterar det för kansliet." },
  { col: 4, when: "Mars–april", kind: "check", title: "Avstämning", text: "Hur går det med planen? Vi justerar det som har kört fast." },
  { col: 6, when: "Juni", kind: "end", title: "Terminsavslut", text: "Vi följer upp våren och tar med lärdomarna till hösten." },
  { col: 8, when: "Augusti", kind: "plan", title: "Planeringsmöte", text: "Utifrån kansliets punkter och workshopförslag väljer vi vad vi jobbar med i höst, och presenterar det för kansliet." },
  { col: 10, when: "Oktober", kind: "check", title: "Avstämning", text: "Hur går det med planen? Vi justerar det som har kört fast." },
  { col: 12, when: "December", kind: "end", title: "Terminsavslut", text: "Vi följer upp hösten och tar med lärdomarna till nästa år." },
];

// When something is a matter for the board (from the workshop document and the board's workflow)
const BOARD_MATTERS = [
  "kostar pengar utanför budgeten",
  "kräver en ny regel eller ett avsteg från ett tidigare beslut",
  "gäller avtal eller personal",
  "berör hela klubben",
];

const SUBJECTS = [
  { prefix: "Förslag:", use: "En idé eller ett önskemål som kräver beslut, pengar eller en ny rutin.", example: "Förslag: Banderoller till ISLK-hallen" },
  { prefix: "Fråga:", use: "En fråga till styrelsen.", example: "Fråga: Får vi låna Fäladshallen på lördag?" },
  { prefix: "Workshop:", use: "Resultatet av en workshop, se nedan.", example: "Workshop: Basketskola på skolorna" },
];

const PROPOSAL_QUESTIONS = [
  { q: "Vad vill du göra?", a: "Ofta räcker en eller två meningar." },
  { q: "Varför?", a: "Vilket behov eller problem det löser." },
  { q: "Vad kostar det?", a: "Pris, helst med länkar till alternativen. Skriv om det är med eller utan moms." },
  { q: "Vad behövs mer?", a: "Tid, personer, material, lokal eller tillstånd." },
  { q: "Vem är ansvarig?", a: "Ett namn som styrelsen kan vända sig till." },
];

const PROPOSAL_TEMPLATE = `Vad vill vi göra?
<en eller två meningar>

Varför?
<behov eller problem>

Vad kostar det?
<pris och länkar, med eller utan moms>

Vad behövs mer?
<tid, personer, material, lokal, tillstånd>

Ansvarig:
<namn>`;

const AFTER_MAIL = [
  "Sekreteraren tar emot mejlet. Det sker inte automatiskt ännu, så svaret kan ta lite tid.",
  "Ett verktyg gör en första bedömning: är det en fråga för styrelsen, för kansliet, för en ledamot, eller finns det redan ett beslut som svarar? Sekreteraren granskar bedömningen.",
  "Ett förslag till beslut skrivs när ärendet har kommit in, så du behöver inte formulera det själv. Det som styrelsen ska besluta om tas upp på nästa möte.",
  "Du får svar från styrelsen. Beslutet står i mötesprotokollet, och du får besked när det är klart.",
];

// Before the workshop: find others in the club's WhatsApp community (the invite link is never published).
const FIND_OTHERS: { title: string; text: string; cta?: { label: string; href: string } }[] = [
  {
    title: "Gå med i BK50-communityn",
    text: "Är du inte med än? Mejla sekreteraren, så får du en inbjudan.",
    cta: { label: "Mejla sekreteraren", href: COMMUNITY_MAIL },
  },
  {
    title: "Skriv din idé i chatten Workshop",
    text: "Berätta kort vad du vill göra och fråga om någon vill vara med. Där ser du också andras idéer och kan hänga på.",
  },
];

const WORKSHOP_STEPS = [
  { time: "0–20 min", title: "Är det här något?", text: "Diskutera fritt. Finns det intresse att jobba med idén? Om inte är det också ett resultat." },
  { time: "20–40 min", title: "Punkter", text: "Kom fram till några konkreta punkter, alltså saker man kan göra. Fantasin sätter gränserna, och alla idéer får vara med." },
  { time: "40–55 min", title: "Vad kräver det?", text: "Gå igenom varje punkt: kostar den pengar, hur mycket tid och hur många personer behövs, behövs material eller lokal?" },
  { time: "55–60 min", title: "Skicka in", text: "Bestäm vem som mejlar, och vem som är ansvarig för idén." },
];

const WORKSHOP_TEMPLATE = `Vad vill vi göra?
<1–3 meningar>

Punkter
1. <punkt>: kräver <pengar / tid / personer / material, eller "inget särskilt">
2. <punkt>: kräver …
3. …

Ansvarig:
<namn på den som driver idén vidare>

Övrigt
<annat som kom upp, frågor ni inte fick svar på>`;

const WORKSHOP_AFTER = [
  "Sekreteraren läser mejlet och går igenom era punkter.",
  "Ni får en sammanställning tillbaka. För varje punkt står det om ni kan köra vidare själva, om styrelsen behöver besluta, eller om något är oklart, och varför.",
  "Punkter ni kan köra själva kan ni starta direkt.",
  "Punkter som styrelsen ska besluta om blir ett ärende. Det tas upp på ett styrelsemöte, eller avgörs utan möte när det går, och ni får besked efteråt.",
];

const LAST_MEETING = "3 oktober 2026";

type Done = { title: string; text: string; status: "Klart" | "Pågår"; source: string };

// What the board has decided and carried out since the last meeting, from the minutes (basket/styrelse/2026/möten/)
// and the task register (basket/styrelse/register.json). No names of parents or players, no figures from the accounts.
// Replace after each meeting, and update LAST_MEETING.
const DONE: Done[] = [
  {
    title: "Lotteriförsäljning via Folkspel",
    text: "Lag får sälja Folkspels lotter en gång per år, före jul, och behållningen går till lagkassan. Klubben är registrerad hos Folkspel och har ett eget lotterikonto med Swish. F12/F11 Vita säljer först, som ett försök, och efter en utvärdering beslutar styrelsen om fler lag får sälja.",
    status: "Klart",
    source: "Beslut utan möte 12 oktober",
  },
  {
    title: "Bakförsäljning för lagen",
    text: "Lagen får sälja bakverk med innehållsförteckning, och hygienreglerna ska följas. Den som bakar står för sina kostnader, och intäkterna delas lika mellan laget och klubben. Skriftliga riktlinjer tas fram.",
    status: "Klart",
    source: "Beslut 3 oktober",
  },
  {
    title: "Kiosken finns kvar",
    text: "Kiosken är kvar, men bara för de lag som sköter sina åtaganden.",
    status: "Klart",
    source: "Beslut 3 oktober",
  },
  {
    title: "Kläder och produkter via 2Win",
    text: "Klubbens kläder och produkter säljs i klubbshopen hos 2Win. Matchdräkter köps via ett annat företag.",
    status: "Klart",
    source: "Beslut 3 oktober",
  },
  {
    title: "Julfest för ledare",
    text: "Klubbens ledare, även ungdomsledarna, är bjudna på julfest lördagen den 5 december. Inbjudan har gått ut.",
    status: "Klart",
    source: "Beslut 3 oktober",
  },
  {
    title: "Byte av förening i föräldraguiden",
    text: "Guiden för vårdnadshavare har fått ett stycke om övergångar under säsongen och de etiska reglerna.",
    status: "Klart",
    source: "Efter mejl till styrelsen",
  },
];

type Issue = { title: string; text: string; from: string };

// Open issues in the board's queue (basket/styrelse/inkommet/), written for the public: no names of
// members, no amounts that aren't decided, and nothing marked restricted (personnel, finances).
const ISSUES: Issue[] = [
  {
    title: "Mer öppenhet kring styrelsens möten",
    text: "Styrelsemötena läggs in i kalendern på Svenskalag, och efter varje möte publiceras en kort nyhet om vad som behandlats och beslutats.",
    from: "Styrelsen",
  },
  {
    title: "Ny hemsida ovanpå Svenskalag",
    text: "Ska klubben ha en hemsida som är klubbens ansikte utåt, med Svenskalag kvar som systemet bakom? Den här sidan är en del av förslaget.",
    from: "Styrelsen",
  },
  {
    title: "Ledarmöten varje termin",
    text: "Styrelsen driver ett ledarmöte varje termin, med en fast agenda, avrapportering från kansliet och gärna en social del. Frågor samlas in i förväg.",
    from: "Kansliet och styrelsen",
  },
  {
    title: "Börja filma matcher",
    text: "Vad behövs (stativ, iPad, ett YouTube-konto), vad har klubben redan, och hur ska filmning, delning och samtycke fungera?",
    from: "Styrelsen",
  },
  {
    title: "Flaggor och banderoller i hallarna",
    text: "Flaggor och banderoller som sätts upp i ISLK-hallen vid hemmamatcher och i Fäladshallen vid open court. Styrelsen tar ställning till inköp och budget.",
    from: "Medlem",
  },
  {
    title: "Nya bollar",
    text: "Många bollar är sönder, särskilt i storlek 5. Först kartläggs hur många som behövs, sedan beställs de inom budgeten för material.",
    from: "Ledare",
  },
  {
    title: "Process för beställning av dräkter",
    text: "En provdräkt i varje storlek, ett fast antal beställningar per termin och en ansvarig för beställningarna.",
    from: "Styrelsen",
  },
  {
    title: "Fler hjälpande föräldrar i WhatsApp-communityn",
    text: "Föräldrar som hjälper till vid Lundaspelen bjuds in till klubbens WhatsApp-community, om de själva vill, så att det blir lättare att hitta hjälp till till exempel open court.",
    from: "Styrelsen",
  },
  {
    title: "Basketcoachen för ungdomstränare",
    text: "Ska klubben tipsa sina ungdomstränare om webbtjänsten Basketcoachen och låta några lag testa den?",
    from: "Kansliet",
  },
];

const Template = ({ text }: { text: string }) => (
  <pre className="overflow-x-auto rounded-2xl bg-ink p-5 text-sm leading-relaxed text-white/85">{text}</pre>
);

const Steps = ({ items }: { items: string[] }) => (
  <ol className="grid gap-3">
    {items.map((s, i) => (
      <li key={s} className="flex gap-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-wine-600 font-display font-extrabold text-white">
          {i + 1}
        </span>
        <span className="pt-1 text-ink/80">{s}</span>
      </li>
    ))}
  </ol>
);

const Styrelse = () => {
  useEffect(() => {
    document.title = "Styrelsen – BK50";
  }, []);

  return (
    <>
      <PageNav
        label="Styrelsens meny"
        items={NAV}
        cta={
          <a href={mailto("Fråga: ")} className="btn-primary px-5 py-2.5 text-sm">
            <Mail className="h-4 w-4" /> Mejla oss
          </a>
        }
      />

      <main className="bg-cream text-ink">
        <section className="court-bg relative overflow-hidden bg-wine-800 text-white">
          <div className="pointer-events-none absolute -right-40 -top-20 h-[36rem] w-[36rem] rounded-full bg-ball/15 blur-3xl" />
          <div className="container-page relative pb-20 pt-32 md:pb-28 md:pt-40">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ball">Styrelsen</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
              En öppen styrelse som går att nå.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              Här berättar vi hur styrelsen jobbar, hur du kommer i kontakt med oss och vilka ärenden vi tittar på just nu. Har
              du en idé som skulle göra klubben bättre vill vi gärna höra den.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#kontakt" className="btn-primary">
                Skicka ett förslag <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#arenden" className="btn-ghost">
                Se vad vi jobbar med
              </a>
            </div>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/85">
              <CalendarDays className="h-4 w-4 text-ball" /> Nästa styrelsemöte: {NEXT_MEETING}
            </p>
          </div>
        </section>

        <section id="sa-jobbar-vi" className="scroll-mt-16 py-20 md:py-28">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Så jobbar vi</p>
              <h2 className="section-title max-w-3xl">Förslag och frågor behandlas på samma sätt.</h2>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05}>
                  <div className="h-full rounded-3xl bg-white p-7 shadow-sm">
                    <h3 className="font-display text-2xl font-extrabold">{p.title}</h3>
                    <p className="mt-2 text-ink/75">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-16">
              <h3 className="font-display text-2xl font-extrabold md:text-3xl">Styrelsens år: en halvårsplan per termin</h3>
              <p className="mt-3 max-w-3xl text-ink/75">
                I stället för att bara hantera ärenden som kommer in jobbar styrelsen mot några få gemensamma mål. Varje termin
                börjar med ett planeringsmöte där vi gör en plan för halvåret. Underlaget är punkter från kansliet och förslag från
                medlemmarnas workshops, och mötet avslutas med att vi presenterar planen för kansliet. Mitt i terminen stämmer vi av planen online, och i
                slutet av terminen följer vi upp den. Det blir sex möten om året: två planeringsmöten och fyra online.
              </p>
              <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
                <div className="grid gap-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">In till planeringen</p>
                  {PLAN_INPUTS.map(({ icon: Icon, title, text, href }) => (
                    <div key={title} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-wine-600" />
                      <div>
                        <p className="font-semibold">
                          {href ? (
                            <a href={href} className="underline underline-offset-4 hover:text-wine-700">
                              {title}
                            </a>
                          ) : (
                            title
                          )}
                        </p>
                        <p className="mt-1 text-sm text-ink/70">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <ArrowRight className="mx-auto h-6 w-6 rotate-90 self-center text-ink/30 lg:rotate-0" aria-hidden />
                <div className="flex flex-col justify-center rounded-2xl bg-wine-600 p-5 text-white">
                  <CalendarDays className="h-6 w-6 text-ball" />
                  <p className="mt-3 font-display text-xl font-extrabold">Planeringsmötet</p>
                  <p className="mt-1 text-sm text-white/80">
                    Styrelsen går igenom punkterna och väljer några få att jobba med under halvåret, med vem som ansvarar för
                    vad.
                  </p>
                </div>
                <ArrowRight className="mx-auto h-6 w-6 rotate-90 self-center text-ink/30 lg:rotate-0" aria-hidden />
                <div className="flex flex-col justify-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">Ut från planeringen</p>
                  <div className="flex gap-3 rounded-2xl bg-ball/20 p-4">
                    <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-wine-600" />
                    <div>
                      <p className="font-semibold">Halvårsplanen till kansliet</p>
                      <p className="mt-1 text-sm text-ink/70">
                        Mötet avslutas med att styrelsen presenterar punkterna vi ska jobba med för kansliet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <YearTimeline meetings={MEETINGS} kinds={MEETING_KINDS} />
              </div>
              <p className="mt-8 max-w-3xl text-ink/75">
                Det här är vårt sätt att jobba, och vi vill gärna höra vad du tycker om det.{" "}
                <a
                  href={mailto("Förslag: Styrelsens arbetssätt")}
                  className="font-semibold text-wine-600 underline underline-offset-4 hover:text-wine-700"
                >
                  Skicka dina tankar
                </a>
                .
              </p>
            </Reveal>

            <Reveal className="mt-16">
              <div className="rounded-3xl border border-wine-500/20 bg-wine-50 p-7">
                <h3 className="font-display text-xl font-extrabold">När behövs ett styrelsebeslut?</h3>
                <p className="mt-2 text-ink/75">När något</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {BOARD_MATTERS.map((m) => (
                    <li key={m} className="flex gap-2 text-ink/80">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-wine-600" /> {m}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-ink/75">
                  Annars kan ni oftast bara köra, så länge det inte går emot klubbens{" "}
                  <a href={LINKS.statutes} target="_blank" rel="noopener" className="font-semibold text-wine-600 underline underline-offset-4 hover:text-wine-700">
                    stadgar
                  </a>{" "}
                  eller{" "}
                  <a href={LINKS.values} target="_blank" rel="noopener" className="font-semibold text-wine-600 underline underline-offset-4 hover:text-wine-700">
                    värdegrund
                  </a>
                  . Är ni osäkra, fråga styrelsen.
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-16">
              <h3 className="flex items-center gap-2 font-display text-2xl font-extrabold">
                <Users className="h-6 w-6 text-wine-600" /> Styrelsen
              </h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {MEMBERS.map((m) => (
                  <li key={m.name} className="rounded-2xl bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-wider text-wine-500">{m.role}</p>
                    <p className="mt-1 font-display text-xl font-extrabold">{m.name}</p>
                    <p className="mt-1 text-sm text-ink/65">{m.area}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink/60">
                Kansliet sköter den dagliga verksamheten. Mejla styrelsen på {BOARD_EMAIL}, inte enskilda ledamöter, så att
                inget faller mellan stolarna.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="kontakt" className="scroll-mt-16 bg-white py-20 md:py-28">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Kontakta oss</p>
              <h2 className="section-title max-w-3xl">Mejla {BOARD_EMAIL}.</h2>
              <p className="mt-6 max-w-2xl text-lg text-ink/75">
                Har du ett förslag, en fråga eller något som styrelsen bör känna till? Skicka ett mejl. Det enda som måste vara
                rätt är ämnesraden.
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <div className="rounded-3xl bg-ball/15 p-6 md:p-7">
                <p className="font-display text-xl font-extrabold">Ämnet måste börja med rätt ord</p>
                <p className="mt-2 text-ink/75">
                  Mejl utan rätt ord i ämnet läses inte och kan bli liggande. Ett svar på ett tidigare mejl räknas inte heller, så
                  skriv ett nytt mejl med rätt ämne.
                </p>
              </div>
            </Reveal>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {SUBJECTS.map((s, i) => (
                <Reveal key={s.prefix} delay={i * 0.05}>
                  <a
                    href={mailto(`${s.prefix} `, s.prefix === "Förslag:" ? PROPOSAL_TEMPLATE : s.prefix === "Workshop:" ? WORKSHOP_TEMPLATE : "")}
                    className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-cream p-6 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <code className="font-display text-3xl font-extrabold text-wine-600">{s.prefix}</code>
                    <span className="mt-2 text-ink/75">{s.use}</span>
                    <span className="mt-3 text-sm text-ink/55">Exempel: {s.example}</span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-wine-600">
                      Skriv mejl <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <div className="mt-16 grid gap-10 lg:grid-cols-2">
              <Reveal>
                <h3 className="font-display text-2xl font-extrabold">Vad förslaget kan innehålla</h3>
                <p className="mt-2 text-ink/75">
                  Skriv fritt. Frågorna är ett stöd, så att styrelsen kan ta ställning utan att behöva fråga om.
                </p>
                <dl className="mt-6 grid gap-4">
                  {PROPOSAL_QUESTIONS.map((p) => (
                    <div key={p.q}>
                      <dt className="font-semibold">{p.q}</dt>
                      <dd className="text-ink/70">{p.a}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-6 grid gap-2 text-sm text-ink/70">
                  <li>• Skriv inte namn på spelare eller barn. "Föräldrar i F12" räcker.</li>
                  <li>• Ett förslag per mejl, så att varje sak kan behandlas för sig.</li>
                  <li>• Bifoga underlag, till exempel offerter eller bilder, i samma mejl.</li>
                </ul>
              </Reveal>
              <Reveal delay={0.05}>
                <h3 className="font-display text-2xl font-extrabold">Mall (valfri)</h3>
                <p className="mt-2 text-ink/75">
                  Ämne: <code className="font-semibold">Förslag: &lt;rubrik&gt;</code>
                </p>
                <div className="mt-4">
                  <Template text={PROPOSAL_TEMPLATE} />
                </div>
              </Reveal>
            </div>

            <Reveal className="mt-16">
              <h3 className="font-display text-2xl font-extrabold">Vad händer sedan?</h3>
              <div className="mt-6 max-w-3xl">
                <Steps items={AFTER_MAIL} />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="workshop" className="court-bg scroll-mt-16 bg-wine-800 py-20 text-white md:py-28">
          <div className="container-page">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ball">Workshop i BK50</p>
              <h2 className="section-title max-w-3xl">En idé, några som vill och en timme.</h2>
              <p className="mt-6 max-w-2xl text-lg text-white/80">
                Har du en idé som skulle göra klubben bättre? Samla några som vill vara med och ta en workshop. Det tar en timme,
                och du behöver inte be om lov. Det viktigaste är att ni gör något av idén.
              </p>
            </Reveal>

            <Reveal className="mt-12">
              <div className="grid gap-8 rounded-3xl bg-[#e7f8ee] p-7 text-ink ring-1 ring-[#25d366]/30 md:p-10 lg:grid-cols-[auto_1fr] lg:items-start">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#25d366] text-white">
                  <MessageCircle className="h-8 w-8" />
                </span>
                <div>
                  <p className="eyebrow text-[#128c4a]">Först · WhatsApp</p>
                  <h3 className="font-display text-2xl font-extrabold md:text-3xl">Hitta fler som vill i BK50-communityn</h3>
                  <p className="mt-3 max-w-2xl text-ink/75">
                    Klubben samlas på WhatsApp. I BK50-communityn finns chatten Workshop, där du hittar andra som vill göra något
                    av samma idé.
                  </p>
                  <ol className="mt-6 grid gap-4 md:grid-cols-2">
                    {FIND_OTHERS.map((s, i) => (
                      <li key={s.title} className="flex gap-4 rounded-2xl bg-white p-5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25d366] font-display font-extrabold text-white">
                          {i + 1}
                        </span>
                        <span>
                          <span className="block font-display text-lg font-extrabold">{s.title}</span>
                          <span className="mt-1 block text-ink/70">{s.text}</span>
                          {s.cta && (
                            <a
                              href={s.cta.href}
                              className="btn mt-4 bg-ink px-5 py-2.5 text-sm text-white hover:-translate-y-0.5 hover:bg-ink/85 focus-visible:outline-ink"
                            >
                              <Mail className="h-4 w-4" /> {s.cta.label}
                            </a>
                          )}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 flex items-start gap-2 text-sm text-ink/60">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#128c4a]" />
                    Länken till communityn delas inte här på sidan. Sekreteraren skickar en inbjudan till dig som är med i klubben.
                  </p>
                </div>
              </div>
              <p className="mt-6 max-w-2xl text-white/70">
                Två eller tre som vill samma sak räcker. När ni har hittat varandra bokar ni en timme. Utse en som håller tiden och
                en som skriver upp det ni kommer fram till.
              </p>
            </Reveal>

            <h3 className="mt-16 font-display text-2xl font-extrabold">Sedan: workshopen</h3>
            <ol className="mt-6 grid gap-4 md:grid-cols-4">
              {WORKSHOP_STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.05}>
                  <li className="h-full rounded-3xl border border-white/15 bg-white/5 p-6">
                    <p className="text-sm font-semibold text-ball">{s.time}</p>
                    <p className="mt-2 font-display text-2xl font-extrabold">{s.title}</p>
                    <p className="mt-2 text-white/70">{s.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal className="mt-6">
              <p className="max-w-3xl text-white/70">
                Ni behöver inte avgöra själva om styrelsen ska vara med. Det gör sekreteraren åt er.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-10 lg:grid-cols-2">
              <Reveal>
                <h3 className="font-display text-2xl font-extrabold">Skicka in</h3>
                <p className="mt-2 text-white/75">
                  Mejla {BOARD_EMAIL}. Ämnet måste börja med <code className="font-semibold text-ball">Workshop:</code> följt av
                  en rubrik, till exempel <code className="font-semibold">Workshop: Basketskola på skolorna</code>.
                </p>
                <p className="mt-4 text-white/75">
                  Skriv fritt, men ta med vad ni vill göra, punkterna, vad varje punkt kräver och vem som är ansvarig (ett namn).
                  Skriv inte namn på spelare eller barn.
                </p>
                <a href={mailto("Workshop: ", WORKSHOP_TEMPLATE)} className="btn-primary mt-6">
                  <Mail className="h-5 w-5" /> Skicka en workshop
                </a>
              </Reveal>
              <Reveal delay={0.05}>
                <Template text={WORKSHOP_TEMPLATE} />
              </Reveal>
            </div>

            <Reveal className="mt-16">
              <h3 className="font-display text-2xl font-extrabold">Vad händer sedan?</h3>
              <ol className="mt-6 grid max-w-3xl gap-3">
                {WORKSHOP_AFTER.map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ball font-display font-extrabold text-ink">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-white/80">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-3xl text-white/70">
                Styrelsen kan besluta om pengar eller ge klartecken, så att ni vet att ni har styrelsens stöd. Men det är ni som
                genomför idén, tillsammans, så alla i gruppen behöver vara beredda att jobba med den. Behöver styrelsen bara ge
                klartecken ska ni få besked snabbt.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="genomfort" className="scroll-mt-16 bg-white py-20 md:py-28">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Genomfört</p>
              <h2 className="section-title max-w-3xl">Det här har vi gjort sedan förra mötet.</h2>
              <p className="mt-6 max-w-2xl text-lg text-ink/75">
                Beslut från styrelsemötet {LAST_MEETING} och sedan dess, och vad som har hänt med dem. Hela besluten står i
                protokollen.
              </p>
            </Reveal>

            <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {DONE.map((d, i) => (
                <Reveal key={d.title} delay={(i % 3) * 0.05}>
                  <li className="flex h-full flex-col rounded-3xl bg-[#e7f8ee] p-6 ring-1 ring-[#25d366]/25">
                    <span
                      className={`inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-xs font-semibold ${
                        d.status === "Klart" ? "bg-[#128c4a] text-white" : "bg-ball text-ink"
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> {d.status}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-extrabold">{d.title}</h3>
                    <p className="mt-2 text-ink/70">{d.text}</p>
                    <p className="mt-auto pt-4 text-sm text-ink/50">{d.source}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section id="arenden" className="scroll-mt-16 py-20 md:py-28">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Ärenden</p>
              <h2 className="section-title max-w-3xl">Förslag som har kommit in.</h2>
              <p className="mt-6 max-w-2xl text-lg text-ink/75">
                Det här är förslag som styrelsen har fått in. Än så länge är de bara förslag: det är inte bestämt när de tas upp,
                och inget av dem är beslutat. När ett förslag har behandlats står beslutet i protokollet.
              </p>
            </Reveal>

            <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ISSUES.map((issue, i) => (
                <Reveal key={issue.title} delay={(i % 3) * 0.05}>
                  <li className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm">
                    <span className="self-start rounded-full bg-ball/20 px-3 py-1 text-xs font-semibold text-ink/80">
                      Förslag
                    </span>
                    <h3 className="mt-4 font-display text-xl font-extrabold">{issue.title}</h3>
                    <p className="mt-2 text-ink/70">{issue.text}</p>
                    <p className="mt-auto pt-4 text-sm text-ink/50">Från: {issue.from}</p>
                  </li>
                </Reveal>
              ))}
            </ul>

            <p className="mt-8 text-sm text-ink/55">
              Senast uppdaterad {UPDATED}. Ärenden om personal och enskildas ekonomi visas inte här.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-wine-900 text-white/60">
        <div className="container-page flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="inline-flex items-center gap-2 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Tillbaka till start
          </a>
          <a href={`mailto:${BOARD_EMAIL}`} className="hover:text-white">
            {BOARD_EMAIL}
          </a>
        </div>
      </footer>
    </>
  );
};

export default Styrelse;
