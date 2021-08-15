const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        coffee:'5c2c00',
        cream:'e3b182'
      },
      fontFamily: {
        EXO: "'Exo 2', sans",
          SCRIPT: "'Caveat', sans"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
