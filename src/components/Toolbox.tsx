const MODULES = [
  { name: "yocto", size: "48G", usedBy: "every build, your disk, my patience" },
  { name: "linux", size: "15y", usedBy: "all of the below" },
  { name: "c_cpp", size: "∞", usedBy: "drivers, daemons, the important stuff" },
  { name: "rust", size: "4096", usedBy: "code that should never segfault" },
  { name: "python", size: "2048", usedBy: "tests, tooling, glue" },
  { name: "bash", size: "1337", usedBy: "things that should've been python" },
  { name: "git", size: "512", usedBy: "your future self" },
  { name: "ci_cd", size: "1024", usedBy: "release day calmness" },
  { name: "docker", size: "768", usedBy: "reproducible build hosts" },
  { name: "android", size: "9001", usedBy: "devices with a screen and opinions" },
];

const Toolbox = () => (
  <section id="toolbox" className="border-t border-term-line px-4 py-24 md:px-8">
    <div className="mx-auto max-w-6xl">
      <p className="section-prompt">~$ lsmod | grep yanct</p>
      <h2 className="section-title">Loaded modules</h2>
      <p className="mt-4 max-w-2xl text-term-dim">
        The toolbox. Vendor-agnostic and battle-tested across many hardware suppliers and
        ecosystems.
      </p>

      <div className="term-window mt-10 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="text-term-dim">
            <tr className="border-b border-term-line">
              <th className="px-5 py-3 font-normal">Module</th>
              <th className="px-5 py-3 font-normal">Size</th>
              <th className="px-5 py-3 font-normal">Used by</th>
            </tr>
          </thead>
          <tbody>
            {MODULES.map((m) => (
              <tr
                key={m.name}
                className="border-b border-term-line/50 transition-colors last:border-0 hover:bg-term-line/40"
              >
                <td className="px-5 py-2.5 font-semibold text-term-green">{m.name}</td>
                <td className="px-5 py-2.5 text-term-amber">{m.size}</td>
                <td className="px-5 py-2.5 text-term-text">{m.usedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default Toolbox;
