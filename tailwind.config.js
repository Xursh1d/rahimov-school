/** @type {import('tailwindcss').Config} */
import { screens as defaultScreens } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "0px",
      ...defaultScreens,
    },
    extend: {},
  },
  plugins: [],
};
