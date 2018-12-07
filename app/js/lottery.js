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
      Object.defineProperties(target, key, desc);
      // Object.defineProperties() 直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
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
  constructor (name='syy', cname='11选5', issue='**', state='**') {
    super();
    this.name = name;
    this.cname = cname;
    this.issue = issue;
    this.state = state;
    this.el = '';
    this.omit = new Map();
    this.open_code = new Set();  //开奖号码
    this.open_code_list = new Set(); //开奖记录
    this.play_list = new Map();
    this.number = new Set();  //奖号
    this.issue_el = '#curr_issue';
    this.countdown_el = '#countdown'; //倒计时的选择器
    this.state_el = '.state_el'; //状态的选择器
    this.cart_el = '.codelist'; //购物车的选择器
    this.omit_el = ''; //遗漏
    this.cur_play = 'r5'; //当前的默认玩法
    this.initPlayList();
    this.initNumber();
    this.updateState(); //更新状态
    this.initEvent();
  }

  /**
   * [updateState 状态更新]
   *
   * @memberof Lottery
   */
  updateState () {
    let self = this;
    this.getState().then(function (res) {
      self.issue = res.issue;
      self.end_time = res.end_time;
      self.state = res.state;
      $(self.issue_el).text(res.issue);
      self.countdown(res.end_time, function (time) {
        $(self.countdown_el).html(time)
      }, function () {
        setTimeout(function () {
          self.updateState();
          self.getOmit(self.issue).then(function (res) {

          });
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
    $('#plays').on('click', 'li', self.changePlayNav.bind(self));
    $('.boll-list').on('click', '.btn-boll', self.toggleCodeActive.bind(self));
    $('#confirm_sel_code').on('click', self.addCode.bind(self));
    $('.dxjo').on('click', 'li', self.assistHandle.bind(self));
    $('.qkmethod').on('click', '.btn-middle', self.getRandomCode.bind(self));
  }
}

export default Lottery;