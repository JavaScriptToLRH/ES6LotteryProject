// 正则扩展
// 正则新增特性：构造函数的变化、正则方法的扩展、u 修饰符、y 修饰符、s 修饰符（提案中新增，并未在ES6中实现）

{
  
  let regex = new RegExp('xyz', 'i'); // i修饰符：执行不区分大小写的搜索
  let regex2 = new RegExp(/xyz/i);
  console.log(regex.test('xyz123'), regex2.test('xyz123')); // true true
  // test方法：一个在字符串中测试是否匹配的RegExp方法，它返回true或false

  let regex3 = new RegExp(/xyz/ig, 'i'); // 此处第二个参数 'i',覆盖第一个参数正则表达式的修饰符，即最终结果为：/xyz/i
  console.log(regex3.flags); // i
  // flags属性 用于获取修饰符的属性
}

{
  let s = 'bbb_bb_b';
  let a1 = /b+/g;
  let a2 = /b+/y; // y 执行“粘性”搜索,匹配从目标字符串的当前位置开始，可以使用y标志
  // y 和 g 修饰符都是全局匹配
  // g 修饰符：全局匹配。从上一次匹配位置之后继续寻找，直到找到匹配的位置开始，不强调在上一次匹配位置之后的下一个字符开始匹配，不要求第一个就匹配成功，中间任何位置匹配成功都可
  // y 修饰符：全局匹配。从上一次匹配完成之后，紧接着的下一个字符就要求匹配成功
  console.log('one', a1.exec(s), a2.exec(s)); // one ["bbb", index: 0, input: "bbb_bb_b", groups: undefined] ["bbb", index: 0, input: "bbb_bb_b", groups: undefined]
  console.log('two', a1.exec(s), a2.exec(s)); // two ["bb", index: 4, input: "bbb_bb_b", groups: undefined] null
  // exec	一个在字符串中执行查找匹配的RegExp方法，它返回一个数组（未匹配到则返回null）。
  console.log(a1.sticky, a2.sticky) // false true
  // sticky 属性反映了搜索是否具有粘性，即判断字符串是否开启了 y 修饰符
}

{
  // u 修饰符：即 Unicode字符。会正确处理四个字节的UTF-16编码
  console.log('u-1', /^\uD83D/.test('\uD83D\uDC2A')); // true 由于"\uD83D\uDC2A"是一个四个字节的UTF-16编码，代表一个字符，无法将四个字节的UTF-16编码识别为一个字符，所以就可以产生匹配
  console.log('u-2', /^\uD83D/u.test('\uD83D\uDC2A')); // false 由于"\uD83D\uDC2A"是一个四个字节的UTF-16编码，代表一个字符，所以如果正则表达式带有 u修饰符，那么就能够识别它
  console.log('u-3', /\u{61}/.test('a')); // false
  console.log('u-4', /\u{61}/u.test('a')); // true 如果需要匹配 Unicode字符，则需要使用 u 修饰符正则表达式才能进行识别
  // 使用 u 修饰符，正则表达式能够识别大括号{}表示的Unicode字符，否则无法识别，{61}也会被解读为量词，表示61个u字符

  console.log('\u{20BB7}'); // 𠮷
  let s = '𠮷';
  console.log('u-5', /^.$/.test(s)); // false
  console.log('u-6', /^.$/u.test(s)); // true 如果匹配字符中存在大于两个字节的字符，一定要加上 u 修饰符，才能正确识别，否则无法处理
  // 元字符点 ( . )：所匹配的字符是有限制的，并不能匹配到所有字符，只能匹配到小于两个字节长度的字符
  // 元字符点 ( . )还不能匹配：换行符、回车符、行分隔符、段分隔符。（如需要匹配，则需要加 s 修饰符，但是其在ES6中还没有实现）
  // 添加 u 修饰符之后，点元字符就可以匹配到大于两个字节的Unicode字符。

  console.log('u-7', /𠮷{2}/.test('𠮷𠮷')); // false
  console.log('u-8', /𠮷{2}/u.test('𠮷𠮷')); // true 
}