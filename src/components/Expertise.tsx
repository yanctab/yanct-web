import { Cpu, Gauge, Layers, ShieldCheck, Zap } from "lucide-react";
import Reveal from "@/components/Reveal";

const AREAS = [
  {
    icon: ShieldCheck,
    title: "Time- and safety-critical systems",
    body: "Real-time software and fast response times have been on our agenda since day one, including 30 years of safety system design for the medical industry.",
  },
  {
    icon: Layers,
    title: "Operating systems",
    body: "Broad RTOS experience: from device drivers down to the core of the OS itself, such as scheduling.",
  },
  {
    icon: Cpu,
    title: "Low-level programming",
    body: "Deep knowledge of how software and hardware interact, which is what it takes to build systems that restart reliably after a power failure.",
  },
  {
    icon: Zap,
    title: "Electronics design",
    body: "Electronics for small and large production series. We take full responsibility for the design and handle EMC approval for immunity and emission.",
  },
];

const STACK = [
  {
    name: "Yocto Project",
    body: "Custom Linux distributions and SDKs, backed by a large community and the biggest names in tech.",
  },
  {
    name: "Buildroot",
    body: "Lean cross-compiled systems. We keep your Buildroot BSP going or help you migrate to Yocto.",
  },
  {
    name: "Mender",
    body: "Safe, reliable over-the-air updates for devices in the field.",
  },
  {
    name: "Linux",
    body: "The kernel at the heart of the platform: drivers, device trees and board bring-up.",
  },
];

const Expertise = () => (
  <section id="expertise" className="section bg-surface">
    <div className="container-page">
      <Reveal className="max-w-3xl">
        <p className="eyebrow">Areas of expertise</p>
        <h2 className="section-title">Four decades across the industry</h2>
        <p className="section-lead">
          Our work has taken us through many segments, from medical devices to fuel dispensers
          and audio. That breadth is what lets us spot problems before they become expensive.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {AREAS.map(({ icon: Icon, title, body }, i) => (
          <Reveal key={title} delay={(i % 2) * 0.08}>
            <article className="card flex h-full gap-5">
              <Icon className="mt-1 h-6 w-6 shrink-0 text-brand" />
              <div>
                <h3 className="font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <div className="relative overflow-hidden rounded-2xl bg-ink p-7 text-white md:p-12">
          <div className="grid-bg absolute inset-0" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-400">
                <Gauge className="h-3.5 w-3.5" /> Bring-up &amp; BSP
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold md:text-3xl">
                Embedded Linux, built for your hardware
              </h3>
              <p className="mt-4 leading-relaxed text-ink-400">
                A board support package is the layer of hardware-specific drivers and routines
                that lets an operating system run on your board. We build that platform, the
                infrastructure around it and the SDKs your application developers need, on proven
                open-source projects.
              </p>
            </div>
            <dl className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {STACK.map((s) => (
                <div key={s.name} className="bg-ink-800 p-5">
                  <dt className="font-display font-bold text-white">{s.name}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink-400">{s.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Expertise;
