import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export type NavItem = { href: string; label: string };

const external = (href: string) => href.startsWith("http");

const Link = ({ item, className, onPick }: { item: NavItem; className: string; onPick?: () => void }) => (
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

/**
 * The menu for a page with a wine-red hero (/ledare, /styrelse), in the same style as the welcome page's menu:
 * transparent over the hero, solid once you scroll. `items` are the page's sections, `cta` the button on the right.
 * On mobile the items open in a panel.
 */
const PageNav = ({ items, cta, label }: { items: NavItem[]; cta: ReactNode; label: string }) => {
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
    const desktop = window.matchMedia("(min-width: 768px)");
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
      className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${
        scrolled || open ? "bg-wine-900/95 shadow-lg backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label={label}>
        <a href="/" aria-label="BK50 startsida" className="flex items-center gap-2.5">
          <img src="/bk50-logo.png" alt="" className="h-9 w-auto" />
          <span className="font-display text-xl font-extrabold tracking-tight">BK50</span>
        </a>
        <ul className="hidden items-center gap-6 text-sm font-medium text-white/80 md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link item={item} className="inline-flex items-center gap-1 transition hover:text-white" />
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {cta}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="sidmeny"
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            className="-mr-2 rounded-lg p-2 transition hover:bg-white/10 md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      {open && (
        <ul id="sidmeny" className="container-page grid gap-1 border-t border-white/10 pb-4 pt-2 text-lg font-semibold md:hidden">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                item={item}
                onPick={close}
                className="flex items-center gap-1.5 rounded-lg px-2 py-3 transition hover:bg-white/10 hover:text-white"
              />
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default PageNav;
