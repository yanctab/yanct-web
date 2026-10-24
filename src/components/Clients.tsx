const CLIENTS = [
  { file: "baxter", name: "Baxter" },
  { file: "codab", name: "Codab" },
  { file: "designresurs", name: "Design Resurs" },
  { file: "assytech", name: "Assytech" },
  { file: "dover", name: "Dover" },
  { file: "techpeople", name: "Techpeople" },
  { file: "blacktrace", name: "Blacktrace" },
  { file: "mando", name: "Mandometer" },
];

const Clients = () => (
  <section aria-labelledby="clients-title" className="border-b border-surface-line py-14">
    <div className="container-page">
      <p
        id="clients-title"
        className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-500"
      >
        Trusted by companies across medical, industrial and audio
      </p>
      <ul className="mt-8 grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
        {CLIENTS.map((c) => (
          <li key={c.file} className="flex justify-center">
            <img
              src={`/clients/${c.file}.png`}
              alt={c.name}
              loading="lazy"
              className="h-9 w-28 object-contain opacity-55 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Clients;
