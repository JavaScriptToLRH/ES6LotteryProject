// 模块化
// 模块引入使用 import
// 模块导出使用 export

// export  let A = '导出变量';

// export function test() {
//   console.log('导出方法');
// }

// export class  Hello {
//   test () {
//     console.log('class')
//   }
// }

// 推荐写法
let A = 123;
let test = function () {
  console.log('test');
}
class Hello {
  test () {
    console.log('class')
  }
}
export default {
  A, test, Hello
}
// default 给导出的方法等不起名字，把命名权利交给引入放，即：import
