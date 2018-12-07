// 计算模块

class Calculate {
  /**
   * [computeCount] 计算当前注数
   *
   * @param {Number} active [当前选中的号码]
   * @param {String} paly_name [当前的玩法标识]
   * @return {Number} [注数]
   * @memberof Calculate
   */
  computeCount (active, paly_name) {
    let count = 0; // 声明当前注数为 0
    const exist = this.paly_list.has(paly_name); // 判断玩法标识是否存在 play_list为玩法列表（即：任二、任三、任四、任五、任六、任七、任八）
    const arr = new Array(active).fill('0'); // 创建一个指定长度为 active 的，并数组填充为 0 的一个数组。同时也是为了进行选中号码的排列组合计算
    if (exist && paly_name.at(0) === 'r') {
      // 判断玩法存在 并且 判断当前玩法的字符串是不是包含 r。此处对玩法的字符串进行检测 r 是否存在，是为了区分玩法
      count = Calculate.combine(arr, paly_name.split('')[1]).length; // 进行组合运算
      // combine 为静态方法。注意：如果使用类名进行调用，则为静态方法(静态方法使用 static)
    }
    return count
  }

  /**
   * [computeBonus 奖金范围预测]
   *
   * @param {Number} active [当前选中的号码]
   * @param {String} paly_name [当前的玩法标识]
   * @return {Array} [奖金范围]
   * @memberof Calculate
   */
  computeBonus (active, paly_name) {
    const self = this; // 保存当前对象的指向
    const play = paly_name.split(''); // 获取当前玩法的一个基数，玩法分别为：r2、r3、r4、r5、r6、r7、r8,则获取玩法对应的数字（即：2/3/4/5/6/7/8）
    let arr = new Array(play[1] * 1).fill(0); // 创建一个与当前玩法基数相匹配的长度，并填充为 0 的一个数组
    let min, max; // 设置最小值与最大值变量
    if (play[0] === 'r') { // 对玩法进行区分，标识此处玩法为 任 X
      let min_active = 5 - (11 - active); // 设置最小命中数（如果选中 任七 玩法，选择号码为 7 个，开奖个数为固定的 5个，则最小命中数为 1）
      if (min_active > 0) {
        if (min_active - play[1] >= 0) {
          // 判断最小命中数与当前玩法的基数（即选择的号码个数）相减是否大于零，如果大于零，则实例化一个数组
          arr = new Array(min_active).fill(0);
          min = Calculate.combine(arr, play[1]).length; // 计算最小的注数
        } else {
          if (play[1] - 5 > 0 && active - play[1] >= 0) {
            arr = new Array(active - 5).fill(0);
            min = Calculate.combine(arr, play[1] - 5).length;
          } else {
            min = active - play[1] > -1 ? 1 : 0;
          }
        }
      } else {
        min = active - play[1] > -1 ? 1 : 0;
      }

      let max_active = Math.min(active, 5);
      if (play[1] - 5 > 0) {
        if (active - play[1] >= 0) {
          arr = new Array(active - 5).fill(0);
          max = Calculate.combine(arr, play[1] - 5).length;
        } else {
          max = 0;
        }
      } else if (play[1] - 5 < 0) {
        arr = new Array(Math.min(active, 5).fill(0));
        max = Calculate.combine(arr, play[1]).length;
      } else {
        max = 1;
      }
    }
    return [min, max].map(item => item * self.paly_list.get(paly_name).bonus) //返回金额范围
  }

  /**
   * [combine 组合运算] 
   * 
   * @static
   * @param {Array} arr [参与组合运算的数组]
   * @param {Number} size [组合运算的基数]
   * @return {Number} [计算注数]
   * @memberof Calculate
   */
  static combine(arr, size) {
    let allResult = []; 
    // 即时执行函数
    // 通过递归方式实现排列组合
    (function f(arr, size, result) {
      let arrLen = arr.length;
      if (size > arrLen) {
        return;
      } 
      if (size === arrLen) {
        allResult.push([].concat(result.arr)) // 组合元素的子集
      } else {
        for(let i = 0; i < arrLen; i++) {
          let newResult = [].concat(result);
          newResult.push(arr[i]);
          if (size === 1) {
            allResult.push(newResult);
          } else {
            let newArr = [].concat(arr);
            newArr.splice(0, i + 1);
            f(newArr, size - 1, newResult)
          }
        }
      }
    })(arr, size, [])
    return allResult;
  }
}

export default Calculate;