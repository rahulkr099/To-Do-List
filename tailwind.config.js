/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'day': "url('/day.svg')",
        'night': "url('/night.svg')",
        'trash':"url('/trash.svg')",
      },
    },
  },
  plugins: [],darkMode: 'class',
}

