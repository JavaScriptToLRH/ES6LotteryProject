// 数组扩展
// Array.from Array.of copyWithin find/findIndex fill entries/keys/values inludes

{
  let arr = Array.of(3, 4, 7, 9, 11);
  console.log('of arr=', arr); // [3, 4, 7, 9, 11]
  let empty = Array.of();
  console.log('of empty=', empty); // []
  // Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
}

{
  let p = document.querySelectorAll('p');
  let pArr = Array.from(p);
  pArr.forEach(function (item) {
    console.log(item.textContent); 
  });

  console.log(Array.from([1, 3, 5], function (item) {
    return item * 2
  })) // [2, 6, 10]
  // Array.from() 将一个类数组对象或者可遍历对象转换成一个真正的数组。
  // 将一个类数组对象转换为一个真正的数组，必须具备以下条件：
  // 1.类数组对象，最基本的要求就是具有length属性的对象。如果没有length属性，那么转换后的数组是一个空数组
  // 2.类数组对象的属性名必须为数值型或字符串型的数字
}

{
  console.log('fill-7', [1, 'a', undefined].fill(7)); // [7, 7, 7]
  console.log('fill, pos', ['a', 'b', 'c'].fill(7, 1, 3)); // ["a", 7, 7]
  // fill() 用于将一个固定值替换数组的元素
  // array.fill(value, start, end)
  // value	必需。填充的值。
  // start	可选。开始填充位置。
  // end	可选。停止填充位置 (默认为 array.length)
}

{
  for (let index of ['1', 'c', 'ks'].keys()) {
    console.log('keys', index) // 0 1 2
  }
  for (let value of ['1', 'c', 'ks'].values()) {
    console.log('values', value) // l c ks
  }
  for (let [index, value] of ['1', 'c', 'ks'].entries()) {
    console.log('index values', index, value) // 0 1    1 c    2 ks
  }
}

{
  console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4)); // [4, 2, 3, 4, 5]
  // copyWithin() 用于从数组的指定位置拷贝元素到数组的另一个指定位置中。
  // array.copyWithin(target, start, end)
  // target	必需。复制到指定目标索引位置。
  // start	可选。元素复制的起始位置。
  // end	可选。停止复制的索引位置 (默认为 array.length)。如果为负值，表示倒数。
}

{
  console.log([1, 2, 3, 4, 5, 6].find(function (item) {
    return item > 3
  })); // 4
  // find() 返回通过测试（函数内判断）的数组的第一个元素的值
  // find() 方法为数组中的每个元素都调用一次函数执行：
  // 1.当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
  // 2.如果没有符合条件的元素返回 undefined
  // 注意: find() 对于空数组，函数是不会执行的。
  // 注意: find() 并没有改变数组的原始值。
  console.log([1, 2, 3, 4, 5, 6].findIndex(function (item) {
    return item > 3
  })); // 3
  // findIndex() 返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
  // findIndex() 方法为数组中的每个元素都调用一次函数执行：
  // 1.当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
  // 2.如果没有符合条件的元素返回 -1
  // 注意: findIndex() 对于空数组，函数是不会执行的。
  // 注意: findIndex() 并没有改变数组的原始值。
}

{
  console.log('number', [1, 2, NaN].includes(1)); // true
  console.log('number', [1, 2, NaN].includes(NaN)); // true
  // includes() 用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。
}