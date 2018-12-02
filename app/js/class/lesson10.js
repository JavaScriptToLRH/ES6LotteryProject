// 数据结构：set的用法、weakSet的用法、Map的用法、WeakMap的用法

{
  let list = new Set();
  list.add(5);
  list.add(7);
  // 此时，往 list 添加属性需要使用 add方法
  // Set 对象允许存储任何类型的唯一值，无论是原始值或者是对象引用。
  console.log('size', list.size); // 2
}

{
  let arr = [1, 2, 3, 4, 5];
  let list = new Set(arr);
  console.log('size', list.size); // 5
}

{
  let list = new Set();
  list.add(1);
  list.add(2);
  list.add(1);
  // add() 在Set对象尾部添加一个元素。返回该Set对象。
  console.log('list', list); // Set(2) {1, 2}
  // 重复添加相同的元素不会报错，只是不会生效

  // 使用场景：去重，保证每个元素都是独一无二的，不重复的
  let arr1 = [1, 2, 3, 1, 2];
  let arr2 = [1, 2, 3, 1, '2'];
  let list1 = new Set(arr1);
  let list2 = new Set(arr2);
  console.log('list1', list1); // Set(3) {1, 2, 3}
  // Set 在转换元素时，不会做数据类型的转换
  console.log('list2', list2); // Set(3) {1, 2, 3, "2"}
}

{
  let arr = ['add', 'delete', 'clear', 'has'];
  let list = new Set(arr);
  console.log('has', list.has('add')); // true
  // has() 返回一个布尔值，表示该值在Set中存在与否
  console.log('delete', list.delete('add'), list); // true Set(3) {"delete", "clear", "has"}
  // delete() 移除Set的中与这个值相等的元素，返回 has() 在这个操作前会返回的值（即如果该元素存在，返回true，否则返回false）。
  list.clear();
  // clear() 移除Set对象内的所有元素。
  console.log('list clear', list); // Set(0) {}
}

{
  // Set的遍历
  let arr = ['add', 'delete', 'clear', 'has'];
  let list = new Set(arr);
  for (let key of list.keys()) {
    console.log('keys', key); // add delete clear has
  }
  for (let value of list.values()) {
    console.log('value', value); // add delete clear has
  }
  for (let value of list) {
    console.log('value', value); // add delete clear has
  } 
  // key 和 value 都是相同的，都是元素的名称
  // 不使用 list.values() ,默认遍历 value
  for (let [key, value] of list.entries()) {
    console.log('entries', key, value); // add add delete delete clear clear has has
  }

  list.forEach(function (item) {
    console.log(item); // add delete clear has
    
  })
}

{
  let weakList = new WeakSet();
  // WeakSet 和 Set 支持的数据类型不一致，WeakSet 的数据类型只能是对象
  // WeakSet 对于对象都是弱应用，不会检测对象是否在其他地方使用，就意味着和垃圾回收机制不挂钩
  // 在 WeakSet 中添加一个对象，这个对象是不是整个值进行的拷贝，而是地址的引用，也不会检测地址是否被垃圾回收机制回收了

  let arg = {};
  weakList.add(arg);
  // weakList.add(2); // 会进行报错
  console.log('weakList', weakList)
  // WeakSet 没有 clear方法、没有 size属性、不能进行遍历
}

{
  // Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。
  let map = new Map();
  let arr = ['123'];
  map.set(arr, 456)
  // set() 设置Map对象中键的值。返回该Map对象。
  console.log('map', map, map.get(arr)); // Map(1) {Array(1) => 456} 456
  // get() 返回键对应的值，如果不存在，则返回undefined。
}

{
  let map = new Map([['a', 123], ['b', 456]]) // 注意：一定要为键值对的形式，否则会进行报错
  console.log('map args', map); // Map(2) {"a" => 123, "b" => 456}
  console.log('size', map.size); // 2
  console.log('delete', map.delete('a'), map); // true Map(1) {"b" => 456}
  console.log('clear', map.clear(), map); // undefined Map(0) {}
  
  // Map 的遍历 和 Set 的遍历一致
}

{
  let weakmap = new WeakMap();
  // WeakMap 与 WeakSet 一致
  let o = {};
  weakmap.set(o, 123);
  console.log(weakmap.get(o)); // 123
}