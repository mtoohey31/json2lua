const colors = require("tailwindcss/colors");

const config = {
  purge: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        orange: colors.orange,
      },
    },
  },

  plugins: [],
};

module.exports = config;
