import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CLUB_SITE, LINKS } from "@/links";

type Item = { href: string; label: string };

// The pages for each group, so it's clear there is more than the welcome page
const PAGES: Item[] = [
  { href: "/foralder", label: "Förälder" },
  { href: "/spelare", label: "Spelare" },
  { href: "/ledare", label: "Ledare" },
  { href: "/styrelse", label: "Styrelsen" },
];

// Sections on the welcome page, in the order they appear there, then the club's Svenskalag site
const SECTIONS: Item[] = [
  { href: "#sponsorer", label: "Sponsorer" },
  { href: "#klubbshop", label: "Klubbshop" },
  { href: "#nyheter", label: "Nyheter" },
  { href: "#instagram", label: "Följ oss" },
  { href: CLUB_SITE, label: "Svenskalag" },
];

const external = (href: string) => href.startsWith("http");

const Link = ({ item, className, onPick }: { item: Item; className: string; onPick?: () => void }) => (
  <a
    href={item.href}
    onClick={onPick}
    {...(external(item.href) ? { target: "_blank", rel: "noopener" } : {})}
    className={className}
  >
    {item.label}
    {external(item.href) && <ArrowUpRight className="h-4 w-4" />}
  </a>
);

/** Menu for the welcome page: the pages first, then the sections everyone shares. */
const WelcomeNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);
  const desktopLink = "inline-flex items-center gap-1 transition hover:text-white";
  const mobileLink = "flex items-center gap-1.5 rounded-lg px-2 py-3 transition hover:bg-white/10 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-wine-900/95 shadow-lg backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Huvudmeny">
        <a href="/" aria-label="BK50 startsida" className="flex items-center gap-2.5 text-white">
          <img src="/bk50-logo.png" alt="" className="h-9 w-auto" />
          <span className="font-display text-xl font-extrabold tracking-tight">BK50</span>
        </a>
        <ul className="hidden items-center gap-6 text-sm font-medium text-white/80 lg:flex">
          {PAGES.map((item) => (
            <li key={item.href}>
              <Link item={item} className={`${desktopLink} font-semibold text-white`} />
            </li>
          ))}
          <li aria-hidden className="h-5 w-px bg-white/25" />
          {SECTIONS.map((item) => (
            <li key={item.href}>
              <Link item={item} className={desktopLink} />
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={LINKS.signup} target="_blank" rel="noopener" className="btn-primary px-5 py-2.5 text-sm">
            Anmäl dig
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobilmeny"
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            className="-mr-2 rounded-lg p-2 text-white transition hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      {open && (
        <div
          id="mobilmeny"
          className="container-page max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 pb-4 pt-2 text-base font-medium text-white/90 lg:hidden"
        >
          <ul className="grid gap-1 text-lg font-semibold">
            {PAGES.map((item) => (
              <li key={item.href}>
                <Link item={item} className={mobileLink} onPick={close} />
              </li>
            ))}
          </ul>
          <ul className="mt-3 grid gap-1 border-t border-white/10 pt-3">
            {SECTIONS.map((item) => (
              <li key={item.href}>
                <Link item={item} className={mobileLink} onPick={close} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default WelcomeNav;
