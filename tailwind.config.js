/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a", // Deep Slate / Engineering Blue
        secondary: "#334155", // Slate 700
        accent: "#f59e0b", // Amber 500 (High vis)
        dark: "#020617", // Slate 950
        light: "#f8fafc",
      },
      fontFamily: {
        heading: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
