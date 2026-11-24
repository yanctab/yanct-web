import { ArrowUpRight } from "lucide-react";
import { LINKS } from "@/links";
import Reveal from "@/components/Reveal";

/**
 * A few products from the club shop at 2win.se. Photos are copied from the shop into public/shop/;
 * swap them here when the range changes. No prices, so nothing goes stale when 2win changes them.
 */
const PRODUCTS = [
  { src: "/shop/hood.jpg", name: "Hood", tilt: "-rotate-2" },
  { src: "/shop/tshirt.jpg", name: "T-shirt", tilt: "rotate-1" },
  { src: "/shop/ryggsack.jpg", name: "Ryggsäck", tilt: "-rotate-1" },
  { src: "/shop/langarmad.jpg", name: "Långärmad", tilt: "rotate-2" },
];

const Shop = () => (
  <section id="klubbshop" className="relative overflow-hidden bg-wine-500 py-24 md:py-28">
    <div className="grain pointer-events-none absolute inset-0" />
    <div className="container-page relative">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="s-eyebrow text-white">Klubbshop</p>
          <h2 className="s-title">
            Klubb<span className="text-ball">kläder.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-white/80">Hoodies, t-shirts och ryggsäck med BK50:s logga. Beställ i klubbshopen hos 2win.</p>
        </div>
        <a href={LINKS.shop} target="_blank" rel="noopener" className="s-btn-primary shrink-0 self-start md:self-auto">
          Till shopen <ArrowUpRight className="h-5 w-5" />
        </a>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.src} delay={i * 0.06}>
            <a
              href={LINKS.shop}
              target="_blank"
              rel="noopener"
              className={`group block bg-white p-3 pb-4 text-night shadow-[6px_6px_0_0_#0d0a0b] transition hover:rotate-0 hover:scale-105 ${p.tilt}`}
            >
              <img src={p.src} alt={`BK50 ${p.name.toLowerCase()}`} loading="lazy" className="aspect-square w-full object-contain" />
              <span className="mt-3 block text-center font-poster text-2xl uppercase">{p.name}</span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Shop;
