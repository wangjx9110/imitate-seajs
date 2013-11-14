##问题
###问题1: 在GRUNT项目构建时如何给JS等文件添加事件戳, 主要是如何在HTML引用处也实时更新?(如: http://ssl.gstatic.com/gb/js/sem_89104b6af0c87a5697dec4b559556233.js)
###问题2: 如何复制数组, 对象, 函数?
数组: `var b = a.slice()` slice为数组函数, 返回新构造的一个数组, 其中的元素根据其传的参数决定, 参数值代表数组索引值, 不传参则不切割, 传一个参从参数开始到最后, 传两个参则, 从第一个参数开始, 到第二个参数的前一位.

###问题3: 为什么events对象不直接绑在seajs对象下, 而是在seajs的data下面?

###问题4: 如何判断两个引用类型对象相等?

###问题5: 给定一个元素在数组中查找并删除的最佳实践?
####答: 厉害, 如果从0向上加的话, 删去数组(splice会用后面的填充当前位置)后, 要调整i的值, 使其不会跳过元素, 并且最后的判断条件(数组长度)也要更新. 但是从后向前找的话, 删除后也是在后面补充(针对从后向前的方向), 不会影响前面的元素, 前面的依然是没有判断过的, 并且没有跳过元素, 而且最终判断条件依然是 `>=0` 非常方便, 高效.

    for (var i = container.length - 1; i >=0; i--) {
        if (container[i] === target) {
            container.splice(i, 1);
        }
    }

###问题6: 在util-events.js中emit函数, 执行时将函数列表复制了一份, 说是防止修改, 防止修改什么呢, 为什么会修改?

###问题7: 网站路径原理?


##收获
###收获1: Array.isArray()函数可以用来判断参数是否为数组, IE6,7,8不支持, 9支持, chrome&ff 支持
###不支持的情况下可以使用

    function isType(type) {
        return function(obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    }

    var isArray = Array.isArray || isType('Array');
###收获2: Object.prototype.toString.call(obj) 可以识别所有类型, 包括五种基本类型 [object Number], [object String], [object Boolean], [object Undefined], [object Null] 还有 Data RegExp Function Array Object等引用类型也可以分清!

###收获3: 在引用型变量赋值时要注意!! 例如 `events = data.events = {}` 此时两个变量指向的是一个对象, 针对`events`或者`data.events`的修改都是针对同一个对象, `events.a = 'x'`的同时`data.events`也会增加`a`属性, 但是一定要注意在应用型变量在赋值时和修改是不同的, 赋值则修改引用型变量的指向, 之后的操作都是针对新指向对象的操作. 例如`event = {}`之后`data.event`并不会变为`{}`, 依然是`{ a: 'x'}`, 之后对`event`的修改也不会影响`data.event`, 所以在将引用变量赋值的时候一定要想到这一点.

###收获4: 空数组 shift & pop 返回 undefined

###收获5: String.match()函数用法[只返回数组或null]: 找不到的情况下返回null, 传参2种 (1)字符串 (2)正则表达式 讨论正则表达式情况: 正则不带g, [0]为正则匹配值, 之后元素为捕获分组值, 正则带g, 所有元素都为正则匹配值.

###收获6: URI后面只能跟?(代表查询字符串)和#(代表HASH)

###收获7: String.substring(start[, stop])用法, 不接受负参数, 截取字符串start处到stop-1(包括stop-1)处的值. 

#当前进度 
#1.util-event seajs.off line27
#2.util-request 刚开始 event有些函数没仔细看..用的时候仔细研究..