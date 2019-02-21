// 接口模块

import $ from 'jquery'

class Interface {
  // 获取遗落的接口
  getOmit (issue) {
    let self = this;
    // 箭头函数的 this 指向是在箭头函数定义的时候，而不是运行时候。所以此处需要将 this 缓存
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/get/omit',
        data: {
          issue: issue
        },
        dataType: 'json',
        success: function (res) {
          // 调用 Base类中 setOmit()方法 设置遗落数据
          self.setOmit(res.data);
          // self.setOmit(res.data) 通过对象的方式保存数据，进行数据的传递，避免了回调。同时，可以达到数据共享的目的
          // setOmit 为某一个类中的一个方法，在 app/js 文件中，lottery(lottery.js) 会多重继承 lottery文件夹中 base、calculate、interface、timer 的这四个类，
          // setOmit 为 base、calculate、interface、timer 四个类中某一个类的方法，所以需要引用 当前this 的这个对象，从而在接口的这个类中可以拿到 setOmit 的这个方法，从而保存当前的数据
          resolve.call(self, res);
          // call() 改变函数内部this的指向.
          // fun.call(thisArg, arg1, arg2, ...)
          // 1. thisArg  在fun函数运行时指定的this值。
          // 2. arg1, arg2, ...  指定的参数列表。
          // 示例：
          // var obj = { name: 'linxin' }
          // function func(firstName, lastName) {
          //   console.log(firstName + ' ' + this.name + ' ' + lastName);
          // }
          // func.call(obj, 'C', 'D'); // C linxin D
        },
        error: function (err) {
          reject.call(err);
        }
      })
    })
  }

  // 获取开奖号码的接口
  getOpenCode (issue) {
    let self = this;
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/get/opencode',
        data: {
          issue: issue
        },
        dataType: 'json',
        success: function (res) {
          self.setOpenCode(res.data); // 保存开奖号码
          resolve.call(self, res);
        },
        error: function () {
          reject.call(err);
        }
      })
    })
  }

  // 获取当前状态的接口
  getState (issue) {
    let self = this;
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/get/state',
        data: {
          issue: issue
        },
        dataType: 'json',
        success: function (res) {
          resolve.call(self, res);
        },
        error: function (err) {
          reject.call(err);
        }
      })
    })
  }
}

export default Interface;