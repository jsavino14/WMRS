import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        // Distance that pushes the FormSidebar down on lg+ so the
        // "PREFER TO CALL OR EMAIL DIRECTLY" label aligns with the
        // second row of form fields. Change here to tune all pages at once.
        "sidebar": "115px",
      },
      colors: {
        charcoal: "#1E2428",
        amber:    "#C97A1E",
        accent:   "#2E7D4F",
        offwhite: "#F7F8F7",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
