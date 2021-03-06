// 基础模块：与彩票相关模块

import $ from 'jquery'

class Base {
  /**
   * [initPlayList 初始化奖金和玩法及说明]
   *
   * @memberof Base
   */
  initPlayList () {
    // this.play_list 已在 Lottery类 中创建。-->  this.play_list = new Map(); // 存储初始化奖金和玩法及说明
    this.play_list.set('r2', { // 'r2'为玩法简写
      bonus: 6, // 奖金
      tip: '从01~11中任选2个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">6</em>元', // 玩法说明
      name: '任二' // 玩法名称
    })
    .set('r3', {
      bonus: 19,
      tip: '从01~11中任选3个或多个号码，所选号码与开奖号码任意三个号码相同，即中奖<em class="red">19</em>元',
      name: '任三'
    })
    .set('r4', {
      bonus: 78,
      tip: '从01~11中任选4个或多个号码，所选号码与开奖号码任意四个号码相同，即中奖<em class="red">78</em>元',
      name: '任四'
    })
    .set('r5', {
      bonus: 540,
      tip: '从01~11中任选5个或多个号码，所选号码与开奖号码号码相同，即中奖<em class="red">540</em>元',
      name: '任五'
    })
    .set('r6', {
      bonus: 90,
      tip: '从01~11中任选6个或多个号码，所选号码与开奖号码五个号码相同，即中奖<em class="red">90</em>元',
      name: '任六'
    })
    .set('r7', {
      bonus: 26,
      tip: '从01~11中任选7个或多个号码，选码与奖号五个号码相同，即中奖<em class="red">26</em>元',
      name: '任七'
    })
    .set('r8', {
      bonus: 9,
      tip: '从01~11中任选8个或多个号码，选码与奖号五个号码相同，即中奖<em class="red">9</em>元',
      name: '任八'
    })
  }

  /**
   * [initNumber 初始化奖号]
   *
   * @memberof Base
   */
  initNumber () {
    for (let i = 1; i < 12; i++) {
      this.number.add(('' + i).padStart(2, '0'))
    } 
    // this.number 已在 Lottery类 中创建。  -->  this.number = new Set();  // 奖号
    // 此处使用 set 数据结构是因为此处号码不能重复，而 set 中要求元素是唯一的，与 set 吻合
    // this.number.add() 在Set对象(this.number)尾部添加一个元素。返回该Set对象。
    // padStart() 方法用另一个字符串填充当前字符串,以便产生的字符串达到给定的长度
  }

  /**
   * [setOmit 设置遗落数据]
   *
   * @memberof Base
   */
  setOmit (omit) {
    let self = this;
    // self.omit 已在 Lottery类 中创建。  -->  this.omit = new Map();
    self.omit.clear(); // 将遗落数据的值进行清空，此处的 omit 为 map 对象
    // clear(): 移除Map对象中的所有元素
    // 将遗落数据保存在数据结构中
    for (let [index, item] of omit.entries()) {
      // entries() 返回一个新的 Iterator 对象，它按顺序插入Map对象中每个元素的 [key, value] 数组。
      self.omit.set(index, item)
      // set() 方法为 Map 对象添加或更新一个指定了键（key）和值（value）的（新）键值对
    }
    // 将遗落数据保存在页面中
    // self.omit_el 为页面显示遗漏的DOM
    $(self.omit_el).each(function (index, item) {
      $(item).text(self.omit.get(index));
      // get() 方法返回某个 Map 对象中的一个指定元素。
    });
  }

  /**
   * [setOpenCode 设置开奖]
   *
   * @memberof Base
   */
  setOpenCode (code) {
    let self = this;
    self.open_code.clear();
    for (let item of code.values()) {
      selft.open_code.add(item); // 此处使用 set 数据结构，因为开奖号码不重复
    }
    self.updateOpenCode && self.updateOpenCode.call(self, code); // 更新开奖号码
  }

  /**
   * [toggleCodeActive 号码选中取消]
   *
   * @memberof Base
   */
  toggleCodeActive (e) {
    let self = this;
    let $cur = $(e.currentTarget);
    // currentTarget: 可位于捕获、冒泡和目标阶段；始终指向绑定事件的元素
    // 如：div>ul>li结构，事件委托在div上，target可能为三者之一， 而currentTarget始终为div
    $cur.toggleClass('btn-boll-active'); // toggleClass() 如果存在(不存在)，就删除(添加)一个样式
    self.getCount(); // 重新计算
  }

