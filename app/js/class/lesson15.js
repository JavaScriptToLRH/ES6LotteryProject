// Generator
// Generator 异步编程的一种解决方案

{
  // Generator 基本定义
  let tell = function* () {
    yield 'a';
    yield 'b';
    return 'c';
  };

  let k = tell();
  console.log(k.next()); // {value: "a", done: false}
  console.log(k.next()); // {value: "b", done: false}
  console.log(k.next()); // {value: "c", done: true}
  console.log(k.next()); // {value: undefined, done: true}
  // 通过 next() 这个 function，不断的执行函数内部的几个阶段
  // 执行 tell() 的时候，函数体内部会遇到第一个 yield 停下，执行第一个 yield 之前的语句
  // 当执行 next() 的时候，会执行第一个 yield; 执行第二个 next() 的时候，会执行下一个 yield， 依次类推。
}

{
  // 使用 Generator 也可以作为遍历器的一个返回值
  let obj = {};
  obj[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  }

  for (let value of obj) {
    console.log('value', value) // 1 2 3
  }
}

{
  // 状态机
  // 使用 A B C 三种状态来描述一个事物，这个事务只存在三种状态 A -> B -> C -> A
  let state = function* () {
    while(1) {
      yield 'A';
      yield 'B';
      yield 'C';
    }
  }
  let status = state();
  console.log(status.next()); // {value: "A", done: false}
  console.log(status.next()); // {value: "B", done: false}
  console.log(status.next()); // {value: "C", done: false}
  console.log(status.next()); // {value: "A", done: false}
  console.log(status.next()); // {value: "B", done: false}
  console.log(status.next()); // {value: "C", done: false}
  console.log(status.next()); // {value: "A", done: false}
  console.log(status.next()); // {value: "B", done: false}
  // 通过不断调用 next(), 此事物一直在 A B C 三种状态中进行循环
}

// {
//   {
//     // async await 是 Generator 的一种语法糖
//     let state = async function () {
//       while(1) {
//         await 'A';
//         await 'B';
//         await 'C';
//       }
//     }
//     let status = state();
//     console.log(status.next()); // {value: "A", done: false}
//     console.log(status.next()); // {value: "B", done: false}
//     console.log(status.next()); // {value: "C", done: false}
//     console.log(status.next()); // {value: "A", done: false}
//     console.log(status.next()); // {value: "B", done: false}
//     console.log(status.next()); // {value: "C", done: false}
//     console.log(status.next()); // {value: "A", done: false}
//     console.log(status.next()); // {value: "B", done: false}
//     // 通过不断调用 next(), 此事物一直在 A B C 三种状态中进行循环
//   }
// }

{
  // 抽奖次数限制实例

  // 抽检逻辑
  let draw = function (count) {
    // 抽奖具体逻辑
    // ......
    console.info(`剩余 ${count} 次`)
  }

  // 抽奖次数控制
  let residue = function* (count) {
    while (count > 0) {
      count--;
      yield draw(count);
    }
  }
  let star = residue(5); // 此处抽奖次数为服务器传输过来的值，此处忽略，直接填写次数
  let btn = document.createElement('button');
  btn.id = 'start';
  btn.textContent = '抽奖';
  document.body.appendChild(btn);
  document.getElementById('start').addEventListener('click', function () {
    // 当超过次数时，则不会再执行抽奖逻辑，不会触发 draw()
    star.next();
  }, false)
}

{
  // 长轮询
  // 服务端某个数据状态定期变化，前端需要定期取得相关状态，因为HTTP未无状态连接
  let ajax = function* () {
    yield new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve({code: 0})
      }, 200)
    })
  }
  let pull = function () {
    let genertor = ajax();
    let step = genertor.next(); // 返回 Promise 实例，此时会对服务器进行通信，此处通过延时来进行代替
    step.value.then(function (d) { // step.value 为 Promise 实例
      if (d.code != 0) {
        // 如果数据不是最新的，则再次进行请求
        setTimeout(function () {
          console.log('wait');
          pull()
        }, 1000);
      } else {
        // 如果是最新的，则直接进行打印
        console.log(d)
      }
    })
  }
  pull();
}