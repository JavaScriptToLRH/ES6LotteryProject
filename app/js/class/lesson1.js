function test() {
  // 区分块级作用域：查看代码是否由 大括号{} 所包括 
  // let 存在块级作用域的概念
  for (let i = 1; i < 3; i++) {
    console.log(i); // 1 2
  }
  // for循环中，声明了 let i，在 大括号{} 之外，let i 就不存在了
  console.log(i); // Uncaught ReferenceError: i is not defined
  // 此处访问 i 报引用错误： Uncaught ReferenceError: i is not defined
  // 未报 undefined 的原因是：如果代码中使用了 ES6，则 ES6 强制开启了严格模式
  // 在 ES5 中使用严格模式，需在文件首行加入 "use strict"

  let a = 1;
  // let a = 2;
  // 注意：在使用 let 申明变量的时候，不能重复声明
}

function last() {
  const PI = 3.1415926;
  console.log(PI); // 3.1415926
  // const 声明常量，常量不能进行修改，声明时必须赋值
  // const 也存在块级作用域的概念

  // const 不能进行修改，其实不严谨，示例如下：
  const k = {
    a: 1
  };
  k.b = 2;
  console.log(k); // {a: 1, b: 2}
  // 原因：其实此处与 const 不能进行修改并不冲突，k 为对象，对象为引用类型，最后的返回值为内存中的地址
}

// test()
last()
