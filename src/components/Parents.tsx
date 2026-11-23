import { BookOpen, CakeSlice, ClipboardList, Coffee, FileText } from "lucide-react";
import { doc } from "@/links";
import Reveal from "./Reveal";

/**
 * Documents for parents, stored on the club's Svenskalag site. Some are per term (instruktion-kiosk-vt26),
 * so a new upload gets a new link: update it here when the club replaces a document.
 */
const DOCS = [
  {
    icon: BookOpen,
    title: "En guide för vårdnadshavare",
    text: "Allt du behöver veta som förälder i BK50: hur föreningen fungerar, värdegrund och hur du kan engagera dig.",
    href: doc("03a8dba7-f2ca-4225-a90f-f29d6a9a48e6/bk50-en-guide-for-vardnadshavare.pdf"),
    primary: true,
  },
  {
    icon: ClipboardList,
    title: "Sekretariatet",
    text: "Matchprotokoll i Profixio, tidtagning och resultattavlan. Läs innan ni sitter i sekretariatet första gången.",
    href: doc("76859501-6e0c-482d-b192-33a4a1b60ccf/instruktion-sekretariatet.pdf"),
  },
  {
    icon: Coffee,
    title: "Kiosken",
    text: "Var allt finns, hur ni ställer i ordning och tar betalt med Swish när ni har kioskpass.",
    href: doc("28160b63-6287-45a3-b2b2-8e19685a47f4/instruktion-kiosk-vt26.pdf"),
  },
  {
    icon: CakeSlice,
    title: "Bakning till kiosken",
    text: "Bakverk som klarar rumstemperatur och är helt nötfria, och hur intäkterna delas mellan klubb och lag.",
    href: doc("efa06668-4e32-486f-a1ef-97691f62f83f/bakning.pdf"),
  },
];

const Parents = () => (
  <section id="foraldrar" className="py-20 md:py-24">
    <div className="container-page">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">För föräldrar</p>
        <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">Bra att ha som förälder</h2>
        <p className="mt-5 text-lg text-ink/70">
          Börja med guiden för vårdnadshavare. När ditt lag har sekretariat eller kiosk på en hemmamatch hittar du
          instruktionerna här.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DOCS.map(({ icon: Icon, title, text, href, primary }, i) => (
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
              <span className={`mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold ${primary ? "text-ball" : "text-wine-600"}`}>
                <FileText className="h-4 w-4" /> Öppna PDF
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Parents;
