// symbol：提供一个独一无二的值，不重复，不相等

{
  // 声明
  let a1 = Symbol();
  let a2 = Symbol();
  console.log('a1 === a2', a1 === a2); // false
  let a3 = Symbol.for('a3');
  let a4 = Symbol.for('a3');
  console.log('a3 === a4', a3 === a4); // true
}

{
  let a1 = Symbol.for('abc');
  let obj = {
    [a1]: '123',
    'abc': 345,
    'c': 456
  };
  console.log('obj', obj);
  // 此时实用 Symbol 可以避免对象中属性的重复
  // 如果对象中存在 Symbol 作为属性的时候，通过 for...in 和 let...of 都是取不到的
  for (let [key, value] of Object.entries(obj)) {
    console.log('let of', key ,value) // abc 345  c 456  无法去掉 Symbol
  }

  Object.getOwnPropertySymbols(obj).forEach(function (item) {
    console.log(obj[item]); // 123
  })
  // Object.getOwnPropertySymbols 返回对象的自有符号属性。对象的自有符号属性是指直接在此对象上定义、而非从对象的原型继承的属性。

  Reflect.ownKeys(obj).forEach(function (item) {
    console.log('ownkeys', item, obj[item]); // abc 345  c 456  Symbol(abc) 123
  })
  // Reflect.ownKeys() 返回一个包含所有自身属性（不包含继承属性）的数组。
}

