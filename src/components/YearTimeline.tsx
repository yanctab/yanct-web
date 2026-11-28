/**
 * A year of meetings as a timeline: horizontal on desktop (terms, a month axis with a dot per meeting, the cards
 * below), vertical on mobile. Used for the board's year on /styrelse and the leaders' meetings on /ledare.
 * Meant for a light background (cream or white).
 */
export type MeetingKind = {
  /** In the legend */
  label: string;
  /** On the card, e.g. "Online" */
  tag: string;
  /** Tailwind classes for the dot (background and ring colour) and the tag */
  dot: string;
  chip: string;
};

export type Meeting = {
  /** The month (1–12) the dot sits on. The desktop card sits under it, two months wide (see cardCols). */
  col: number;
  when: string;
  kind: string;
  title: string;
  text: string;
};

const MONTHS = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

// The two terms on the desktop timeline (grid columns), with July as the summer break
const TERMS = [
  { label: "Vårtermin", cols: "col-span-6", className: "bg-wine-100 text-wine-700" },
  { label: "Sommar", cols: "col-span-1", className: "bg-ink/5 text-ink/40" },
  { label: "Hösttermin", cols: "col-span-5", className: "bg-ball/20 text-ink/80" },
];

// Tailwind needs whole class names, so the card's grid start is looked up rather than built
const CARD_START = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
  "col-start-8",
  "col-start-9",
  "col-start-10",
  "col-start-11",
];

/**
 * Where each card goes on the desktop grid: two months wide, starting the month before its meeting (January:
 * Jan–Feb), moved right when it would overlap the card before. Meetings must be in month order.
 */
const cardCols = (meetings: Meeting[]) => {
  let end = 0;
  return meetings.map((m) => {
    const start = Math.min(11, Math.max(m.col - 1, end + 1, 1));
    end = start + 1;
    return `${CARD_START[start - 1]} col-span-2 row-start-1`;
  });
};

const MeetingCard = ({ m, kind }: { m: Meeting; kind: MeetingKind }) => (
  <div className="h-full rounded-2xl bg-white p-4 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">{m.when}</p>
    <p className="mt-1 font-display text-lg font-extrabold leading-tight">{m.title}</p>
    <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${kind.chip}`}>{kind.tag}</span>
    <p className="mt-2 text-sm text-ink/70">{m.text}</p>
  </div>
);

const YearTimeline = ({ meetings, kinds }: { meetings: Meeting[]; kinds: Record<string, MeetingKind> }) => {
  // On mobile, the term's name goes above its first meeting
  const cols = cardCols(meetings);
  const firstOfTerm = (i: number) => i === 0 || (meetings[i].col >= 7) !== (meetings[i - 1].col >= 7);

  return (
    <>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/70">
        {Object.entries(kinds).map(([k, kind]) => (
          <li key={k} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${kind.dot}`} /> {kind.label}
          </li>
        ))}
      </ul>

      {/* Desktop: terms, a month axis with a dot per meeting, and the cards below */}
      <div className="mt-8 hidden lg:block" aria-hidden>
        <div className="grid grid-cols-12 gap-2">
          {TERMS.map((t) => (
            <div
              key={t.label}
              className={`${t.cols} rounded-full px-4 py-1.5 text-center text-xs font-semibold uppercase tracking-wider ${t.className}`}
            >
              {t.label}
            </div>
          ))}
        </div>
        <div className="relative mt-4 grid grid-cols-12 gap-2">
          <div className="absolute inset-x-0 top-[0.6rem] h-0.5 bg-ink/15" />
          {MONTHS.map((month, i) => {
            const m = meetings.find((x) => x.col === i + 1);
            return (
              <div key={month} className="relative flex flex-col items-center">
                <span
                  className={`h-5 w-5 rounded-full ring-4 ${m ? kinds[m.kind].dot : "border-2 border-ink/15 bg-cream ring-transparent"}`}
                />
                <span className={`mt-2 text-xs font-semibold uppercase ${m ? "text-ink" : "text-ink/40"}`}>{month}</span>
              </div>
            );
          })}
        </div>
      </div>
      <ol className="mt-4 hidden grid-cols-12 gap-2 lg:grid">
        {meetings.map((m, i) => (
          <li key={m.when} className={cols[i]}>
            <MeetingCard m={m} kind={kinds[m.kind]} />
          </li>
        ))}
      </ol>

      {/* Mobile: a vertical line with the meetings in order */}
      <ol className="relative mt-8 grid gap-4 border-l-2 border-ink/15 pl-6 lg:hidden">
        {meetings.map((m, i) => (
          <li key={m.when}>
            {firstOfTerm(i) && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/50">
                {m.col >= 7 ? "Hösttermin" : "Vårtermin"}
              </p>
            )}
            <div className="relative">
              <span className={`absolute -left-[2.0625rem] top-4 h-4 w-4 rounded-full ring-4 ${kinds[m.kind].dot}`} />
              <MeetingCard m={m} kind={kinds[m.kind]} />
            </div>
          </li>
        ))}
      </ol>
    </>
  );
};

export default YearTimeline;
