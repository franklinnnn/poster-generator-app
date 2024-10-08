/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    fontFamily: {
      display: ["BioRhyme Expanded"],
    },
  },
  prefix: "",
  daisyui: {
    themes: ["light", "dark", "nord", "luxury", "business", "sunset"],
  },
  plugins: [require("daisyui")],
};
