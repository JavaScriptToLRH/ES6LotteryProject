// 计算模块

class Calculate {
  /**
   * [computeCount] 计算当前注数
   *
   * @param {Number} active [当前选中的号码个数]
   * @param {String} play_name [当前的玩法标识]
   * @return {Number} [注数]
   * @memberof Calculate
   */
  computeCount (active, play_name) {
    let count = 0; // 声明当前注数为 0
    const exist = this.play_list.has(play_name); 
    // exist 通过 Map数据结构 的 has()方法（表明map 中是否存在指定元素） 判断玩法列表中是否存在该玩法
    // 判断玩法标识是否存在 play_list为玩法列表（即：任二、任三、任四、任五、任六、任七、任八）
    const arr = new Array(active).fill('0');
    // 创建一个指定长度为 active 的，并数组填充为 0 的一个数组。同时也是为了进行选中号码的排列组合计算
    if (exist && play_name.charAt(0) === 'r') {
      // charAt() 返回指定位置的字符
      // 判断玩法存在 并且 判断当前玩法的字符串是不是包含 r。此处对玩法的字符串进行检测 r 是否存在，是为了区分玩法
      count = Calculate.combine(arr, play_name.split('')[1]).length; 
      // count为注数，即：如果当前玩法为 '任五(r5)'，所选中的号码个数为 7个，7个号码中选取5个，共有21中方法，则注数为 21
      // play_name.split('')[1] 为获取当前玩法所需的个数（即基数），例如：'r2'  -->  基数应为 2
      // combine 为静态方法，通过 定义长度为所选个数的数组 与 玩法基数 进行组合计算，返回基于基数所有的组合
      // 注意：如果使用类名进行调用，则为静态方法(静态方法使用 static)
    }
    return count
  }

  /**
   * [computeBonus 奖金范围预测]
   *
   * @param {Number} active [当前选中的号码个数]
   * @param {String} play_name [当前的玩法标识]
   * @return {Array} [奖金范围]
   * @memberof Calculate
   */
  // 示例：以 任三 为例，用户选了 7个 号码。
  // 每期开奖号码最多为 5个
  // 最大盈利为：最多 5个 号码全中，则最大注数（即：任三玩法，从 5个 全中的号码，任取 3个 号码，共有 10种 取法）为 10注
  // 最小盈利为：最少中一注，任三玩法，中一注为 19 元，否则为没中奖，则 19 - 70 = -51 （70为买任三玩法下注的钱）
  computeBonus (active, play_name) {
    const self = this; // 保存当前对象的指向
    const play = play_name.split(''); 
    // 获取当前玩法的一个基数，玩法分别为：r2、r3、r4、r5、r6、r7、r8,则获取玩法对应的数字（即：2、3、4、5、6、7、8）
    let arr = new Array(parseInt(play[1]) * 1).fill(0); // 创建一个与当前玩法基数相匹配的长度，并填充为 0 的一个数组
    let min, max; // 设置最小值与最大值变量
    if (play[0] === 'r') { // 对玩法进行区分，标识此处玩法为 任 X
      let min_active = 5 - (11 - active); // 最小命中数
      // min_active最小命中数。比如任8，11个数字，选择了8个，剩余3个数字没选
      // 但是每次开奖5个数，所以至少有两个命中的。
      // 任7最小命中数是1。最小命中数，对应 8->2, 7->1, (6,5,4,3,2)->0
      console.log('min_active', min_active)
      if (min_active > 0) {
        if (min_active - parseInt(play[1]) >= 0) {
          // 判断最小命中数与当前玩法的基数（即选择的号码个数）相减是否大于零，如果大于零，则实例化一个数组
          arr = new Array(min_active).fill(0);
          console.log('1', arr)
          min = Calculate.combine(arr, parseInt(play[1])).length; // 计算最小的注数
        } else {
          if (parseInt(play[1]) - 5 > 0 && active - parseInt(play[1]) >= 0) {
            arr = new Array(active - 5).fill(0);
            console.log('2', arr)
            min = Calculate.combine(arr, parseInt(play[1]) - 5).length;
          } else {
            console.log('3')
            min = active - parseInt(play[1]) > -1 ? 1 : 0;
          }
        }
      } else {
        console.log('123456')
        min = active - parseInt(play[1]) > -1 ? 1 : 0;
      }

      // let max_active = Math.min(active, 5);
      if (parseInt(play[1]) - 5 > 0) {
        if (active - parseInt(play[1]) >= 0) {
          arr = new Array(active - 5).fill(0);
          max = Calculate.combine(arr, parseInt(play[1]) - 5).length;
        } else {
          max = 0;
        }
      } else if (parseInt(play[1]) - 5 < 0) {
        arr = new Array(Math.min(active, 5).fill(0));
        max = Calculate.combine(arr, parseInt(play[1])).length;
      } else {
        max = 1;
      }
    }
    console.log('min', min, 'max', max)
    console.log('盈利范围', [min, max].map(item => item * self.play_list.get(play_name).bonus))
    return [min, max].map(item => item * self.play_list.get(play_name).bonus) //返回金额范围
  }

  /**
   * [combine 组合运算，即：从 arr 中 选取 size 个元素，组成一个集合，共有多少种方法] 
   * 
   * @static
   * @param {Array} arr [参与组合运算的数组]
   * @param {Number} size [组合运算的基数]
   * @return {Number} [计算注数]
   * @memberof Calculate
   */
  static combine(arr, size) {
    console.log('组合运算combine', 'arr', arr, 'size', size)
    let allResult = []; 
    // 即时执行函数，通过递归方式实现排列组合
    (function f(arr, size, result) {
      let arrLen = arr.length;
      if (size > arrLen) {
        // 如果所选号码个数 小于 玩法基数，则不进行排列组合运算
        return;
      }
      if (size === arrLen) {
        // 当所选号码个数 等于 玩法基数，则只存在一种
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
    console.log('组合运算combine allResult', allResult)
    return allResult;
  }
}

export default Calculate;