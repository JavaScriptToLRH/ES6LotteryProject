// 当直接在命令行中输入 gulp 时， gulp 会默认寻找 tasks 目录下的 defaults脚本

import gulp from 'gulp'

// gulp.task方法 用于定义具体的任务。
// gulp.task(name[, deps], fn)
// > name: 任务的名字
// > deps: Array。一个包含任务列表的数组，这些任务在当前任务运行之前完成
// > fn: 该函数定义任务所要执行的一些操作。
gulp.task('default', ['build'])