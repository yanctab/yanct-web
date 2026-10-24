import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep navy for text and dark bands, anchored on the Mikro.io teal
        ink: {
          DEFAULT: "#0d1b2a",
          800: "#13263a",
          700: "#1e3550",
          600: "#3a4f66",
          500: "#5b6f84",
          400: "#8798aa",
        },
        surface: {
          DEFAULT: "#f5f7fa",
          line: "#e3e8ee",
        },
        brand: {
          DEFAULT: "#0184a9",
          600: "#016c8b",
          400: "#2ba3c6",
          100: "#e1f2f7",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Manrope"', '"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
