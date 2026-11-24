/** A tilted band of words scrolling sideways, like barrier tape across the page. Decorative only. */
const Tape = ({
  words,
  className = "bg-ball text-night",
  tilt = "-rotate-2",
}: {
  words: string[];
  className?: string;
  tilt?: string;
}) => (
  <div className={`relative z-10 -mx-4 overflow-hidden py-3 ${tilt} ${className}`} aria-hidden>
    <div className="flex w-max animate-marquee-fast">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0">
          {Array.from({ length: 4 }).flatMap((_, i) =>
            words.map((word) => (
              <span key={`${i}-${word}`} className="flex items-center gap-5 pr-5 font-display text-2xl uppercase md:text-3xl">
                {word} <span className="text-xl">✦</span>
              </span>
            )),
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Tape;
