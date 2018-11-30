// 当直接在命令行中输入 gulp 时， gulp 会默认寻找 tasks 目录下的 defaults脚本

import gulp from 'gulp'

gulp.task('default', ['build'])