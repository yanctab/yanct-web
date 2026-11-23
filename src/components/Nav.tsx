import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LINKS } from "@/links";

const ITEMS = [
  { href: "#varfor", label: "Därför BK50" },
  { href: "#kom-igang", label: "Kom igång" },
  { href: "#lag", label: "Lagen" },
  { href: "#satsa", label: "Satsa" },
  { href: "#engagera", label: "Engagera dig" },
  { href: "#nyheter", label: "Nyheter" },
  { href: "#instagram", label: "Instagram" },
  { href: "#sponsorer", label: "Sponsorer" },
  { href: "#historia", label: "Historia" },
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
        scrolled || open ? "bg-wine-900/95 shadow-lg backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Huvudmeny">
        <a href="#top" className="flex items-center gap-2.5 text-white">
          <img src="/bk50-logo.png" alt="" className="h-9 w-auto" />
          <span className="font-display text-xl font-extrabold tracking-tight">BK50</span>
        </a>
        <ul className="hidden items-center gap-5 text-sm font-medium text-white/80 lg:flex xl:gap-7">
          {ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
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
        <ul
          id="mobilmeny"
          className="container-page grid max-h-[calc(100dvh-4rem)] gap-1 overflow-y-auto border-t border-white/10 pb-4 pt-2 text-base font-medium text-white/90 lg:hidden"
        >
          {ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-3 transition hover:bg-white/10 hover:text-white"
              >
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
