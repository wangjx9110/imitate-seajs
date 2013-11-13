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

    //定义data属性.. IMP : 将data属性挂在seajs全局变量上, 供外界访问

    var data = seajs.data = {};
// [3] util-lang.js
    //IMP : 注意此处的isType利用闭包, 很高端, 学习了
    function isType(type) {
        return function(obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        };
    }

    var isObject = isType('Object');
    var isFunction = isType('Function');
    var isArray = Array.isArray || isType('Array');
    var isString = isType('String');

    /*-- 目前不懂什么意思 _cid --*/
    var _cid = 0;
    function cid() {
        return _cid++;
    }
// [4] util-event.js
    //seajs自己的事件触发, on绑定事件, off移除事件, emit触发事件
    var events = data.events = {};


    seajs.on = function(name, callback) {
        var list = events[name] || (events[name] = []);
        list.push(callback);    //如果没传callback怎么办?
        return seajs //IMP: 可以实现连续调用
    };

    seajs.off = function(name, callback) {
        if (!name && !callback) {
            events = {};
            return seajs;   //IMP: 写事件注意不要忘记返回全局
        }
        var list = events[name];
        if (!callback) {
            list = [];
            return seajs;
        }
        for (var i = 0, len = list.length; i < len; i++) {
            if (list[i] === callback) {
                list.splice(i, 1);
            }
        }
        return seajs;
    };

    var emit = seajs.emit = function(name, data) {

    };
// [5] .js
// [6] .js
// [7] .js

// [X] outro.js
})(this);