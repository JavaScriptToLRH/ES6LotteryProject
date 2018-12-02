// Proxy(代理) 和 Reflect(反射)

{
  // Proxy
  let obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
  };

  let monitor = new Proxy(obj, {
    // 拦截对象属性的读取
    get (target, key) {
      // target 其实就是为 obj属性
      return target[key].replace('2017', '2018');
    },
    // 拦截对象设置属性
    set (target, key, value) {
      if (key === 'name') {
        return target[key] = value;
      } else {
        return target[key];
      }
    },
    // 拦截 key in object 操作
    has (target, key) {
      if (key === 'name') {
        return target[key];
      } else {
        return false;
      }
    },
    // 拦截 delete
    deleteProperty (target, key) {
      if(key.indexOf('_') > -1) {
        delete target[key];
        return true;
      } else {
        return target[key];
      }
    },
    // 拦截 Object.keys, Object.getOwnPropetrySymbols, Object.getOwnPropertyNames
    ownKeys (target) {
      return Object.keys(target).filter(item => item != 'time')
    }
  });
  console.log('get', monitor.time) // 2018-03-11

  monitor.time = '2018';
  monitor.name = 'lrh';
  console.log('set', monitor.time) // 2018-03-11
  console.log('set', monitor.name) // lrh
  console.log('obj', obj) // {time: "2017-03-11", name: "lrh", _r: 123}
  console.log('has', 'name' in Object, 'time' in Object); // true false
  // delete monitor.time;
  // console.log('delete', monitor); // Proxy {time: "2017-03-11", name: "lrh", _r: 123}
  // delete monitor._r;
  // console.log('delete', monitor); // Proxy {time: "2017-03-11", name: "lrh"}
  console.log('ownKeys', Object.keys(monitor)); // ["name", "_r"]
}

{
  // Reflect 和 Proxy 方法一致，名称和用法一样
  let obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
  };
  console.log('Reflect get', Reflect.get(obj, 'time')); // 2017-03-11
  Reflect.set(obj, 'name', 'lrh');
  console.log('Reflect set', obj); // {time: "2017-03-11", name: "lrh", _r: 123}
  console.log('Reflect has', Reflect.has(obj, 'name')); // true
}

{
  // 校验模块
  function validator(target, validator) {
    return new Proxy(target, {
      _validator: validator,
      set (target, key, value, proxy) {
        if (target.hasOwnProperty(key)) {
          let va = this._validator[key];
          if (!!va(value)) {
            return Reflect.set(target, key, value, proxy)
          } else {
            throw Error(`不能设置${key}到${value}`)
          }
        } else {
          throw Error(`${key} 不存在`)
        }
      }
    })
  }

  const personValidators = {
    name (val) {
      return typeof val === 'string'
    },
    arg (val) {
      return typeof val === 'number' && val > 18
    }
  }
  
  class Person {
    constructor (name, age) {
      this.name = name;
      this.age = age;
      return validator(this, personValidators)
    }
  }

  const person = new Person('xiaoming', 30);
  console.info(person); // Proxy {name: "xiaoming", age: 30}
  // person.name = 48; // Uncaught Error: 不能设置name到48
  person.name = 'l r h';
  console.info(person); // Proxy {name: "l r h", age: 30}
}
