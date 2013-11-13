##问题
###问题1: 在GRUNT项目构建时如何给JS等文件添加事件戳, 主要是如何在HTML引用处也实时更新?(如: http://ssl.gstatic.com/gb/js/sem_89104b6af0c87a5697dec4b559556233.js)

##收获
###收获1: Array.isArray()函数可以用来判断参数是否为数组, IE6,7,8不支持, 9支持, chrome&ff 支持
###不支持的情况下可以使用
function isType(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }
}

var isArray = Array.isArray || isType('Array');
