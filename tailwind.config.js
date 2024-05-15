/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
    daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#00B7C6",
          secondary: "#0C5274",
          "base-200": "#f0f0f0",
        },
      },
      "dim",
    ],
  },
}
