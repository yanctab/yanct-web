import { ArrowRight, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import { COMPANY } from "@/company";

const DETAILS = [
  { icon: Phone, label: "Phone", value: COMPANY.phone, href: COMPANY.phoneHref },
  { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  {
    icon: MapPin,
    label: "Office",
    value: `${COMPANY.street}, ${COMPANY.city}`,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${COMPANY.name}, ${COMPANY.street}, ${COMPANY.city}`,
    )}`,
  },
  { icon: Linkedin, label: "LinkedIn", value: "Follow us", href: COMPANY.linkedin },
];

const Contact = () => (
  <section id="contact" className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
    <div className="grid-bg absolute inset-0" aria-hidden />
    <div
      className="absolute -bottom-48 -left-40 h-[32rem] w-[32rem] rounded-full bg-brand/20 blur-[120px]"
      aria-hidden
    />

    <div className="container-page relative grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <Reveal>
        <p className="eyebrow text-brand-400">Contact</p>
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl md:leading-[1.1]">
          Need consulting or a project estimate?
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-400">
          Tell us about your product and where you are today. We will get back to you with how
          we can help, whether it is one part of the design or the complete system.
        </p>
        <a href={`mailto:${COMPANY.email}`} className="btn-primary mt-10 px-7 py-3.5 text-base">
          Email {COMPANY.email} <ArrowRight className="h-4 w-4" />
        </a>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-ink-800/80">
          {DETAILS.map(({ icon: Icon, label, value, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 p-5 transition hover:bg-white/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-400">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-ink-400">
                    {label}
                  </span>
                  <span className="block truncate font-medium text-white group-hover:text-brand-400">
                    {value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default Contact;
