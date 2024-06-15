const postCssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    postCssPresetEnv({
      browsers: 'last 1 versions',
    }),

    autoprefixer,
    tailwindcss,
  ],
};

// module.exports = {
//   plugins: [
//     require('postcss-preset-env')({
//       browsers: 'last 1 versions',
//     }),
//     require('autoprefixer'),
//   ],
// };
