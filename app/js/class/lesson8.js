// 对象扩展
// 简洁表示法  属性表达式  扩展运算符  Object新增方法

{
  // 简洁表示法
  let o = 1;
  let k = 2;
  let es5 = {
    o: o,
    k: k
  };
  let es6 = {
    o, k
  }
  console.log('es5 Object', es5); // {o: 1, k: 2}
  console.log('es6 Object', es6); // {o: 1, k: 2}

  let es5_method = {
    hello: function () {
      console.log('hello es5');
    }
  }
  let es6_method = {
    hello () {
      console.log('hello es6')
    }
  }
  console.log('es5 method', es5_method); // {hello: ƒ}
  console.log('es6 method', es6_method); // {hello: ƒ}
}

{
  // 属性表达式
  let a = 'b';
  let es5_obj = {
    a: 'c',
    b: 'c'
  };
  let es6_obj = {
    [a]: 'c' // 此处 a 可以为表达式或者变量
  }
  console.log('es obj', es5_obj); // {a: "c", b: "c"}
  console.log('es obj', es6_obj); // {b: "c"}
}

{
  // 新增API
  console.log('is 字符串', Object.is('abc', 'abc'), 'abc' === 'abc'); // true true
  console.log('is 数组', Object.is([], []), [] === []) // false false
  // 数组为应用类型，虽然都为空数组，但是其指向的地址不一样
  // Object.is() 用来比较两个值是否严格相等的方法，与 === 的行为基本一致

  console.log('拷贝', Object.assign({a: 'a'}, {b: 'b'})); // {a: "a", b: "b"}
  // Object.assign 用来合并多个JavaScript的对象。 
  // Object.assign() 为浅复制，只是修改引用地址，而不是把所有的值拷贝过去
  // Object.assign() 此方法拷贝的只有自身的属性，如果存在继承的属性，则不会进行拷贝。同时，也不会拷贝不可枚举的属性

  let test = {K: 123, o: 465}
  for (let [key, value] of Object.entries(test)) {
    console.log([key, value]) // ["K", 123] ["o", 465]
  }
  // Object.entries() 返回一个给定对象自身可枚举属性的键值对数组
}

{
  // 扩展运算符
  // let {a, b, ...c} = {a: 'test', b: 'kill', c: 'ddd', d: 'ccc'}
  // c = {
  //   c: 'ddd',
  //   d: 'ccc'
  // }
}
