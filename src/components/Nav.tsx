import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LINKS } from "@/links";

type Item = { href: string; label: string };

const ITEMS: Item[] = [
  { href: "#varfor", label: "Varför" },
  { href: "#fragor", label: "Frågor" },
  { href: "#lag", label: "Lagen" },
  { href: "#satsa", label: "Satsa" },
  { href: "#kom-igang", label: "Kom igång" },
  { href: "#klubbshop", label: "Klubbshop" },
  { href: "#foraldrar", label: "Föräldrar" },
];

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-white/10 bg-night/90 backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Huvudmeny">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/bk50-logo.png" alt="" className="h-9 w-auto rounded-full bg-white p-0.5" />
          <span className="font-display text-2xl uppercase">BK50</span>
        </a>
        <ul className="hidden items-center gap-6 text-sm font-bold uppercase tracking-wider text-white/70 lg:flex">
          {ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition hover:text-ball">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={LINKS.signup} target="_blank" rel="noopener" className="btn-primary px-4 py-2 text-sm shadow-[3px_3px_0_0_#fff]">
            Prova gratis
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobilmeny"
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            className="-mr-2 p-2 transition hover:text-ball lg:hidden"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </nav>
      {open && (
        <ul id="mobilmeny" className="container-page grid max-h-[calc(100dvh-4rem)] gap-1 overflow-y-auto pb-6 pt-2 lg:hidden">
          {ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)} className="block py-2 font-display text-4xl uppercase transition hover:text-ball">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Nav;
