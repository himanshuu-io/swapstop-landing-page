import type { Config } from "tailwindcss";

// Shared design tokens used across 2+ sections, pulled verbatim from the
// source HTML (~/Downloads/swapstop-full-website.html). Section-specific
// one-off hexes should use Tailwind arbitrary values (e.g. bg-[#b9ddd8])
// in the component itself rather than being added here, so parallel work
// on different sections never touches this shared file.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: "#9AF223",
        forest: "#0E3200",
        desc: "#F9FAF9",
        ink: "#1A1B18",
      },
      borderRadius: {
        btn: "16px",
      },
      fontFamily: {
        display: [
          "var(--font-switzer)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        wordmark: [
          "var(--font-archivo)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["var(--font-plex-mono)", "monospace"],
        instrument: ["var(--font-instrument-sans)", "var(--font-switzer)"],
      },
      maxWidth: {
        page: "1440px",
      },
      screens: {
        "max-1100": { max: "1100px" },
        "max-900": { max: "900px" },
        "max-899": { max: "899.98px" },
        "max-700": { max: "700px" },
        "max-640": { max: "640px" },
        "max-560": { max: "560px" },
        "max-420": { max: "420px" },
        "min-900": { min: "900px" },
      },
    },
  },
  plugins: [],
};

export default config;
