// 清空文件任务脚本

import gulp from 'gulp'
import del from 'del' // 删除文件和文件夹
import args from './util/args'

gulp.task('clean', () => {
  return del(['server/public', 'server/views']) // 删除 server/public、server/views 目录
})