import 'babel-polyfill'
// import './class/lesson1'
// import './class/lesson2'
// import './class/lesson3'
// import './class/lesson4'
// import './class/lesson5'
// import './class/lesson6'
// import './class/lesson7'
// import './class/lesson8'
// import './class/lesson9'
// import './class/lesson10'
// import './class/lesson11'
// import './class/lesson12'
// import './class/lesson13'
// import './class/lesson14'
// import './class/lesson15'
// import './class/lesson16'

// 模块化开始
// import './class/lesson17' // 模块化
// import {A, test, Hello} from './class/lesson17';
// console.log(A, test, Hello);

// import {A} from './class/lesson17';
// console.log(A); // 如果只需要变量A，则可只取变量A

// import * as lesson from './class/lesson17';
// * 标识引入 lesson17 中暴露出来的所有东西，包括变量，方法，类等
// as 定义一个别名 lesson，暴露出来的方法等，则存放在 lesson 对象中
// console.log(lesson.a, lesson.test);

// import lesson17 from './class/lesson17';
// console.log(lesson17.A);
// 模块化结束

// 彩票
import Lottery from './lottery'

const syy=new Lottery();