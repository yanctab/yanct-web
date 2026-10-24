import { CircuitBoard, Code2, GitBranch } from "lucide-react";
import Reveal from "@/components/Reveal";

const SERVICES = [
  {
    icon: Code2,
    title: "Software",
    body: "Firmware, drivers, RTOS and embedded Linux applications. After 40 years we know most of the tools, and have used them across many industries.",
    points: ["C, C++ and Python", "Real-time and safety-critical code", "RTOS and embedded Linux"],
  },
  {
    icon: CircuitBoard,
    title: "Hardware",
    body: "From schematics to layout, and from test to finished product. Prototypes and small series are assembled in-house; larger series go to long-term production partners.",
    points: ["Schematics and PCB layout", "EMC: immunity and emission approval", "In-house prototypes and small series"],
  },
  {
    icon: GitBranch,
    title: "DevOps",
    body: "Our engineers know both embedded design and CI/CD, so they can build the pipelines, test rigs and update flows your product needs to ship and stay maintained.",
    points: ["CI/CD for embedded targets", "Reproducible Yocto and Buildroot builds", "Over-the-air updates with Mender"],
  },
];

const Services = () => (
  <section id="services" className="section">
    <div className="container-page">
      <Reveal className="max-w-3xl">
        <p className="eyebrow">Services</p>
        <h2 className="section-title">The whole chain of embedded design</h2>
        <p className="section-lead">
          Hire us for one part of your product or for the complete system. From hardware to
          software to DevOps, no challenge is too big or too small.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, body, points }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <article className="card h-full">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{body}</p>
              <ul className="mt-6 space-y-2 border-t border-surface-line pt-5 text-sm text-ink-600">
                {points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
