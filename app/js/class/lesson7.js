// 函数扩展
// 参数默认值 rest参数 扩展运算符 箭头函数 this绑定 尾调用

{
  function test (x, y = 'World') {
    console.log('默认值', x, y);
  }
  test('Hello'); // Hello World
  // 此时调用函数，只传输一个参数，x 为 Hello，y 使用默认值 World
  // 注意：设置函数test y参数的默认值（即： y = 'World'）之后，再添加参数不能没有默认值
  test('Hello', 'Kill'); // Hello Kill
}

{
  let x = 'test';
  function test2(x, y = x) {
    console.log('作用域', x, y);
  }
  test2('kill'); // kill kill
  test2(); // undefined undefined

  function test3(c, y = x) {
    console.log('作用域', c, y);
  }
  test3('kill'); // kill test
}

{
  function test4(...arg) {
    for (let v of arg) {
      console.log('reset', v);
    }
  }
  test4(1, 2, 3, 4, 'a'); // 1 2 3 4 a
  // 注意：reset参数（即：...arg）之后，不能再有参数，否则会报错
  // 如果不知道函数将传入多少个参数，那么可以使用 reset参数，则 reset参数 会将参数转换为一个数组
}

{
  // 扩展运算符
  console.log(...[1, 2, 4]); // 1 2 4
  // 扩展运算符，与 reset参数相反，将数组进行解析为单个的参数
  console.log('a', ...[1, 2, 4]); // a 1 2 4
}

{
  // 箭头函数。注意this的指向
  let arrow = v => v + 2;
  let arrow2 = () => 5;
  console.log('arrow', arrow(3)); // 5
  console.log('arrow2', arrow2()); // 5
}

{
  // 尾调用：看函数的最后一句话是否为一个函数
  function tail(x) {
    console.log('tail', x);
  }
  function fx(x) {
    return tail(x)
  }
  fx(123) // 123
}