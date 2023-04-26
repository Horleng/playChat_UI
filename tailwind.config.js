/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs':'400px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      keyframes:{
        'bottom-animate':{
          '0%':{transform:'translateY(100%)'},
          '100%':{transform:'translateY(0)'}
        }
      },
      animation:{
        'formAnimation':'bottom-animate 0.3s ease-out forwards'
      }
    },
    fontFamily:{
      'noto':['Noto Serif', 'serif'],
      'roboto':['Roboto']
    }
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}