/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
  // Чтобы работать вместе с MUI
  corePlugins: {
    preflight: false,
  },
  important: true,
  plugins: [],
}