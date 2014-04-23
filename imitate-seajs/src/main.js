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
            // events = {}; IMP: !!!此处应该像下面那样写, 虽然events和data.events是相同的引用, 
                                //但是在赋值时一定要注意, 单独events的赋值(={})已经修改了它的指向, 
                                //并不会对data.events造成影响...
            events = data.events = {};
            return seajs;   //IMP: 写事件注意不要忘记返回全局
        }
        var list = events[name];    //此时要考虑为空的情况
        if (list) {
            if (callback) {
                for (var i = list.length - 1; i >= 0; i--) {
                    if (list[i] === callback) {
                        list.splice(i, 1);
                    }
                }
            } else {
                delete events[name];
            }
        }
        return seajs;
    };

    var emit = seajs.emit = function(name, data) {
        var list = events[name], func;
        if (list) {
            list = list.slice();

            while (func = list.shift()) {   //按序执行
                func(data);
            }
        }
        return seajs;
    };
// [5] util-path.js

    // dirname:    获取路径的目录
    // realpath:   过滤目录中的./ ../
    // normalize:  补全文件名.js后缀

    // parseAlias: 解析配置别名
    // parsePaths: 解析配置中的path
    // parseVars:  解析配置中的{} 即变量

    // addBase:    通过id, (路由规则)?生成完整绝对路径
    // id2Uri:     通过id获取uri, 完整的绝对路径

    // loaderDir:  seajs文件路径的获取, 根据id=seajsnode查找seajs的DOM, 获取src后匹配目录

    var DIRNAME_RE = /[^?#]*\//;

    var DOT_RE = /\/\.\//g;
    var DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//;

    //将path转成 '****/' 的形式
    function dirname(path) {
        return path.match(DIRNAME_RE)[0];
    }

    function realpath(path) {
        // /a/b/./c/./d => /a/b/c/d            /./ -> /
        path = path.replace(DOT_RE, '/');

        // a/b/c/../../d => a/b/../d => a/d    /xxxxxx/../ -> /
        while (path.match(DOUBLE_DOT_RE)) { 
            path = path.replace(DOUBLE_DOT_RE, '/');
        }

        return path;
    }
    //补全文件全名
    function normalize(path) {
        //1.如果最后一个是'#'则去掉
        //2.如果最后不是.js | .css | / | 存在? <即最后是查询字符串> 则在最后补全.js

        var last = path.length - 1;
        var lastC = path.charAt(last);

        if (lastC === '#') {    //www.wangjuexin.cn/aaa.js# | www.wangjuexin.cn/#
            return path.substring(0, last);
        }

        if (path.substring(last - 2) === '.js' || 
            path.substring(last - 3) === '.css' ||
            path.indexOf('?') > 0 ||
            lastC === '/') {
            return path;
        } else {
            return path + '.js';
        }
    }

    var PATH_RE = /^([^/:]+)(\/.+)$/;
    var VAR_RE = /{([^{]+)}/g;
    //解析配置中的别名
    function parseAlias(id) {
        var alias = data.alias;
        if (alias) {
            //别名是字符串则返回字符串, 否则返回id
            return isString(alias[id]) ? alias[id] : id;
        } else {
            return alias;   //undefined
        }
    }
    //解析配置中的path
    function parsePaths(id) {
        
    }
    //解析配置中的变量 ( {...} )
    function parseVars(id) {

    }

    var doc = document;
    var loc = location;

    var cwd = dirname(loc.href);    //路径.去掉?...或者#...还有文件名
                                    //变为 '****/' 的形式
    var scripts = doc.getElementsByTagName('script');

    var loaderScript = doc.getElemenrById('seajsnode') || scripts[scripts.length - 1];
    //??? 没有seajsnode节点就取最后一个吗?

    var loaderDir = dirname(getScriptAbsoluteSrc(loaderScript)) || cwd;
    //如果<script>没有src属性, 就使用当前的URL转换形式

    function getScriptAbsoluteSrc(node) {
        return node.hasAttribute ? //IE67没有上面的属性
        node.src : node.getAttribute('src', 4);
        //常规浏览器返回src属性值
        //IE 6 7 返回全称值 (加域名)
    }

// [6] util-request.js
    //用于请求SCRIPT & STYLE
    

// [7] util-deps.js


// [X] outro.js
})(this);