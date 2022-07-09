const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/shared/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Poppins', ...defaultTheme.fontFamily.sans],
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1032px',
        },
      },
      colors: {
        primary: '#FF6F26',
      },
      boxShadow: {
        button: '0 2px 4px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.webp')",
      },
    },
  },
  plugins: [],
};
