import { useEffect, useState } from "react";
import { LINKS } from "@/links";

const ITEMS = [
  { href: "#varfor", label: "Därför BK50" },
  { href: "#kom-igang", label: "Kom igång" },
  { href: "#lag", label: "Lagen" },
  { href: "#engagera", label: "Engagera dig" },
  { href: "#instagram", label: "Instagram" },
  { href: "#sponsorer", label: "Sponsorer" },
  { href: "#historia", label: "Historia" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-wine-900/90 shadow-lg backdrop-blur" : "bg-transparent"
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
        </ul>
        <a href={LINKS.signup} target="_blank" rel="noopener" className="btn-primary px-5 py-2.5 text-sm">
          Anmäl dig
        </a>
      </nav>
    </header>
  );
};

export default Nav;
