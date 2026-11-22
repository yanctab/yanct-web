import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Wine red from the BK50 club mark, plus a basketball orange accent
        wine: {
          50: "#fbf1f3",
          100: "#f5dde2",
          300: "#d98a99",
          500: "#9b2d40",
          600: "#862638",
          700: "#6e1e2d",
          800: "#4f1520",
          900: "#2e0c13",
        },
        ball: {
          DEFAULT: "#f2882b",
          600: "#d9701a",
        },
        cream: "#f8f3ec",
        ink: "#1c1215",
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
      },
      keyframes: {
        bounceBall: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "bounce-ball": "bounceBall 2.4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
