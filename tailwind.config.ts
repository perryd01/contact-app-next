import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        glysa: ["var(--font-glysa)"],
        lexendDeca: ["var(--font-lexend-deca)"],
      },
    },
    colors: {
      transparent: "transparent",
      white: {
        primary: "#ffffff",
        secondary: "rgba(255, 255, 255, 0.56)",
        disabled: "rgba(255, 255, 255, 0.32)",
      },
      grey: {
        "100": "#141414",
        "90": "#191919",
        "80": "#1e1e1e",
        "70": "#232323",
        "60": "#282828",
        "50": "#2d2d2d",
        "40": "#323232",
        "30": "#373737",
        "20": "#3c3c3c",
        "10": "#414141",
      },
      black: {
        100: "#000000",
      },
    },
    borderRadius: {
      none: "0",
      xs: "0.3125rem",
      sm: "0.5rem",
      default: "0.625rem",
      lg: "1rem",
      full: "9999px",
    },
  },
  plugins: [],
};
export default config;
