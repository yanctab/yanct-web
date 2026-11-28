import { useEffect, useState } from "react";
import { MessageSquareText, X } from "lucide-react";

/**
 * A banner on every page (rendered in App.tsx) saying the site is a draft for evaluation: nothing is decided and
 * everything is open for discussion. It sits at the bottom so it never covers the pages' fixed menus. It can be
 * closed, and stays closed for the rest of the visit (sessionStorage). Remove it when the board has decided.
 */
const KEY = "bk50-draft-banner-closed";
const FEEDBACK = `mailto:styrelse@bk50.se?subject=${encodeURIComponent("Förslag: Ny hemsida")}`;

const DraftBanner = () => {
  const [open, setOpen] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) !== "1";
    } catch {
      return true;
    }
  });

  // Room at the bottom of the page so the banner never hides the footer
  useEffect(() => {
    document.body.style.paddingBottom = open ? "var(--draft-banner-height, 0px)" : "";
  }, [open]);

  if (!open) return null;

  const close = () => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      // Private mode: it just comes back on the next page
    }
    setOpen(false);
  };

  return (
    <aside
      aria-label="Om den här webbplatsen"
      ref={(el) => el && document.body.style.setProperty("--draft-banner-height", `${el.offsetHeight}px`)}
      className="fixed inset-x-0 bottom-0 z-[60] border-t-4 border-ball bg-ink text-white shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.5)]"
    >
      <div className="container-page flex items-start gap-3 py-3 sm:items-center md:gap-4">
        <span className="mt-0.5 shrink-0 rounded-full bg-ball px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-ink sm:mt-0">
          Utkast
        </span>
        <p className="flex-1 text-sm leading-snug text-white/85">
          <strong className="text-white">Den här webbplatsen är ett förslag för utvärdering</strong> och för att skapa en gemensam
          vision för BK50. Inget är bestämt, allt är uppe för diskussion.{" "}
          <a href={FEEDBACK} className="inline-flex items-center gap-1 font-semibold text-ball underline underline-offset-4 hover:text-white">
            <MessageSquareText className="h-4 w-4" /> Tyck till
          </a>
        </p>
        <button
          type="button"
          onClick={close}
          aria-label="Stäng"
          className="-mr-2 shrink-0 rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </aside>
  );
};

export default DraftBanner;
