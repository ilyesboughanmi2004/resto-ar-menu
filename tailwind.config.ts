import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A0805D",
        accent: "#A5835E",
        highlight: "#B1906A",
        shadow: "#9D7B55",
      },
    },
  },
  plugins: [],
};
export default config;

