// 解构赋值：左边一种解构，右边一种解构，进行一一对应赋值
// 解构赋值分类：数组解构赋值、对象解构赋值、字符串解构赋值、布尔值解构赋值、函数参数解构赋值、数值解构赋值

{
  let a, b, rest;
  [a, b] = [1, 2]; // 数组解构赋值
  console.log(a, b); // 1 2
}

{
  let a, b, rest;
  [a, b, ...rest] = [1, 2, 3, 4, 5, 6];
  console.log(a, b, rest); // 1 2 [3, 4, 5, 6]
}

{
  let a, b;
  ({a, b} = {a: 1, b: 2}); // 对象解构赋值
  console.log(a, b); // 1 2
}

// 默认值
{
  let a, b, c, d, e , f, rest;
  [a, b, c = 3] = [1, 2]; // 数组解构赋值
  console.log(a, b, c); // 1 2 3
  [d, e, f] = [1, 2]; // 数组解构赋值
  console.log(d, e, f); // 1 2 undefined
}
// 如果解构赋值没有在解构上成功配对，没有配对的变量为 undefined，只进行了声明，并没有赋值
// 设置默认值，可以解决没有配对成功的变量，进行默认赋值 [a, b, c = 3] = [1, 2]

// 使用场景一：变量之间的交换
{
  let a = 1;
  let b = 2;
  [a, b] = [b, a];
  console.log(a, b); // 2 1
}
// 使用场景二：获取函数返回值
{
  function f() {
    return [1, 2]
  }
  let a, b;
  [a, b] = f();
  console.log(a, b) // 1 2
}
// 使用场景三：选择性接受函数的返回值
{
  function f() {
    return [1, 2, 3, 4, 5]
  }
  let a, b, c;
  [a,,,b] = f();
  console.log(a, b); // 1 4
  // [a,,,b]，其中第二个逗号对应 2 ，第三个逗号对应 3
} 
// 使用场景四：不确定函数返回值个数
{
  function f() {
    return [1, 2, 3, 4, 5]
  }
  let a, b, c;
  [a, ...b] = f();
  console.log(a, b); // 1 [2, 3, 4, 5]
  // 此例中，将第一个变量取出，赋值给 a，其余返回值赋值给 b
  // [a, , ...b] = f();
  // console.log(a, b); // 1 [3, 4, 5]
} 


{
  let o = {p: 42, q: true};
  let {p, q} = o;
  console.log(p, q) // 42 true
}
// 默认值
{
  let {a = 1, b = 5} = {a: 3};
  console.log(a, b) // 3 5
}

// 使用场景：取出特定值（数组解构赋值，对象解构赋值 结合运用）
{
  let metaData = {
    title: 'abc',
    test: [{
      title: 'test',
      desc: 'description'
    }]
  }
  let {title: esTitle, test: [{title: cnTitle}]} = metaData;
  console.log(esTitle, cnTitle); // abc test
}