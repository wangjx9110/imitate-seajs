##问题
###问题1: 在GRUNT项目构建时如何给JS等文件添加事件戳, 主要是如何在HTML引用处也实时更新?(如: http://ssl.gstatic.com/gb/js/sem_89104b6af0c87a5697dec4b559556233.js)
###问题2: 如何复制数组, 对象, 函数?

###问题3: 为什么events对象不直接绑在seajs对象下, 而是在seaja的data下面?

###问题4: 如何判断两个引用类型对象相等?

###问题5: 给定一个元素在数组中查找并删除的最佳实践?

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

#当前进度 util-event seajs.off line27