  /**
   *  [changePlayNav 切换玩法]
   *
   * @memberof Base
   */
  changePlayNav (e) {
    // e 为当前点击玩法的DOM的 event
    let self = this;
    let $cur = $(e.currentTarget);
    // currentTarget: 可位于捕获、冒泡和目标阶段，始终指向绑定事件的元素
    $cur.addClass('active').siblings().removeClass('active'); // 给当前点击的DOM，添加'active'类，移除其他同级DOM的'active'类
    self.cur_play = $cur.attr('desc').toLocaleLowerCase(); // 获取当前DOM中自定义data中的玩法，并更新
    // toLocaleLowerCase() 用于把字符串转换为小写。
    $('#zx_sm span').html(self.play_list.get(self.cur_play).tip); 
    // 获取玩法说明DOM，并更新玩法说明
    // self.play_list 为 Lottery类 中初始化的所有玩法。self.play_list 为 set数据结构，所以使用 get 获取对应玩法
    $('.boll-list .btn-boll').removeClass('btn-boll-active'); // 切换玩法的时候，将已选择的号码样式进行移除
    self.getCount(); // 重新计算玩法所获奖金
  }

  /**
   * [assistHandle 操作区（全、大、小、奇、偶）功能]
   *
   * @memberof Base
   */
  assistHandle (e) {
    e.preventDefault();
    let self = this;
    let $cur = $(e.currentTarget);
    let index = $cur.index(); // 获取当前选择的操作，在操作区域的index值，然后通过index判断进行的是什么操作
    $('.boll-list .btn-boll').removeClass('btn-boll-active'); // 清空所选号码，选中号码都选在class样式 - 'btn-boll-active'
    if (index === 0) {
      // 全部选择
      $('.boll-list .btn-boll').addClass('btn-boll-active');
    }
    if (index === 1) {
      // 选择大的号码
      $('.boll-list .btn-boll').each(function (i, t) {
        if (t.textContent - 5 > 0) {
          $(t).addClass('btn-boll-active')
        }
      })
    }
    if (index === 2) {
      // 选择小的号码
      $('.boll-list .btn-boll').each(function (i, t) {
        if (t.textContent - 6 < 0) {
          $(t).addClass('btn-boll-active')
        }
      })
    }
    if (index === 3) {
      // 选择奇数号码
      $('.boll-list .btn-boll').each(function (i, t) {
        if (t.textContent % 2 == 1) {
          $(t).addClass('btn-boll-active')
        }
      })
    }
    if (index === 4) {
      // 选择偶数号码
      $('.boll-list .btn-boll').each(function (i, t) {
        if (t.textContent % 2 == 0) {
          $(t).addClass('btn-boll-active')
        }
      })
    }
    self.getCount(); // 计算所选玩法将获得的奖金
  }

  /**
   * [getName 获取彩票名称]
   *
   * @memberof Base
   */
  getName () {
    return this.name
  }

