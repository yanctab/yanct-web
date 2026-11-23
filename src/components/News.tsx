import { useEffect, useState } from "react";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { CLUB_HOST, LINKS, club } from "@/links";
import Reveal from "./Reveal";

/**
 * The latest news from the club's Svenskalag site (LINKS.news).
 * The RSS feed has no CORS header, so nginx proxies it to /nyheter.xml (see configure-nginx.sh;
 * vite.config.ts does the same in dev). If the feed can't be read the section just links to the club site.
 */
const FEED_URL = "/nyheter.xml";
const SHOWN = 3;

type Item = { title: string; link: string; date: Date | null; excerpt: string; image: string | null };

const ATOM = "http://www.w3.org/2005/Atom";

/** Feed links point at svenskalag.se/bk50/... with utm tags; send readers straight to the club site instead. */
const clubLink = (raw: string) => {
  try {
    const url = new URL(raw);
    if (url.hostname.endsWith("svenskalag.se") && url.pathname.startsWith("/bk50/")) {
      return club(url.pathname.slice("/bk50".length));
    }
    return raw;
  } catch {
    return LINKS.news;
  }
};

/** The description is HTML; read it as text only (never inserted as HTML) and shorten it. */
const toExcerpt = (html: string) => {
  // Keep a space between paragraphs, which textContent would otherwise run together
  const spaced = html.replace(/<br\s*\/?>|<\/(p|div|li|h[1-6])>/gi, "$& ");
  const text = (new DOMParser().parseFromString(spaced, "text/html").body.textContent ?? "").replace(/\s+/g, " ").trim();
  return text.length > 160 ? `${text.slice(0, 157).replace(/\s+\S*$/, "")}…` : text;
};

const parseFeed = (xml: string): Item[] => {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.querySelector("parsererror")) throw new Error("Invalid feed");
  return Array.from(doc.querySelectorAll("item")).map((item) => {
    const updated = item.getElementsByTagNameNS(ATOM, "updated")[0]?.textContent ?? item.querySelector("pubDate")?.textContent;
    const date = updated ? new Date(updated) : null;
    const image = item.querySelector("enclosure[type^='image']")?.getAttribute("url") ?? null;
    return {
      title: item.querySelector("title")?.textContent?.trim() ?? "",
      link: clubLink(item.querySelector("link")?.textContent?.trim() ?? ""),
      date: date && !Number.isNaN(date.getTime()) ? date : null,
      excerpt: toExcerpt(item.querySelector("description")?.textContent ?? ""),
      image: image?.startsWith("https://") ? image : null,
    };
  });
};

const formatDate = (date: Date) =>
  date.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    ...(date.getFullYear() !== new Date().getFullYear() && { year: "numeric" }),
  });

const NewsCard = ({ item }: { item: Item }) => (
  <a
    href={item.link}
    target="_blank"
    rel="noopener"
    className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl"
  >
    {item.image ? (
      <img src={item.image} alt="" loading="lazy" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
    ) : (
      <div className="flex aspect-square items-center justify-center bg-wine-500 text-white/80">
        <img src="/bk50-logo.png" alt="" className="h-20 w-auto opacity-90" />
      </div>
    )}
    <div className="flex flex-1 flex-col p-6">
      {item.date && (
        <time dateTime={item.date.toISOString()} className="text-sm font-semibold text-wine-500">
          {formatDate(item.date)}
        </time>
      )}
      <h3 className="mt-2 font-display text-xl font-bold leading-snug">{item.title}</h3>
      {item.excerpt && <p className="mt-3 text-ink/70">{item.excerpt}</p>}
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-wine-600 group-hover:text-wine-800">
        Läs mer <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </div>
  </a>
);

const Placeholder = () => (
  <div className="h-full overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5" aria-hidden>
    <div className="aspect-square animate-pulse bg-wine-100" />
    <div className="space-y-3 p-6">
      <div className="h-4 w-24 animate-pulse rounded bg-wine-100" />
      <div className="h-6 w-4/5 animate-pulse rounded bg-ink/10" />
      <div className="h-4 w-full animate-pulse rounded bg-ink/5" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-ink/5" />
    </div>
  </div>
);

const News = () => {
  const [items, setItems] = useState<Item[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(FEED_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((xml) => {
        const parsed = parseFeed(xml).filter((item) => item.title);
        if (parsed.length === 0) throw new Error("Empty feed");
        setItems(parsed.slice(0, SHOWN));
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          console.warn("Could not load news feed", err);
          setFailed(true);
        }
      });
    return () => controller.abort();
  }, []);

  return (
    <section id="nyheter" className="bg-wine-50 py-24 md:py-32">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Nyheter</p>
            <h2 className="section-title">Senaste från klubben.</h2>
            <p className="mt-6 text-lg text-ink/70">
              Läger, open court, årsmöte och annat som är på gång. Alla nyheter finns på {CLUB_HOST}.
            </p>
          </div>
          <a href={LINKS.news} target="_blank" rel="noopener" className="btn shrink-0 bg-wine-500 text-white hover:-translate-y-0.5 hover:bg-wine-600 focus-visible:outline-wine-500">
            <Newspaper className="h-5 w-5" /> Alla nyheter
          </a>
        </Reveal>

        {!failed && (
          <div className="mt-12 grid gap-6 md:grid-cols-3" aria-busy={items === null}>
            {items
              ? items.map((item, i) => (
                  <Reveal key={item.link + item.title} delay={i * 0.08} className="h-full">
                    <NewsCard item={item} />
                  </Reveal>
                ))
              : Array.from({ length: SHOWN }, (_, i) => <Placeholder key={i} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
