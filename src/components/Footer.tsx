import { ArrowRight, Facebook, Instagram, Mail, MapPin } from "lucide-react";
import { CLUB_HOST, LINKS } from "@/links";

const HALLS = ["Fäladshallen", "Vikingahallen", "ISLK-hallen"];

const MORE = [
  { href: LINKS.calendar, label: "Kalender" },
  { href: LINKS.fees, label: "Avgifter" },
  { href: LINKS.values, label: "Värdegrund" },
  { href: "#engagera", label: "Engagera dig" },
  { href: "#sponsorer", label: "Bli sponsor" },
  { href: LINKS.supporter, label: "Bli stödmedlem" },
  { href: LINKS.shop, label: "Klubbshop" },
  { href: LINKS.contact, label: "Kontakt & styrelse" },
];

const Footer = () => (
  <footer className="bg-wine-900 text-white">
    {/* Last call to action before the footer details */}
    <div className="container-page flex flex-col items-start gap-6 border-b border-white/10 py-16 md:flex-row md:items-center md:justify-between">
      <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
        Vi ses på <span className="text-ball">planen</span>.
      </h2>
      <a href={LINKS.signup} target="_blank" rel="noopener" className="btn-primary text-lg">
        Börja spela basket <ArrowRight className="h-5 w-5" />
      </a>
    </div>

    <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <div className="flex items-center gap-3">
          <img src="/bk50-logo.png" alt="" className="h-12 w-auto rounded-full bg-white p-0.5" />
          <div>
            <p className="font-display text-xl font-extrabold">BK50</p>
            <p className="text-sm text-white/60">Basketklubben Lund 1950</p>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <a href={LINKS.instagram} target="_blank" rel="noopener" aria-label="BK50 på Instagram" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-ball hover:text-ink">
            <Instagram className="h-5 w-5" />
          </a>
          <a href={LINKS.facebook} target="_blank" rel="noopener" aria-label="BK50 på Facebook" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-ball hover:text-ink">
            <Facebook className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/50">Kontakt</h3>
        <a href={`mailto:${LINKS.email}`} className="flex items-center gap-2 text-white/85 hover:text-white">
          <Mail className="h-4 w-4 text-ball" /> {LINKS.email}
        </a>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/50">Våra hallar</h3>
        <ul className="space-y-2 text-white/85">
          {HALLS.map((hall) => (
            <li key={hall} className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-ball" /> {hall}, Lund
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/50">Mer på {CLUB_HOST}</h3>
        <ul className="space-y-2 text-white/85">
          {MORE.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.href.startsWith("#") ? {} : { target: "_blank", rel: "noopener" })}
                className="hover:text-white hover:underline"
              >
                {link.label}
              </a>
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
