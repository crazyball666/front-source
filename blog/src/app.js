import './scss/app.scss';
import './common/bg'

$(function () {
  let path = location.pathname
  if (/^\/t\/.*/.test(path)) {
    setupArticleDetail()
  }
})

function setupArticleDetail() {
  let content = $(".content").text()
  $(".content").html(content)
}