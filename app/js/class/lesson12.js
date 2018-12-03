// 类和对象
// 基本语法 类的继承 静态方法 静态属性 getter setter

{
  // 基本定义和生成实例
  class Parent {
    constructor (name = "lrh") {
      this.name = name;
    }
  }
  let v_parent = new Parent('v'); // {name: "v"}
  console.log('构造函数和实例', v_parent);
}

{
  // 继承
  class Parent {
    constructor (name = "lrh") {
      this.name = name;
    }
  }
  
  class Child extends Parent {

  }
  console.log('继承', new Child()); // {name: "lrh"}
  
}

{
  // 继承传递参数
  class Parent {
    constructor (name = "lrh") {
      this.name = name;
    }
  }
  
  class Child extends Parent {
    constructor (name = 'child') {
      super(name); // 通过 super 进行传递，super 为父类构造函数 constructor
      this.type = 'child';
      // 在定义自己属性的时候，一定要放在 super 之后
      // 即：在继承关系中，构造函数如果用 super 进行传递参数过程中，super一定是放在函数的第一行，否则会报错
    }
  }
  console.log('继承传递参数', new Child('hello')); // {name: "child", type: "child"}
}

{
  // getter setter
  class Parent {
    constructor (name = 'lrh') {
      this.name = name;
    }
    get longName(){
      // 此处为属性
      return '21g' + this.name;
    }
    set longName(value){
      this.name = value;
    }
  }
  let v = new Parent();
  console.log('getter', v.longName); // 21glrh
  v.longName = 'hello'; // 赋值即为 set 操作
  console.log('setter', v.longName); // 21ghello
}

{
  // 静态方法
  class Parent {
    constructor (name = "lrh") {
      this.name = name;
    }
    // 静态方法的定义需要使用到 static 关键词
    static tell () {
      console.log('tell');
    }
  }
  Parent.tell(); // tell
  // 注意：静态方法需要通过类进行调用，而不是类的实例
}

{
  // 静态属性
  class Parent {
    constructor (name = "lrh") {
      this.name = name;
    }
    // 静态方法的定义需要使用到 static 关键词
    static tell () {
      console.log('tell');
    }
  }
  Parent.type = 'test';
  // 如果需要定义静态属性，则可在类定义完成之后，直接再类上进行定义。
  // 读取的时候，注意，一定是类，而不是类的实例
  console.log('静态属性', Parent.type);
}