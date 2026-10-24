import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { NAV } from "@/company";

const Header = () => {
  // Transparent over the dark hero, solid white once the page has scrolled
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-surface-line bg-white/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <a href="#top" aria-label="Mikro.io home" onClick={() => setOpen(false)}>
          <Logo dark={!solid} />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.slice(0, -1).map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm font-medium transition ${
                solid ? "text-ink-600 hover:text-brand" : "text-white/80 hover:text-white"
              }`}
            >
              {n.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary py-2.5">
            Contact us
          </a>
        </nav>

        <button
          type="button"
          className={`-mr-2 p-2 md:hidden ${solid ? "text-ink" : "text-white"}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-surface-line bg-white md:hidden"
            aria-label="Main"
          >
            <ul className="container-page py-4">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-ink hover:text-brand"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
