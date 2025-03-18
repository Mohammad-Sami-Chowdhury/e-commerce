/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pops': ["Poppins", "serif"],
        'inter': ["Inter", "serif"]
      },
    },
  },
  plugins: [],
}