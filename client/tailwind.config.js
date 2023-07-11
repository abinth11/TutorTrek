/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
    extend: {
      scrollbar: ["rounded"],
      padding: {
        'custom': '.5px', // Replace '20px' with your desired padding value
      },
      colors: {   
        customBlue: '#0C1326',
        customFontColorBlack:'#2A3B4F',
        customBlueShade:'#F3F7FE',
        hoverBlue:'#D4E4FC',
        customTextColor:'#2A3B4F',
        skyBlueCustom:"#F3F7FE"
      } 
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
});