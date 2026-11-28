import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Instagram as InstagramIcon } from "lucide-react";
import { CLUB_SITE, LINKS } from "@/links";
import WelcomeNav from "@/components/WelcomeNav";
import News from "@/components/News";
import Shop from "@/components/Shop";
import Instagram from "@/components/Instagram";
import Sponsors from "@/components/Sponsors";

/**
 * The start page at /: a neutral pitch for the club, then a choice of page. Each card hints at the
 * look of the page it leads to (parents: light, players: dark with condensed caps, leaders: wine).
 * A menu on top links to the pages and sections. Below the choice: sponsors first, then the club shop, news and Instagram.
 */
const Welcome = () => {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay } };

  useEffect(() => {
    document.title = "BK50 – Basketklubben Lund 1950";
  }, []);

  return (
    <>
      <WelcomeNav />
      <main>
        <section className="court-bg relative flex min-h-screen flex-col overflow-hidden bg-wine-800 text-white">
          <div className="pointer-events-none absolute -right-40 -top-20 h-[36rem] w-[36rem] rounded-full bg-ball/15 blur-3xl" />

          <div className="container-page relative flex flex-1 flex-col justify-center pb-16 pt-24 md:pb-20 md:pt-28">
            <motion.div {...fadeUp(0)} className="flex items-center gap-4">
              <img src="/bk50-logo.png" alt="BK50:s klubbmärke" className="h-16 w-auto rounded-full bg-white p-1 md:h-20" />
              <div>
                <p className="font-display text-2xl font-extrabold md:text-3xl">BK50</p>
                <p className="text-sm text-white/70 md:text-base">Basketklubben Lund 1950</p>
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp(0.08)}
              className="mt-10 max-w-4xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl"
            >
              Basket i Lund sedan <span className="text-ball">1950</span>.
            </motion.h1>
            <motion.p {...fadeUp(0.16)} className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              BK50 är en av Sveriges äldsta basketklubbar, grundad två år före Svenska Basketbollförbundet. Hos oss spelar barn,
              ungdomar och vuxna i mindre grupper där alla blir sedda. Glädje, utveckling och gemenskap finns med i allt vi gör.
            </motion.p>

            <motion.p {...fadeUp(0.22)} className="mt-12 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
              Vem är du?
            </motion.p>
            <motion.ul {...fadeUp(0.28)} className="mt-4 grid gap-4 md:grid-cols-3">
              <li>
                <a
                  href="/foralder"
                  className="group flex h-full flex-col rounded-3xl bg-cream p-7 text-ink transition hover:-translate-y-1 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span className="font-display text-4xl font-extrabold">Förälder</span>
                  <span className="mt-1 text-sm font-semibold text-wine-500">Till barn i alla åldrar</span>
                  <span className="mt-4 text-ink/70">
                    Hur ditt barn börjar, lagen, Svenskalag och vad vi förväntar oss av dig som förälder.
                  </span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-wine-600">
                    Till föräldrasidan <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/spelare"
                  className="group flex h-full flex-col bg-night p-7 text-white ring-1 ring-white/10 transition hover:-translate-y-1 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ball"
                >
                  <span className="font-poster text-5xl uppercase leading-none">Spelare</span>
                  <span className="mt-2 text-sm font-extrabold uppercase tracking-[0.2em] text-ball">12 år och uppåt</span>
                  <span className="mt-4 text-white/70">
                    Din utveckling som spelare: bli bättre i din egen takt och spela så länge du vill.
                  </span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-extrabold uppercase tracking-wide text-ball">
                    Till spelarsidan <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/ledare"
                  className="group flex h-full flex-col rounded-3xl border border-white/20 bg-white/5 p-7 text-white transition hover:-translate-y-1 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span className="font-display text-4xl font-extrabold">Ledare</span>
                  <span className="mt-1 text-sm font-semibold text-ball">Tränare och lagledare</span>
                  <span className="mt-4 text-white/70">För dig som leder ett lag i BK50, eller vill börja göra det.</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-white">
                    Till ledarsidan <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                  </span>
                </a>
              </li>
            </motion.ul>

            <motion.a
              {...fadeUp(0.34)}
              href={CLUB_SITE}
              target="_blank"
              rel="noopener"
              className="group mt-4 flex flex-col gap-3 rounded-3xl border border-white/20 p-6 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:flex-row sm:items-center sm:justify-between md:px-7"
            >
              <span>
                <span className="block font-display text-xl font-extrabold md:text-2xl">Redan med i klubben?</span>
                <span className="mt-1 block text-white/70">
                  Lagsidor, kalender, nyheter och avgifter finns på vår Svenskalag-sida.
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-2 font-semibold text-ball">
                Till BK50 Svenskalag{" "}
                <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </motion.a>

            <motion.a
              {...fadeUp(0.4)}
              href="/styrelse"
              className="group mt-4 flex flex-col gap-3 rounded-3xl border border-white/20 p-6 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:flex-row sm:items-center sm:justify-between md:px-7"
            >
              <span>
                <span className="block font-display text-xl font-extrabold md:text-2xl">Kontakta styrelsen</span>
                <span className="mt-1 block text-white/70">
                  Vill du komma i kontakt med styrelsen, har du ett förslag, eller vill du bara se hur vi jobbar? Gå till vår sida.
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-2 font-semibold text-ball">
                Till styrelsens sida <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </span>
            </motion.a>
          </div>
        </section>

        <Sponsors />
        <Shop />
        <News />
        <Instagram />
      </main>

      <footer className="bg-wine-900 text-white/60">
        <div className="container-page flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Basketklubben Lund 1950</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={`mailto:${LINKS.email}`} className="hover:text-white">
              {LINKS.email}
            </a>
            <a href={CLUB_SITE} target="_blank" rel="noopener" className="hover:text-white">
              BK50 Svenskalag
            </a>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <InstagramIcon className="h-4 w-4" /> @bk50_official
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Welcome;
