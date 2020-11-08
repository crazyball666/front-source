/**
 * 清除样式
 */

import $ from '../../util/dom-core.js'

function Clear(editor) {
  this.editor = editor;
  this.$elem = $('<div class="w-e-menu">\n            <i>Clear</i>\n        </div>');
  this.type = 'click';

  // 当前是否 active 状态
  this._active = false;
}

// 原型
Clear.prototype = {
  constructor: Clear,

  // 点击事件
  onClick: function onClick(e) {
    // 点击菜单将触发这里

    var editor = this.editor;
    var isSeleEmpty = editor.selection.isSelectionEmpty();

    if (isSeleEmpty) {
      return;
    }

    // 执行 underline 命令
    editor.cmd.do('removeFormat');

    if (isSeleEmpty) {
      // 需要将选取折叠起来
      editor.selection.collapseRange();
      editor.selection.restoreSelection();
    }
  },
};

export default Clear