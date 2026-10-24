import Logo from "@/components/Logo";
import { COMPANY, NAV } from "@/company";

const Footer = () => (
  <footer className="border-t border-white/10 bg-ink py-12 text-sm text-ink-400">
    <div className="container-page flex flex-col gap-10 md:flex-row md:justify-between">
      <div className="max-w-xs">
        <Logo dark />
        <p className="mt-4 leading-relaxed">
          Embedded design since 1980. Founded in Lund as Mikrodidakt AB.
        </p>
      </div>

      <nav aria-label="Footer">
        <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:gap-x-12">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="transition hover:text-white">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <address className="not-italic leading-relaxed">
        <span className="font-medium text-white">{COMPANY.name}</span>
        <br />
        {COMPANY.street}
        <br />
        {COMPANY.city}, {COMPANY.country}
      </address>
    </div>

    <div className="container-page mt-10">
      <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {COMPANY.name}
        </p>
        <a href={COMPANY.privacy} className="transition hover:text-white">
          Privacy policy
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
