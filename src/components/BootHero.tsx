import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

type LogLine = { text: string; ok?: boolean };

const BOOT_LOG: LogLine[] = [
  { text: "U-Boot 2026.07-yanct (Oct 23 2026)" },
  { text: "DRAM:  2 GiB of experience, 15 years of uptime" },
  { text: "Loading Kernel Image from mmc 0:1 ... done" },
  { text: "Starting kernel ..." },
  { text: "[    0.000000] Booting Linux on physical CPU 0x0 (one-man-show)" },
  { text: "[    0.000042] Machine model: Yanct Consulting rev. Måns" },
  { text: "[    0.133700] coffee: detected 1 mug, refilling every 90 min" },
  { text: "Mounted root filesystem.", ok: true },
  { text: "Started Yocto build cache (sstate warmed up).", ok: true },
  { text: "Started CI pipeline (green, obviously).", ok: true },
  { text: "Reached target Embedded Linux Expertise.", ok: true },
  { text: "Started yanct.service – your bare-metal-to-Linux sherpa.", ok: true },
];

const LINE_DELAY_MS = 180;
const SEEN_KEY = "yanct-booted";

const hasBootedBefore = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

const markBooted = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Storage blocked: the boot log just plays again next time
  }
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const BootHero = ({ bootKey }: { bootKey: number }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    // bootKey > 0 means someone pressed "reboot" in the footer: always replay
    if (bootKey === 0 && (hasBootedBefore() || prefersReducedMotion())) {
      setVisibleLines(BOOT_LOG.length);
      setBooted(true);
      return;
    }

    setVisibleLines(0);
    setBooted(false);
    let line = 0;
    const timer = window.setInterval(() => {
      line += 1;
      setVisibleLines(line);
      if (line >= BOOT_LOG.length) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setBooted(true);
          markBooted();
        }, 400);
      }
    }, LINE_DELAY_MS);

    return () => window.clearInterval(timer);
  }, [bootKey]);

  const skip = useCallback(() => {
    setVisibleLines(BOOT_LOG.length);
    setBooted(true);
    markBooted();
  }, []);

  // Any key or tap skips the boot log
  useEffect(() => {
    if (booted) return;
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [booted, skip]);

  return (
    <section
      id="top"
      className="scanlines relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 py-16 md:px-8"
      onClick={booted ? undefined : skip}
    >
      <div className="mx-auto w-full max-w-4xl">
        <pre
          aria-hidden="true"
          className={`whitespace-pre-wrap break-words text-xs leading-relaxed text-term-dim transition-opacity duration-700 md:text-sm ${
            booted ? "opacity-40" : "opacity-100"
          }`}
        >
          {(booted ? BOOT_LOG.slice(-2) : BOOT_LOG.slice(0, visibleLines)).map((line, i) => (
            <div key={i}>
              {line.ok && (
                <span>
                  [ <span className="text-term-green">OK</span> ]{" "}
                </span>
              )}
              {line.text}
            </div>
          ))}
          {!booted && <span className="animate-blink">█</span>}
        </pre>

        {!booted && (
          <button
            onClick={skip}
            className="mt-6 text-xs text-term-dim underline-offset-4 hover:text-term-text hover:underline"
          >
            press any key to skip boot ▸
          </button>
        )}

        {booted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10"
          >
            <img src="/yanct.svg" alt="Yanct" className="mb-8 h-auto w-28 md:w-36" />
            <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-7xl">
              Embedded Linux,
              <br />
              <span className="text-term-green">minus the pain.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-term-text md:text-lg">
              Moving from a microcontroller to Linux isn't a port, it's a whole new way of
              working. I help your team get there without a year of trial and error.
            </p>

            <div className="mt-10 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:gap-6">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg bg-term-green px-6 py-3 font-semibold text-term-bg transition hover:brightness-110"
              >
                $ ./contact-mans.sh
              </a>
              <a
                href="#journey"
                className="inline-flex items-center justify-center rounded-lg border border-term-line px-6 py-3 text-term-text transition hover:border-term-green hover:text-term-green"
              >
                $ cat how-it-works ↓
              </a>
            </div>

            <p className="mt-12 text-sm text-term-dim">
              yanct login: <span className="animate-blink text-term-green">█</span>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BootHero;
