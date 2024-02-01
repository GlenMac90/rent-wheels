import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xxs: "320px",
        xs: "400px",
      },
      borderRadius: {
        ten: "10px",
      },
      colors: {
        blue: {
          500: "#3563E9",
          300: "#5CAFFC",
          100: "#94A7CB",
          50: "#C3D4E9",
        },
        gray: {
          900: "#1A202C",
          850: "#293346",
          800: "#424B5C",
          700: "#3D5278",
          400: "#90A3BF",
        },
        red: {
          400: "#ED3F3F",
        },
        white: {
          DEFAULT: "#FFFFFF",
          100: "#F7F9FC",
          200: "#F6F7F9",
        },
      },
    },
  },
  plugins: [],
};
export default config;
