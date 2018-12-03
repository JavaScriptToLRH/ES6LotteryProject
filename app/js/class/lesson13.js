// Promise 解决异步问题

{
  let ajax = function (callback) {
    console.log('执行');
    setTimeout(function () {
      callback && callback.call();
      // call() 调用一个对象的一个方法，以另一个对象替换当前对象。
    }, 1000);
  };
  ajax(function () {
    console.log('timeout1');
  })
}

{
  let ajax = function () {
    console.log('执行2');
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve()
      }, 1000);
    })
  };
  ajax().then(function () {
    console.log('promise', 'timeout2')
  })
}

{
  let ajax = function () {
    console.log('执行3');
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve()
      }, 1000);
    })
  };
  ajax().then(function () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve()
      }, 2000)
    })
  }).then(function () {
    console.log('timeout3')
  })
}

// Promise 中可以使用 catch 来捕获错误
{
  let ajax = function (num) {
    console.log('执行4');
    return new Promise(function (resolve, reject){
      if (num > 5) {
        resolve()
      } else {
        throw new Error('出错了')
      }
    })
  }
  ajax(6).then(function () {
    console.log('log', 6);
  }).catch(function (err) {
    console.log('catch', err);
  })
  ajax(3).then(function () {
    console.log('log', 3);
  }).catch(function (err) {
    console.log('catch', err);
  })
}

{
  // Promise.all()
  // Promise.all 接收一个 promise 对象的数组作为参数，
  // 当这个数组里的所有 promise 对象全部变为resolve或 有 reject 状态出现的时候，它才会去调用 .then 方法,它们是并发执行的。
  // 实例：所有图片加载完成再添加到页面
  function loadImg (src) {
    return new Promise((resolve, reject) => {
      let img = document.createElement('img');
      img.src = src;
      img.onload = function () {
        resolve(img);
      }
      img.onerror = function (err) {
        reject(err);
      }
    })
  }
  function showImgs (imgs) {
    imgs.forEach(function (img) {
      document.body.appendChild(img);
    })
  }
  Promise.all([
    loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
    loadImg('http://i4.buimg.com/567751/2b07ee25b08930ba.png'),
    loadImg('http://i2.muimg.com/567751/5eb8190d6b2a1c9c.png')
  ]).then(showImgs)
}

{
  // Promise.race 返回数组中最先resolved或者rejected的那个Promise对象的返回值或者error对象。
  // 有一个图片加载完成就加载到页面
  function loadImg (src) {
    return new Promise((resolve, reject) => {
      let img = document.createElement('img');
      img.src = src;
      img.onload = function () {
        resolve(img);
      }
      img.onerror = function (err) {
        reject(err);
      }
    })
  }
  function showImgs (img) {
    let p = document.createElement('p');
    p.appendChild(img);
    document.body.appendChild(p);
  }
  Promise.race([
    loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
    loadImg('http://i4.buimg.com/567751/2b07ee25b08930ba.png'),
    loadImg('http://i2.muimg.com/567751/5eb8190d6b2a1c9c.png')
  ]).then(showImgs)
}