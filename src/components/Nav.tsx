import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { LINKS } from "@/links";

type Item = { href: string; label: string };

// Shown directly in the bar: what someone new to the club looks for
const ITEMS: Item[] = [
  { href: "#varfor", label: "Därför BK50" },
  { href: "#kom-igang", label: "Kom igång" },
  { href: "#lag", label: "Lagen" },
  { href: "#satsa", label: "Satsa" },
  { href: "#svenskalag", label: "Svenskalag" },
];

// Everything else, under "Klubben"
const CLUB_ITEMS: Item[] = [
  { href: "#klubbshop", label: "Klubbshop" },
  { href: "#engagera", label: "Engagera dig" },
  { href: "#nyheter", label: "Nyheter" },
  { href: "#instagram", label: "Instagram" },
  { href: "#sponsorer", label: "Sponsorer" },
  { href: "#historia", label: "Historia" },
];

/** Desktop dropdown for CLUB_ITEMS. Opens on click; closes on a pick, Escape or a click outside. */
const ClubMenu = () => {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLLIElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    // Tabbing out of the menu closes it too
    const onFocus = (e: FocusEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  return (
    <li ref={root} className="relative">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="klubbmeny"
        className={`flex items-center gap-1 transition hover:text-white ${open ? "text-white" : ""}`}
      >
        Klubben <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          id="klubbmeny"
          className="absolute right-0 top-full mt-4 w-52 overflow-hidden rounded-2xl bg-wine-900/95 p-2 shadow-xl ring-1 ring-white/10 backdrop-blur"
        >
          {CLUB_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const MobileLink = ({ item, onPick }: { item: Item; onPick: () => void }) => (
  <li>
    <a href={item.href} onClick={onPick} className="block rounded-lg px-2 py-3 transition hover:bg-white/10 hover:text-white">
      {item.label}
    </a>
  </li>
);

const Nav = () => {
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-wine-900/95 shadow-lg backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Huvudmeny">
        <a href="#top" className="flex items-center gap-2.5 text-white">
          <img src="/bk50-logo.png" alt="" className="h-9 w-auto" />
          <span className="font-display text-xl font-extrabold tracking-tight">BK50</span>
        </a>
        <ul className="hidden items-center gap-7 text-sm font-medium text-white/80 lg:flex">
          {ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            </li>
          ))}
          <ClubMenu />
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
          <ul className="grid gap-1">
            {ITEMS.map((item) => (
              <MobileLink key={item.href} item={item} onPick={close} />
            ))}
          </ul>
          <p className="mt-3 border-t border-white/10 px-2 pb-1 pt-4 text-xs font-semibold uppercase tracking-widest text-white/50">Klubben</p>
          <ul className="grid gap-1">
            {CLUB_ITEMS.map((item) => (
              <MobileLink key={item.href} item={item} onPick={close} />
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Nav;
