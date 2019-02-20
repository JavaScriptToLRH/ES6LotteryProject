// 处理JavaScript文件脚本

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
import args from './util/args'

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