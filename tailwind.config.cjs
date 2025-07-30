/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4b9b4b",
        secondary: "#f9ca09",
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
    darkMode: "class", // Использовать класс для переключения темной темы
  // Чтобы работать вместе с MUI
  corePlugins: {
    preflight: false,
  },
  important: true,
  // plugins: [],
  plugins: [require("tw-elements/plugin.cjs")],
}