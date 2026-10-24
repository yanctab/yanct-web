// Owl mark plus a typeset wordmark, so it reads on both light and dark backgrounds
const Logo = ({ dark = false }: { dark?: boolean }) => (
  <span className="inline-flex items-center gap-2.5">
    <img src="/mikro-owl.png" alt="" className="h-9 w-9" />
    <span
      className={`font-display text-xl font-bold tracking-[0.08em] ${dark ? "text-white" : "text-ink"}`}
    >
      MIKRO<span className="text-brand">.io</span>
    </span>
  </span>
);

export default Logo;
