import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#22c55e", // Green-500
        },
        secondary: {
          teal: "#2dd4bf", // Teal-400
          amber: "#f59e0b", // Amber-400
        },
        neutral: {
          light: "#f3f4f6", // Gray-100
          medium: "#d1d5db", // Gray-300
          dark: "#374151", // Gray-700
        },
        accent: {
          lime: "#d9f99d", // Lime-300
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
};
export default config;
