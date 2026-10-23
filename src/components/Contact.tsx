import { Github, Linkedin, Mail } from "lucide-react";

const LINKS = [
  { href: "mailto:info@yanct.com", label: "info@yanct.com", icon: Mail },
  {
    href: "https://www.linkedin.com/in/måns-zigher-a4656954",
    label: "LinkedIn",
    icon: Linkedin,
  },
  { href: "https://github.com/yanctab", label: "github.com/yanctab", icon: Github },
];

const Contact = () => (
  <section id="contact" className="scanlines border-t border-term-line px-4 py-24 md:px-8">
    <div className="mx-auto max-w-4xl">
      <div className="term-window p-6 md:p-10">
        <p className="text-sm text-term-dim">
          yanct login: <span className="text-term-green">you</span>
          <br />
          Password: ********
          <br />
          Welcome! You have 1 new opportunity.
        </p>

        <h2 className="section-title mt-8">
          Planning the jump to Linux?
          <br />
          <span className="text-term-green">Let's talk before you write the first recipe.</span>
        </h2>
        <p className="mt-6 max-w-2xl leading-relaxed text-term-text">
          A first chat is free and comes with no sales pitch. Tell me where you are and what
          you're building, and I'll tell you honestly whether and how I can help.
        </p>

        <a
          href="mailto:info@yanct.com"
          className="mt-10 inline-flex items-center gap-3 rounded-lg bg-term-green px-6 py-4 font-semibold text-term-bg transition hover:brightness-110"
        >
          <Mail className="h-5 w-5" /> Send me an email
        </a>

        <ul className="mt-10 flex flex-col gap-4 border-t border-term-line pt-8 text-sm sm:flex-row sm:gap-8">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-term-text transition hover:text-term-green"
              >
                <Icon className="h-4 w-4" /> {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Contact;
