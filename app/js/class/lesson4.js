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

{
  let str = 'string';
  console.log('includes', str.includes('s')); // true
  // includes(s,i)：参数1为需要查询字符(串),参数2为查询的起始位置，返回布尔值
  console.log('start', str.startsWith('str')); // true
  // startsWith(s,i)：参数1为需要查询字符(串),参数2为查询的起始位置，返回布尔值,表示是否字符(串)位于string的头部位置。
  console.log('end', str.endsWith('ng')); // true
  // endsWith(s,i)：参数1为需要查询字符(串),参数2为查询的起始位置，返回布尔值,表示是否字符(串)位于string的尾部位置。
}

{
  let str = 'abc';
  console.log('repeat', str.repeat(2)); // abcabc
  // repeat()：构造并返回一个新字符串,该字符串包含被连接在一起的指定数量的字符串的副本。
}

{
  let name = 'list';
  let info = 'hello world';
  let m = `i am ${name}, ${info}`;
  console.log('模板字符串', m)
  // 注意：1. 模板字符串书写方式 ( `` ) ; 2. 变量需要以 ${} 包裹
}

{
  // 填充字符串
  console.log('padStart', '1'.padStart(2, '0'));
  console.log('padEnd', '1'.padEnd(2, '0'));
  // 如果某个字符串不够指定长度，会在头部或尾部补全。
  // padStart()用于头部补全，padEnd()用于尾部补全。第一个是用来指定字符串的最小长度，第二个参数是用来补全长度的字符串。
  // 1.如果原字符串长度等于或大于指定得最小长度，则返回原字符串。
  // 2.如果用来补齐的字符串与原字符串两者的长度之和超过了指定的最小长度，则会截取超过位数的补全字符串。
  // 3.如果省略第二个参数，默认使用空格补全。
  // 使用场景：
  // 1.以等宽字体显示平整的数据
  // 2.在文件名或URL中添加计数或ID：’file 001.txt’。
  // 3.对齐控制台输出： ‘Test 001: ✓’。
  // 4.打印具有固定位数的十六进制或二进制数字：’0x00FF’。
  // padStart() 常见的用途是为数值补全指定位数。
  console.log('padStart 使用场景一', '1'.padStart(10, '0')); // "0000000001"
  // padStart() 常见的用途是为数值补全指定位数。
  console.log('padStart 使用场景二', '12'.padStart(10, 'YYYY-MM-DD')); // "YYYY-MM-12"
}

{
  // 标签模板
  let user = {
    name: 'list',
    info: 'hello world'
  }
  console.log(abc`i am ${user.name}, ${user.info}`); // i am ,, ,listhello world
  function abc(s, v1, v2) {
    console.log(s, v1, v2); // ["i am ", ", ", ""] "list" "hello world"
    return s + v1 + v2;
  }
  // 使用场景
  // 1.多语言转换
  // 2.过滤HTML字符串，防止用户输入恶意内容
  // 过来HTML字符串示例：
  function SaferHTML(templateData){
    var s = templateData[0];
    var i;
    for(i = 1;i < arguments.length;i++){
        var arg = String(arguments[i]);
        //sender里面可能有特殊字符，进行转义
        s += arg.replace(/&/g,"&amp;")
                .replace(/</g,"&lt;")
                .replace(/>/g,"&gt;");
        s += templateData[i];
    }
    console.log(i);//2，表示这个循环只执行了一次，因为templateData[0]="<p>",arguments这个数组只有${sender}这个元素，后面一长串字符都是templateData[2];
    return s;
  }
  var sender = '<script>alert("abc")</script>';
  var message = SaferHTML`<p>${sender} has sent you a message.</p>`;
  console.log(message);
}

{
  console.log(String.raw`Hi\n${1+2}`);
  console.log(String(`Hi\n${1+2}`));
  // String.raw方法 用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。
}