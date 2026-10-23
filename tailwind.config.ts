import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Terminal-at-night palette, anchored on the original brand blue
        term: {
          bg: "#0a0f14",
          panel: "#111a22",
          line: "#1f2d38",
          text: "#d3dee5",
          dim: "#7d8f9b",
          green: "#6ee7a0",
          amber: "#ffbf5e",
          red: "#ff6b6b",
          cyan: "#7cc7e8",
        },
        "brand-blue": {
          DEFAULT: "#30586D",
          300: "#6696ab",
          400: "#477087",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
