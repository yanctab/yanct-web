import { ArrowRight, Facebook, Instagram, Mail, MapPin } from "lucide-react";
import { LINKS } from "@/links";
import { SPONSORS } from "@/sponsors";
import Tape from "./Tape";

const HALLS = ["Fäladshallen", "Vikingahallen", "ISLK-hallen"];

// The club sections the parent-facing site has, here as links to Svenskalag
const MORE = [
  { href: LINKS.calendar, label: "Kalender" },
  { href: LINKS.news, label: "Nyheter" },
  { href: LINKS.history, label: "Historia" },
  { href: LINKS.engage, label: "Engagera dig" },
  { href: LINKS.support, label: "Stötta föreningen" },
  { href: LINKS.shop, label: "Klubbshop" },
  { href: LINKS.leaders, label: "För ledare" },
  { href: LINKS.contact, label: "Kontakt & styrelse" },
];

const Footer = () => (
  <footer className="overflow-hidden bg-night">
    <Tape words={["Ses i hallen", "BK50", "Lund"]} tilt="rotate-1" />

    <div className="container-page py-20 md:py-28">
      <h2 className="font-poster text-[18vw] uppercase leading-[0.85] md:text-[10rem]">
        Ses på <span className="text-ball">planen.</span>
      </h2>
      <a href={LINKS.signup} target="_blank" rel="noopener" className="s-btn-primary mt-10 text-lg">
        Prova gratis <ArrowRight className="h-5 w-5" />
      </a>
    </div>

    <div className="container-page grid gap-10 border-t border-white/10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <div className="flex items-center gap-3">
          <img src="/bk50-logo.png" alt="" className="h-12 w-auto rounded-full bg-white p-0.5" />
          <div>
            <p className="font-poster text-2xl uppercase">BK50</p>
            <p className="text-sm text-white/60">Basketklubben Lund 1950</p>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <a href={LINKS.instagram} target="_blank" rel="noopener" aria-label="BK50 på Instagram" className="flex h-11 w-11 items-center justify-center bg-white/10 transition hover:bg-ball hover:text-night">
            <Instagram className="h-5 w-5" />
          </a>
          <a href={LINKS.facebook} target="_blank" rel="noopener" aria-label="BK50 på Facebook" className="flex h-11 w-11 items-center justify-center bg-white/10 transition hover:bg-ball hover:text-night">
            <Facebook className="h-5 w-5" />
          </a>
        </div>
        <a href={`mailto:${LINKS.email}`} className="mt-6 flex items-center gap-2 text-white/80 hover:text-white">
          <Mail className="h-4 w-4 text-ball" /> {LINKS.email}
        </a>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.25em] text-white/50">Våra hallar</h3>
        <ul className="space-y-2 text-white/80">
          {HALLS.map((hall) => (
            <li key={hall} className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-ball" /> {hall}, Lund
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.25em] text-white/50">Mer på BK50 Svenskalag</h3>
        <ul className="space-y-2 text-white/80">
          {MORE.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener" className="hover:text-white hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.25em] text-white/50">Sponsorer</h3>
        <ul className="grid grid-cols-2 gap-2">
          {SPONSORS.map((s) => (
            <li key={s.name} className="flex h-14 items-center justify-center bg-white p-2">
              <img src={s.logo} alt={s.name} loading="lazy" className="max-h-full w-auto object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="container-page border-t border-white/10 py-6 text-sm text-white/50">
      © {new Date().getFullYear()} Basketklubben Lund 1950 · Glädje, utveckling, gemenskap
    </div>
  </footer>
);

export default Footer;
