import { Instagram as InstagramIcon } from "lucide-react";
import { LINKS } from "@/links";
import Reveal from "./Reveal";

/**
 * Photos for the grid. Drop image files in public/instagram/ and list them here,
 * e.g. { src: "/instagram/match.jpg", alt: "Flickor 2013 firar efter matchen" }.
 * While the list is empty the grid shows coloured placeholder tiles instead.
 */
const PHOTOS: { src: string; alt: string }[] = [];

const TILES = [
  { label: "Matchdag", className: "bg-wine-500 text-white" },
  { label: "Träning", className: "bg-ball text-ink" },
  { label: "Läger", className: "bg-ink text-white" },
  { label: "Lagbilder", className: "bg-wine-100 text-wine-700" },
  { label: "Basketskola", className: "bg-wine-800 text-white" },
  { label: "Gemenskap", className: "bg-white text-wine-500 ring-1 ring-ink/10" },
];

const Instagram = () => (
  <section id="instagram" className="py-24 md:py-32">
    <div className="container-page">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">Följ oss</p>
          <h2 className="section-title">Se vad som händer i hallen.</h2>
          <p className="mt-6 text-lg text-ink/70">
            Matcher, läger och vardag i klubben. Följ <strong>@bk50_official</strong> på Instagram.
          </p>
        </div>
        <a
          href={LINKS.instagram}
          target="_blank"
          rel="noopener"
          className="btn shrink-0 bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-[#dd2a7b]"
        >
          <InstagramIcon className="h-5 w-5" /> @bk50_official
        </a>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
        {PHOTOS.length > 0
          ? PHOTOS.map((photo) => (
              <a key={photo.src} href={LINKS.instagram} target="_blank" rel="noopener" className="group overflow-hidden rounded-3xl">
                <img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
              </a>
            ))
          : TILES.map((tile, i) => (
              <Reveal key={tile.label} delay={i * 0.05}>
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noopener"
                  className={`group relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl p-5 transition hover:-translate-y-1 hover:shadow-xl md:p-7 ${tile.className}`}
                >
                  <InstagramIcon className="h-6 w-6 opacity-70" />
                  <span className="font-display text-2xl font-extrabold md:text-4xl">#{tile.label.toLowerCase()}</span>
                  {/* A ball's seams, peeking in from the corner */}
                  <svg viewBox="0 0 100 100" className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 opacity-15 transition duration-700 group-hover:rotate-45" aria-hidden>
                    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path d="M4 50h92M50 4v92M18 18c18 18 18 46 0 64M82 18c-18 18-18 46 0 64" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </a>
              </Reveal>
            ))}
      </div>
    </div>
  </section>
);

export default Instagram;
