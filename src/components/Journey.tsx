import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import RebootButton from "@/components/RebootButton";

type Layer = {
  id: string;
  name: string;
  short: string;
  quip: string;
  body: string;
  tags: string[];
  color: string;
};

// Ordered bottom-up, the way the stack actually gets built
const LAYERS: Layer[] = [
  {
    id: "bare-metal",
    name: "Bare metal",
    short: "Metal",
    quip: "while (1) { toggle_led(); }  // ah, simpler times",
    body: "You've shipped great products on microcontrollers. Now the product needs networking, updates, a UI, security… and suddenly the main loop isn't enough. We start by mapping what you have, what you need, and what Linux will actually change for your team.",
    tags: ["Assessment", "Hardware choice", "Roadmap"],
    color: "bg-term-dim",
  },
  {
    id: "bootloader",
    name: "Bootloader",
    short: "Boot",
    quip: "=> boot  # the most nerve-wracking word in embedded",
    body: "Getting a board to boot reliably is step one, and the first place projects stall. I bring up U-Boot, secure boot and A/B partitioning so your device can always find its way home.",
    tags: ["U-Boot", "Secure boot", "A/B updates"],
    color: "bg-term-red",
  },
  {
    id: "kernel",
    name: "Kernel & BSP",
    short: "Kernel",
    quip: "dmesg | grep -i 'why'",
    body: "Vendor BSPs are a starting point, not a product. I bridge the gap between what your silicon vendor ships and something you can maintain for ten years: device trees, drivers, and kernel upgrades that don't ruin your weekend.",
    tags: ["Device tree", "Drivers", "Vendor BSPs"],
    color: "bg-term-amber",
  },
  {
    id: "rootfs",
    name: "Root filesystem",
    short: "Rootfs",
    quip: "bitbake yanct-image  # go get a coffee. maybe two.",
    body: "Yocto is powerful and famously unforgiving. I set up layers, distros and images that are reproducible, small and understandable by the people who'll live with them after I leave.",
    tags: ["Yocto", "BitBake", "Layers", "Reproducible builds"],
    color: "bg-brand-blue-300",
  },
  {
    id: "apps",
    name: "Applications",
    short: "Apps",
    quip: "cargo build --target aarch64-unknown-linux-gnu",
    body: "Your actual product lives here. Whether it's C/C++, Rust, Python or Android on top, I help you pick a structure that fits embedded constraints and a team that may be new to Linux.",
    tags: ["C/C++", "Rust", "Python", "Android"],
    color: "bg-term-cyan",
  },
  {
    id: "delivery",
    name: "CI & delivery",
    short: "CI",
    quip: "git push && echo 'works on every machine'",
    body: "The part nobody budgets for. Build servers, caches, containers, automated tests and OTA updates, so shipping a new release is a button press, not a project.",
    tags: ["Git", "CI/CD", "Docker", "OTA", "Bash"],
    color: "bg-term-green",
  },
];

const layerElementId = (id: string) => `layer-${id}`;

// Whatever crosses the middle tenth of the viewport counts as being looked at
const ACTIVE_BAND = "-45% 0px -45% 0px";
const ACTIVE_BAND_BOTTOM = 0.55;

const STACK_ID = "product-stack";
const MOBILE_STACK_ID = "product-stack-mobile";

const centreY = (el: Element) => {
  const { top, height } = el.getBoundingClientRect();
  return top + height / 2;
};

// Line the step's text up with the stack rather than the viewport centre. The
// stack may not be stuck yet, so aim for where it sits once it is.
const JOURNEY_ID = "journey";

