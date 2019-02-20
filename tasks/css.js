// 处理CSS脚本

import gulp from 'gulp'
import gulpif from 'gulp-if'
import livereload from 'gulp-livereload'
import args from './util/args'

gulp.task('css', () => {
  return gulp.src('app/**/*.css')
    .pipe(gulp.dest('server/public')) // 使用 pipe方法，将上一步的输出转为当前的输入，进行链式处理
    // .pipe(gulpif(args.watch, livereload()))
})

// gulp.src(globs[, options]) 用于产生数据流。
// 它的参数表示所要处理的文件，这些指定的文件会转换成数据流（stream）。
// > globs：String/Array。所要读取的 glob 或者包含 globs 的数组。glob 可以参考 [node-glob语法](https://www.cnblogs.com/liulangmao/p/4552339.html) 或者 也可以直接写文件的路径
// > options: 选项设置

// gulp.dest(path[, options]) 将管道的输出写入文件，同时将这些输出继续输出.
// 能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据
// 可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它。
// > path: 文件将被写入的路径（输出目录）。也可以传入一个函数，在函数中返回相应路径，这个函数也可以由 vinyl 文件实例 来提供。
// > options: 选项设置