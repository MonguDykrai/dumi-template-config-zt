const LessPx2rem = require('./plugins/LessPluginPx2rem');
// const LessPx2rem = require('less-plugin-px2rem');
const px2rem = new LessPx2rem({
  rules: ['use px2rem'],
});

export default {
  // esm: 'rollup',
  // cjs: 'rollup',

  // umd: {
  //   name: 'Template',
  //   chainWebpack: (memo: any) => {
  //     console.log(memo);

  //     return memo;
  //   }
  // }

  esm: {
    type: 'babel',
    mjs: true,
  },
  // lessInBabelMode: true,
  lessInBabelMode: {
    plugins: [px2rem],
  },
};
