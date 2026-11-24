import { Eye, Sprout, Swords, Tent, Trophy, Users } from "lucide-react";
import Reveal from "@/components/Reveal";

const STATS = [
  { value: "1950", label: "Äldre än Svenska Basketbollförbundet" },
  { value: "12", label: "Flick- och pojklag" },
  { value: "3", label: "Hallar i Lund" },
];

// Why play here
const REASONS = [
  {
    icon: Eye,
    title: "Små grupper",
    text: "Du får mycket tid med bollen, och tränarna ser vad du gör.",
  },
  {
    icon: Swords,
    title: "Seriematcher",
    text: "Ungdomslagen spelar seriematcher mot andra klubbar.",
  },
  {
    icon: Users,
    title: "Gemenskap",
    text: "Ett lag du träffar varje vecka, på och utanför planen.",
  },
  {
    icon: Sprout,
    title: "Utveckling före resultat",
    text: "Du blir bättre i din egen takt. Ingen förväntar sig att du ska vara bäst från början.",
  },
  {
    icon: Tent,
    title: "Läger",
    text: "Sommarläger för medlemmar och ett prova på-läger som är helt gratis.",
  },
  {
    icon: Trophy,
    title: "Möjlighet att satsa",
    text: "Från 15–16 år kan du kvala in till våra satsningslag. Vi hjälper dig att sätta mål och nå dem.",
  },
];

const Offer = () => (
  <section id="varfor" className="relative py-24 md:py-32">
    <div className="container-page">
      <Reveal className="max-w-4xl">
        <p className="s-eyebrow">Varför BK50</p>
        <h2 className="s-title">
          Mer än bara <span className="text-outline">träning.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.06} className="group relative h-full bg-night p-7 transition hover:bg-wine-700 md:p-9">
            <span className="absolute right-6 top-5 font-poster text-6xl text-white/10 transition group-hover:text-ball/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Icon className="h-8 w-8 text-ball" />
            <h3 className="mt-6 font-poster text-3xl uppercase leading-none">{title}</h3>
            <p className="mt-3 text-white/70 group-hover:text-white/85">{text}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {STATS.map((stat, i) => (
          <Reveal key={stat.value} delay={i * 0.06} className="border-l-4 border-ball pl-5">
            <p className="font-poster text-6xl leading-none md:text-7xl">{stat.value}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-white/60">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Offer;
