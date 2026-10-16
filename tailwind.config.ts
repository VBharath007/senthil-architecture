import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: { // Red from "S"
          50: "#fdf3f3",
          100: "#fce5e5",
          200: "#f9caca",
          300: "#f4a1a1",
          400: "#eb6c6c",
          500: "#e03e3e", // Primary red
          600: "#cc2a2a",
          700: "#ab2020",
          800: "#8f1d1d",
          900: "#761c1c",
          950: "#400a0a",
        },
        nature: { // Green from "respect nature"
          50: "#f2f9f4",
          100: "#e0f2e6",
          200: "#c2e5cd",
          300: "#94d0a9",
          400: "#5eb37d",
          500: "#39965a", // Primary green
          600: "#2a7745",
          700: "#245e38",
          800: "#1e4c2e",
          900: "#1a3f27",
          950: "#0e2316",
        },
        ink: { // Neutral Architectural Blacks and Greys
          950: "#09090b", // Deep Charcoal
          900: "#18181b", // Charcoal
          800: "#27272a",
          700: "#3f3f46",
          600: "#52525b",
          500: "#71717a",
          400: "#a1a1aa",
          300: "#d4d4d8",
          200: "#e4e4e7",
          100: "#f4f4f5", // Light grey surface
          50: "#fafafa",
        },
      },
      backgroundImage: {
        "radial-glow": "none",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "spin-slow": "spin 40s linear infinite",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
