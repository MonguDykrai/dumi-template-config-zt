https://github.com/gulp-community/gulp-less

### Using Plugins

Less now supports plugins, which can add additional functionality. Here's an example of how to use a plugin with `gulp-less`.

```js
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

return gulp
  .src('./less/**/*.less')
  .pipe(
    less({
      plugins: [autoprefix],
    }),
  )
  .pipe(gulp.dest('./public/css'));
```

https://github.com/dxinef/less-plugin-px2rem/blob/master/LessPluginPx2rem.js

```js
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
```

https://juejin.cn/post/6955306311751827464

### 2.2 Babel 模式

```js
return (
  vfs
    // 读取源文件
    .src(src, {
      allowEmpty: true,
      base: srcPath,
    })
    // 先处理 ts
    .pipe(gulpIf(f => !disableTypeCheck && isTsFile(f.path), gulpTs(tsConfig)))
    .pipe(
      // 处理 less 文件
      gulpIf(
        f => lessInBabelMode && /\.less$/.test(f.path),
        gulpLess(lessInBabelMode || {}),
      ),
    )
    .pipe(
      gulpIf(
        f => isTransform(f.path),
        through.obj((file, env, cb) => {
          try {
            file.contents = Buffer.from(
              // 遇到 tsx, jsx 就用 babel 去处理
              // transform 方法也就是根据 babel 配置来编译文件
              transform({
                file,
                type,
              }),
            );
            // .jsx -> .js
            file.path = file.path.replace(extname(file.path), '.js');
            cb(null, file);
          } catch (e) {
            signale.error(`Compiled faild: ${file.path}`);
            console.log(e);
            cb(null);
          }
        }),
      ),
    )
    .pipe(vfs.dest(targetPath))
);
```

https://github.com/umijs/father/blob/master/docs/config.md

https://unpkg.com/browse/father-build@1.20.4/src/getRollupConfig.ts

https://gitee.com/umijs/father#lessinbabelmode

https://www.tutorialspoint.com/less/less_plugins.htm

https://blog.csdn.net/qq_39410421/article/details/120361778

https://webpack.js.org/api/loaders/

https://webpack.js.org/contribute/writing-a-loader/
