import { ArrowRight, Eye, HandCoins, Heart, Recycle, Sprout, UserPlus } from "lucide-react";
import { LINKS } from "@/links";
import { SPONSORS } from "@/sponsors";
import Reveal from "./Reveal";

const WHY = [
  { icon: Sprout, title: "Stötta ungdomsidrotten i Lund", text: "Ert stöd går till träning, läger och tränare för barn och ungdomar i alla åldrar." },
  { icon: Eye, title: "Synas lokalt", text: "Er logga på vår hemsida och i våra kanaler, framför spelare, familjer och publik i Lund." },
  { icon: Heart, title: "Ta socialt ansvar", text: "Lokal förankring och socialt ansvar är en del av vår värdegrund. Vi gör det tillsammans." },
];

const SPONSOR_MAIL = `mailto:${LINKS.email}?subject=${encodeURIComponent("Sponsring av BK50")}`;

const OTHER_WAYS = [
  { icon: UserPlus, title: "Bli stödmedlem", text: "Stötta klubben med ett stödmedlemskap.", href: LINKS.supporter },
  { icon: Recycle, title: "Panta för BK50", text: "Panta i en Pantamera-automat och skänk panten till klubben.", href: LINKS.support },
];

const Logo = ({ sponsor }: { sponsor: (typeof SPONSORS)[number] }) => {
  const img = <img src={sponsor.logo} alt={sponsor.name} loading="lazy" className="max-h-14 w-auto max-w-full object-contain" />;
  const box = "flex h-28 items-center [&:last-child:nth-child(odd)]:col-span-2 md:[&:last-child:nth-child(odd)]:col-span-1 justify-center rounded-2xl bg-white px-6 ring-1 ring-ink/5";
  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" rel="noopener" className={`${box} transition hover:-translate-y-0.5 hover:shadow-lg`}>
      {img}
    </a>
  ) : (
    <div className={box}>{img}</div>
  );
};

const Sponsors = () => (
  <section id="sponsorer" className="bg-wine-50 py-24 md:py-32">
    <div className="container-page">
      <Reveal className="max-w-3xl">
        <p className="eyebrow">Sponsorer</p>
        <h2 className="section-title">Tack till våra sponsorer.</h2>
        <p className="mt-6 text-lg text-ink/70">
          De här företagen gör det möjligt för fler barn, ungdomar och vuxna att spela basket i Lund.
        </p>
      </Reveal>

      <Reveal className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {SPONSORS.map((sponsor) => (
          <Logo key={sponsor.name} sponsor={sponsor} />
        ))}
      </Reveal>

      {/* Pitch for new sponsors */}
      <Reveal className="mt-16 overflow-hidden rounded-[2rem] bg-wine-800 text-white">
        <div className="court-bg grid gap-10 p-8 md:p-12 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ball text-ink">
              <HandCoins className="h-6 w-6" />
            </span>
            <h3 className="mt-6 font-display text-3xl font-extrabold leading-tight md:text-4xl">
              Vill ert företag <span className="text-ball">sponsra</span> BK50?
            </h3>
            <p className="mt-4 text-white/75">
              Vi har spelat basket i Lund sedan 1950 och vill att ännu fler ska få chansen. Hör av er, så tar vi
              fram ett samarbete som passar er, stort som litet.
            </p>
            <a href={SPONSOR_MAIL} className="btn-primary mt-8">
              Kontakta oss om sponsring <ArrowRight className="h-5 w-5" />
            </a>
            <p className="mt-3 text-sm text-white/60">eller mejla {LINKS.email}</p>
          </div>

          <ul className="space-y-4">
            {WHY.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-ball" />
                <div>
                  <p className="font-display text-lg font-extrabold">{title}</p>
                  <p className="mt-1 text-white/70">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Ways for individuals to help */}
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {OTHER_WAYS.map(({ icon: Icon, title, text, href }) => (
          <Reveal key={title}>
            <a
              href={href}
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-wine-50 text-wine-500 transition group-hover:bg-ball group-hover:text-ink">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold">{title}</p>
                <p className="text-sm text-ink/65">{text}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Sponsors;
