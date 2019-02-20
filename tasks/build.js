// 任务串连脚本

import gulp from 'gulp'
import gulpSequence from 'gulp-sequence' // 按顺序逐个同步地运行任务
// 串行执行 'clean', 'css', 'pages', 'scripts' 之后，并行执行 ['browser', 'serve']
gulp.task('build', gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'serve']))