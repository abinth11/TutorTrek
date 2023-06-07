/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['Roboto', 'Arial', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    colors: {
      customBlue: '#0C1326',
      customFontColorBlack:'#2A3B4F'
    } 
  },
};
export const plugins = [];