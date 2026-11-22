import { Eye, HeartHandshake, Sprout, Tent, Trophy, Users } from "lucide-react";
import Reveal from "./Reveal";

const STATS = [
  { value: "1950", label: "grundad, två år före Svenska Basketbollförbundet" },
  { value: "12", label: "flick- och pojklag i barn och ungdom" },
  { value: "6 år+", label: "från basketskola till basketfitness för vuxna" },
  { value: "3", label: "hallar i Lund" },
];

const OFFERS = [
  {
    icon: Eye,
    title: "Mindre grupper",
    text: "Vi håller grupperna små så att alla blir sedda av sina tränare och får bollen i händerna.",
  },
  {
    icon: Sprout,
    title: "Utveckling före resultat",
    text: "För våra barn och ungdomar är utveckling viktigare än resultat. Du blir bättre i din egen takt.",
  },
  {
    icon: HeartHandshake,
    title: "En trygg miljö",
    text: "Respekt och ansvar på och utanför planen. Hos oss finns ingen press på att prestera.",
  },
  {
    icon: Users,
    title: "Basket för alla åldrar",
    text: "Basketskola för de yngsta, ungdomslag för flickor och pojkar, och basketfitness för vuxna.",
  },
  {
    icon: Trophy,
    title: "Seriespel och satsning",
    text: "Ungdomslagen spelar seriematcher, och Damer utveckling är en elitsatsande grupp för dig som vill längre.",
  },
  {
    icon: Tent,
    title: "Läger och lovaktiviteter",
    text: "Sommarläger för medlemmar och ett prova på-läger som är helt gratis. Perfekt sätt att börja.",
  },
];

const Offer = () => (
  <section id="varfor" className="py-24 md:py-32">
    <div className="container-page">
      <Reveal className="max-w-3xl">
        <p className="eyebrow">Därför BK50</p>
        <h2 className="section-title">
          Glädje. Utveckling. <span className="text-wine-500">Gemenskap.</span>
        </h2>
        <p className="mt-6 text-lg text-ink/70">
          Värdeorden finns med i allt vi gör. Vårt mål är att alla ska få vara med och utvecklas, både som
          basketspelare och som människor.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.value} delay={i * 0.06} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
            <p className="font-display text-4xl font-extrabold text-wine-500 md:text-5xl">{stat.value}</p>
            <p className="mt-2 text-sm text-ink/65">{stat.label}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OFFERS.map(({ icon: Icon, title, text }, i) => (
          <Reveal
            key={title}
            delay={(i % 3) * 0.06}
            className="group rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-wine-50 text-wine-500 transition group-hover:bg-ball group-hover:text-ink">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl font-extrabold">{title}</h3>
            <p className="mt-2 text-ink/70">{text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Offer;
