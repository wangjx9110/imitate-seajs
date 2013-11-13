/* 
 *  imitate-seajs version:[__version__]
 *
 */
// [1] intro.js
(function(global, undefined) {
    //1.global用于获取全局环境, 浏览器下的全局环境是window对象, node下的全局环境是global对象
    //2.第二个参数undefined, 确保undefined为undefined, 老版浏览器undefined值可以被复写
    if (global.seajs) {
        //避免反复加载, 如果之前已经引用过sea.js文件则不再执行
        return;
    }
// [2] sea.js
    //定义sea.js对象

    var seajs = global.seajs = {
        version: "[__version__]"
    };

    //定义data属性

    var data = seajs.data = {};
// [3] util-lang.js
    //注意此处的isType利用闭包, 很高端, 学习了
    function isType(type) {
        return function(obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        };
    }

    var isObject = isType('Object');
    var isFunction = isType('Function');
    var isArray = Array.isArray || isType('Array');
// [4] .js
// [5] .js
// [6] .js
// [7] .js

// [X] outro.js
})(this);