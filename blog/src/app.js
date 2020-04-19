import './scss/app.scss';
import './common/bg'

import md from './common/parseMd';

$(function () {
  let path = location.pathname
  if (/^\/t\/.*/.test(path)) {
    setupArticleDetail()
  }
})

function setupArticleDetail() {
  let content = md.render($(".content").text())
  $(".content").html(content)
}