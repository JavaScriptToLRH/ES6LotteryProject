// 数值扩展

{
  console.log('二进制表示', 0b111110111); // 503 ob+数字 表示二进制
  console.log('八进制表示', 0o767); // 503 0o+数字 表示八进制
}

{
  console.log('isFinite 15', Number.isFinite(15)); // true
  console.log('isFinite NaN', Number.isFinite(NaN)); // false
  console.log('isFinite 1/0', Number.isFinite('true'/0)); 
  // false
  // Number.isFinite() 用于检查其参数是否是无穷大
  console.log('isFinite NaN', Number.isNaN(NaN)); // true
  console.log('isFinite 0', Number.isNaN(0)); // false
  // Number.isNaN() 用于检查其参数是否是非数字值
}

{
  console.log('isInteger 25', Number.isInteger(25)); // true
  console.log('isInteger 25.0', Number.isInteger(25.0)); // true
  console.log('isInteger 25', Number.isInteger(25.1)); // false
  console.log('isInteger "25"', Number.isInteger('25')); // false
  // Number.isInteger 用于检查其参数是否是整数
}

{
  // 在JavaScript中，如果一个数超过区间 [-2的53次方， 2的53次方]，这个数的存储就会不准确
  console.log('JavaScript 最大数值上限', Number.MAX_SAFE_INTEGER); // 9007199254740991
  console.log('JavaScript 最小数值下限', Number.MIN_SAFE_INTEGER); // -9007199254740991
  console.log('isSafeInteger 10', Number.isSafeInteger(10)); // true
  console.log('isSafeInteger a', Number.isSafeInteger('a')); // false  
  // Number.isSafeInteger 用于判断数值是否安全，即判断数值是否在安全区间内
}

{
  console.log('Math.trunc 4.1', Math.trunc(4.1)); // 4
  console.log('Math.trunc 4.9', Math.trunc(4.9)); // 4
  // Math.trunc() 去除数字的小数部分，保留整数部分
  // Math.round() 返回一个数字四舍五入后的整数部分
  // Math.ceil() 返回一个大于或等于数字的最小整数，即向上取整
  // Math.floor() 返回一个小于或等于数字的最小整数，即向下取整
}

{
  console.log('sign -5', Math.sign(-5)); // -1
  console.log('sign 0', Math.sign(0)); // 0
  console.log('sign -0', Math.sign(-0)); // -0
  console.log('sign 5', Math.sign(5)); // 1
  console.log('sign "50"', Math.sign("50")); // 1
  console.log('sign "foo"', Math.sign("foo")); // NaN
  // Math.sign() 返回一个数字的符号, 指示数字是正数，负数还是零
  // 如果为字符串就会将字符串转换为数字，再进行判断
}

{
  console.log('cbrt -1', Math.cbrt(-1)); // -1
  console.log('cbrt 8', Math.cbrt(8)); // 2
  // Math.cbrt 计算数值的立方根
}
