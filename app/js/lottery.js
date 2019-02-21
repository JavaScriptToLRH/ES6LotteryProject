// 基础模块，封装成完整模块
import 'babel-polyfill';
import Base from './lottery/base.js';
import Calculate from './lottery/calculate.js';
import Interface from './lottery/interface.js';
import Timer from './lottery/timer.js';
import $ from 'jquery'

// 深度拷贝 
const copyProperties = function (target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      // Object.getOwnPropertyDescriptor() 返回指定对象上一个自有属性对应的属性描述符
      Object.defineProperty(target, key, desc);
      // Object.defineProperty() 方法会直接在一个对象上定义一个新属性,或者修改一个对象的现有属性, 并返回这个对象。
    }
  }
}

// 实现类的多重继承
const mix = function (...mixins) {
  class Mix {} // 声明一个空类
  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }
  return Mix;
}

class Lottery extends mix(Base, Calculate, Interface, Timer) {
  // constructor 是一种用于创建和初始化class创建的对象的特殊方法
  constructor (name='syy', cname='11选5', issue='**', state='**') {
    super(); // super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
    this.name = name;
    this.cname = cname;
    this.issue = issue;
    this.state = state;
    this.el = '';
    // Map是一组键值对的结构，具有极快的查找速度
    // Set是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key
    // Set创建：要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set
    this.play_list = new Map(); // 存储初始化奖金和玩法及说明
    this.number = new Set();  // 奖号，奖号不能重复，所以使用set数据类型
    this.omit = new Map(); // 遗落数据
    this.open_code = new Set();  //开奖号码
    this.open_code_list = new Set(); //开奖记录
    this.issue_el = '#curr_issue'; // 页面显示期数的DOM
    this.countdown_el = '#countdown'; // 页面显示倒计时的DOM
    this.state_el = '.state_el'; // 页面显示销售状态DOM
    this.cart_el = '.codelist'; // 页面显示已选号的列表DOM
    this.omit_el = ''; // 页面显示遗漏的DOM
    this.cur_play = 'r5'; //当前的默认玩法
    this.initPlayList(); // 调用 Base类 中 initPlayList()方法，初始化奖金和玩法及说明
    this.initNumber(); // 调用 Base类 中 initNumber()方法，初始化奖号 -->  01 02 03 04 05 06 07 08 09 10 11
    this.updateState(); // 调用接口更新开奖状态信息
    this.initEvent();
  }

  /**
   * [updateState 开奖状态信息更新]
   *
   * @memberof Lottery
   */
  updateState () {
    let self = this;
    // 调用 Interface类 中 getState()方法 获取最新开奖状态信息
    this.getState().then(function (res) {
      // res.issue：当前期数
      // res.end_time：截止时间
      // res.state：开奖状态（开奖中，正在销售）
      self.issue = res.issue; // 当前期数
      self.end_time = res.end_time; // 截止时间
      self.state = res.state; // 开奖状态（开奖中，正在销售）
      $(self.issue_el).text(res.issue); // 获取页面显示期数的DOM，并修改为最新修改期数
      // countdown 为 Timer类 中的倒计时模块
      // countdown (end, update, handle)
      // > end: end 截止时间
      // > update: 时间更新回调，此处为：获取页面显示倒计时的DOM，并更新显示倒计时
      // > handle: 倒计时结束之后回调，此处为：更新开奖状态信息；通过调用接口，显示页面遗落数据以及显示开奖号码
      self.countdown(res.end_time, function (time) {
        $(self.countdown_el).html(time)
      }, function () {
        setTimeout(function () {
          // 更新开奖状态信息
          self.updateState();
          // 调用 Interface类 中 getOmit()方法 获取遗落信息
          self.getOmit(self.issue).then(function (res) {

          });
          // 调用 Interface类 中 getOpenCode()方法 获取开奖号码信息
          self.getOpenCode(self.issue).then(function (res) {

          })
        }, 500);
      })
    })
  }

  /**
   * [initEvent 初始化时间]
   *
   * @memberof Lottery
   */
  initEvent () {
    let self = this;
    // bind()方法创建一个新的函数，在调用时设置this关键字为提供的值
    // 调用 Base类 中 changePlayNav方法，切换玩法，并重新计算玩法所获奖金
    $('#plays').on('click', 'li', self.changePlayNav.bind(self));
    // 调用 Base类 中 toggleCodeActive方法，选择号码，并重新计算玩法所获奖金
    $('.boll-list').on('click', '.btn-boll', self.toggleCodeActive.bind(self));
    // 点击确认选择号码DOM，调用 Base类 中 addCode方法，向 页面显示已选号的列表DOM 中添加已选择的号码，并计算总注数和总金额
    $('#confirm_sel_code').on('click', self.addCode.bind(self));
    // 通过快捷选号，调用 Base类 中 assistHandle方法，实现快捷选号，计算所选玩法将获得的奖金
    $('.dxjo').on('click', 'li', self.assistHandle.bind(self));
    // 通过选择机选列表中具体操作，调用 Base类 中 getRandomCode方法，实现机选操作。
    $('.qkmethod').on('click', '.btn-middle', self.getRandomCode.bind(self));
  }
}

export default Lottery;