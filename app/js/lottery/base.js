// 基础模块：与彩票相关模块

import $ from 'jquery'

class Base {
  /**
   * [initPlayList 初始化奖金和玩法及说明]
   *
   * @memberof Base
   */
  initPlayList () {
    this.play_list.set('r2', {
      bonus: 6,
      tip: '从01~11中任选2个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">6</em>元',
      name: '任二'
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
   * [initNumber 初始化号码]
   *
   * @memberof Base
   */
  initNumber () {
    for (let i = 1; i < 12; i++) {
      this.number.add(('' + i).padStart(2, '0')) // 此处使用 set 数据结构是因为此处号码不能重复，而 set 中要求元素时唯一的，与 set 吻合
    }
  }

  /**
   * [setOmit 设置遗落数据]
   *
   * @memberof Base
   */
  setOmit (omit) {
    let self = this;
    self.omit.clear(); // 将遗落数据的值进行清空，此处的 omit 为 map 对象
    // 将遗落数据保存在数据结构中
    for (let [index, item] of omit.entries()) {
      //entries() 返回一个新的 Iterator 对象，它按插入顺序包含了Map对象中每个元素的 [key, value] 数组。
      self.omit.set(index, item)
    }
    // 将遗落数据保存在页面中
    $(self.omit_el).each(function (index, item) {
      $(item).text(self.omit.get(index));
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
  toggleCodeActive () {
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
    let self = this;
    let $cur = $(e.currentTarget);
    $cur.addClass('active').siblings().removeClass('active');
    self.cur_play = $cur.attr('desc').toLocaleLowerCase(); // toLocaleLowerCase() 用于把字符串转换为小写。
    $('#zx_sm span').html(self.play_list.get(self.cur_play).tip);
    $('.boll-list .btn-boll').removeClass('btn-boll-active'); // 切换玩法的时候，会把上一次的选项清空掉
    self.getCount(); // 重新计算
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
    let index = $cur.index();
    $('.boll-list .btn-boll').removeClass('btn-boll-active'); // 切换玩法的时候，会把上一次的选项清空掉
    if (index === 0) {
      $('.boll-list .btn-boll').addClass('btn-boll-active');
    }
    if (index === 1) {
      $('.boll-list .btn-boll').each(function (i, t) {
        if (t.textContent - 5 > 0) {
          $(t).addClass('btn-boll-active')
        }
      })
    }
    if (index === 2) {
      $('.boll-list .btn-boll').each(function (i, t) {
        if (t.textContent - 6 < 0) {
          $(t).addClass('btn-boll-active')
        }
      })
    }
    if (index === 3) {
      $('.boll-list .btn-boll').each(function (i, t) {
        if (t.textContent % 2 == 1) {
          $(t).addClass('btn-boll-active')
        }
      })
    }
    if (index === 4) {
      $('.boll-list .btn-boll').each(function (i, t) {
        if (t.textContent % 2 == 0) {
          $(t).addClass('btn-boll-active')
        }
      })
    }
    self.getCount();
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
    let active = $active ? $active.length : 0;
    let count = self.computeCount(active, self.cur_play); // 计算当前注数
    if (count) {
      self.addCodeItem($active.join(''), self.cur_play, self.play_list.get(self.cur_play).name, count)
    }
  }


  /**
   * [addCodeItem 添加单词号码]
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
    $(self.cart_el).append(tpl);
    self.getTotal(); 
  }

  getCount () {
    let self = this;
    let active = $('.boll-list .btn-boll-active').length;
    let count = self.computeCount(active, self.cur_play); // 计算当前注数
    let range = self.computeBonus(active, self.cur_play); // 计算奖金范围
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
    $('.sel_info').html(tpl);
  }


  /**
   * [getTotal 计算所有金额]
   *
   * @memberof Base
   */
  getTotal () {
    let count = 0;
    $('.codeList li').each(function (index, item) {
      count += $(item).attr(count) * 1;
    })
    $('#count').text(count);
    $('#money').text(count * 2);
  }

  /**
   * [getRandom 生成随机数]
   *
   * @memberof Base
   */
  getRandom (num) {
    let arr = [], index;
    let number = Array.from(this.number); // this.number 为初始化号码
    // Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。
    while(num--) {
      index = Number.parseInt(Math.random() * number.length);
      arr.push(number[index]);
      number.splice(index, 1);
    }
    return arr.join('')
  }

  /**
   * [getRandomCode 添加随机号码]
   *
   * @memberof Base
   */
  getRandomCode (e) {
    e.preventDefault();
    let num = e.currentTarget.getAttribute('count');
    let paly = this.cur_play.match(/\d+/g)[0];
    let self = this;
    if (num === '0') {
      $(self.cart_el).html('');
    } else {
      for (let i = 0; i < num; i++) {
        self.addCodeItem(self.getRandom(play), self.cur_play, self.play_list.get(self.cur_play).name, 1);
      }
    }
  }
}

export default Base;