  /**
   * [addCode 添加号码]
   *
   * @memberof Base
   */
  addCode () {
    let self = this;
    let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g);
    // 获取选择的号码。已选中的号码都有class样式 —— 'btn-boll-active'
    // 所可通过 $('.boll-list .btn-boll-active').text() 获取选中号码的文本。获取文本示例：010203040506
    // match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。返回存放匹配结果的数组
    let active = $active ? $active.length : 0;
    let count = self.computeCount(active, self.cur_play); // 计算当前注数
    // self.cur_play 为当前玩法，如：r5
    if (count) {
      self.addCodeItem($active.join(' '), self.cur_play, self.play_list.get(self.cur_play).name, count)
      // addCodeItem 将已选择号码，添加到页面显示已选号的列表DOM中
    }
  }


  /**
   * [addCodeItem 添加已选择号码]
   *
   * @param {*} code [当前选中号码]
   * @param {*} type [玩法类型]
   * @param {*} typeName [玩法名字]
   * @param {*} count [注数]
   * @memberof Base
   */
  addCodeItem (code, type, typeName, count) {
    let self = this;
    const tpl = `
      <li code="${type}|${code}" bonus="${count*2}" count="${count}">
        <div class="code">
          <b>${typeName}${count > 1 ? '复式' : '单式'}</b>
          <b class="em">${code}</b>
          [${count}注, <em class="code-list-money">${count*2}</em>元]
        </div>
      </li>
    `;
    // self.cart_el 为页面显示已选号的列表DOM
    $(self.cart_el).append(tpl);
    self.getTotal(); // 计算所有金额和总注数
  }

  // 计算所选玩法将获得的奖金
  getCount () {
    let self = this;
    let active = $('.boll-list .btn-boll-active').length; // 通过已选号码的样式，获取所选的号码的个数（即注数）
    // active 为所选号码个数（即注数），self.cur_play 为当前选中的玩法
    let count = self.computeCount(active, self.cur_play); // 调用 Calculate类 中 computeCount()方法 计算当前注数
    let range = self.computeBonus(active, self.cur_play); // 调用 Calculate类 中 computeCount()方法 计算奖金范围
    let money = count * 2; // 所花金钱
    let win1 = range[0] - money; // 最小盈利
    let win2 = range[1] - money; // 最大盈利
    let tpl;
    let c1 = (win1 < 0 && win2 < 0) ? Math.abs(win1) : win1; // abs() 方法可返回数的绝对值。
    let c2 = (win1 < 0 && win2 < 0) ? Math.abs(win2) : win2;
    if (count === 0) {
      tpl = `您选了 <b class="red">${count}</b> 注，共 <b class="red">${count*2}</b> 元`
    } else if (range[0] === range[1]){
      tpl = `您选了 <b>${count}</b> 注，共 <b>${count*2}</b> 元
      <em>若中奖，奖金：<strong class="red">${range[0]}</strong> 元
      您将${win1 >= 0 ? '盈利' : '亏损'} <strong class="${win1 >= 0 ? 'red' : 'green'}">${Math.abs(win1)}</strong> 元
      </em>
      `
    } else {
      tpl = `您选了 <b>${count}</b> 注，共 <b>${count*2}</b> 元
      <em>若中奖，奖金：
      <strong class="red">${range[0]}</strong> 至 <strong class="red">${range[1]}</strong> 元
      您将${win1 < 0 && win2 < 0 ? '亏损' : '盈利'} <strong class="${win1 >= 0 ? 'red' : 'green'}">${c1}</strong> 至 <strong class="${win2 >= 0 ? 'red' : 'green'}">${c2}</strong>元
      </em>
      `
    }
    $('.sel_info').html(tpl); // 选择盈利提示DOM，并更新
  }


  /**
   * [getTotal 计算所有金额和总注数]
   *
   * @memberof Base
   */
  getTotal () {
    let count = 0;
    // 选择 页面显示已选号的列表DOM 中 每组选号的注数 相加，就算总注数
    $('.codelist li').each(function (index, item) {
      count += $(item).attr('count') * 1;
    })
    // 相关DOM
    // 您选了 <b class="em" id="count">0</b> 注， 
    // 倍投 <input class="text" id="mul" type="text" value="1"> 倍，
    // 共 <b class="em" id="money" style="display: inline-block;">0</b> 元
    $('#count').text(count); // 修改页面显示注数
    $('#money').text(count * 2);
  }

  /**
   * [getRandom 生成随机数]
   *
   * @memberof Base
   */
  getRandom (num) {
    let arr = [], index;
    let number = Array.from(this.number); 
    // set集合转化Array数组  -->  var set = new Set([1, 2, 3, 3, 4]); Array.from(set)  //输出[1,2,3,4]
    // 这个可以使用过滤数组中的重复的元素,可以先把数组转化为set集合,然后在把这个集合通过Array.from这个方法把集合在转化为数组
    // this.number Set数据结构， 初始化的奖号，即：Set(11) {0: "01",1: "02",2: "03", 3: "04", 4:"05", 5:"06", 6:"07", 7:"08", 8:"09", 9:"10", 10:"11"}
    // Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。
    while(num--) {
      index = Number.parseInt(Math.random() * number.length); // 生成 0-10 中随机的正整数
      arr.push(number[index]); // 添加对应随机的index下的值
      number.splice(index, 1); // 向arr数组中添加值之后，删除对应index的值，防止重复
    }
    return arr.join('')
  }

  /**
   * [getRandomCode 添加随机号码]
   *
   * @memberof Base
   */
  getRandomCode (e) {
    e.preventDefault(); // 阻止元素发生默认的行为
    let num = e.currentTarget.getAttribute('count'); 
    // 通过获取元素自定义属性count，得知为机选 X 柱（X 可为：1、5、10、0。0 为清空）
    let play = this.cur_play.match(/\d+/g)[0]; // 获取当前玩法基数
    // this.cur_play 为当前玩法，如：r5
    // /\d+/g 为匹配数字
    let self = this;
    if (num === '0') {
      // 如果在机选操作区域，选择清空列表，则清空页面显示已选号的列表DOM的内容
      // self.cart_el 为 页面显示已选号的列表DOM
      $(self.cart_el).html('');
    } else {
      for (let i = 0; i < num; i++) {
        // 调用 addCodeItem方法 添加号码。addCodeItem 传递参数如下：
        // > code [当前选中号码]
        // > type [玩法类型]
        // > typeName [玩法名字]
        // > count [注数]
        // 调用 getRandom方法 生成随机数。参数为 num [生成多少个随机数]
        self.addCodeItem(self.getRandom(play), self.cur_play, self.play_list.get(self.cur_play).name, 1);
      }
    }
  }
}

export default Base;