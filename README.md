# ES6LotteryProject

#### 项目介绍
ES6构建彩票项目

#### ES6项目构建
1. 业务逻辑：页面、交互
2. 自动构建：编译（ES6转ES5（如果在IE7，IE8中，可能需要转ES3））、辅助（自动刷新、文件合并、资源压缩）
3. 服务接口：数据、接口

#### 任务自动化
1. 任务自动化：减少人工操作，用电脑自动监听所有操作，自动响应
2. Gulp：用自动化构建工具增强你的工作流程的一个工具
   
#### 编译工具（babel、webpack）
1. babel：JavaScript的编译器，用于转换ES6语法
2. webpack：模块化构建工具，用来解决模块化
3. webpack-stream：webpack对Glup的一个支持

#### 目录结构划分
```
  ES6LotteryProject  
  | --- app（放置前端代码）  
  | ---  | -------- CSS（存放样式文件）  
  | ---  | -------- js（存放JavaScript文件）  
  | ---  | --------  | -------- class（存放ES6 class 类）  
  | ---  | --------  | -------- index.js（入口文件）  
  | ---  | -------- views（存放模板文件，html）
  | ---  | --------  | -------- error.ejs（错误模板文件）
  | ---  | --------  | -------- index.ejs（入口模板文件）
  | --- server（服务器目录）
  | --- tasks（构建工具目录）
  | ---  | -------- util（放置常用脚本）
  | --- .babelrc（babel配置文件，ES6转ES5）
  | --- gulpfile.babel.js（gulp配置文件）
  | --- package.json（安装依赖包过程中，需要有package.json文件）
  注：
  1. 在模板文件夹中创建 .ejs 文件，是因为创建的服务器代码是通过 express Node框架创建的，此框架使用的模板引擎为 ejs引擎。可以当做 HTML 使用。
  2. 创建 gulpfile.babel.js：Gulp官网中为创建 gulpfile.js 文件，因为此项目中使用ES6构建脚本，如果不加 .babel ，在执行构建脚本时会报错
```

#### 安装教程

1. 全局安装express、express-generator： `npm install -g express` `npm install -g express-generator`
2. 在服务器目录server中执行`express -e .` ：`express`表示安装`express` , `-e`表示使用`ejs`作为模板 , `.`表示当前目录中
   
注：
* 通过应用生成器工具 `express-generator` 可以快速创建一个应用的骨架。