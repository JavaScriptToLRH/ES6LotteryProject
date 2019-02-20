import requireDir from 'require-dir' // 可以将任务分离到多个文件

// 具体的任务分别编写在 gulp/tasks 目录下的 js 文件中，其中必须有一个任务名字为 default，作为任务入口
// gulp 会根据 requireDir 提供的路径自动加载该目录下所有的任务，并找到任务 default 开始执行。

requireDir('./tasks')