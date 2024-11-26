/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-dark": "#0c1123",
        "background-light": "#dedede",
        "primary-color": "#088395",
        "secondary-color": "#fbffbd",
        "light-text": "#eeeeee",
        "dark-text": "#595858",
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      width: {
        '760': '47.5rem',
        '601': '37.563rem',
      },
      maxWidth: {
        '400': '25rem',
      },
      spacing: {
        'calc-100vh-minus-245':"calc(100vh - 245px)",
        '100': '6.25rem'
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
    },
  },

  plugins: [],
};
