const postcss = require('postcss');
const px2rem = require('postcss-px2rem');

function parseOptions(options) {
  if (typeof options === 'string') {
    var ratio = Number(options);
    options = { ratio: ratio };
  }
  return options || {};
}

function LessPluginPx2rem(options) {
  let defaultOptions = {
    ratio: 100,
  };
  this.options = Object.assign(defaultOptions, parseOptions(options));
}

LessPluginPx2rem.prototype = {
  install: function(less, pluginManager) {
    let options = this.options;

    pluginManager.addPostProcessor({
      process: function(css, extra) {
        // console.log(css, 55555555);
        console.log(options);
        if (
          Object.prototype.toString.call(options.rules) === '[object Array]' &&
          options.rules.includes('use px2rem') &&
          css.includes('use px2rem')
        ) {
          return postcss()
            .use(px2rem({ remUnit: options.ratio }))
            .process(css).css;
        } else {
          return css;
        }
        return postcss()
          .use(px2rem({ remUnit: options.ratio }))
          .process(css).css;
      },
    });
  },
  setOptions: function(options) {
    this.options = Object.assign(this.options, parseOptions(options));
  },
  printUsage: function() {
    console.log('');
    console.log('Less px2rem Plugin');
    console.log('specify plugin with --px2rem');
    console.log('The argument is the ratio option. (default: 100)');
    console.log('eg. --px2rem=16');
    console.log('');
  },
};

module.exports = LessPluginPx2rem;
