// 文件自动监听 当app目录下文件发生变化时，自动编译在server下的 public/javascript 和 views 中的文件

import gulp from 'gulp'
import gulpif from 'gulp-if'
import gutil from 'gulp-util'
import args from './util/args'

gulp.task('browser', (cb) => {
  if(!args.watch) return  // 完成 task
  gulp.watch('app/**/*.js', ['scripts'])
  gulp.watch('app/**/*.ejs', ['pages'])
  gulp.watch('app/**/*.css', ['css'])
})