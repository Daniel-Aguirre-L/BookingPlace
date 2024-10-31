/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-dark": "#0c1123",
        "primary-color": "#088395",
        "secondary-color": "#fbffbd",
        "light-text": "#eeeeee",
        "dark-text": "#595858",
        "background-light": "#dedede",
      },
      width: {
        '600': '37.5rem',
      }
    },
  },
  plugins: [],
};
