// 根据 html 代码片段创建 dom 对象
export function createElemByHTML(html) {
  var div = void 0;
  div = document.createElement('div');
  div.innerHTML = html;
  return div.children;
}

// 是否是 DOM List
export function isDOMList(selector) {
  if (!selector) {
    return false;
  }
  if (selector instanceof HTMLCollection || selector instanceof NodeList) {
    return true;
  }
  return false;
}

// 封装 document.querySelectorAll
export function querySelectorAll(selector) {
  var result = document.querySelectorAll(selector);
  if (isDOMList(result)) {
    return result;
  } else {
    return [result];
  }
}

/*
    工具
*/

// 和 UA 相关的属性
export var UA = {
  _ua: navigator.userAgent,

  // 是否 webkit
  isWebkit: function isWebkit() {
    var reg = /webkit/i;
    return reg.test(this._ua);
  },

  // 是否 IE
  isIE: function isIE() {
    return 'ActiveXObject' in window;
  }
};

// 遍历对象
export function objForEach(obj, fn) {
  var key = void 0,
    result = void 0;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      result = fn.call(obj, key, obj[key]);
      if (result === false) {
        break;
      }
    }
  }
}

// 遍历类数组
export function arrForEach(fakeArr, fn) {
  var i = void 0,
    item = void 0,
    result = void 0;
  var length = fakeArr.length || 0;
  for (i = 0; i < length; i++) {
    item = fakeArr[i];
    result = fn.call(fakeArr, item, i);
    if (result === false) {
      break;
    }
  }
}

// 获取随机数
export function getRandom(prefix) {
  return prefix + Math.random().toString().slice(2);
}

// 替换 html 特殊字符
export function replaceHtmlSymbol(html) {
  if (html == null) {
    return '';
  }
  return html.replace(/</gm, '&lt;').replace(/>/gm, '&gt;').replace(/"/gm, '&quot;').replace(/(\r\n|\r|\n)/g, '<br/>');
}

// 返回百分比的格式


// 判断是不是 function
export function isFunction(fn) {
  return typeof fn === 'function';
}