const scrollToLayer = (id: string) => {
  // Layer 0 lives in the section's opening view, so go back to the start
  if (id === LAYERS[0].id) {
    document.getElementById(JOURNEY_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const step = document.getElementById(layerElementId(id));
  if (!step) return;
  const stack = document.getElementById(STACK_ID);
  const sticky = stack?.parentElement;
  // On mobile the stack is a bar pinned to the top: centre the step in the space below it
  if (!stack || !sticky || stack.offsetHeight === 0) {
    const bar = document.getElementById(MOBILE_STACK_ID)?.offsetHeight ?? 0;
    window.scrollBy({ top: centreY(step) - (bar + (window.innerHeight - bar) / 2), behavior: "smooth" });
    return;
  }
  const stuckCentre = parseFloat(getComputedStyle(sticky).top) + stack.offsetHeight / 2;
  window.scrollBy({ top: centreY(step) - stuckCentre, behavior: "smooth" });
};

// Blinking cursor marking the next layer to build; glides between rows via layoutId
const NextCursor = ({ layoutId, className = "" }: { layoutId: string; className?: string }) => (
  <motion.span
    layoutId={layoutId}
    aria-hidden="true"
    className={`animate-blink text-term-green ${className}`}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    █
  </motion.span>
);

// Once everything is built, point back at the start to go round again
const nextLayer = (active: number) => (active === LAYERS.length - 1 ? 0 : active + 1);

// Compact stack for phones, pinned to the top while scrolling through the layers
const MobileStack = ({ active }: { active: number }) => {
  const next = nextLayer(active);
  return (
    <div
      id={MOBILE_STACK_ID}
      className="sticky top-0 z-10 -mx-4 mb-4 border-b border-term-line bg-term-bg/95 px-4 pb-1 pt-3 backdrop-blur md:hidden"
    >
      <div className="flex gap-1">
        {LAYERS.map((layer, i) => {
          const built = i <= active;
          return (
            <div key={layer.id} className="flex min-w-0 flex-1 flex-col items-center">
              <motion.button
                type="button"
                onClick={() => scrollToLayer(layer.id)}
                aria-label={`Jump to layer ${i}: ${layer.name}${i === next ? " (next)" : ""}`}
                aria-current={i === active ? "step" : undefined}
                animate={{ opacity: built ? 1 : i === next ? 0.35 : 0.15 }}
                transition={{ duration: 0.4 }}
                className={`w-full truncate rounded px-1 py-1.5 text-[10px] font-semibold text-term-bg ${layer.color} ${
                  i === active ? "ring-2 ring-white/80" : ""
                }`}
              >
                {layer.short}
              </motion.button>
              <span className="flex h-3 items-center">
                {i === next && <NextCursor layoutId="next-layer-cursor-mobile" className="text-[8px] leading-none" />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// active is -1 until Layer 0 is reached, so nothing starts out built
const StackDiagram = ({ active }: { active: number }) => {
  const next = nextLayer(active);
  return (
    <div id={STACK_ID} className="term-window w-full">
      <div className="term-window-bar">
        <span className="h-3 w-3 rounded-full bg-term-red/70" />
        <span className="h-3 w-3 rounded-full bg-term-amber/70" />
        <span className="h-3 w-3 rounded-full bg-term-green/70" />
        <span className="ml-2">your-product.stack</span>
      </div>
      {/* Rendered top-down so the stack visually grows upwards */}
      <div className="flex flex-col-reverse gap-2 py-5 pl-3 pr-5">
        {LAYERS.map((layer, i) => {
          const built = i <= active;
          return (
            <div key={layer.id} className="flex items-center gap-2">
              <span className="flex w-5 shrink-0 justify-center">{i === next && <NextCursor layoutId="next-layer-cursor" />}</span>
              <motion.button
                type="button"
                onClick={() => scrollToLayer(layer.id)}
                aria-label={`Jump to layer ${i}: ${layer.name}${i === next ? " (next)" : ""}`}
                aria-current={i === active ? "step" : undefined}
                whileHover={{ opacity: 1, x: -4 }}
                animate={{
                  opacity: built ? 1 : i === next ? 0.35 : 0.15,
                  scale: i === active ? 1.03 : 1,
                }}
                transition={{ duration: 0.4 }}
                className={`flex w-full cursor-pointer items-center justify-between rounded-md px-4 py-3 text-left text-sm font-semibold text-term-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${layer.color}`}
              >
                <span>{layer.name}</span>
                <span className="text-xs opacity-70">{built ? "[ OK ]" : "[ .. ]"}</span>
              </motion.button>
            </div>
          );
        })}
      </div>
      <div className="border-t border-term-line px-5 py-3 text-xs text-term-dim">
        {active === LAYERS.length - 1 ? (
          <span className="text-term-green">✓ Product shipped. Go home on time.</span>
        ) : active < 0 ? (
          <span>
            waiting for input<span className="animate-blink">_</span>
            <span className="ml-3 opacity-70">(click a layer to start building)</span>
          </span>
        ) : (
          <span>
            building layer {active + 1}/{LAYERS.length}
            <span className="animate-blink">_</span>
            <span className="ml-3 opacity-70">(click a layer to jump)</span>
          </span>
        )}
      </div>
    </div>
  );
};

const nextButtonClass =
  "mt-8 self-start rounded-lg border border-term-line px-4 py-2 text-sm text-term-green transition hover:border-term-green";

const Step = ({
  layer,
  index,
  next,
  onActive,
}: {
  layer: Layer;
  index: number;
  next?: Layer;
  onActive: (i: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: ACTIVE_BAND });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div
      ref={ref}
      id={layerElementId(layer.id)}
      // Layer 0 sits right under the heading, level with the stack; the rest are centred
      className={`flex min-h-screen flex-col pb-8 ${index === 0 ? "justify-start" : "justify-center pt-8"}`}
    >
      <p className="text-xs uppercase tracking-widest text-term-dim">
        Layer {index}
        <span className={`ml-3 inline-block h-2 w-8 rounded-full align-middle md:hidden ${layer.color}`} />
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold text-white md:text-4xl">{layer.name}</h3>
      <code className="mt-3 block break-words text-sm text-term-amber">{layer.quip}</code>
      <p className="mt-5 max-w-xl leading-relaxed text-term-text">{layer.body}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {layer.tags.map((tag) => (
          <li key={tag} className="rounded border border-term-line px-2 py-1 text-xs text-term-dim">
            {tag}
          </li>
        ))}
      </ul>
      {next ? (
        <button type="button" onClick={() => scrollToLayer(next.id)} className={nextButtonClass}>
          $ cd ../{next.id} ↓
        </button>
      ) : (
        <a href="#how" className={nextButtonClass}>
          $ cd ~/how-we-work ↓
        </a>
      )}
    </div>
  );
};

const Journey = ({ onReboot }: { onReboot: () => void }) => {
  const [active, setActive] = useState(-1);

  // Reaching the start view (section top at the top of the screen) builds Bare metal
  // even when Layer 0 hasn't crossed the active band, as on short phones. Leaving it
  // upwards, with Layer 0 back below the band, unbuilds the stack so it starts over.
  useEffect(() => {
    const section = document.getElementById(JOURNEY_ID);
    const firstStep = document.getElementById(layerElementId(LAYERS[0].id));
    if (!section || !firstStep) return;
    const syncWithStart = () => {
      const atOrPastStart = section.getBoundingClientRect().top <= 1;
      const layer0BelowBand = firstStep.getBoundingClientRect().top > window.innerHeight * ACTIVE_BAND_BOTTOM;
      if (atOrPastStart) setActive((a) => (a < 0 ? 0 : a));
      else if (layer0BelowBand) setActive(-1);
    };
    window.addEventListener("scroll", syncWithStart, { passive: true });
    return () => window.removeEventListener("scroll", syncWithStart);
  }, []);

  return (
    <section id={JOURNEY_ID} className="border-t border-term-line px-4 py-24 md:px-8 md:pt-12">
      <div className="mx-auto max-w-6xl">
        <p className="section-prompt">~$ cat how-it-works</p>
        <h2 className="section-title">
          From <code className="text-term-amber">while(1)</code> to Linux.
        </h2>
        <p className="mt-4 max-w-2xl text-term-dim">
          One layer at a time. Scroll down and watch your product get built, then let me help you
          do it for real.
        </p>

        <div className="mt-8 grid gap-12 md:mt-20 md:grid-cols-2">
          <div>
            <MobileStack active={active} />
            {LAYERS.map((layer, i) => (
              <Step key={layer.id} layer={layer} index={i} next={LAYERS[i + 1]} onActive={setActive} />
            ))}
            {/* The stack sits above the viewport centre, so on tall screens the next
                section would peek in under the last layer without this */}
            <div aria-hidden="true" className="hidden md:block md:h-[30vh]" />
          </div>
          <div className="hidden md:block">
            {/* Pinned top must not exceed the row's resting position (~17rem down the start
                view), or the stack would sit lower than Bare metal there */}
            <div className="sticky top-[min(30vh,17rem)]">
              <StackDiagram active={active} />
              <div className="mt-4 flex flex-wrap gap-3">
                <RebootButton onReboot={onReboot} />
                <a
                  href="#contact"
                  className="rounded border border-term-line px-3 py-1.5 text-xs text-term-green transition hover:border-term-green"
                >
                  $ ./contact-me.sh
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
