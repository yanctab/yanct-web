import { Instagram as InstagramIcon } from "lucide-react";
import { LINKS } from "@/links";
import Reveal from "@/components/Reveal";

/**
 * Photos for the grid. Drop image files in public/instagram/ and list them here,
 * e.g. { src: "/instagram/match.jpg", alt: "Flickor 2013 firar efter matchen" }.
 * While the list is empty the grid shows placeholder tiles instead.
 */
const PHOTOS: { src: string; alt: string }[] = [];

const TILES = [
  { label: "match", className: "bg-ball text-night" },
  { label: "träning", className: "bg-night-700 text-white" },
  { label: "läger", className: "bg-wine-500 text-white" },
  { label: "laget", className: "bg-white text-night" },
];

const Instagram = () => (
  <section id="instagram" className="py-24 md:py-32">
    <div className="container-page">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="s-eyebrow">Följ oss</p>
          <h2 className="s-title break-all sm:break-normal">@bk50_official</h2>
        </div>
        <a
          href={LINKS.instagram}
          target="_blank"
          rel="noopener"
          className="s-btn shrink-0 self-start bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:-translate-y-0.5 focus-visible:outline-[#dd2a7b] md:self-auto"
        >
          <InstagramIcon className="h-5 w-5" /> Följ
        </a>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
        {PHOTOS.length > 0
          ? PHOTOS.map((photo) => (
              <a key={photo.src} href={LINKS.instagram} target="_blank" rel="noopener" className="group overflow-hidden">
                <img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[4/5] w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
              </a>
            ))
          : TILES.map((tile, i) => (
              <Reveal key={tile.label} delay={i * 0.05}>
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noopener"
                  className={`group flex aspect-[4/5] flex-col justify-between p-5 transition hover:-translate-y-1 ${tile.className}`}
                >
                  <InstagramIcon className="h-6 w-6 opacity-70" />
                  <span className="font-poster text-3xl uppercase md:text-4xl">#{tile.label}</span>
                </a>
              </Reveal>
            ))}
      </div>
    </div>
  </section>
);

export default Instagram;
