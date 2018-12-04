// Iterator 接口：在整个ES操作某些数据结构，比如数组，对象，map，set。
// 对于数据结构怎么进行读取，因数据结构本身不同，采用相同办法的接口使得不同的数据结构得到统一的读取方式
// 这就是 Iterator 接口所需要实现的功能

{
  let arr = ['hello', 'world'];
  let map = arr[Symbol.iterator]();
  console.log(map.next()); // {value: "hello", done: false}
  console.log(map.next()); // {value: "world", done: false}
  console.log(map.next()); // {value: undefined, done: true}
  // done 标识循环是否还有下一步状态，如果为 true，标识无下一步
}

{
  // Object 并没有内置 iterator 接口
  // Object 实现 iterator 接口
  // 要求：先遍历start，后遍历end
  let obj = {
    start: [1, 3, 2],
    end: [7, 9, 8],
    [Symbol.iterator] () {
      let self = this;
      let index = 0;
      let arr = self.start.concat(self.end);
      let len = arr.length;
      return {
        next () {
          if (index < len) {
            return {
              value: arr[index++],
              done: false
            }
          } else {
            return {
              value: arr[index++],
              done: true
            }
          }
        } 
      }
    }
  }
  for (let key of obj) {
    console.log(key); // 1 3 2 7 9 8
  }
  // for of 背后使用的就是 Iterator 接口，如果没有 Iterator 接口，就需要手动部署接口才能使用 for of
}

{
  let arr = ['hello', 'world'];
  for (let value of arr) {
    console.log('value', value) // hello world
  }
}