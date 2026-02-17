/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./index.html", "./script.js", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#334155",
        accent: "#f59e0b",
        dark: "#020617",
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
