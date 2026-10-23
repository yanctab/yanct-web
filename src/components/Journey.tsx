import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Layer = {
  id: string;
  name: string;
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
    quip: "while (1) { toggle_led(); }  // ah, simpler times",
    body: "You've shipped great products on microcontrollers. Now the product needs networking, updates, a UI, security… and suddenly the main loop isn't enough. We start by mapping what you have, what you need, and what Linux will actually change for your team.",
    tags: ["Assessment", "Hardware choice", "Roadmap"],
    color: "bg-term-dim",
  },
  {
    id: "bootloader",
    name: "Bootloader",
    quip: "=> boot  # the most nerve-wracking word in embedded",
    body: "Getting a board to boot reliably is step one, and the first place projects stall. I bring up U-Boot, secure boot and A/B partitioning so your device can always find its way home.",
    tags: ["U-Boot", "Secure boot", "A/B updates"],
    color: "bg-term-red",
  },
  {
    id: "kernel",
    name: "Kernel & BSP",
    quip: "dmesg | grep -i 'why'",
    body: "Vendor BSPs are a starting point, not a product. I bridge the gap between what your silicon vendor ships and something you can maintain for ten years: device trees, drivers, and kernel upgrades that don't ruin your weekend.",
    tags: ["Device tree", "Drivers", "Vendor BSPs"],
    color: "bg-term-amber",
  },
  {
    id: "rootfs",
    name: "Root filesystem",
    quip: "bitbake yanct-image  # go get a coffee. maybe two.",
    body: "Yocto is powerful and famously unforgiving. I set up layers, distros and images that are reproducible, small and understandable by the people who'll live with them after I leave.",
    tags: ["Yocto", "BitBake", "Layers", "Reproducible builds"],
    color: "bg-brand-blue-300",
  },
  {
    id: "apps",
    name: "Applications",
    quip: "cargo build --target aarch64-unknown-linux-gnu",
    body: "Your actual product lives here. Whether it's C/C++, Rust, Python or Android on top, I help you pick a structure that fits embedded constraints and a team that may be new to Linux.",
    tags: ["C/C++", "Rust", "Python", "Android"],
    color: "bg-term-cyan",
  },
  {
    id: "delivery",
    name: "CI & delivery",
    quip: "git push && echo 'works on every machine'",
    body: "The part nobody budgets for. Build servers, caches, containers, automated tests and OTA updates, so shipping a new release is a button press, not a project.",
    tags: ["Git", "CI/CD", "Docker", "OTA", "Bash"],
    color: "bg-term-green",
  },
];

const StackDiagram = ({ active }: { active: number }) => (
  <div className="term-window w-full">
    <div className="term-window-bar">
      <span className="h-3 w-3 rounded-full bg-term-red/70" />
      <span className="h-3 w-3 rounded-full bg-term-amber/70" />
      <span className="h-3 w-3 rounded-full bg-term-green/70" />
      <span className="ml-2">your-product.stack</span>
    </div>
    {/* Rendered top-down so the stack visually grows upwards */}
    <div className="flex flex-col-reverse gap-2 p-5">
      {LAYERS.map((layer, i) => {
        const built = i <= active;
        return (
          <motion.div
            key={layer.id}
            animate={{
              opacity: built ? 1 : 0.15,
              scale: i === active ? 1.03 : 1,
            }}
            transition={{ duration: 0.4 }}
            className={`flex items-center justify-between rounded-md px-4 py-3 text-sm font-semibold text-term-bg ${layer.color}`}
          >
            <span>{layer.name}</span>
            <span className="text-xs opacity-70">{built ? "[ OK ]" : "[ .. ]"}</span>
          </motion.div>
        );
      })}
    </div>
    <div className="border-t border-term-line px-5 py-3 text-xs text-term-dim">
      {active === LAYERS.length - 1 ? (
        <span className="text-term-green">✓ Product shipped. Go home on time.</span>
      ) : (
        <span>
          building layer {active + 1}/{LAYERS.length}
          <span className="animate-blink">_</span>
        </span>
      )}
    </div>
  </div>
);

const Step = ({
  layer,
  index,
  onActive,
}: {
  layer: Layer;
  index: number;
  onActive: (i: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex min-h-[60vh] flex-col justify-center py-8 md:min-h-[70vh]">
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
    </div>
  );
};

const Journey = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="journey" className="border-t border-term-line px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="section-prompt">~$ cat how-it-works</p>
        <h2 className="section-title">
          From <code className="text-term-amber">while(1)</code> to Linux.
        </h2>
        <p className="mt-4 max-w-2xl text-term-dim">
          One layer at a time. Scroll down and watch your product get built, then let me help you
          do it for real.
        </p>

        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <div>
            {LAYERS.map((layer, i) => (
              <Step key={layer.id} layer={layer} index={i} onActive={setActive} />
            ))}
          </div>
          <div className="hidden md:block">
            <div className="sticky top-[20vh]">
              <StackDiagram active={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
