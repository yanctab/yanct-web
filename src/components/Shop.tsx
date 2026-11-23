import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { LINKS } from "@/links";
import Reveal from "./Reveal";

/**
 * A few products from the club shop at 2win.se. Photos are copied from the shop into public/shop/;
 * swap them here when the range changes. No prices, so nothing goes stale when 2win changes them.
 */
const PRODUCTS = [
  { src: "/shop/hood.jpg", name: "Hood" },
  { src: "/shop/tshirt.jpg", name: "T-shirt" },
  { src: "/shop/ryggsack.jpg", name: "Ryggsäck" },
  { src: "/shop/langarmad.jpg", name: "Långärmad" },
];

/** A banner in the middle of the page pushing the club shop. */
const Shop = () => (
  <section id="klubbshop" className="court-bg overflow-hidden bg-wine-500 py-16 text-white md:py-20">
    <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
      <Reveal>
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-ball">
          <ShoppingBag className="h-4 w-4" /> Klubbshop
        </p>
        <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          Bär <span className="text-ball">BK50</span> på och utanför planen.
        </h2>
        <p className="mt-5 max-w-md text-lg text-white/80">
          Hoodies, t-shirts, collegebyxor och ryggsäck med klubbens logga. Beställ i vår klubbshop hos 2win.
        </p>
        <a href={LINKS.shop} target="_blank" rel="noopener" className="btn-primary mt-8">
          Till klubbshopen <ArrowUpRight className="h-5 w-5" />
        </a>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {PRODUCTS.map((product, i) => (
          <Reveal key={product.src} delay={i * 0.06}>
            <a
              href={LINKS.shop}
              target="_blank"
              rel="noopener"
              className="group block overflow-hidden rounded-2xl bg-white text-ink shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={product.src}
                alt={`BK50 ${product.name.toLowerCase()}`}
                loading="lazy"
                className="aspect-square w-full object-contain p-3 transition duration-500 group-hover:scale-105"
              />
              <span className="block border-t border-ink/5 px-3 py-2.5 text-center text-sm font-semibold">{product.name}</span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Shop;
