/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@acmecorp/base-tailwind-config')
  ],
  content: [
    './client/src/**/*.{js,jsx,ts,tsx}',
    './client/components/**/*.{js,jsts,jsx,tsx}',
    './client/components/*.{jsx}'
  ],
  theme: {
    fontFamily: {
      paytone: ['"Paytone One"', 'sans-serif'],
      comfortaa: ['Comfortaa', 'cursive']
    },
    extend: {}
  },
  plugins: []
};
