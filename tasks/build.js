// 任务串连脚本

import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task('build', gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'serve']))