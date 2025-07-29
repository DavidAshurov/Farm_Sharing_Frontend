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
      boxShadow: {
        'card': '0 4px 15px rgba(0, 0, 0, 0.1)',
        'button': '0 4px 6px rgba(75, 155, 75, 0.25)',
      },
    },
  },
  plugins: [],
}


