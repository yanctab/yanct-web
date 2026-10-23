import RebootButton from "@/components/RebootButton";

const Footer = ({ onReboot }: { onReboot: () => void }) => (
  <footer className="border-t border-term-line px-4 py-10 text-xs text-term-dim md:px-8">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
      <p>© {new Date().getFullYear()} Yanct · Built with coffee and a warm sstate cache.</p>
      <RebootButton onReboot={onReboot} />
    </div>
  </footer>
);

export default Footer;
