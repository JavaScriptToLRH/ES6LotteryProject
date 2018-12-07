// 倒计时模块

class Timer {
  countdown (end, update, handle) {
    // end 截止时间
    // update 时间更新回调
    // handle 倒计时结束之后回调
    const now = new Date().getTime(); // 获取当前时间
    const self = this; // 用 self 获取当前对象的一个指针
    if (now - end) {
      // 如果当前时间大于截止时间，说明倒计时已结束，用传入的 handle 执行倒计时结束之后的回调
      handle.call(self);
    } else {
      // 如果当前时间小于截止时间
      // 判断当前时间离截止时间的剩余时间
      let last_time = end - now; // 倒计时剩余时间
      const px_d = 1000 * 60 * 60 * 24; // 设置一天的总毫秒常量
      const px_h = 1000 * 60 * 60; // 设置一小时的总毫秒常量
      const px_m = 1000 * 60; // 设置一分钟的总毫秒常量
      const px_s = 1000; // 设置一秒钟的总毫秒常量
      let d = Math.floor(last_time / px_d); // 剩余天数
      let h = Math.floor((last_time - d * px_d) / px_h); // 剩余小时数
      let m = Math.floor((last_time - d * px_d - h * px_h) / px_m); // 剩余分钟数
      let s = Math.floor((last_time - d * px_d - h * px_h - m * px_m) / px_s); // 剩余秒钟数
      let r = []; // 用于存储剩余时间（天、时、分、秒）数据
      if (d > 0) {
        r.push(`<em>${d}</em>天`);
      }
      if (r.length || h > 0) {
        // 对 r.length 进行判断是因为：
        // 1. 如果没有天的时候，天数为0，前面就不能有天出现。
        // 2. 如果天数为 0，则不会出现多少小时多少分
        r.push(`<em>${h}</em>时`)
      }
      if (r.length || m > 0) {
        r.push(`<em>${m}</em>分`)
      }
      if (r.length || s > 0) {
        r.push(`<em>${s}</em>秒`)
      }
      self.last_time = r.join('');
      update.call(self, r.join('')); // 更新时间
      setTimeout(function () { // 重新调用倒计时，达到递减
        self.countdown(end, update, handle);
      }, 1000);
    }
  }
}

export default Timer;