const RebootButton = ({ onReboot, className = "" }: { onReboot: () => void; className?: string }) => (
  <button
    type="button"
    onClick={onReboot}
    className={`rounded border border-term-line px-3 py-1.5 text-xs text-term-dim transition hover:border-term-red hover:text-term-red ${className}`}
  >
    $ sudo reboot
  </button>
);

export default RebootButton;
