// 字符串扩展
// 字符串新增特性：Unicode表示法、遍历接口、模板字符串、新增方法（10种）

{
  console.log('a', `\u0061`); // a
  console.log('s', `\u20BB7`); // ₻7 
  // 因为 20BB7 转化为超过了 0xFFFF,所以会将 20BB 作为一个字符（即两个字节），7 单独作为两个字节。20BB7 被当成两个字符。
  // 又因为 \u20BB 没有对应的 Unicode编码，所以第一个非正常显示

  // 对于 Unicode编码 大于 0xFFFF 的编码可以使用 大括号{} 进行包裹
  console.log('s', `\u{20BB7}`); // 𠮷 
}

{
  // ES5
  let s = '𠮷';
  console.log('length', s.length); // 2 两个字节算一个长度，'𠮷'为两个字符（即四个字节）
  console.log('0', s.charAt(0)); // �  乱码
  console.log('1', s.charAt(1)); // �  乱码
  console.log('at0', s.charCodeAt(0)); // 55362
  console.log('at1', s.charCodeAt(1)); // 57271
  // charAt() 返回指定位置的字符
  // charCodeAt() 返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。

  // ES6
  let s1 = '𠮷a'
  console.log('s1 length', s1.length); // 3
  console.log('code0', s1.codePointAt(0)); // 134071  十进制输出
  console.log('code0', s1.codePointAt(0).toString(16)); // 20bb7  toString(16)转化为16进制输出
  // codePointAt() 返回一个 Unicode编码 点值的非负整数
  console.log('code1', s1.codePointAt(1)); // 57271
  console.log('code1', s1.codePointAt(1).toString(16)); // dfb7
  console.log('code2', s1.codePointAt(2)); // 97
  console.log('code3', s1.codePointAt(3)); // undefined
  // '𠮷a' 为三个字符（'𠮷'为两个字符，'a'为一个字符）。
  // codePointAt(0)处理的为完整的 '𠮷'，codePointAt(1)处理的为 '𠮷' 的后两个字节，codePointAt(2)处理的为 'a'
}

{
  // ES5
  console.log(String.fromCharCode("0x20bb7")); // ஷ
  // ES6
  console.log(String.fromCodePoint("0x20bb7")); // 𠮷
  // fromCharCode() fromCodePoint() 接受一个指定的 Unicode 值，然后返回一个字符串
  // 此处 ES5 和 ES6 的区别为：能不能处理大于 0xFFFF 的两个字符的 Unicode编码
}

{
  // ES5 ES6 字符串遍历
  let str = '\u{20bb7}abc';
  // ES5
  for (let i = 0; i < str.length; i++) {
    console.log('ES5', str[i]); // � � a b c  \u{20bb7}为两个字符
  }
  // ES6
  for (let code of str) {
    console.log('ES6', code); // 𠮷 a b c
  }
}