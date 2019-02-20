# ES6LotteryProject

## 1. 项目介绍

本项目使用 ES6 构建彩票项目，主要用于学习 ES6 相关语法。

## 2. 如何运行

+ 全局安装express、express-generator： `npm install -g express` `npm install -g express-generator`
+ 在服务器目录server中执行 `express -e .` ：`express` 表示安装 `express` , `-e`表示使用`ejs`作为模板 , `.`表示当前目录中
+ 执行 `gulp` 所有脚本只执行一次；执行 `gulp --watch` 才能进行监听所有脚本的更新
+ 在浏览器中输入 `http://localhost:3000/` 查看

注：

+ 通过应用生成器工具 `express-generator` 可以快速创建一个应用的骨架。

## 3. 错误与解决方法

+ Q：Failed to load external module @babel/register  
  A：gulp@3.9.1会出现此问题，安装gulp@3.9.0即可 `npm i -g gulp@3.9.0`
+ Q：gulp中使用 webpack 4.0 版本报错  
  A：webpack 4.0 版本语法与之前版本不同，所以对应在 gulp 中的使用也需要变更，变更如下：

  ``` text
    {
      mode: 'production',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: 'babel-loader'
          }
        ]
      }
    }
  ```

## 4. 项目简介

### 4.1 ES6项目构建

+ 业务逻辑：页面、交互
+ 自动构建：编译（ES6转ES5（如果在IE7，IE8中，可能需要转ES3））、辅助（自动刷新、文件合并、资源压缩）
+ 服务接口：数据、接口

### 4.2 任务自动化

+ 任务自动化：减少人工操作，用电脑自动监听所有操作，自动响应
+ Gulp：用自动化构建工具增强你的工作流程的一个工具

### 4.3 编译工具（babel、webpack）

+ babel：JavaScript的编译器，用于转换ES6语法
+ webpack：模块化构建工具，用来解决模块化
+ webpack-stream：webpack对Glup的一个支持

### 4.4 目录结构划分

``` text
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

## 5.项目展示

![lottery](./readme/images/lottery.png)