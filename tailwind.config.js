// tailwind.config.js
module.exports = {
  content: ['{pages,app}/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        emerald: {
          ...require('daisyui/src/colors/themes')['[data-theme=emerald]'],

          '--animation-btn': '0.25s',
          '--btn-focus-scale': '0.95',
        },
      },
    ],
  },
};
