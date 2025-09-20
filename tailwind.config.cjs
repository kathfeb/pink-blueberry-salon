/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.(js|jsx|ts|tsx)'],
  theme: {
    colors: {
      ...colors,
      primary: {
        blue: {
          100: '#034CC7',
          200: '#0066AB'
        }
      },
      secondary: {},
      error: '#ff0033'
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    }
  },

  plugins: []
};
