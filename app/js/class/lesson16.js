// Decorator (修饰器)：修饰器是一个函数，用来修改类的行为
// 注意事项：
// 1. 修饰器是一个函数
// 2. 修改类的行为：类的定义之前如何定义，现在也如何定义。用修饰器修改类的行为，可以理解为扩展类的功能
// 3. 类的行为：表面修饰器只在类的范畴内有用，其他地方不能使用

{
  // 限制某个属性为只读
  let readonly = function (target, name, descriptor) {
    // target: 修改的类本身
    // name: 修改属性的名称
    // descriptor： 该属性的描述对象
    descriptor.writable = false;
    return descriptor
  };

  class Test {
    @readonly // //引入修饰器，修改time（）的行为,注意要与定义修饰器的函数名一致
    time() {
      return '2018-03-11'
    }
  }
  let test = new Test();
  // test.time = function () {
  //   console.log('reset time');
  // };
  // 当对 test.time 进行赋值时，会报错，
  // Uncaught TypeError: Cannot assign to read only property 'time' of object '#<t>'
  // 通过修饰器 @readonly ，在修饰器中设置 writable 为 false ，达到不允许修改的效果
  console.log(test.time()) // 2018-03-11
}

{
  // 修饰器可以在类的外面进行操作，但是需要在 class 前面，其他地方不可以
  let typename = function (target, name, descriptor) {
    target.myname = 'hello' // 此时，target为指向 Test 类的本身，不是类所对应的实例，myname 为 Test类的静态属性
  }
  @typename
  class Test {

  }
  
  console.log('类修饰符', Test.myname) // hello
}

// 第三方修饰器的 js 库：core-decorators
// 使用 import引入

{
  // 埋点，做日志统计
  let log = (type) => {
    return function(target, name, descriptor) {
      let src_method = descriptor.value;
      descriptor.value = (...arg) => {
        src_method.apply(target.arg);
        console.info(`log ${type}`); // //实现埋点，真实的业务中直接换成一个接口就可以了
      }
    }
  }

  class AD {
    @log('show')
    show () {
      console.info('ad is show');
    }
    @log('click')
    click () {
      console.info('ad is click');
    }
  }
  let ad = new AD();
  ad.show();
  ad.click();
}