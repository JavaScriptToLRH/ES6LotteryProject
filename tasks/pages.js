// 处理模板脚本

import gulp from 'gulp'
import gulpif from 'gulp-if' // 为功能执行添加条件判断，跟程序语言中的if是相同语义
import livereload from 'gulp-livereload' // 实时自动刷新页面
import args from './util/args'

gulp.task('pages', () => {
  return gulp.src('app/**/*.ejs')
    .pipe(gulp.dest('server'))
    .pipe(gulpif(args.watch, livereload())) // 如果使用 gulp --watch 命令行监听到文件改变，自动刷新页面
})