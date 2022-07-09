const plugin = require("tailwindcss/plugin");
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { 
    screens: {
    'xs': '475px',
    '2xs': '375px',
    '3xs': '360px',
    '4xs': '28px',
    ...defaultTheme.screens,
  },
},
  extend: {
    fontFamily: {
      Montserrat: ['"Montserrat", sans-serif'],
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari and Opera */
        ".no-scrollbar::-webkit-scrollbar": {
          "display": "none"
        },

        /* Hide scrollbar for IE, Edge and Firefox */
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    }),
  ],
};

//
