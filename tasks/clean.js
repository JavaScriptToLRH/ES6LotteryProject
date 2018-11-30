// 清空文件任务脚本

import gulp from 'gulp'
import del from 'del'
import args from './util/args'

gulp.task('clean', () => {
  return del(['server/public', 'server/views'])
})