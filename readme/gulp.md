# gulp - 项目自动化

构建工具目录结构

``` text
  task （构建工具目录）
    | - util （放置常用脚本）
          | - args.js（命令行解析脚本）
    | - default.js   (1.任务入口文件)
    | - build.js     (2.任务串连脚本)
    | - clean.js     (3.清空文件任务脚本)
    | - css.js       (4.处理CSS脚本)
    | - pages.js     (5.处理模板脚本)
    | - scripts.js   (6.处理JavaScript文件脚本)
    | - server.js    (7.处理服务脚本)
    | - browser.js   (7.文件自动监听)
```

## gulp配置文件 - gulpfile.babel.js

``` javascript
  import requireDir from 'require-dir' // require-dir可以将任务分离到多个文件

  requireDir('./tasks')
  // gulp 会根据 requireDir 提供的路径自动加载该目录下所有的任务，并找到任务 default 开始执行。
  // 具体的任务分别编写在 tasks 目录下的 js 文件中，其中必须有一个任务名字为 default，作为任务入口
```

## 任务入口文件 - default.js

``` javascript
  import gulp from 'gulp'
  gulp.task('default', ['build'])
```

`gulp.task(name[, deps], fn)` 用于定义具体的任务

+ name: 任务的名字
+ deps: Array。一个包含任务列表的数组，这些任务在当前任务运行之前完成。一定要确保所依赖的任务列表中的任务都使用了正确的异步执行方式：使用一个 callback，或者返回一个 promise 或 stream（流）。
+ fn: 该函数定义任务所要执行的一些操作。

## 任务串连脚本 - build.js

``` javascript
  import gulp from 'gulp'
  import gulpSequence from 'gulp-sequence' // 按顺序逐个同步地运行任务
  // 串行执行 'clean', 'css', 'pages', 'scripts' 之后，并行执行 ['browser', 'serve']
  gulp.task('build', gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'serve']))
```

## 清空文件任务脚本 - clean.js

``` javascript
  import gulp from 'gulp'
  import del from 'del' // 删除文件和文件夹
  import args from './util/args' // 命令行解析
  gulp.task('clean', () => {
    return del(['server/public', 'server/views']) // 删除 server/public、server/views 目录
  })
```

## 处理CSS脚本 - css.js

``` javascript
  import gulp from 'gulp'
  gulp.task('css', () => {
    return gulp.src('app/**/*.css')
      .pipe(gulp.dest('server/public')) // 使用 pipe方法，将上一步的输出转为当前的输入，进行链式处理
  })
```

`gulp.src(globs[, options])` 用于产生数据流。它的参数表示所要处理的文件，这些指定的文件会转换成数据流（stream）。返回一个 Vinyl files 的 stream 它可以被 piped 到别的插件中。

+ globs：String/Array。所要读取的 glob 或者包含 globs 的数组。glob 可以参考 [node-glob语法](https://www.cnblogs.com/liulangmao/p/4552339.html) 或者 也可以直接写文件的路径
+ options: 选项设置

`gulp.dest(path[, options])` 将管道(pipe)的输出写入文件，同时将这些输出继续输出。能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据。可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它。

+ path: 文件将被写入的路径（输出目录）。也可以传入一个函数，在函数中返回相应路径，这个函数也可以由 vinyl 文件实例 来提供。
+ options: 选项设置

## 处理模板脚本 - pages.js

``` javascript
  import gulp from 'gulp'
  import gulpif from 'gulp-if' // 为功能执行添加条件判断，跟程序语言中的if是相同语义
  import livereload from 'gulp-livereload' // 实时自动刷新页面
  import args from './util/args' // 命令行解析
  gulp.task('pages', () => {
    return gulp.src('app/**/*.ejs')
      .pipe(gulp.dest('server'))
      .pipe(gulpif(args.watch, livereload())) // 如果使用 gulp --watch 命令行监听到文件改变，自动刷新页面
  })
```

## 处理JavaScript文件脚本 - scripts.js

``` javascript
  import gulp from 'gulp'
  import gulpif from 'gulp-if' // 为功能执行添加条件判断，跟程序语言中的if是相同语义
  import concat from 'gulp-concat' // 合并javascript文件,减少网络请求
  import webpack from 'webpack'
  import gulpWebpack from 'webpack-stream' // 可以很简单方便的将 Gulp 与 webpack 集成
  import named from 'vinyl-named' // 重命名标记
  import livereload from 'gulp-livereload' // 实时自动刷新页面
  import plumber from 'gulp-plumber' // 一个专门为gulp而生的错误处理库
  import rename from 'gulp-rename' // 用来重命名文件流中的文件
  import uglify from 'gulp-uglify' // 压缩 JavaScript文件,减小文件大小
  import {log, colors} from 'gulp-util' // log 控制台输出工具； colors 修改控制台输出颜色工具
  import args from './util/args' // 命令行解析

  gulp.task('scripts', () => {
    return gulp.src(['app/js/index.js'])
      .pipe(plumber({ // plumber - 错误处理
        errorHandler: function () {}
      }))
      .pipe(named()) // 文件重命名
      // pipe 可参考 node中文网 stream-流  readable.pipe(destination[, options])
      .pipe(gulpWebpack({ // 对 JavaScript文件使用用 Babel 编译
        mode: 'production',
        module: {
          rules: [
            {
              test: /\.js$/,
              use: 'babel-loader'
            }
          ]
        }
      }), null, (err, stats) => {
        log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
          chunks: false
        }))
      })
      .pipe(gulp.dest('server/public/js'))
      .pipe(rename({ // 重命名文件流中的文件
        basename: 'cp',
        extname: '.min.js'
      }))
      .pipe(uglify({compress: {properties: false}, output: {'quote_keys': true}})) // 压缩JavaScript文件
      .pipe(gulp.dest('server/public/js'))
      .pipe(gulpif(args.wath, livereload())) // 监听热更新
  })
```

## browser.js - 文件自动监听。当app目录下文件发生变化时，自动编译在server下的 public/javascript 和 views 中的文件

``` javascript
  import gulp from 'gulp'
  import args from './util/args' // 命令行解析
  gulp.task('browser', (cb) => {
    if(!args.watch) return  // 完成 task
    gulp.watch('app/**/*.js', ['scripts'])
    gulp.watch('app/**/*.ejs', ['pages'])
    gulp.watch('app/**/*.css', ['css'])
  })
```

`gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])` 监视文件，并且可以在文件发生改动时候做一些事情

## 处理服务脚本 - server.js

参考 [gulp-live-server](https://github.com/gimm/gulp-live-server) API

``` javascript
  import gulp from 'gulp'
  import liveserver from 'gulp-live-server'
  import args from './util/args' // 命令行解析
  gulp.task('serve', (cb) => {
    if(!args.watch) return cb() // 完成 task

    var server = liveserver.new(['--harmony', 'server/bin/www'])
    server.start()

    gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs'], function (file) {
      server.notify.apply(server, [file])
    })

    gulp.watch(['server/routes/**/*.js', 'server/app.js'], function () {
      server.start.bind(server)()
    })
  })
```
